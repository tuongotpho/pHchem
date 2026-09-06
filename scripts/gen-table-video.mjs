import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const WIDTH = 720;
const HEIGHT = 1280;
const PROMO_DIR = path.resolve('promo');
const SLIDES_DIR = path.join(PROMO_DIR, 'table_slides');

if (!fs.existsSync(SLIDES_DIR)) {
  fs.mkdirSync(SLIDES_DIR, { recursive: true });
}

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

const TABLE_SCRIPT_SCENES = [
  {
    id: 'table_scene_01',
    title: 'Cảnh 1: Hook - Thách thức 118 nguyên tố',
    text: 'Bạn có chắc là mình đã nhớ hết và hiểu sâu 118 nguyên tố trong bảng tuần hoàn hóa học? Khám phá ngay cách tra cứu thông minh nhé!'
  },
  {
    id: 'table_scene_02',
    title: 'Cảnh 2: Bảng tuần hoàn tương tác',
    text: 'Truy cập pH-Chem tại địa chỉ ph-chem.web.app, bạn sẽ sở hữu ngay bảng tuần hoàn tương tác hiện đại, phân loại màu sắc chuẩn theo từng nhóm: kim loại, phi kim, halogen và khí hiếm!'
  },
  {
    id: 'table_scene_03',
    title: 'Cảnh 3: Dữ liệu chuyên sâu từng nguyên tố',
    text: 'Chỉ một chạm là thấy ngay nhiệt độ nóng chảy, nhiệt độ sôi, độ âm điện, cấu hình electron và ứng dụng thực tiễn của từng nguyên tố, chuẩn xác và cực kỳ dễ hiểu!'
  },
  {
    id: 'table_scene_04',
    title: 'Cảnh 4: Call to action',
    text: 'Trợ thủ đắc lực giúp bạn bứt phá môn Hóa! Truy cập ngay website chính thức ph-chem.web.app để trải nghiệm nhé!'
  }
];

const FULL_SCRIPT = TABLE_SCRIPT_SCENES.map(s => s.text).join(' ');

