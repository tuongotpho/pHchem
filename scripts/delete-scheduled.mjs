import fs from 'node:fs';
import path from 'node:path';

function loadEnv() {
  const content = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
    }
  }
  return env;
}

const env = loadEnv();
const PAGE_ID = env.FB_PAGE_ID;
const ACCESS_TOKEN = env.FB_PAGE_ACCESS_TOKEN;

async function deleteAllScheduled() {
  console.log('🔄 Đang lấy danh sách các bài viết đã lên lịch...');
  const listUrl = `https://graph.facebook.com/v26.0/${PAGE_ID}/scheduled_posts?fields=id,message&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(listUrl);
  const data = await res.json();

  if (!data.data || data.data.length === 0) {
    console.log('ℹ️ Hiện không có bài viết nào đang lên lịch.');
    return;
  }

  console.log(`📋 Tìm thấy ${data.data.length} bài viết đã lên lịch. Bắt đầu xóa...\n`);

  for (const post of data.data) {
    const delUrl = `https://graph.facebook.com/v26.0/${post.id}?access_token=${ACCESS_TOKEN}`;
    const delRes = await fetch(delUrl, { method: 'DELETE' });
    const delData = await delRes.json();
    if (delData.success) {
      console.log(`✅ Đã xóa thành công bài viết ID: ${post.id}`);
    } else {
      console.error(`❌ Xóa thất bại bài ID: ${post.id}`, delData);
    }
  }

  console.log('\n🎉 ĐÃ DỌN SẠCH TẤT CẢ BÀI VIẾT ĐÃ LÊN LỊCH CŨ TRÊN FACEBOOK!');
}

deleteAllScheduled().catch(console.error);
