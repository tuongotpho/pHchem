import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Tìm file khóa Service Account trong thư mục gốc
function findKeyFile() {
  const files = fs.readdirSync(rootDir);
  const keyFile = files.find(f => f.startsWith('ph-chemistry-') && f.endsWith('.json'));
  if (keyFile) {
    return path.join(rootDir, keyFile);
  }
  const defaultPath = path.join(rootDir, 'ph-chemistry-5f87a7b07a48.json');
  if (fs.existsSync(defaultPath)) return defaultPath;
  throw new Error('Không tìm thấy file Service Account key (*.json) trong thư mục gốc.');
}

// Tạo Google OAuth2 Access Token từ Service Account Key (chuẩn JWT RSA-SHA256)
async function getAccessToken(keyPath, scopes) {
  const keyData = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const payload = {
    iss: keyData.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp,
    iat
  };

  const base64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsignedToken = `${base64Url(header)}.${base64Url(payload)}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(keyData.private_key, 'base64url');
  const jwt = `${unsignedToken}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Lỗi cấp token Google: ${data.error_description || JSON.stringify(data)}`);
  }
  return { token: data.access_token, email: keyData.client_email, keyData };
}

export async function tryEnableApis() {
  const keyPath = findKeyFile();
  const { token, keyData } = await getAccessToken(keyPath, [
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/service.management'
  ]);
  const projectId = keyData.project_id || 'ph-chemistry';
  for (const api of ['searchconsole.googleapis.com', 'indexing.googleapis.com']) {
    console.log(`📡 Đang thử kích hoạt API ${api}...`);
    const res = await fetch(`https://serviceusage.googleapis.com/v1/projects/${projectId}/services/${api}:enable`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const result = await res.json();
    console.log(`Kết quả ${api}:`, res.status, result);
  }
}

// 1. Danh sách các trang web đã kết nối
export async function listSites() {
  const keyPath = findKeyFile();
  const { token, email } = await getAccessToken(keyPath, [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]);

  console.log(`🔑 Đăng nhập thành công Service Account: ${email}`);
  console.log('📡 Đang truy vấn danh sách tài sản Google Search Console...\n');

  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Lỗi GSC API: ${data.error?.message || JSON.stringify(data)}`);
  }

  return { email, sites: data.siteEntry || [] };
}

// 2. Thêm trang web vào GSC của bot nếu chưa có
export async function addSite(siteUrl) {
  const keyPath = findKeyFile();
  const { token } = await getAccessToken(keyPath, [
    'https://www.googleapis.com/auth/webmasters'
  ]);

  console.log(`➕ Đang thêm trang web vào GSC: ${siteUrl}...`);
  const encodedUrl = encodeURIComponent(siteUrl);
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodedUrl}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 204 || res.ok) {
    console.log(`✅ Đã thêm/kết nối thành công tài sản: ${siteUrl}`);
    return true;
  }
  const data = await res.json().catch(() => ({}));
  throw new Error(`Lỗi thêm site: ${data.error?.message || res.statusText}`);
}

// 3. Kiểm tra trạng thái index của URL (URL Inspection API)
export async function inspectUrl(siteUrl, inspectionUrl) {
  const keyPath = findKeyFile();
  const { token } = await getAccessToken(keyPath, [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]);

  console.log(`🔍 Đang kiểm tra URL: ${inspectionUrl}...`);
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      siteUrl,
      inspectionUrl,
      languageCode: 'vi'
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Lỗi Inspect URL: ${data.error?.message || JSON.stringify(data)}`);
  }
  return data.inspectionResult;
}

// 4. Lấy dữ liệu tìm kiếm (Clicks, Impressions, CTR, Position)
export async function getSearchAnalytics(siteUrl, days = 28) {
  const keyPath = findKeyFile();
  const { token } = await getAccessToken(keyPath, [
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]);

  const endDate = new Date().toISOString().slice(0, 10);
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - days);
  const startDate = startDateObj.toISOString().slice(0, 10);

  const encodedUrl = encodeURIComponent(siteUrl);
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodedUrl}/searchAnalytics/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 20
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Lỗi Search Analytics: ${data.error?.message || JSON.stringify(data)}`);
  }
  return data;
}

// 5. Yêu cầu Google Index trang web (Google Indexing API)
export async function requestIndexing(url, type = 'URL_UPDATED') {
  const keyPath = findKeyFile();
  const { token } = await getAccessToken(keyPath, [
    'https://www.googleapis.com/auth/indexing'
  ]);

  console.log(`🚀 Đang gửi yêu cầu Google Indexing API (${type}): ${url}...`);
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url,
      type
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Lỗi Indexing API: ${data.error?.message || JSON.stringify(data)}`);
  }
  return data;
}

// Chạy trực tiếp từ dòng lệnh
async function main() {
  const cmd = process.argv[2] || 'list';
  const targetSite = process.argv[3] || 'https://ph-chem.web.app/';

  try {
    if (cmd === 'enable') {
      await tryEnableApis();
    } else if (cmd === 'list') {
      const { sites } = await listSites();
      if (sites.length === 0) {
        console.log('⚠️  Chưa có tài sản nào được kết nối trong tài khoản bot này.');
        console.log(`👉 Bạn có thể chạy lệnh: node scripts/gsc-manager.mjs add ${targetSite}`);
      } else {
        console.log(`📋 Danh sách ${sites.length} tài sản trong GSC:`);
        sites.forEach((s, idx) => {
          console.log(`  ${idx + 1}. URL: ${s.siteUrl} | Quyền: ${s.permissionLevel}`);
        });
      }
    } else if (cmd === 'add') {
      await addSite(targetSite);
      const { sites } = await listSites();
      console.log('📋 Danh sách hiện tại:', sites);
    } else if (cmd === 'inspect') {
      const urlToInspect = process.argv[4] || targetSite;
      const result = await inspectUrl(targetSite, urlToInspect);
      console.log('🔍 Kết quả kiểm tra URL:');
      console.log(JSON.stringify(result, null, 2));
    } else if (cmd === 'analytics') {
      const analytics = await getSearchAnalytics(targetSite);
      console.log('📊 Thống kê tìm kiếm (Search Analytics):');
      console.log(JSON.stringify(analytics, null, 2));
    } else if (cmd === 'index') {
      const urlToIndex = process.argv[3] || targetSite;
      const res = await requestIndexing(urlToIndex);
      console.log('✅ Kết quả Google Indexing API:', res);
    } else {
      console.log('Cách dùng:');
      console.log('  node scripts/gsc-manager.mjs list');
      console.log('  node scripts/gsc-manager.mjs add <siteUrl>');
      console.log('  node scripts/gsc-manager.mjs inspect <siteUrl> <urlToInspect>');
      console.log('  node scripts/gsc-manager.mjs analytics <siteUrl>');
      console.log('  node scripts/gsc-manager.mjs index <url>');
    }
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('gsc-manager.mjs')) {
  main();
}
