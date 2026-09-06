import path from 'node:path';
import fs from 'node:fs';
import { postVideo } from './fanpage-manager.mjs';
import { ELEMENT_REELS } from './element-reels-data.mjs';

const REELS_DIR = path.resolve('promo/reels');
const HISTORY_FILE = path.resolve('promo/scheduled_element_reels.json');

// Tự động nạp .env.local vào process.env
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const k = trimmed.slice(0, eqIdx).trim();
      const v = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

function loadScheduledHistory() {
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveScheduledHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
}

// 🗓️ THUẬT TOÁN TÍNH TOÁN LỊCH PHÁT HÀNH TỰ ĐỘNG CHO TOÀN BỘ 60 TẬP
// Khởi động từ Thứ Hai 07/09/2026, chỉ đăng Thứ Hai đến Thứ Sáu (trừ T7 & CN)
// Mỗi ngày 2 clip: Ca sáng 07:30:00+07:00 | Ca chiều 17:30:00+07:00 (Tránh giờ cũ 11:45 & 19:45)
function generateElementSchedule() {
  const schedule = [];
  const curDate = new Date('2026-09-07T00:00:00+07:00');
  let timeSlot = 0; // 0: 07:30, 1: 17:30

  for (const el of ELEMENT_REELS) {
    while (curDate.getDay() === 0 || curDate.getDay() === 6) {
      curDate.setDate(curDate.getDate() + 1);
    }
    const y = curDate.getFullYear();
    const mo = String(curDate.getMonth() + 1).padStart(2, '0');
    const d = String(curDate.getDate()).padStart(2, '0');
    const timeStr = timeSlot === 0 ? '07:30:00' : '17:30:00';
    const scheduleIso = `${y}-${mo}-${d}T${timeStr}+07:00`;

    const cleanApps = el.apps.map(a => (a.startsWith('•') || /^[^\w\s]/.test(a) ? a : '• ' + a)).join('\n');
    const cleanPowerDesc = el.powerDesc.map(p => (p.startsWith('•') ? p : '• ' + p)).join('\n');

    const caption = `HỒ SƠ NGUYÊN TỐ #${String(el.id).padStart(2, '0')}: ${el.vi.toUpperCase()} (${el.en.toUpperCase()}) - ${el.subQuote} ⚛️🔥

Ký hiệu: ${el.sym} | Số hiệu: ${el.z} | Khối lượng: ${el.mass}
Cấu hình e: ${el.config} | Nhóm: ${el.groupPeriod}

👑 Danh hiệu: "${el.nickname}"
${el.statsHighlight}

💡 ${el.powerTitle}:
${cleanPowerDesc}

👉 Phương trình phản ứng tiêu biểu:
${el.reaction}

🛡️ Ứng dụng thực tế:
${cleanApps}

📱 Tra cứu cấu hình electron và 118 nguyên tố tại Bảng tuần hoàn 3D:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#HoSoNguyenTo #${el.vi.replace(/\s+/g, '')} #${el.en.replace(/\s+/g, '')} #pHChem #BangTuanHoan #HoaHoc #KienThucHoaHoc #HocHoaOnline`;

    schedule.push({
      id: el.id,
      title: el.title,
      videoFile: el.videoFileName,
      scheduleIso,
      caption
    });

    if (timeSlot === 0) {
      timeSlot = 1;
    } else {
      timeSlot = 0;
      curDate.setDate(curDate.getDate() + 1);
    }
  }

  return schedule;
}

export const ELEMENT_SCHEDULE = generateElementSchedule();

