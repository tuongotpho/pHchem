import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { ELEMENT_REELS } from './element-reels-data.mjs';

const WIDTH = 720;
const HEIGHT = 1280;
const ROOT_DIR = path.resolve('.');
const PROMO_DIR = path.join(ROOT_DIR, 'promo');
const REELS_DIR = path.join(PROMO_DIR, 'reels');

if (!fs.existsSync(REELS_DIR)) fs.mkdirSync(REELS_DIR, { recursive: true });

function getFfmpegPath() {
  try {
    const pythonOut = execSync('python -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"').toString().trim();
    if (fs.existsSync(pythonOut)) return pythonOut;
  } catch {
    // fallback
  }
  const defaultPath = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';
  if (fs.existsSync(defaultPath)) return defaultPath;
  throw new Error('Không tìm thấy FFmpeg!');
}

export function cleanTextForTts(text) {
  return text
    .replace(/(?:website\s+)?ph-chem\.web\.app\/table/gi, 'website p h chem chấm web chấm áp xuyệt tây bồ')
    .replace(/(?:website\s+)?ph-chem\.web\.app(\/[a-z0-9_-]+)?/gi, (_match, route) => {
      const routeClean = route ? route.replace('/', ' xuyệt ') : '';
      return 'website p h chem chấm web chấm áp' + routeClean;
    })
    .replace(/\.app\b/gi, ' chấm áp')
    .replace(/\bapp\b/gi, 'áp')
    .replace(/—/g, ', ')
    .replace(/–/g, ', ')
    .replace(/Tesla/gi, 'Tét la')
    .replace(/smartphone/gi, 'xì mát phôn')
    .replace(/Graphene/gi, 'Gờ ra phen')
    .replace(/Titanium/gi, 'Ti ta ni um')
    .replace(/Osmium/gi, 'Ốt mi um')
    .replace(/Tungsten/gi, 'Tung sten')
    .replace(/Caesium/gi, 'Xê di um')
    .replace(/Gallium/gi, 'Ga li um')
    .replace(/Fluorine/gi, 'Phờ lo rin')
    .replace(/Hydrargyrum/gi, 'Hy đờ ra gi rum')
    .replace(/Aurum/gi, 'Au rum')
    .replace(/Lithium/gi, 'Li thi um')
    .replace(/Carbon/gi, 'Cac bon')
    .replace(/Oxygen/gi, 'O xy ghen')
    .replace(/Hydrogen/gi, 'Hy đờ rô ghen')
    .replace(/Ferrum/gi, 'Phe rum')
    .replace(/Cuprum/gi, 'Cu pờ rum')
    .replace(/Aluminium/gi, 'A lu mi ni um')
    .replace(/Argentum/gi, 'Ac ghen tum')
    .replace(/Silicon/gi, 'Si li con')
    .replace(/Chlorine/gi, 'Cờ lo rin')
    .replace(/Nitrogen/gi, 'Ni trô ghen')
    .replace(/Sodium/gi, 'Sô đi um')
    .replace(/Helium/gi, 'Hê li um')
    .replace(/Phosphorus/gi, 'Phốt pho rút')
    .replace(/Sulfur/gi, 'Sun phua')
    .replace(/Calcium/gi, 'Can xi um')
    .replace(/Magnesium/gi, 'Mác nê di um')
    .replace(/Bromine/gi, 'Bờ rô min')
    .replace(/Iodine/gi, 'Ai ô đin')
    .replace(/Plumbum/gi, 'Pờ lum bum')
    .replace(/Platinum/gi, 'Pờ la ti num')
    .replace(/Uranium/gi, 'U ra ni um')
    .replace(/Bitmut/gi, 'Bít mút')
    .replace(/Bismuth/gi, 'Bít mớt')
    .replace(/Stronti/gi, 'Xờ trôn ti')
    .replace(/Strontium/gi, 'Xờ trôn ti um')
    .replace(/Rubidi/gi, 'Ru bi đi')
    .replace(/Rubidium/gi, 'Ru bi đi um')
    .replace(/Radon/gi, 'Ra đông')
    .replace(/Plutoni/gi, 'Pơ lu tô ni')
    .replace(/Plutonium/gi, 'Pơ lu tô ni um')
    .replace(/Franxi/gi, 'Phơ ran xi')
    .replace(/Francium/gi, 'Phơ ran xi um')
    .replace(/Neodym/gi, 'Nê ô đim')
    .replace(/Neodymium/gi, 'Nê ô đim')
    .replace(/Antimon/gi, 'An ti mon')
    .replace(/Antimony/gi, 'An ti mô ni')
    .replace(/Selen/gi, 'Xê len')
    .replace(/Selenium/gi, 'Xê lê ni um')
    .replace(/Gemani/gi, 'Giơ ma ni')
    .replace(/Germanium/gi, 'Giơ ma ni um')
    .replace(/Kripton/gi, 'Cờ ríp tôn')
    .replace(/Krypton/gi, 'Cờ ríp tôn')
    .replace(/Xenon/gi, 'Xê non')
    .replace(/Tecneti/gi, 'Tếch nê ti')
    .replace(/Technetium/gi, 'Tếch nê ti um')
    .replace(/Radi\b/gi, 'Ra đi')
    .replace(/Radium/gi, 'Ra đi um')
    .replace(/Oganesson/gi, 'Ô ga nét xon')
    .replace(/Teflon/gi, 'Tép lông')
    .replace(/James Webb/gi, 'Giêm Oép')
    .replace(/Mohs/gi, 'Mốt')
    .replace(/3422°C/g, 'ba ngàn bốn trăm hai mươi hai độ C')
    .replace(/3033°C/g, 'ba ngàn không trăm ba mươi ba độ C')
    .replace(/29\.76°C/g, 'hai mươi chín phẩy bảy mươi sáu độ C')
    .replace(/28\.5°C/g, 'hai mươi tám phẩy năm độ C')
    .replace(/1668°C/g, 'một ngàn sáu trăm sáu mươi tám độ C')
    .replace(/1538°C/g, 'một ngàn năm trăm ba mươi tám độ C')
    .replace(/1084\.6°C/g, 'một ngàn không trăm tám mươi tư phẩy sáu độ C')
    .replace(/1064°C/g, 'một ngàn không trăm sáu mươi tư độ C')
    .replace(/961\.8°C/g, 'chín trăm sáu mươi mốt phẩy tám độ C')
    .replace(/1414°C/g, 'một ngàn bốn trăm mười bốn độ C')
    .replace(/1135°C/g, 'một ngàn một trăm ba mươi lăm độ C')
    .replace(/1768°C/g, 'một ngàn bảy trăm sáu mươi tám độ C')
    .replace(/660\.3°C/g, 'sáu trăm sáu mươi phẩy ba độ C')
    .replace(/842°C/g, 'tám trăm bốn mươi hai độ C')
    .replace(/650°C/g, 'sáu trăm năm mươi độ C')
    .replace(/327\.5°C/g, 'ba trăm hai mươi bảy phẩy năm độ C')
    .replace(/180\.5°C/g, 'một trăm tám mươi phẩy năm độ C')
    .replace(/115\.2°C/g, 'một trăm mười lăm phẩy hai độ C')
    .replace(/97\.8°C/g, 'chín mươi bảy phẩy tám độ C')
    .replace(/44\.2°C/g, 'bốn mươi tư phẩy hai độ C')
    .replace(/3550°C/g, 'ba ngàn năm trăm năm mươi độ C')
    .replace(/6000°C/g, 'sáu ngàn độ C')
    .replace(/5930°C/g, 'năm ngàn chín trăm ba mươi độ C')
    .replace(/5012°C/g, 'năm ngàn không trăm mười hai độ C')
    .replace(/4027°C/g, 'bốn ngàn không trăm hai mươi bảy độ C')
    .replace(/3287°C/g, 'ba ngàn hai trăm tám mươi bảy độ C')
    .replace(/3265°C/g, 'ba ngàn hai trăm sáu mươi lăm độ C')
    .replace(/2862°C/g, 'hai ngàn tám trăm sáu mươi hai độ C')
    .replace(/2562°C/g, 'hai ngàn năm trăm sáu mươi hai độ C')
    .replace(/2519°C/g, 'hai ngàn năm trăm mười chín độ C')
    .replace(/2400°C/g, 'hai ngàn bốn trăm độ C')
    .replace(/2162°C/g, 'hai ngàn một trăm sáu mươi hai độ C')
    .replace(/1484°C/g, 'một ngàn bốn trăm tám mươi tư độ C')
    .replace(/1342°C/g, 'một ngàn ba trăm bốn mươi hai độ C')
    .replace(/1090°C/g, 'một ngàn không trăm chín mươi độ C')
    .replace(/883°C/g, 'tám trăm tám mươi ba độ C')
    .replace(/671°C/g, 'sáu trăm bảy mươi mốt độ C')
    .replace(/444\.6°C/g, 'bốn trăm bốn mươi tư phẩy sáu độ C')
    .replace(/356\.7°C/g, 'ba trăm năm mươi sáu phẩy bảy độ C')
    .replace(/58\.8°C/g, 'năm mươi tám phẩy tám độ C')
    .replace(/184°C/g, 'một trăm tám mươi tư độ C')
    .replace(/37°C/g, 'ba mươi bảy độ C')
    .replace(/30°C/g, 'ba mươi độ C')
    .replace(/25°C/g, 'hai mươi lăm độ C')
    .replace(/-116°C/g, 'âm một trăm mười sáu độ C')
    .replace(/-219\.7°C/g, 'âm hai trăm mười chín phẩy bảy độ C')
    .replace(/-188\.1°C/g, 'âm một trăm tám mươi tám phẩy một độ C')
    .replace(/-218\.8°C/g, 'âm hai trăm mười tám phẩy tám độ C')
    .replace(/-183°C/g, 'âm một trăm tám mươi ba độ C')
    .replace(/-259\.2°C/g, 'âm hai trăm năm mươi chín phẩy hai độ C')
    .replace(/-252\.9°C/g, 'âm hai trăm năm mươi hai phẩy chín độ C')
    .replace(/-268\.9°C/g, 'âm hai trăm sáu mươi tám phẩy chín độ C')
    .replace(/-210°C/g, 'âm hai trăm mười độ C')
    .replace(/-195\.8°C/g, 'âm một trăm chín mươi lăm phẩy tám độ C')
    .replace(/-101\.5°C/g, 'âm một trăm không một phẩy năm độ C')
    .replace(/-34°C/g, 'âm ba mươi tư độ C')
    .replace(/-7\.2°C/g, 'âm bảy phẩy hai độ C')
    .replace(/-38\.8°C/g, 'âm ba mươi tám phẩy tám độ C')
    .replace(/3\.98/g, 'ba phẩy chín mươi tám')
    .replace(/3\.44/g, 'ba phẩy bốn mươi tư')
    .replace(/22\.59\s*g\/cm3/gi, 'hai mươi hai phẩy năm mươi chín gam trên xăng ti mét khối')
    .replace(/21\.45\s*g\/cm3/gi, 'hai mươi mốt phẩy bốn mươi lăm gam trên xăng ti mét khối')
    .replace(/19\.3\s*g\/cm3/gi, 'mười chín phẩy ba gam trên xăng ti mét khối')
    .replace(/19\.25\s*g\/cm3/gi, 'mười chín phẩy hai mươi lăm gam trên xăng ti mét khối')
    .replace(/19\.1\s*g\/cm3/gi, 'mười chín phẩy một gam trên xăng ti mét khối')
    .replace(/13\.53\s*g\/cm3/gi, 'mười ba phẩy năm mươi ba gam trên xăng ti mét khối')
    .replace(/11\.34\s*g\/cm3/gi, 'mười một phẩy ba mươi tư gam trên xăng ti mét khối')
    .replace(/10\.49\s*g\/cm3/gi, 'mười phẩy bốn mươi chín gam trên xăng ti mét khối')
    .replace(/8\.96\s*g\/cm3/gi, 'tám phẩy chín mươi sáu gam trên xăng ti mét khối')
    .replace(/7\.87\s*g\/cm3/gi, 'bảy phẩy tám mươi bảy gam trên xăng ti mét khối')
    .replace(/5\.91\s*g\/cm3/gi, 'năm phẩy chín mươi mốt gam trên xăng ti mét khối')
    .replace(/4\.51\s*g\/cm3/gi, 'bốn phẩy năm mươi mốt gam trên xăng ti mét khối')
    .replace(/3\.1\s*g\/cm3/gi, 'ba phẩy một gam trên xăng ti mét khối')
    .replace(/2\.7\s*g\/cm3/gi, 'hai phẩy bảy gam trên xăng ti mét khối')
    .replace(/2\.33\s*g\/cm3/gi, 'hai phẩy ba mươi ba gam trên xăng ti mét khối')
    .replace(/2\.27\s*g\/cm3/gi, 'hai phẩy hai mươi bảy gam trên xăng ti mét khối')
    .replace(/2\.07\s*g\/cm3/gi, 'hai phẩy không bảy gam trên xăng ti mét khối')
    .replace(/1\.93\s*g\/cm3/gi, 'một phẩy chín mươi ba gam trên xăng ti mét khối')
    .replace(/1\.74\s*g\/cm3/gi, 'một phẩy bảy mươi tư gam trên xăng ti mét khối')
    .replace(/1\.55\s*g\/cm3/gi, 'một phẩy năm mươi lăm gam trên xăng ti mét khối')
    .replace(/0\.97\s*g\/cm3/gi, 'không phẩy chín mươi bảy gam trên xăng ti mét khối')
    .replace(/0\.534\s*g\/cm3/gi, 'không phẩy năm trăm ba mươi tư gam trên xăng ti mét khối')
    .replace(/1\.7\s*g\/L/gi, 'một phẩy bảy gam trên lít')
    .replace(/1\.43\s*g\/L/gi, 'một phẩy bốn mươi ba gam trên lít')
    .replace(/1\.25\s*g\/L/gi, 'một phẩy hai mươi lăm gam trên lít')
    .replace(/0\.09\s*g\/L/gi, 'không phẩy không chín gam trên lít')
    .replace(/0\.18\s*g\/L/gi, 'không phẩy mười tám gam trên lít')
    .replace(/3\.2\s*g\/L/gi, 'ba phẩy hai gam trên lít')
    .replace(/SiO2/gi, 'silic đioxit')
    .replace(/SiF4/gi, 'silic tetraflorua')
    .replace(/HF/gi, 'H F')
    .replace(/HgS/gi, 'thủy ngân sunfua')
    .replace(/TiO2/gi, 'titan đioxit')
    .replace(/GaN/gi, 'gali nitrua')
    .replace(/CsOH/gi, 'xesi hidroxit')
    .replace(/Fe3O4/gi, 'sắt từ oxit')
    .replace(/Al2O3/gi, 'nhôm oxit')
    .replace(/P2O5/gi, 'điphotpho pentaoxit')
    .replace(/SO2/gi, 'khí sunfurơ')
    .replace(/SO3/gi, 'lưu huỳnh trioxit')
    .replace(/H2SO4/gi, 'axit sunfuric')
    .replace(/CaCO3/gi, 'canxi cacbonat')
    .replace(/Ca\(OH\)2/gi, 'canxi hidroxit')
    .replace(/2s2 2p5/gi, 'hai ét hai hai pê năm')
    .replace(/2s2 2p4/gi, 'hai ét hai hai pê bốn')
    .replace(/2s2 2p3/gi, 'hai ét hai hai pê ba')
    .replace(/sp2/gi, 'ét pê hai')
    .replace(/sp3/gi, 'ét pê ba')
    .replace(/6s2/gi, 'sáu ét hai')
    .replace(/9 tỷ 192 triệu 631 ngàn 770/g, 'chín tỷ một trăm chín mươi hai triệu sáu trăm ba mươi mốt ngàn bảy trăm bảy mươi')
    .replace(/30s/g, 'ba mươi giây');
}

