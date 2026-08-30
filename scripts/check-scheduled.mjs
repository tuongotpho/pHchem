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

async function checkScheduledPosts() {
  const url = `https://graph.facebook.com/v26.0/${PAGE_ID}/scheduled_posts?fields=id,message,scheduled_publish_time,is_published&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log('--- DANH SÁCH BÀI VIẾT ĐÃ LÊN LỊCH TRÊN FACEBOOK ---');
  console.log(JSON.stringify(data, null, 2));

  if (data.data) {
    data.data.forEach((p, idx) => {
      const date = new Date(p.scheduled_publish_time * 1000);
      console.log(`\n📌 [Bài ${idx + 1}] ID: ${p.id}`);
      console.log(`⏰ Thời gian đăng: ${date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
      console.log(`📝 Đoạn đầu: ${p.message.slice(0, 80)}...`);
    });
  }
}

checkScheduledPosts().catch(console.error);
