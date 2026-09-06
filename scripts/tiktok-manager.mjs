/**
 * tiktok-manager.mjs — lớp gọi API TikTok cho pH-Chem.
 *
 * Chỉ đăng video do chính mình dựng, lên chính tài khoản TikTok của mình.
 * Không đọc, không đụng tới dữ liệu của bất kỳ người dùng TikTok nào khác.
 *
 * Tài liệu gốc: https://developers.tiktok.com/doc/content-posting-api-get-started
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// ─────────────────────────────────────────────────────────────
// Cấu hình
// ─────────────────────────────────────────────────────────────

export function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const env = {};
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i !== -1) env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
  }
  return env;
}

const env = loadEnv();

export const CLIENT_KEY = env.TIKTOK_CLIENT_KEY || '';
export const CLIENT_SECRET = env.TIKTOK_CLIENT_SECRET || '';
export const REDIRECT_URI = env.TIKTOK_REDIRECT_URI || 'https://ph-chem.web.app/tiktok-callback.html';
export const SCOPE = env.TIKTOK_SCOPE || 'user.info.basic,video.publish';
export const CONG = Number(env.TIKTOK_PORT || 3721);

const API = 'https://open.tiktokapis.com/v2';
const KHO_TOKEN = path.resolve(process.cwd(), '.tiktok-token.json');
const KHO_PKCE = path.resolve(process.cwd(), '.tiktok-pkce.json');

// ─────────────────────────────────────────────────────────────
// Kho token (nằm ngoài git)
// ─────────────────────────────────────────────────────────────

export function docToken() {
  if (!fs.existsSync(KHO_TOKEN)) return null;
  try {
    return JSON.parse(fs.readFileSync(KHO_TOKEN, 'utf8'));
  } catch {
    return null;
  }
}

export function luuToken(data) {
  const now = Math.floor(Date.now() / 1000);
  const ban = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    open_id: data.open_id,
    scope: data.scope,
    het_han: now + Number(data.expires_in || 0),
    refresh_het_han: now + Number(data.refresh_expires_in || 0),
    luu_luc: new Date().toISOString(),
  };
  fs.writeFileSync(KHO_TOKEN, JSON.stringify(ban, null, 2));
  return ban;
}

export function xoaToken() {
  if (fs.existsSync(KHO_TOKEN)) fs.unlinkSync(KHO_TOKEN);
}

// ─────────────────────────────────────────────────────────────
// OAuth — PKCE
// TikTok băm code_verifier bằng SHA256 rồi mã hoá HEX (không phải base64url).
// ─────────────────────────────────────────────────────────────

export function taoPkce() {
  const verifier = crypto.randomBytes(48).toString('hex').slice(0, 96);
  const challenge = crypto.createHash('sha256').update(verifier).digest('hex');
  const state = crypto.randomBytes(12).toString('hex');
  fs.writeFileSync(KHO_PKCE, JSON.stringify({ verifier, state }, null, 2));
  return { verifier, challenge, state };
}

export function docPkce() {
  if (!fs.existsSync(KHO_PKCE)) return null;
  try {
    return JSON.parse(fs.readFileSync(KHO_PKCE, 'utf8'));
  } catch {
    return null;
  }
}

export function urlDangNhap() {
  if (!CLIENT_KEY) throw new Error('Thiếu TIKTOK_CLIENT_KEY trong .env.local');
  const { challenge, state } = taoPkce();
  const q = new URLSearchParams({
    client_key: CLIENT_KEY,
    scope: SCOPE,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });
  return `https://www.tiktok.com/v2/auth/authorize/?${q.toString()}`;
}

async function goiOauth(body) {
  const res = await fetch(`${API}/oauth/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body: new URLSearchParams(body).toString(),
  });
  const data = await res.json();
  if (data.error || data.error_description) {
    throw new Error(`TikTok OAuth: ${data.error || ''} ${data.error_description || ''}`.trim());
  }
  return data;
}

export async function doiMaLayToken(code) {
  const pkce = docPkce();
  if (!pkce) throw new Error('Không tìm thấy code_verifier — hãy bấm "Nối tài khoản" lại từ đầu.');
  const data = await goiOauth({
    client_key: CLIENT_KEY,
    client_secret: CLIENT_SECRET,
    code: decodeURIComponent(code),
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code_verifier: pkce.verifier,
  });
  if (fs.existsSync(KHO_PKCE)) fs.unlinkSync(KHO_PKCE);
  return luuToken(data);
}

export async function lamMoiToken() {
  const t = docToken();
  if (!t?.refresh_token) throw new Error('Chưa nối tài khoản TikTok.');
  const data = await goiOauth({
    client_key: CLIENT_KEY,
    client_secret: CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: t.refresh_token,
  });
  return luuToken(data);
}

/** Lấy access_token còn hạn; tự làm mới khi sắp hết (còn dưới 2 phút). */
export async function tokenConHan() {
  let t = docToken();
  if (!t) throw new Error('Chưa nối tài khoản TikTok. Chạy: npm run tiktok:noi');
  const now = Math.floor(Date.now() / 1000);
  if (t.het_han - now < 120) t = await lamMoiToken();
  return t.access_token;
}