function wrapSvgLines(text, maxChars = 52) {
  if (!text) return [];
  const clean = text.trim();
  if (clean.length <= maxChars) return [clean];

  const words = clean.split(/\s+/);
  const lines = [];
  let curLine = '';
  for (const w of words) {
    if ((curLine + ' ' + w).trim().length <= maxChars) {
      curLine = (curLine + ' ' + w).trim();
    } else {
      if (curLine) lines.push(curLine);
      curLine = w;
    }
  }
  if (curLine) lines.push(curLine);

  // Tự động cân bằng nếu dòng cuối quá ngắn (tránh rớt từ mồ côi)
  if (lines.length > 1) {
    let last = lines[lines.length - 1];
    let prev = lines[lines.length - 2];
    if (last.length < 18) {
      const prevWords = prev.split(/\s+/);
      if (prevWords.length >= 4) {
        const moved = prevWords.pop();
        prev = prevWords.join(' ');
        last = moved + ' ' + last;
        lines[lines.length - 2] = prev;
        lines[lines.length - 1] = last;
      }
    }
  }
  return lines;
}

export async function saveSpeech(filePath, text, rate = '+12%', giongCoDinh = null) {
  const force = Boolean(process.env.FORCE === '1' || process.env.FORCE_AUDIO === '1');
  if (!force && fs.existsSync(filePath) && fs.statSync(filePath).size > 2000) {
    return filePath;
  }

  const ttsText = cleanTextForTts(text);
  // Truyền giongCoDinh để KHOÁ một giọng cho cả video. Nếu không khoá, script
  // được phép đổi giọng khi thử lại nhiều lần — và đó chính là nguyên nhân
  // làm một cảnh bị đọc giọng khác ba cảnh còn lại mà nghiệm thu không bắt được.
  const voices = giongCoDinh ? [giongCoDinh] : ['vi-VN-NamMinhNeural', 'vi-VN-HoaiMyNeural'];

  let retries = 10;
  let voiceIdx = 0;
  while (retries > 0) {
    const voice = voices[voiceIdx % voices.length];
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const chunks = [];
      await new Promise((resolve, reject) => {
        const { audioStream } = tts.toStream(ttsText, { rate });
        audioStream.on('data', d => chunks.push(d));
        audioStream.on('error', reject);
        audioStream.on('close', resolve);
      });

      const buf = Buffer.concat(chunks);
      if (buf.length > 1000) {
        fs.writeFileSync(filePath, buf);
        try { tts.close(); } catch {}
        await new Promise(r => setTimeout(r, 700));
        return filePath;
      }
      throw new Error('Buffer audio quá nhỏ');
    } catch (err) {
      if (tts) {
        try { tts.close(); } catch {}
      }
      retries--;
      // Đổi giọng ngay khi lỗi sẽ làm MỘT cảnh trong video đọc bằng giọng khác
      // hẳn ba cảnh còn lại, mà bộ nghiệm thu file mp4 không phát hiện ra.
      // Vì vậy thử lại ĐÚNG GIỌNG CŨ 3 lần, hết mới chịu đổi.
      const doiGiong = !giongCoDinh && retries <= 6;
      if (doiGiong) voiceIdx++;
      const nextVoice = voices[voiceIdx % voices.length];
      const waitMs = Math.min((11 - retries) * 2500, 20000);
      console.warn(`⚠️ Lỗi TTS ${voice} (${err.message}). ` +
        (doiGiong ? `Đổi sang ${nextVoice}` : `Thử lại giọng ${voice}`) +
        `, chờ ${waitMs}ms... (${retries} lần còn lại)`);
      if (retries === 0) throw err;
      await new Promise(r => setTimeout(r, waitMs));
    }
  }
}