// 🚀 HÀM UPLOAD THỰC SỰ LÊN REELS HOẶC VIDEO ENDPOINT
async function scheduleSingleElementReel(item) {
  const vPath = path.join(REELS_DIR, item.videoFile);
  if (!fs.existsSync(vPath)) {
    console.error(`❌ Không tìm thấy video: ${vPath}`);
    return;
  }

  const history = loadScheduledHistory();
  if (history[item.id]) {
    console.log(`⏩ Hồ sơ nguyên tố #${item.id} (${item.videoFile}) đã được lập lịch trước đó (ID: ${history[item.id].reel_id || history[item.id].id}). Bỏ qua.`);
    return history[item.id];
  }

  console.log(`\n==================================================`);
  console.log(`📤 Đang lập lịch Reels: ${item.title}`);
  console.log(`⏰ Thời gian đăng: ${item.scheduleIso}`);
  console.log(`📁 File video: ${vPath} (${(fs.statSync(vPath).size / 1024 / 1024).toFixed(2)} MB)`);

  const _pageId = process.env.FB_PAGE_ID || '1061803713678508';
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Chưa cấu hình FB_PAGE_ACCESS_TOKEN trong .env.local');
  }

  const scheduledTimestamp = Math.floor(new Date(item.scheduleIso).getTime() / 1000);

  let res = null;
  let retries = 4;
  while (retries > 0) {
    try {
      res = await postVideo({
        title: item.title,
        description: item.caption,
        videoPath: vPath,
        scheduledPublishTime: scheduledTimestamp
      });
      console.log(`🎉 LẬP LỊCH REELS QUA FANPAGE THÀNH CÔNG! ID: ${res.id}`);
      break;
    } catch (err) {
      retries--;
      console.warn(`⚠️ Lỗi upload Facebook (${err.message}). Chờ 6000ms... (còn ${retries} lần thử lại)`);
      if (retries === 0) throw err;
      await new Promise(r => setTimeout(r, 6000));
    }
  }

  history[item.id] = {
    id: item.id,
    title: item.title,
    videoFile: item.videoFile,
    reel_id: res.id,
    scheduleIso: item.scheduleIso,
    scheduledAt: new Date().toISOString()
  };
  saveScheduledHistory(history);

  return res;
}

export async function scheduleRangeElementReels(startId, endId, label) {
  console.log(`\n🚀 BẮT ĐẦU LẬP LỊCH HỒ SƠ NGUYÊN TỐ [${label}] (TẬP #${startId} - #${endId})...`);
  const targets = ELEMENT_SCHEDULE.filter(item => item.id >= startId && item.id <= endId);
  for (const item of targets) {
    await scheduleSingleElementReel(item);
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log(`\n🎉 HOÀN TẤT LẬP LỊCH [${label}] THÀNH CÔNG!`);
}

export async function schedulePhase1ElementReels() {
  return scheduleRangeElementReels(1, 10, 'PHASE 1 (07/09 - 11/09)');
}

export async function schedulePhase2ElementReels() {
  return scheduleRangeElementReels(11, 30, 'PHASE 2 (14/09 - 25/09)');
}

export async function schedulePhase3ElementReels() {
  return scheduleRangeElementReels(31, 40, 'PHASE 3 (28/09 - 02/10)');
}

export async function schedulePhase4ElementReels() {
  return scheduleRangeElementReels(41, 50, 'PHASE 4 (05/10 - 09/10)');
}

export async function schedulePhase5ElementReels() {
  return scheduleRangeElementReels(51, 60, 'PHASE 5 (12/10 - 16/10)');
}

export async function scheduleNewElementReels() {
  return scheduleRangeElementReels(31, 60, '30 NGUYÊN TỐ MỚI (28/09 - 16/10)');
}

if (process.argv[1]?.endsWith('schedule-element-reels.mjs')) {
  const targetId = process.argv[2];
  if (targetId === 'phase1') {
    schedulePhase1ElementReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (targetId === 'phase2') {
    schedulePhase2ElementReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (targetId === 'phase3') {
    schedulePhase3ElementReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (targetId === 'phase4') {
    schedulePhase4ElementReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (targetId === 'phase5') {
    schedulePhase5ElementReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (targetId === 'new') {
    scheduleNewElementReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (targetId === 'all') {
    scheduleRangeElementReels(1, 60, 'TOÀN BỘ 60 NGUYÊN TỐ').catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (targetId) {
    const item = ELEMENT_SCHEDULE.find(r => String(r.id) === targetId);
    if (!item) {
      console.error(`❌ Không tìm thấy hồ sơ nguyên tố với ID: ${targetId}`);
      process.exit(1);
    }
    scheduleSingleElementReel(item).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else {
    schedulePhase1ElementReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  }
}