// ─────────────────────────────────────────────────────────────
// Gọi API có xác thực
// ─────────────────────────────────────────────────────────────

async function goiApi(duong, body) {
  const token = await tokenConHan();
  const res = await fetch(`${API}${duong}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body ?? {}),
  });
  const data = await res.json();
  const loi = data?.error;
  if (loi && loi.code && loi.code !== 'ok') {
    throw new Error(`TikTok API ${loi.code}: ${loi.message || ''} (log_id ${loi.log_id || '—'})`);
  }
  return data.data ?? {};
}

/**
 * Bắt buộc gọi trước khi hiện màn hình soạn bài.
 * Trả về tên tài khoản, các mức riêng tư được phép, và những tương tác bị khoá.
 */
export function thongTinTaiKhoan() {
  return goiApi('/post/publish/creator_info/query/');
}

/** Thông tin hồ sơ cơ bản — chỉ để hiện đang nối vào tài khoản nào. */
export async function hoSoCoBan() {
  const token = await tokenConHan();
  const res = await fetch(
    `${API}/user/info/?fields=open_id,display_name,avatar_url`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const data = await res.json();
  if (data?.error?.code && data.error.code !== 'ok') {
    throw new Error(`TikTok API ${data.error.code}: ${data.error.message || ''}`);
  }
  return data?.data?.user ?? {};
}

// ─────────────────────────────────────────────────────────────
// Đăng video thẳng lên hồ sơ (Direct Post)
// ─────────────────────────────────────────────────────────────

/**
 * Bước 1: khởi tạo. Trả về publish_id và upload_url.
 * @param {object} p
 * @param {string} p.tep        đường dẫn file mp4
 * @param {string} p.tieuDe     chú thích bài đăng
 * @param {string} p.riengTu    PUBLIC_TO_EVERYONE | MUTUAL_FOLLOW_FRIENDS | FOLLOWER_OF_CREATOR | SELF_ONLY
 * @param {boolean} p.khoaBinhLuan
 * @param {boolean} p.khoaDuet
 * @param {boolean} p.khoaStitch
 * @param {boolean} p.thuongHieuMinh   brand_organic_toggle — quảng bá chính mình
 * @param {boolean} p.thuongHieuThue   brand_content_toggle — nội dung được trả tiền
 * @param {number}  p.mocAnhBia        mốc mili-giây lấy ảnh bìa
 */
export async function khoiTaoDangVideo(p) {
  const kichThuoc = fs.statSync(p.tep).size;
  if (p.thuongHieuThue && p.riengTu === 'SELF_ONLY') {
    throw new Error('Nội dung thương hiệu được trả tiền không được để chế độ "Chỉ mình tôi".');
  }
  const data = await goiApi('/post/publish/video/init/', {
    post_info: {
      title: p.tieuDe ?? '',
      privacy_level: p.riengTu,
      disable_comment: !!p.khoaBinhLuan,
      disable_duet: !!p.khoaDuet,
      disable_stitch: !!p.khoaStitch,
      video_cover_timestamp_ms: Number(p.mocAnhBia ?? 1000),
      brand_content_toggle: !!p.thuongHieuThue,
      brand_organic_toggle: !!p.thuongHieuMinh,
    },
    source_info: {
      source: 'FILE_UPLOAD',
      video_size: kichThuoc,
      chunk_size: kichThuoc, // mọi video của mình đều dưới 64 MB → gửi một lượt
      total_chunk_count: 1,
    },
  });
  return { ...data, kichThuoc };
}

/** Bước 2: đẩy file mp4 lên đường dẫn TikTok vừa cấp. */
export async function dayFileLen(uploadUrl, tep, kichThuoc) {
  const buf = fs.readFileSync(tep);
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Length': String(kichThuoc),
      'Content-Range': `bytes 0-${kichThuoc - 1}/${kichThuoc}`,
    },
    body: buf,
  });
  if (!res.ok) {
    throw new Error(`Đẩy file thất bại: HTTP ${res.status} ${await res.text()}`);
  }
  return true;
}

/** Bước 3: hỏi TikTok đã đăng xong chưa. */
export function traTrangThai(publishId) {
  return goiApi('/post/publish/status/fetch/', { publish_id: publishId });
}

// ─────────────────────────────────────────────────────────────
// Kho video của mình
// ─────────────────────────────────────────────────────────────

const THU_MUC = ['reels_v2', 'reels', 'reels_chuyenla', 'reels_antoan', 'reels_lichsu'];

// Chủ đề đọc từ đầu tên file, vì một thư mục có thể chứa nhiều loạt khác nhau.
const CHU_DE = [
  [/^element_/, 'Nguyên tố'],
  [/^cl2_/, 'Chuyện lạ hoá học'],
  [/^reel_/, 'Chuyện lạ hoá học'],
  [/^antoan_/, 'An toàn hoá chất'],
  [/^lichsu_/, 'Lịch sử hoá học'],
  [/^quiz_/, 'Trắc nghiệm'],
];

function chuDeCua(ten) {
  for (const [re, nhan] of CHU_DE) if (re.test(ten)) return nhan;
  return 'Khác';
}

export function khoVideo() {
  const goc = path.resolve(process.cwd(), 'promo');
  const ds = [];
  for (const thuMuc of THU_MUC) {
    const d = path.join(goc, thuMuc);
    if (!fs.existsSync(d)) continue;
    const moi = thuMuc === 'reels_v2';
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.mp4')).sort()) {
      const tep = path.join(d, f);
      const ten = f.replace(/\.mp4$/, '');
      ds.push({
        id: `${thuMuc}/${f}`,
        ten,
        chuDe: chuDeCua(ten) + (moi ? '' : thuMuc === 'reels' ? ' (bản cũ)' : ''),
        mb: +(fs.statSync(tep).size / 1048576).toFixed(2),
        tep,
      });
    }
  }
  return ds;
}

export function timVideo(id) {
  const v = khoVideo().find((x) => x.id === id);
  if (!v) throw new Error(`Không có video: ${id}`);
  return v;
}

// ─────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────

const lenh = process.argv[2];

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  const chay = async () => {
    if (lenh === 'noi' || lenh === 'connect') {
      console.log('\nMở đường dẫn này trên trình duyệt, đăng nhập bằng tài khoản TikTok của pH-Chem:\n');
      console.log(urlDangNhap());
      console.log('\nSau khi cho phép, TikTok sẽ quay về trang ph-chem.web.app/tiktok-callback.html');
      console.log('và trang đó tự chuyển về bảng điều khiển ở máy. Nhớ chạy bảng trước:');
      console.log('  npm run tiktok:bang\n');
    } else if (lenh === 'ai' || lenh === 'whoami') {
      const t = docToken();
      if (!t) return console.log('Chưa nối tài khoản nào.');
      const con = t.het_han - Math.floor(Date.now() / 1000);
      console.log(`open_id     : ${t.open_id}`);
      console.log(`quyền       : ${t.scope}`);
      console.log(`token còn   : ${Math.round(con / 60)} phút`);
      const info = await thongTinTaiKhoan();
      console.log(`tài khoản   : ${info.creator_nickname} (@${info.creator_username})`);
      console.log(`riêng tư    : ${(info.privacy_level_options || []).join(', ')}`);
      console.log(`dài tối đa  : ${info.max_video_post_duration_sec}s`);
    } else if (lenh === 'kho') {
      const ds = khoVideo();
      console.log(`${ds.length} video trong kho:`);
      const dem = {};
      for (const v of ds) dem[v.chuDe] = (dem[v.chuDe] || 0) + 1;
      for (const [k, n] of Object.entries(dem)) console.log(`  ${String(n).padStart(4)}  ${k}`);
    } else if (lenh === 'trangthai' || lenh === 'status') {
      const id = process.argv[3];
      if (!id) return console.log('Dùng: node scripts/tiktok-manager.mjs trangthai <publish_id>');
      console.log(JSON.stringify(await traTrangThai(id), null, 2));
    } else if (lenh === 'ngat') {
      xoaToken();
      console.log('Đã ngắt kết nối, xoá token khỏi máy.');
    } else {
      console.log(`
Công cụ TikTok cho pH-Chem

  node scripts/tiktok-manager.mjs noi         lấy đường dẫn nối tài khoản
  node scripts/tiktok-manager.mjs ai          xem đang nối vào tài khoản nào
  node scripts/tiktok-manager.mjs kho         đếm video trong kho
  node scripts/tiktok-manager.mjs trangthai <publish_id>
  node scripts/tiktok-manager.mjs ngat        xoá token khỏi máy

Muốn đăng bài thì mở bảng điều khiển:  npm run tiktok:bang
`);
    }
  };
  chay().catch((e) => {
    console.error('Lỗi:', e.message);
    process.exit(1);
  });
}