function xmlEscape(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export { ELEMENT_REELS };

// 🎨 SLIDE 1: THẺ ĐỊNH DANH NGUYÊN TỐ (ELEMENT ID CARD)
async function renderElementSlide1(el, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_bg_clean.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="neonGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${el.themeColor}" stop-opacity="0.9" />
          <stop offset="100%" stop-color="${el.accentColor}" stop-opacity="0.3" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="#060913" fill-opacity="0.85" />

      <!-- Top Badge -->
      <rect x="110" y="70" width="500" height="54" rx="27" fill="${el.themeColor}" fill-opacity="0.25" stroke="${el.themeColor}" stroke-width="2.2" />
      <text x="360" y="106" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="900" fill="${el.accentColor}" text-anchor="middle" letter-spacing="2">⚛️ HỒ SƠ NGUYÊN TỐ #${String(el.id).padStart(2, '0')}</text>

      <!-- Main Giant Sci-Fi Hologram Box -->
      <g transform="translate(90, 160)">
        <rect width="540" height="520" rx="36" fill="#0b1120" fill-opacity="0.92" stroke="${el.themeColor}" stroke-width="3.5" />
        
        <!-- Corner decorations -->
        <path d="M 20 40 L 20 20 L 40 20" stroke="${el.accentColor}" stroke-width="3" fill="none" />
        <path d="M 520 40 L 520 20 L 500 20" stroke="${el.accentColor}" stroke-width="3" fill="none" />
        <path d="M 20 480 L 20 500 L 40 500" stroke="${el.accentColor}" stroke-width="3" fill="none" />
        <path d="M 520 480 L 520 500 L 500 500" stroke="${el.accentColor}" stroke-width="3" fill="none" />

        <!-- Top Z & Mass -->
        <rect x="35" y="30" width="90" height="46" rx="12" fill="${el.themeColor}" fill-opacity="0.3" stroke="${el.themeColor}" stroke-width="1.5" />
        <text x="80" y="62" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle">Z = ${el.z}</text>

        <rect x="365" y="30" width="140" height="46" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="435" y="61" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#94a3b8" text-anchor="middle">M = ${el.mass}</text>

        <!-- Huge Symbol in Center -->
        <circle cx="270" cy="225" r="115" fill="${el.themeColor}" fill-opacity="0.12" stroke="${el.themeColor}" stroke-width="1.5" stroke-dasharray="8 6" />
        <text x="270" y="275" font-family="Segoe UI, Arial, sans-serif" font-size="135" font-weight="900" fill="${el.accentColor}" text-anchor="middle">${el.sym}</text>

        <!-- Element Name -->
        <text x="270" y="375" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">${xmlEscape(el.vi.toUpperCase())} • ${xmlEscape(el.en.toUpperCase())}</text>

        <!-- Config & Group/Period -->
        <text x="270" y="420" font-family="Consolas, 'Segoe UI', monospace" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">${xmlEscape(el.config)}</text>
        <text x="270" y="458" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="bold" fill="#94a3b8" text-anchor="middle">${xmlEscape(el.groupPeriod)}</text>

        <!-- Category Badge -->
        <rect x="60" y="476" width="420" height="32" rx="16" fill="${el.themeColor}" fill-opacity="0.3" />
        <text x="270" y="498" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="900" fill="${el.accentColor}" text-anchor="middle">${xmlEscape(el.categoryLabel)}</text>
      </g>

      <!-- Nickname / Superpower Card -->
      <g transform="translate(50, 710)">
        <rect width="620" height="190" rx="26" fill="#0f172a" stroke="${el.themeColor}" stroke-width="2.5" />
        <rect x="25" y="20" width="570" height="42" rx="12" fill="${el.themeColor}" fill-opacity="0.2" />
        <text x="310" y="49" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="900" fill="${el.accentColor}" text-anchor="middle">👑 DANH HIỆU: ${xmlEscape(el.nickname)}</text>

        <text x="310" y="115" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">"${xmlEscape(el.subQuote)}"</text>
        <text x="310" y="155" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">⚡ Giải mã siêu năng lực hóa học trong 30 giây!</text>
      </g>

      <!-- Bottom Hook CTA -->
      <rect x="130" y="930" width="460" height="56" rx="28" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" />
      <text x="360" y="966" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="900" fill="#c7d2fe" text-anchor="middle">🔬 Cùng pH-Chem khám phá bí mật!</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_01.jpg'));
}

// 🎨 SLIDE 2: THÔNG SỐ VẬT LÝ & KỸ THUẬT (ATOMIC SPECS)
async function renderElementSlide2(el, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_bg_clean.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const metrics = [
    { label: 'CẤU HÌNH ELECTRON', val: el.config, color: '#38bdf8' },
    { label: 'ĐỘ ÂM ĐIỆN (PAULING)', val: el.enScale, color: '#f59e0b' },
    { label: 'ĐIỂM NÓNG CHẢY', val: el.melt, color: '#ef4444' },
    { label: 'ĐIỂM SÔI', val: el.boil, color: '#ec4899' },
    { label: 'KHỐI LƯỢNG RIÊNG', val: el.density, color: '#10b981' },
    { label: 'NĂM PHÁT HIỆN', val: el.disc, color: '#8b5cf6' }
  ];

  const gridSvg = metrics.map((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 50 + col * 315;
    const y = 240 + row * 140;

    return `
      <g transform="translate(${x}, ${y})">
        <rect width="300" height="122" rx="20" fill="#0f172a" fill-opacity="0.95" stroke="#334155" stroke-width="2" />
        <rect x="15" y="15" width="270" height="28" rx="8" fill="#1e293b" />
        <text x="150" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="900" fill="#94a3b8" text-anchor="middle" letter-spacing="1">${m.label}</text>
        <text x="150" y="85" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="900" fill="${m.color}" text-anchor="middle">${xmlEscape(m.val)}</text>
      </g>
    `;
  }).join('\n');

  const highlightLines = wrapSvgLines(el.statsHighlight, 48);
  const highlightSvg = highlightLines.map((line, i) => {
    const startY = highlightLines.length === 1 ? 82 : (highlightLines.length === 2 ? 65 : 55);
    return `<text x="310" y="${startY + i * 36}" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(line)}</text>`;
  }).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#060913" fill-opacity="0.88" />

      <!-- Top Badge -->
      <rect x="140" y="70" width="440" height="52" rx="26" fill="${el.themeColor}" fill-opacity="0.25" stroke="${el.themeColor}" stroke-width="2" />
      <text x="360" y="104" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="900" fill="${el.accentColor}" text-anchor="middle">📊 THÔNG SỐ VẬT LÝ &amp; KỸ THUẬT</text>

      <text x="360" y="165" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(el.vi.toUpperCase())} (${el.sym}) - Z = ${el.z}</text>
      <text x="360" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="${el.accentColor}" text-anchor="middle">Trạng thái tự nhiên: ${xmlEscape(el.state)}</text>

      <!-- 6 Metrics Grid -->
      ${gridSvg}

      <!-- Highlight Banner -->
      <g transform="translate(50, 690)">
        <rect width="620" height="150" rx="24" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" />
        <rect x="25" y="12" width="570" height="28" rx="8" fill="#312e81" />
        <text x="310" y="32" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="900" fill="#a5b4fc" text-anchor="middle">🌟 ĐIỂM NHẤN KỶ LỤC CỦA NGUYÊN TỐ</text>
        ${highlightSvg}
      </g>

      <!-- Bottom Tag -->
      <rect x="150" y="880" width="420" height="52" rx="26" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
      <text x="360" y="913" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">⚡ Tiếp theo: Siêu năng lực hóa học độc nhất!</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_02.jpg'));
}

