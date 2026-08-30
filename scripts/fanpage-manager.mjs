import fs from 'node:fs';
import path from 'node:path';
import { getSampleFact, buildFactPost, buildIntroPost } from './fanpage-content.mjs';

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('Không tìm thấy file .env.local');
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

const env = loadEnv();
const PAGE_ID = env.FB_PAGE_ID || '1409676485553930';
const ACCESS_TOKEN = env.FB_PAGE_ACCESS_TOKEN;

const GRAPH_API = 'https://graph.facebook.com/v26.0';

/**
 * Kiểm tra kết nối Fanpage
 */
export async function testConnection() {
  const url = `${GRAPH_API}/${PAGE_ID}?fields=id,name,category,link,followers_count,fan_count&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) {
    throw new Error(`Lỗi Facebook API: ${data.error.message} (code ${data.error.code})`);
  }
  return data;
}

/**
 * Đăng bài viết lên Fanpage
 */
export async function postMessage({ message, link, published = true, scheduledPublishTime }) {
  const url = `${GRAPH_API}/${PAGE_ID}/feed`;
  const body = new URLSearchParams();
  body.append('access_token', ACCESS_TOKEN);
  body.append('message', message);
  if (link) body.append('link', link);
  body.append('published', String(published));
  if (scheduledPublishTime) {
    body.append('scheduled_publish_time', String(scheduledPublishTime));
  }

  const res = await fetch(url, {
    method: 'POST',
    body,
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`Lỗi đăng bài: ${data.error.message} (code ${data.error.code})`);
  }
  return data;
}

/**
 * Đăng bài viết kèm ảnh (PNG/JPG)
 */
export async function postPhoto({ caption, filePath, url: photoUrl, published = true }) {
  const url = `${GRAPH_API}/${PAGE_ID}/photos`;
  const formData = new FormData();
  formData.append('access_token', ACCESS_TOKEN);
  if (caption) formData.append('caption', caption);
  formData.append('published', String(published));

  if (filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: 'image/png' });
    formData.append('source', blob, path.basename(filePath));
  } else if (photoUrl) {
    formData.append('url', photoUrl);
  } else {
    throw new Error('Cần cung cấp filePath hoặc url của ảnh.');
  }

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`Lỗi đăng ảnh: ${data.error.message} (code ${data.error.code})`);
  }
  return data;
}

/**
 * Lấy danh sách bài viết gần đây
 */
export async function getRecentPosts(limit = 5) {
  const url = `${GRAPH_API}/${PAGE_ID}/posts?fields=id,message,created_time,shares,comments.summary(true),reactions.summary(true)&limit=${limit}&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) {
    throw new Error(`Lỗi lấy bài viết: ${data.error.message}`);
  }
  return data;
}

// Xử lý chạy trực tiếp từ CLI
if (process.argv[1]?.endsWith('fanpage-manager.mjs')) {
  const cmd = process.argv[2] || 'test';

  if (cmd === 'test') {
    console.log('🔄 Đang kiểm tra kết nối tới Fanpage...');
    testConnection()
      .then((info) => {
        console.log('✅ KẾT NỐI THÀNH CÔNG VỚI FANPAGE!');
        console.log(`- Tên Trang: ${info.name}`);
        console.log(`- ID Trang:  ${info.id}`);
        console.log(`- Link:      ${info.link || `https://facebook.com/${info.id}`}`);
      })
      .catch((err) => {
        console.error('❌ KẾT NỐI THẤT BẠI:', err.message);
        process.exit(1);
      });
  } else if (cmd === 'fact') {
    console.log('📖 Đang lấy 1 sự thật ngẫu nhiên từ kho dữ liệu pH-Chem...');
    const message = buildFactPost();
    const link = 'https://ph-chem.web.app/facts';
    postMessage({ message, link })
      .then((res) => {
        console.log('✅ ĐÃ ĐĂNG BÀI FACT THÀNH CÔNG!');
        console.log(`🔗 Link: https://facebook.com/${res.id}`);
      })
      .catch((err) => {
        console.error('❌ Lỗi:', err.message);
        process.exit(1);
      });
  } else if (cmd === 'recent') {
    console.log('📋 Đang lấy các bài viết gần nhất...');
    getRecentPosts()
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch((err) => {
        console.error('❌ Lỗi:', err.message);
        process.exit(1);
      });
  }
}