function saveSpeechToFile(tts, filePath, text, rate = '+15%') {
  return new Promise((resolve, reject) => {
    const { audioStream } = tts.toStream(text, { rate });
    const writeStream = fs.createWriteStream(filePath);
    audioStream.pipe(writeStream);
    audioStream.on('error', err => {
      writeStream.destroy();
      reject(err);
    });
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
}

async function generateAudio() {
  console.log('🎙️ Khởi tạo TTS giọng Hoài My với tốc độ tăng 1.15 lần (+15%)...');
  const tts = new MsEdgeTTS();
  await tts.setMetadata('vi-VN-HoaiMyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const fullAudioPath = path.join(PROMO_DIR, 'phchem_table_audio_115.mp3');
  await saveSpeechToFile(tts, fullAudioPath, FULL_SCRIPT, '+15%');
  console.log(`✅ Đã tạo audio toàn bài: ${fullAudioPath} (${fs.statSync(fullAudioPath).size} bytes)`);

  const sceneDurations = [];
  const ffmpeg = getFfmpegPath();

  for (const scene of TABLE_SCRIPT_SCENES) {
    const scenePath = path.join(SLIDES_DIR, `${scene.id}.mp3`);
    await saveSpeechToFile(tts, scenePath, scene.text, '+15%');
    
    // Đo thời lượng chính xác bằng ffmpeg
    const probe = spawnSync(ffmpeg, ['-i', scenePath], { encoding: 'utf8' });
    const match = probe.stderr.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    let dur = 7.0;
    if (match) {
      dur = parseFloat(match[1]) * 3600 + parseFloat(match[2]) * 60 + parseFloat(match[3]);
    }
    sceneDurations.push(dur);
    console.log(`   -> ${scene.id}: ${dur.toFixed(2)}s`);
  }

  return { fullAudioPath, sceneDurations };
}

// 2. Tạo 4 Slide đồ họa chuyên nghiệp (720x1280)
async function generateSlides() {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const basePoster = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  // SLIDE 1: Hook
  const s1Svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96" />
        </linearGradient>
        <linearGradient id="neonGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>

      <!-- Badge đỉnh đầu -->
      <rect x="140" y="80" width="440" height="52" rx="26" fill="#0d9488" fill-opacity="0.3" stroke="#2dd4bf" stroke-width="2" />
      <text x="360" y="114" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#5eead4" text-anchor="middle" letter-spacing="2">🧪 pH-Chem · BẢNG TUẦN HOÀN 4.0</text>

      <!-- Khung Hook trung tâm -->
      <rect x="45" y="380" width="630" height="420" rx="30" fill="url(#cardGrad)" stroke="#fbbf24" stroke-width="2.5" />
      
      <rect x="85" y="420" width="550" height="54" rx="14" fill="#f59e0b" fill-opacity="0.2" stroke="#fbbf24" stroke-width="1.5" />
      <text x="360" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#fef08a" text-anchor="middle">⚡ THÁCH THỨC MÔN HÓA</text>

      <text x="360" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="900" fill="#ffffff" text-anchor="middle">118 NGUYÊN TỐ</text>
      <text x="360" y="605" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="900" fill="url(#neonGold)" text-anchor="middle">BẠN ĐÃ NHỚ HẾT?</text>

      <text x="360" y="675" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#cbd5e1" text-anchor="middle">Đừng học vẹt! Hãy tra cứu thông minh</text>
      <text x="360" y="730" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#38bdf8" text-anchor="middle">Khám phá ngay tại ph-chem.web.app 👇</text>
    </svg>
  `);

  await basePoster
    .composite([{ input: s1Svg, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(path.join(SLIDES_DIR, 'slide_01.jpg'));
  console.log('✅ Đã tạo slide_01.jpg (Hook 118 nguyên tố)');

  // SLIDE 2: Interactive Periodic Table
  const s2Svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#050811" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#030712" />
        </linearGradient>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#2dd4bf" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg2)" />

      <!-- Tiêu đề -->
      <rect x="200" y="90" width="320" height="46" rx="23" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2" />
      <text x="360" y="122" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#7dd3fc" text-anchor="middle" letter-spacing="3">TÍNH NĂNG NỔI BẬT</text>

      <text x="360" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="900" fill="url(#titleGrad)" text-anchor="middle">BẢNG TUẦN HOÀN</text>
      <text x="360" y="260" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">118 Nguyên Tố Tương Tác Trực Quan</text>
      <text x="360" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Website chính thức: ph-chem.web.app/table</text>

      <!-- 4 Nhóm phân loại màu sắc -->
      <g transform="translate(50, 340)">
        <!-- Thẻ 1: Kim loại kiềm & kiềm thổ -->
        <g transform="translate(0, 0)">
          <rect width="620" height="135" rx="20" fill="#1e293b" stroke="#f87171" stroke-width="2" />
          <circle cx="65" cy="67" r="34" fill="#ef4444" fill-opacity="0.2" stroke="#f87171" stroke-width="1.5" />
          <text x="65" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#fca5a5" text-anchor="middle">Li</text>
          <text x="125" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Kim Loại Kiềm &amp; Kiềm Thổ</text>
          <text x="125" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">Nhóm IA, IIA - Tính khử cực mạnh</text>
        </g>

        <!-- Thẻ 2: Kim loại chuyển tiếp -->
        <g transform="translate(0, 155)">
          <rect width="620" height="135" rx="20" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
          <circle cx="65" cy="67" r="34" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.5" />
          <text x="65" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#7dd3fc" text-anchor="middle">Fe</text>
          <text x="125" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Kim Loại Chuyển Tiếp (Nhóm B)</text>
          <text x="125" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">Fe, Cu, Zn, Ag, Au - Đầy đủ số oxi hóa</text>
        </g>

        <!-- Thẻ 3: Phi kim & Halogen -->
        <g transform="translate(0, 310)">
          <rect width="620" height="135" rx="20" fill="#1e293b" stroke="#fbbf24" stroke-width="2" />
          <circle cx="65" cy="67" r="34" fill="#f59e0b" fill-opacity="0.2" stroke="#fbbf24" stroke-width="1.5" />
          <text x="65" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#fde047" text-anchor="middle">Cl</text>
          <text x="125" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Phi Kim &amp; Nhóm Halogen</text>
          <text x="125" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">F, Cl, Br, I - Tính oxi hóa điển hình</text>
        </g>

        <!-- Thẻ 4: Khí hiếm -->
        <g transform="translate(0, 465)">
          <rect width="620" height="135" rx="20" fill="#1e293b" stroke="#a855f7" stroke-width="2" />
          <circle cx="65" cy="67" r="34" fill="#9333ea" fill-opacity="0.2" stroke="#c084fc" stroke-width="1.5" />
          <text x="65" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#e9d5ff" text-anchor="middle">Ne</text>
          <text x="125" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Khí Hiếm (Nhóm VIIIA)</text>
          <text x="125" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">He, Ne, Ar - Cấu hình electron bền vững</text>
        </g>
      </g>

      <rect x="120" y="1000" width="480" height="54" rx="16" fill="#0d9488" fill-opacity="0.25" stroke="#2dd4bf" stroke-width="1.5" />
      <text x="360" y="1035" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" fill="#5eead4" text-anchor="middle">✨ Click từng ô để soi toàn bộ thông số chi tiết</text>
    </svg>
  `);

  await sharp(s2Svg).jpeg({ quality: 92 }).toFile(path.join(SLIDES_DIR, 'slide_02.jpg'));
  console.log('✅ Đã tạo slide_02.jpg (Phân loại bảng tuần hoàn)');

  // SLIDE 3: Chi tiết nguyên tố (Gold Au & Iron Fe)
  const s3Svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090d16" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg3)" />

      <!-- Tiêu đề -->
      <text x="360" y="130" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="900" fill="#38bdf8" text-anchor="middle">THÔNG SỐ CHUẨN XÁC</text>
      <text x="360" y="180" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#2dd4bf" text-anchor="middle">Dữ Liệu Chuẩn IUPAC &amp; PubChem</text>
      <text x="360" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">Không ghi số liệu dự đoán thiếu căn cứ</text>

      <!-- 2 Thẻ nguyên tố mẫu -->
      <!-- Thẻ Vàng Au -->
      <g transform="translate(50, 260)">
        <rect width="620" height="310" rx="24" fill="#1e293b" fill-opacity="0.9" stroke="#fbbf24" stroke-width="2.5" />
        
        <rect x="30" y="30" width="100" height="100" rx="18" fill="#78350f" stroke="#fbbf24" stroke-width="2" />
        <text x="80" y="75" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="900" fill="#fef08a" text-anchor="middle">Au</text>
        <text x="80" y="108" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#fef08a" text-anchor="middle">79</text>

        <text x="155" y="65" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">Gold (Vàng)</text>
        <text x="155" y="100" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#fde047">Nguyên tử khối: 196.97 g/mol</text>

        <line x1="30" y1="150" x2="590" y2="150" stroke="#334155" stroke-width="1.5" />

        <text x="30" y="195" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cbd5e1">• Nhiệt độ nóng chảy: <tspan font-weight="bold" fill="#38bdf8">1064.18 °C</tspan></text>
        <text x="30" y="235" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cbd5e1">• Độ âm điện Pauling: <tspan font-weight="bold" fill="#2dd4bf">2.54</tspan></text>
        <text x="30" y="275" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cbd5e1">• Khối lượng riêng: <tspan font-weight="bold" fill="#f59e0b">19.3 g/cm³</tspan></text>
      </g>

      <!-- Thẻ Sắt Fe -->
      <g transform="translate(50, 600)">
        <rect width="620" height="310" rx="24" fill="#1e293b" fill-opacity="0.9" stroke="#38bdf8" stroke-width="2.5" />
        
        <rect x="30" y="30" width="100" height="100" rx="18" fill="#0369a1" stroke="#38bdf8" stroke-width="2" />
        <text x="80" y="75" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="900" fill="#e0f2fe" text-anchor="middle">Fe</text>
        <text x="80" y="108" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#e0f2fe" text-anchor="middle">26</text>

        <text x="155" y="65" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">Iron (Sắt)</text>
        <text x="155" y="100" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#7dd3fc">Nguyên tử khối: 55.85 g/mol</text>

        <line x1="30" y1="150" x2="590" y2="150" stroke="#334155" stroke-width="1.5" />

        <text x="30" y="195" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cbd5e1">• Nhiệt độ nóng chảy: <tspan font-weight="bold" fill="#38bdf8">1538 °C</tspan></text>
        <text x="30" y="235" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cbd5e1">• Cấu hình e: <tspan font-weight="bold" fill="#2dd4bf">[Ar] 3d⁶ 4s²</tspan></text>
        <text x="30" y="275" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cbd5e1">• Kèm 208 sự thật hóa học kỳ thú</text>
      </g>

      <rect x="80" y="950" width="560" height="54" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="985" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">💡 Đầy đủ năm phát hiện &amp; ứng dụng đời sống</text>
    </svg>
  `);

  await sharp(s3Svg).jpeg({ quality: 92 }).toFile(path.join(SLIDES_DIR, 'slide_03.jpg'));
  console.log('✅ Đã tạo slide_03.jpg (Chi tiết thông số nguyên tố)');

  // SLIDE 4: Call to action (Chính xác domain ph-chem.web.app)
  const s4Svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ctaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.97" />
        </linearGradient>
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0d9488" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
      </defs>

      <!-- Hộp trung tâm Call to action -->
      <rect x="45" y="310" width="630" height="620" rx="30" fill="url(#ctaBg)" stroke="#2dd4bf" stroke-width="2.5" />

      <text x="360" y="385" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#f59e0b" text-anchor="middle">TRỢ THỦ ĐẮC LỰC MÔN HÓA</text>
      <text x="360" y="465" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="900" fill="#ffffff" text-anchor="middle">pH-Chem</text>
      
      <text x="360" y="525" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#94a3b8" text-anchor="middle">Bảng tuần hoàn · Máy tính · Thư viện IUPAC</text>

      <!-- Nút URL chính thức -->
      <g transform="translate(85, 565)">
        <rect width="550" height="115" rx="24" fill="url(#btnGrad)" stroke="#5eead4" stroke-width="2" />
        <text x="275" y="45" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">👉 TRUY CẬP WEBSITE CHÍNH THỨC</text>
        <text x="275" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="900" fill="#fef08a" text-anchor="middle">ph-chem.web.app</text>
      </g>

      <!-- Link trực tiếp bảng tuần hoàn -->
      <rect x="120" y="715" width="480" height="50" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="748" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">🔗 ph-chem.web.app/table</text>

      <!-- Badges cuối -->
      <rect x="95" y="795" width="530" height="58" rx="18" fill="#16a34a" fill-opacity="0.2" stroke="#4ade80" stroke-width="1.5" />
      <text x="360" y="832" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#86efac" text-anchor="middle">✨ HOÀN TOÀN MIỄN PHÍ · CHẠY OFFLINE</text>

      <text x="360" y="900" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#e2e8f0" text-anchor="middle">Lưu lại hoặc chia sẻ cho bạn bè cùng học nhé! ❤️</text>
    </svg>
  `);

  await basePoster
    .composite([{ input: s4Svg, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(path.join(SLIDES_DIR, 'slide_04.jpg'));
  console.log('✅ Đã tạo slide_04.jpg (CTA chính thức)');
}

// 3. Hàm tạo Video
async function buildTableVideo() {
  console.log('🚀 BẮT ĐẦU QUY TRÌNH TẠO VIDEO BẢNG TUẦN HOÀN...');
  
  // Bước 1: Tạo Audio TTS tốc độ 1.15
  const { fullAudioPath, sceneDurations } = await generateAudio();

  // Bước 2: Tạo các Slide đồ họa 720x1280
  await generateSlides();

  // Bước 3: Dựng Video bằng FFmpeg
  const ffmpeg = getFfmpegPath();
  const videoOutputPath = path.join(PROMO_DIR, 'phchem_periodic_table_video.mp4');

  const concatListPath = path.join(SLIDES_DIR, 'concat.txt');
  const concatLines = [
    `file '${path.join(SLIDES_DIR, 'slide_01.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[0].toFixed(2)}`,
    `file '${path.join(SLIDES_DIR, 'slide_02.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[1].toFixed(2)}`,
    `file '${path.join(SLIDES_DIR, 'slide_03.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[2].toFixed(2)}`,
    `file '${path.join(SLIDES_DIR, 'slide_04.jpg').replace(/\\/g, '/')}'`,
    `duration ${(sceneDurations[3] + 0.5).toFixed(2)}`,
    `file '${path.join(SLIDES_DIR, 'slide_04.jpg').replace(/\\/g, '/')}'`
  ];
  fs.writeFileSync(concatListPath, concatLines.join('\n'), 'utf-8');

  console.log('\n⚙️ Đang ghép video và audio bằng FFmpeg...');
  const ffmpegArgs = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatListPath,
    '-i', fullAudioPath,
    '-r', '25',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-shortest',
    videoOutputPath
  ];

  const res = spawnSync(ffmpeg, ffmpegArgs, { stdio: 'inherit' });
  if (res.status !== 0) {
    throw new Error(`FFmpeg thất bại với mã lỗi ${res.status}`);
  }

  const stat = fs.statSync(videoOutputPath);
  console.log(`\n🎉 XUẤT VIDEO BẢNG TUẦN HOÀN THÀNH CÔNG!`);
  console.log(`📁 File video: ${videoOutputPath}`);
  console.log(`📦 Kích thước: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
}

buildTableVideo().catch(err => {
  console.error('❌ Lỗi khi dựng video bảng tuần hoàn:', err);
  process.exit(1);
});