// 🎨 SLIDE 3: SIÊU NĂNG LỰC HÓA HỌC & PHƯƠNG TRÌNH PHẢN ỨNG TIÊU BIỂU
async function renderElementSlide3(el, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_bg_clean.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  // Tận dụng trọn vẹn không gian bề ngang (từ x=75 đến x=645) với font-size 21px rõ nét, maxChars = 58
  let curDescY = 328;
  const descSvgParts = [];
  el.powerDesc.forEach(line => {
    const wrapped = wrapSvgLines(line, 58);
    wrapped.forEach((wLine, idx) => {
      descSvgParts.push(
        `<text x="75" y="${curDescY}" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="${idx === 0 ? '600' : '500'}" fill="#f1f5f9">${xmlEscape(wLine)}</text>`
      );
      curDescY += 31;
    });
    curDescY += 10; // Khoảng cách giữa các gạch đầu dòng
  });
  const descSvg = descSvgParts.join('\n');

  // Phương trình phản ứng tiêu biểu căn giữa khung, cho phép tối đa 48 ký tự
  const rxLines = wrapSvgLines(el.reaction, 48);
  const rxSvg = rxLines.map((line, i) => {
    const startY = rxLines.length === 1 ? 86 : (rxLines.length === 2 ? 72 : 62);
    return `<text x="310" y="${startY + i * 32}" font-family="Consolas, 'Segoe UI', monospace" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">${xmlEscape(line)}</text>`;
  }).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#060913" fill-opacity="0.88" />

      <!-- Top Badge -->
      <rect x="130" y="70" width="460" height="52" rx="26" fill="${el.themeColor}" fill-opacity="0.25" stroke="${el.themeColor}" stroke-width="2" />
      <text x="360" y="104" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="900" fill="${el.accentColor}" text-anchor="middle">🔥 SIÊU NĂNG LỰC HÓA HỌC</text>

      <!-- Header Title Box -->
      <g transform="translate(50, 150)">
        <rect width="620" height="110" rx="24" fill="#0f172a" stroke="${el.themeColor}" stroke-width="2.5" />
        <text x="310" y="46" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="bold" fill="${el.accentColor}" text-anchor="middle">HIỆN TƯỢNG ĐẶC TRƯNG:</text>
        <text x="310" y="86" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(el.powerTitle)}</text>
      </g>

      <!-- Description Box: Rộng 620, cao 280, viền sắc nét -->
      <rect x="50" y="280" width="620" height="280" rx="24" fill="#1e293b" fill-opacity="0.9" stroke="#334155" stroke-width="2" />
      ${descSvg}

      <!-- Reaction Box Inner: Hiển thị nổi bật phương trình phản ứng tiêu biểu -->
      <g transform="translate(50, 580)">
        <rect width="620" height="135" rx="22" fill="#020617" stroke="${el.themeColor}" stroke-width="2.5" />
        <rect x="170" y="14" width="280" height="30" rx="10" fill="${el.themeColor}" fill-opacity="0.25" />
        <text x="310" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="bold" fill="${el.accentColor}" text-anchor="middle">PHƯƠNG TRÌNH PHẢN ỨNG TIÊU BIỂU</text>
        ${rxSvg}
      </g>

      <!-- Bottom Hook -->
      <g transform="translate(100, 750)">
        <rect width="520" height="60" rx="30" fill="#064e3b" fill-opacity="0.4" stroke="#10b981" stroke-width="1.8" />
        <text x="260" y="38" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#6ee7b7" text-anchor="middle">✨ Cùng xem ứng dụng thực tế của ${xmlEscape(el.vi)}!</text>
      </g>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_03.jpg'));
}

