/**
 * tiktok-bang.mjs — bảng điều khiển đăng video TikTok, chạy tại máy.
 *
 * Không mở ra internet: chỉ nghe ở 127.0.0.1. Người vận hành là chủ tài khoản
 * TikTok của pH-Chem, tự chọn video, tự viết chú thích, tự chọn chế độ hiển thị,
 * rồi bấm đăng. Không có gì tự động đăng.
 *
 * Chạy:  npm run tiktok:bang
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONG, CLIENT_KEY, REDIRECT_URI, SCOPE,
  urlDangNhap, doiMaLayToken, timPkce, docToken, xoaToken,
  thongTinTaiKhoan, khoVideo, timVideo,
  khoiTaoDangVideo, dayFileLen, traTrangThai,
} from './tiktok-manager.mjs';

const THU_MUC = path.dirname(fileURLToPath(import.meta.url));
const TRANG = path.join(THU_MUC, 'tiktok-bang.html');

function json(res, ma, data) {
  const body = JSON.stringify(data);
  res.writeHead(ma, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

function docBody(req) {
  return new Promise((ok, loi) => {
    let s = '';
    req.on('data', (c) => { s += c; if (s.length > 1e6) req.destroy(); });
    req.on('end', () => { try { ok(s ? JSON.parse(s) : {}); } catch (e) { loi(e); } });
  });
}

const may = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://127.0.0.1:${CONG}`);
  const p = u.pathname;

  try {
    // ── Trang bảng điều khiển ───────────────────────────────
    if (p === '/' || p === '/index.html') {
      const html = fs.readFileSync(TRANG, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    }

    // ── TikTok trả mã về đây (qua trang trung gian trên ph-chem.web.app) ──
    if (p === '/tiktok/callback') {
      const code = u.searchParams.get('code');
      const state = u.searchParams.get('state');
      const err = u.searchParams.get('error');
      if (err) {
        res.writeHead(302, { Location: `/?loi=${encodeURIComponent(err)}` });
        return res.end();
      }
      if (!code) {
        res.writeHead(302, { Location: '/?loi=thieu_ma' });
        return res.end();
      }
      // State phải khớp một phiên còn hạn — đây là chốt chống giả mạo yêu cầu.
      // Không khớp thì mã code_verifier cũng sai, đổi mã cũng hỏng, nên báo thẳng.
      if (!timPkce(state)) {
        res.writeHead(302, { Location: '/?loi=phien_het_han' });
        return res.end();
      }
      await doiMaLayToken(code, state);
      res.writeHead(302, { Location: '/?noi=ok' });
      return res.end();
    }

    // ── Đang nối vào tài khoản nào ──────────────────────────
    if (p === '/api/trangthai') {
      if (!CLIENT_KEY) {
        return json(res, 200, { daNoi: false, thieuKhoa: true });
      }
      if (!docToken()) return json(res, 200, { daNoi: false });
      try {
        const tk = await thongTinTaiKhoan();
        return json(res, 200, { daNoi: true, taiKhoan: tk, quyen: docToken().scope });
      } catch (e) {
        return json(res, 200, { daNoi: false, loi: e.message });
      }
    }

    if (p === '/api/url-dangnhap') {
      return json(res, 200, { url: urlDangNhap(), redirect: REDIRECT_URI, scope: SCOPE });
    }

    if (p === '/api/ngat' && req.method === 'POST') {
      xoaToken();
      return json(res, 200, { ok: true });
    }

    // ── Kho video của mình ──────────────────────────────────
    if (p === '/api/kho') {
      return json(res, 200, khoVideo().map(({ tep, ...v }) => v));
    }

    if (p === '/api/video') {
      const v = timVideo(u.searchParams.get('id'));
      const co = fs.statSync(v.tep).size;
      const range = req.headers.range;
      // Có Range thì trả từng khúc, để tua được thanh thời gian khi xem lại.
      if (range) {
        const m = /bytes=(\d*)-(\d*)/.exec(range);
        const dau = m[1] ? Number(m[1]) : 0;
        const cuoi = m[2] ? Number(m[2]) : co - 1;
        res.writeHead(206, {
          'Content-Type': 'video/mp4',
          'Content-Range': `bytes ${dau}-${cuoi}/${co}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': cuoi - dau + 1,
        });
        return fs.createReadStream(v.tep, { start: dau, end: cuoi }).pipe(res);
      }
      res.writeHead(200, { 'Content-Type': 'video/mp4', 'Content-Length': co, 'Accept-Ranges': 'bytes' });
      return fs.createReadStream(v.tep).pipe(res);
    }

    // ── Đăng ────────────────────────────────────────────────
    if (p === '/api/dang' && req.method === 'POST') {
      const b = await docBody(req);
      const v = timVideo(b.id);

      // Chốt chặn cuối: không cho đăng nếu người vận hành chưa chọn chế độ hiển thị.
      if (!b.riengTu) return json(res, 400, { loi: 'Chưa chọn chế độ hiển thị.' });
      if (b.coCongBo && !b.thuongHieuMinh && !b.thuongHieuThue) {
        return json(res, 400, { loi: 'Đã bật công bố nội dung thì phải chọn ít nhất một loại.' });
      }

      const kt = await khoiTaoDangVideo({
        tep: v.tep,
        tieuDe: b.tieuDe || '',
        riengTu: b.riengTu,
        khoaBinhLuan: b.khoaBinhLuan,
        khoaDuet: b.khoaDuet,
        khoaStitch: b.khoaStitch,
        thuongHieuMinh: b.coCongBo && b.thuongHieuMinh,
        thuongHieuThue: b.coCongBo && b.thuongHieuThue,
        mocAnhBia: b.mocAnhBia,
      });
      await dayFileLen(kt.upload_url, v.tep, kt.kichThuoc);
      return json(res, 200, { publish_id: kt.publish_id, ten: v.ten });
    }

    if (p === '/api/tinhtrang') {
      const id = u.searchParams.get('publish_id');
      return json(res, 200, await traTrangThai(id));
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Không có trang này');
  } catch (e) {
    json(res, 500, { loi: e.message });
  }
});

may.listen(CONG, '127.0.0.1', () => {
  console.log(`
  Bảng điều khiển TikTok của pH-Chem đang chạy.

    Mở trình duyệt vào:  http://localhost:${CONG}

  Đường dẫn quay về đã khai với TikTok:
    ${REDIRECT_URI}
  Quyền xin:
    ${SCOPE}
${CLIENT_KEY ? '' : '\n  ⚠ Chưa có TIKTOK_CLIENT_KEY trong .env.local — chưa nối được tài khoản.\n'}
  Bấm Ctrl+C để dừng.
`);
});