// 🎨 SLIDE 4: ỨNG DỤNG ĐỜI SỐNG & TRA CỨU BẢNG TUẦN HOÀN (CTA)
async function renderElementSlide4(el, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_bg_clean.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  // Tận dụng trọn vẹn không gian 520px trong card: maxChars = 54, font-size = 21px
  const appSvg = el.apps.map((item, i) => {
    const wrapped = wrapSvgLines(item, 54);
    const startY = wrapped.length === 1 ? 55 : 38;
    return `
      <g transform="translate(70, ${210 + i * 115})">
        <rect width="580" height="96" rx="20" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
        ${wrapped.map((line, j) => 
          `<text x="30" y="${startY + j * 30}" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="bold" fill="#f8fafc">${xmlEscape(line)}</text>`
        ).join('\n')}
      </g>
    `;
  }).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ctaCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1e1b4b" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="#060913" fill-opacity="0.88" />

      <!-- Top Badge -->
      <rect x="130" y="70" width="460" height="52" rx="26" fill="#3b82f6" fill-opacity="0.25" stroke="#60a5fa" stroke-width="2" />
      <text x="360" y="104" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="900" fill="#93c5fd" text-anchor="middle">🌐 ỨNG DỤNG &amp; BẢNG TUẦN HOÀN</text>

      <text x="360" y="170" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">ỨNG DỤNG THỰC TẾ CỦA ${xmlEscape(el.vi.toUpperCase())}:</text>

      <!-- 3 Apps Cards -->
      ${appSvg}

      <!-- Website CTA Box -->
      <g transform="translate(50, 580)">
        <rect width="620" height="320" rx="30" fill="url(#ctaCardGrad)" stroke="#6366f1" stroke-width="2.5" />
        <text x="310" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle">KHÁM PHÁ TRỌN BỘ 118 NGUYÊN TỐ</text>
        <text x="310" y="95" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#818cf8" text-anchor="middle">Bảng tuần hoàn thông minh • Cấu hình e • 3D</text>

        <!-- Giant URL Button -->
        <rect x="30" y="125" width="560" height="96" rx="22" fill="#0284c7" stroke="#38bdf8" stroke-width="2.5" />
        <text x="310" y="165" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#e0f2fe" text-anchor="middle">TRUY CẬP NGAY BẢNG TUẦN HOÀN TRỰC QUAN:</text>
        <text x="310" y="202" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">https://ph-chem.web.app/table</text>

        <text x="310" y="265" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="bold" fill="#94a3b8" text-anchor="middle">(Trang chủ: https://ph-chem.web.app/)</text>
        <text x="310" y="295" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#64748b" text-anchor="middle">Hoàn toàn miễn phí • Không quảng cáo • Tra cứu siêu nhanh</text>
      </g>

      <!-- Bottom Tag -->
      <rect x="160" y="930" width="400" height="52" rx="26" fill="#030712" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="963" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="bold" fill="#38bdf8" text-anchor="middle">👉 Thả tim &amp; Nhấn Lưu video ngay nhé!</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_04.jpg'));
}

export async function buildSingleElementReel(el) {
  const ffmpeg = getFfmpegPath();
  const reelDir = path.join(REELS_DIR, el.key);
  if (!fs.existsSync(reelDir)) fs.mkdirSync(reelDir, { recursive: true });

  const videoOut = path.join(REELS_DIR, el.videoFileName);
  if (fs.existsSync(videoOut) && fs.statSync(videoOut).size > 1000000 && !process.env.FORCE) {
    console.log(`⏩ HỒ SƠ NGUYÊN TỐ #${el.id} ĐÃ TỒN TẠI: ${videoOut}. Bỏ qua.`);
    return videoOut;
  }
  console.log(`\n==================================================`);
  console.log(`🎬 BẮT ĐẦU DỰNG HỒ SƠ NGUYÊN TỐ #${el.id}: ${el.title}`);
  console.log(`📁 Thư mục làm việc: ${reelDir}`);

  // 1. Tạo audio TTS cho 4 cảnh
  const audioList = [];
  const sceneDurations = [];

  for (let i = 0; i < el.scenes.length; i++) {
    const s = el.scenes[i];
    const sPath = path.join(reelDir, `speech_${String(i + 1).padStart(2, '0')}.mp3`);
    console.log(`🎙️ [Cảnh ${i + 1}/4] Đang tạo giọng thuyết minh AI...`);
    await saveSpeech(sPath, s.text, '+12%');

    const probe = spawnSync(ffmpeg, ['-i', sPath], { encoding: 'utf8' });
    const match = probe.stderr?.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    let dur = 3.5;
    if (match) {
      dur = parseInt(match[1], 10) * 3600 + parseInt(match[2], 10) * 60 + parseFloat(match[3]);
    }
    // Cho mỗi slide thêm khoảng nghỉ nhỏ 0.3s
    dur = Math.max(dur + 0.3, 3.2);
    sceneDurations.push(dur);
    audioList.push(`file '${sPath.replace(/\\/g, '/')}'`);
  }

  const fullAudioPath = path.join(reelDir, 'full_audio.mp3');
  const audioConcatPath = path.join(reelDir, 'audio_concat.txt');
  fs.writeFileSync(audioConcatPath, audioList.join('\n'), 'utf-8');
  spawnSync(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', audioConcatPath, '-c', 'copy', fullAudioPath]);

  // 2. Render 4 slide đồ họa (đã áp dụng nền sạch và hiện rõ phương trình phản ứng)
  console.log('🎨 Đang kết xuất 4 slide đồ họa 720x1280 (Nền sạch + Phương trình phản ứng)...');
  await renderElementSlide1(el, reelDir);
  await renderElementSlide2(el, reelDir);
  await renderElementSlide3(el, reelDir);
  await renderElementSlide4(el, reelDir);

  // 3. Ghép slide với audio thành video
  const concatPath = path.join(reelDir, 'concat.txt');
  const concatLines = [
    `file '${path.join(reelDir, 'slide_01.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[0].toFixed(2)}`,
    `file '${path.join(reelDir, 'slide_02.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[1].toFixed(2)}`,
    `file '${path.join(reelDir, 'slide_03.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[2].toFixed(2)}`,
    `file '${path.join(reelDir, 'slide_04.jpg').replace(/\\/g, '/')}'`,
    `duration ${(sceneDurations[3] + 0.6).toFixed(2)}`,
    `file '${path.join(reelDir, 'slide_04.jpg').replace(/\\/g, '/')}'`
  ];
  fs.writeFileSync(concatPath, concatLines.join('\n'), 'utf-8');

  console.log(`⚙️ FFmpeg đang ghép video: ${videoOut}...`);
  const ffmpegArgs = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatPath,
    '-i', fullAudioPath,
    '-r', '25',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-shortest',
    videoOut
  ];

  const res = spawnSync(ffmpeg, ffmpegArgs, { stdio: 'inherit' });
  if (res.status !== 0) {
    throw new Error(`FFmpeg lỗi khi tạo video ${el.title}`);
  }

  const stat = fs.statSync(videoOut);
  console.log(`✅ XUẤT HỒ SƠ NGUYÊN TỐ THÀNH CÔNG: ${videoOut} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
  return videoOut;
}

export async function generateAllElementReels(startId = 1, endId = 30) {
  console.log(`🚀 KHỞI ĐỘNG TIẾN TRÌNH TẠO HỒ SƠ NGUYÊN TỐ TỪ #${startId} ĐẾN #${endId}...`);
  const results = [];
  const targets = ELEMENT_REELS.filter(el => el.id >= startId && el.id <= endId);
  for (const el of targets) {
    const vPath = await buildSingleElementReel(el);
    results.push({ ...el, path: vPath });
  }
  console.log(`\n🎉 HOÀN TẤT TẠO TOÀN BỘ REEL HỒ SƠ NGUYÊN TỐ!`);
  return results;
}

if (process.argv[1]?.endsWith('gen-element-reels.mjs')) {
  const arg = process.argv[2];
  if (arg === 'phase1') {
    generateAllElementReels(1, 10).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (arg === 'phase2') {
    generateAllElementReels(11, 30).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (arg === 'phase3') {
    generateAllElementReels(31, 40).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (arg === 'phase4') {
    generateAllElementReels(41, 50).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (arg === 'phase5') {
    generateAllElementReels(51, 60).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (arg === 'new') {
    generateAllElementReels(31, 60).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (arg === 'all') {
    generateAllElementReels(1, 60).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else if (arg) {
    const el = ELEMENT_REELS.find(item => String(item.id) === arg || item.key === arg);
    if (!el) {
      console.error(`❌ Không tìm thấy hồ sơ nguyên tố với ID/key: ${arg}`);
      process.exit(1);
    }
    buildSingleElementReel(el).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else {
    generateAllElementReels(31, 60).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  }
}
