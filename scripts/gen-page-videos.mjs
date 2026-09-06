import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const WIDTH = 720;
const HEIGHT = 1280;
const PROMO_DIR = path.resolve('promo');

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

async function saveSpeech(filePath, text, rate = '+15%') {
  let retries = 3;
  while (retries > 0) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata('vi-VN-HoaiMyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      await new Promise((resolve, reject) => {
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
      return filePath;
    } catch (err) {
      retries--;
      if (retries === 0) throw err;
      await new Promise(r => setTimeout(r, 1200));
    }
  }
}

export const VIDEO_PAGES = [
  {
    key: 'calculator',
    videoFileName: 'phchem_calculator_video.mp4',
    route: 'calculator',
    name: 'Máy Tính Hóa Học',
    tagline: 'Cân Bằng Phản Ứng & Tính pH Siêu Tốc',
    themeColor: '#38bdf8',
    accentColor: '#2dd4bf',
    scenes: [
      {
        text: 'Cân bằng phương trình hóa học hay tính pH dung dịch làm bạn mất quá nhiều thời gian? Đã có siêu máy tính pH-Chem lo!',
        badge: '⚖️ CÂN BẰNG & TÍNH TOÁN 4.0',
        h1: 'MÁY TÍNH HÓA HỌC',
        h2: 'CÂN BẰNG SIÊU TỐC',
        sub: 'Xử lý bài tập chỉ trong 1 tích tắc'
      },
      {
        text: 'Chỉ cần gõ phương trình, hệ thống tự động cân bằng chuẩn xác mọi phản ứng vô cơ và oxi hóa khử phức tạp, kèm tính toán khối lượng mol tức thì!',
        cards: [
          { icon: '⚖️', title: 'Tự Động Cân Bằng', desc: 'Cân bằng mọi phản ứng vô cơ & hữu cơ' },
          { icon: '📊', title: 'Khối Lượng Mol & % Khối Lượng', desc: 'Phân tích phần trăm từng nguyên tố' },
          { icon: '💧', title: 'Tính pH & Nồng Độ Mol', desc: 'Chuyển đổi mol, nồng độ và thể tích khí' },
          { icon: '🧪', title: 'Pha Loãng Dung Dịch', desc: 'Tính lượng nước cần thêm chính xác' }
        ]
      },
      {
        text: 'Đầy đủ công cụ chuyển đổi mol sang khối lượng, thể tích khí và nồng độ dung dịch. Hỗ trợ giải toán hóa nhanh gọn và chuẩn xác!',
        demoTitle: 'TÍNH pH & NỒNG ĐỘ',
        demoLines: [
          '• Tính pH axit mạnh, bazo mạnh & chất đệm',
          '• Chuyển đổi mol ↔ gam ↔ lít khí ở đktc',
          '• Tính độ tan và nồng độ phần trăm C%'
        ]
      },
      {
        text: 'Trợ thủ giải toán hóa số một của bạn! Truy cập ngay website chính thức ph-chem.web.app/calculator để dùng thử nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    key: 'electro',
    videoFileName: 'phchem_electro_video.mp4',
    route: 'electro',
    name: 'Dãy Điện Hóa Kim Loại',
    tagline: 'Quy Tắc Alpha & Dự Đoán Chiều Phản Ứng',
    themeColor: '#f59e0b',
    accentColor: '#fbbf24',
    scenes: [
      {
        text: 'Làm sao để biết kim loại nào đẩy được kim loại nào ra khỏi muối? Hãy làm chủ ngay Dãy điện hóa tại pH-Chem!',
        badge: '🔋 DÃY ĐIỆN HÓA KIM LOẠI',
        h1: 'QUY TẮC ALPHA',
        h2: 'DỰ ĐOÁN CHIỀU PHẢN ỨNG',
        sub: 'Bí kíp giải nhanh câu hỏi oxi hóa - khử'
      },
      {
        text: 'Tra cứu trực quan thứ tự thế điện cực chuẩn từ kim loại kiềm đến kim loại quý. So sánh tính khử và tính oxi hóa cực kỳ dễ hiểu!',
        cards: [
          { icon: '⚡', title: 'Thế Điện Cực Chuẩn E°', desc: 'Sắp xếp chuẩn xác theo chiều tăng dần' },
          { icon: '🔄', title: 'Quy Tắc Alpha Trực Quan', desc: 'Chất oxi hóa mạnh + Chất khử mạnh' },
          { icon: '🥇', title: 'Dãy Hoạt Động Kim Loại', desc: 'K, Na, Mg, Al, Zn, Fe, Cu, Ag, Au' },
          { icon: '💡', title: 'Giải Đề Oxi Hóa - Khử', desc: 'Không bao giờ nhầm lẫn chiều phản ứng' }
        ]
      },
      {
        text: 'Áp dụng quy tắc Alpha kinh điển để biết ngay phản ứng có xảy ra hay không. Bí kíp vàng cho các bài thi trắc nghiệm môn Hóa!',
        demoTitle: 'QUY TẮC ALPHA KINH ĐIỂN',
        demoLines: [
          '• Oxi hóa mạnh + Khử mạnh → Oxi hóa yếu + Khử yếu',
          '• Ví dụ: Fe + Cu²⁺ → Fe²⁺ + Cu',
          '• Ứng dụng giải trắc nghiệm chỉ trong 10 giây'
        ]
      },
      {
        text: 'Bứt phá điểm Hóa với công cụ dãy điện hóa tương tác! Truy cập ngay ph-chem.web.app/electro để khám phá nhé!',
        ctaUrl: 'ph-chem.web.app/electro'
      }
    ]
  },
  {
    key: 'solubility',
    videoFileName: 'phchem_solubility_video.mp4',
    route: 'solubility',
    name: 'Bảng Độ Tan & Kết Tủa',
    tagline: 'Ma Trận 14 Cation × 8 Anion Chuẩn Xác',
    themeColor: '#10b981',
    accentColor: '#34d399',
    scenes: [
      {
        text: 'Chất này có kết tủa không? Kết tủa màu gì? Tra cứu ngay bảng độ tan thông minh trên pH-Chem để không bao giờ mất điểm nhé!',
        badge: '💧 BẢNG ĐỘ TAN THÔNG MINH',
        h1: 'MA TRẬN ĐỘ TAN',
        h2: '14 CATION × 8 ANION',
        sub: 'Nhận biết hiện tượng kết tủa chuẩn xác'
      },
      {
        text: 'Ma trận tương tác mượt mà giữa mười bốn cation và tám anion. Bấm vào từng ô để thấy ngay công thức chất và hiện tượng tạo thành!',
        cards: [
          { icon: '🟢', title: 'Chất Tan (T)', desc: 'Tạo dung dịch trong suốt, điện li tốt' },
          { icon: '🔴', title: 'Chất Không Tan (K)', desc: 'Tạo kết tủa đặc trưng BaSO4, AgCl...' },
          { icon: '🟡', title: 'Chất Ít Tan (I)', desc: 'CaSO4, Ca(OH)2...' },
          { icon: '⚪', title: 'Chất Bị Thủy Phân (-)', desc: 'Không tồn tại hoặc bị phân hủy trong nước' }
        ]
      },
      {
        text: 'Ghép công thức tự động theo đúng quy tắc hóa trị. Giúp bạn nhận biết muối, bazo tan hay kết tủa cực nhanh và chuẩn xác!',
        demoTitle: 'GHÉP CÔNG THỨC CHUẨN HÓA TRỊ',
        demoLines: [
          '• Bấm chọn Ba²⁺ + SO₄²⁻ → BaSO₄ (Kết tủa trắng)',
          '• Bấm chọn Ag⁺ + Cl⁻ → AgCl (Kết tủa trắng)',
          '• Bấm chọn Cu²⁺ + OH⁻ → Cu(OH)₂ (Kết tủa xanh)'
        ]
      },
      {
        text: 'Học hóa thông minh, không lo nhớ nhầm độ tan! Truy cập ngay ph-chem.web.app/solubility để trải nghiệm nhé!',
        ctaUrl: 'ph-chem.web.app/solubility'
      }
    ]
  },
  {
    key: 'formulas',
    videoFileName: 'phchem_formulas_video.mp4',
    route: 'formulas',
    name: 'Thư Viện Cấu Trúc 2D',
    tagline: '340+ Hợp Chất & 274 Cấu Trúc Chuẩn IUPAC',
    themeColor: '#0ea5e9',
    accentColor: '#38bdf8',
    scenes: [
      {
        text: 'Học Hóa hữu cơ mà không nhìn thấy cấu trúc thì làm sao hiểu bản chất? Khám phá ngay thư viện cấu trúc 2D trên pH-Chem!',
        badge: '🧬 THƯ VIỆN CẤU TRÚC 2D',
        h1: '340+ HỢP CHẤT',
        h2: '274 CẤU TRÚC IUPAC',
        sub: 'Hình vẽ sinh bằng thuật toán RDKit cực nét'
      },
      {
        text: 'Thư viện phong phú gồm hơn ba trăm bốn mươi chất vô cơ, hữu cơ và hóa lý. Hiển thị hai trăm bảy mươi tư cấu trúc 2D chuẩn quốc tế IUPAC!',
        cards: [
          { icon: '📐', title: 'Chuẩn Quốc Tế IUPAC', desc: 'Vẽ chuẩn liên kết, góc hóa trị & lập thể' },
          { icon: '☕', title: 'Hợp Chất Đời Sống', desc: 'Caffeine, Aspirin, Glucose, Nicotine...' },
          { icon: '🔍', title: 'Mã SMILES & IUPAC', desc: 'Đầy đủ tên thay thế và tên thông thường' },
          { icon: '⚡', title: 'Đồ Họa Vector SVG', desc: 'Sắc nét trên mọi màn hình, không vỡ nét' }
        ]
      },
      {
        text: 'Các phân tử quen thuộc như Caffeine, Aspirin, Glucose hay Polyme đều được mô phỏng chi tiết, hỗ trợ đắc lực cho học sinh và giáo viên!',
        demoTitle: 'MÔ PHỎNG CHI TIẾT PHÂN TỬ',
        demoLines: [
          '• Caffeine (C₈H₁₀N₄O₂): Vòng purine đặc trưng',
          '• Aspirin (C₉H₈O₄): Nhóm este & axit cacboxylic',
          '• Glucose (C₆H₁₂O₆): Dạng mạch hở & mạch vòng'
        ]
      },
      {
        text: 'Nâng tầm tư duy hóa học không gian cùng pH-Chem! Truy cập ngay ph-chem.web.app/formulas nhé!',
        ctaUrl: 'ph-chem.web.app/formulas'
      }
    ]
  },
  {
    key: 'quiz',
    videoFileName: 'phchem_quiz_video.mp4',
    route: 'quiz',
    name: 'Phòng Luyện Đề Thi 30s',
    tagline: 'Ngân Hàng Đề Giáo Viên & Đề AI Tự Sinh',
    themeColor: '#ec4899',
    accentColor: '#f43f5e',
    scenes: [
      {
        text: 'Muốn biết trình độ Hóa học của mình đang ở đâu? Thử thách ngay tại Phòng luyện đề trắc nghiệm thông minh trên pH-Chem!',
        badge: '🎯 PHÒNG LUYỆN THI 30S',
        h1: 'LUYỆN ĐỀ THỰC CHIẾN',
        h2: 'ĐỒNG HỒ BẤM GIỜ 30S',
        sub: 'Kiểm tra kiến thức & Xuất phiếu điểm ngay'
      },
      {
        text: 'Hệ thống cung cấp hai nguồn đề phong phú: Ngân hàng đề chuẩn từ giáo viên và đề trắc nghiệm do AI tự động sinh theo từng chuyên đề!',
        cards: [
          { icon: '⏱️', title: 'Đồng Hồ 30 Giây/Câu', desc: 'Rèn luyện phản xạ giải đề thi thật' },
          { icon: '📚', title: 'Ngân Hàng Đề Giáo Viên', desc: 'Chuyên đề Sự điện li, Cân bằng, Nitrogen...' },
          { icon: '🤖', title: 'Đề Sinh Bởi AI', desc: 'Xáo trộn ngẫu nhiên, không bao giờ trùng câu' },
          { icon: '📸', title: 'Xuất Phiếu Kết Quả', desc: 'Lưu phiếu điểm đẹp mắt để chia sẻ' }
        ]
      },
      {
        text: 'Đồng hồ đếm ngược ba mươi giây mỗi câu giúp rèn luyện phản xạ làm bài thi thật. Hoàn thành xong là có ngay phiếu điểm xuất ra ảnh cực đẹp!',
        demoTitle: 'PHIẾU KẾT QUẢ THỰC CHIẾN',
        demoLines: [
          '• Thống kê số câu đúng / sai / bỏ qua',
          '• Đánh giá năng lực theo thang điểm chuẩn',
          '• Tải ảnh phiếu điểm chia sẻ với bạn bè'
        ]
      },
      {
        text: 'Thử sức ngay hôm nay xem bạn đạt được bao nhiêu điểm! Truy cập ngay ph-chem.web.app/quiz nhé!',
        ctaUrl: 'ph-chem.web.app/quiz'
      }
    ]
  },
  {
    key: 'reactions',
    videoFileName: 'phchem_reactions_video.mp4',
    route: 'reactions',
    name: 'Kho Phản Ứng & Sự Thật',
    tagline: 'Hiện Tượng Màu Sắc Thực Tế & 208 Sự Thật',
    themeColor: '#8b5cf6',
    accentColor: '#a78bfa',
    scenes: [
      {
        text: 'Bạn có biết phản ứng nào đổi màu dung dịch, sinh kết tủa hay sủi bọt khí? Khám phá ngay kho phản ứng thực tế tại pH-Chem!',
        badge: '🌈 HIỆN TƯỢNG PHẢN ỨNG',
        h1: 'KHO PHẢN ỨNG THỰC TẾ',
        h2: 'HIỆN TƯỢNG MÀU SẮC',
        sub: 'Kèm 208 sự thật hóa học kỳ thú'
      },
      {
        text: 'Mỗi phản ứng đều mô tả chi tiết hiện tượng thực nghiệm, màu sắc kết tủa, khí thoát ra và điều kiện nhiệt độ hoặc xúc tác!',
        cards: [
          { icon: '🧪', title: 'Hiện Tượng Thực Nghiệm', desc: 'Mô tả màu kết tủa, dung dịch & khí sinh ra' },
          { icon: '🔥', title: 'Điều Kiện Phản Ứng', desc: 'Nhiệt độ, xúc tác, áp suất chi tiết' },
          { icon: '📖', title: 'Từ Điển 211 Thuật Ngữ', desc: 'Tra cứu song ngữ Việt - Anh chuẩn xác' },
          { icon: '✨', title: '208 Sự Thật Kỳ Thú', desc: 'Khám phá bí mật hóa học trong cuộc sống' }
        ]
      },
      {
        text: 'Đi kèm từ điển hơn hai trăm thuật ngữ song ngữ Việt Anh và kho sự thật khoa học kỳ thú gắn liền với cuộc sống hàng ngày!',
        demoTitle: 'HÓA HỌC THỰC TIỄN SINH ĐỘNG',
        demoLines: [
          '• Hiện tượng Cu + HNO₃ đặc → Khí NO₂ màu nâu đỏ',
          '• Hiện tượng FeCl₃ + NaOH → Kết tủa Fe(OH)₃ nâu đỏ',
          '• Sự thật: Tại sao vàng không bị gỉ trong tự nhiên?'
        ]
      },
      {
        text: 'Học hóa gắn liền với thế giới thực tế! Khám phá ngay tại website chính thức ph-chem.web.app/reactions nhé!',
        ctaUrl: 'ph-chem.web.app/reactions'
      }
    ]
  }
];

function xmlEscape(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Hàm render slide bằng sharp
async function buildSlide1(page, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const s1 = page.scenes[0];
  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96" />
        </linearGradient>
      </defs>

      <!-- Badge đỉnh đầu -->
      <rect x="140" y="80" width="440" height="52" rx="26" fill="#0d9488" fill-opacity="0.3" stroke="#2dd4bf" stroke-width="2" />
      <text x="360" y="114" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#5eead4" text-anchor="middle" letter-spacing="2">🧪 pH-Chem · ${xmlEscape(s1.badge)}</text>

      <!-- Khung Hook trung tâm -->
      <rect x="45" y="380" width="630" height="420" rx="30" fill="url(#cardGrad)" stroke="${page.themeColor}" stroke-width="2.5" />
      
      <rect x="85" y="420" width="550" height="54" rx="14" fill="${page.themeColor}" fill-opacity="0.2" stroke="${page.themeColor}" stroke-width="1.5" />
      <text x="360" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="${page.accentColor}" text-anchor="middle">⚡ TÍNH NĂNG ĐỘC QUYỀN</text>

      <text x="360" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(s1.h1)}</text>
      <text x="360" y="605" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="900" fill="${page.accentColor}" text-anchor="middle">${xmlEscape(s1.h2)}</text>

      <text x="360" y="675" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#cbd5e1" text-anchor="middle">${xmlEscape(s1.sub)}</text>
      <text x="360" y="730" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#38bdf8" text-anchor="middle">Khám phá ngay tại ph-chem.web.app 👇</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_01.jpg'));
}

async function buildSlide2(page, dir) {
  const s2 = page.scenes[1];
  const cardsSvg = s2.cards.map((c, i) => `
    <g transform="translate(0, ${i * 155})">
      <rect width="620" height="135" rx="20" fill="#1e293b" stroke="${i % 2 === 0 ? page.themeColor : page.accentColor}" stroke-width="2" />
      <circle cx="65" cy="67" r="34" fill="#0f172a" stroke="${page.themeColor}" stroke-width="1.5" />
      <text x="65" y="78" font-family="Segoe UI, Arial, sans-serif" font-size="30" text-anchor="middle">${c.icon}</text>
      <text x="125" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">${xmlEscape(c.title)}</text>
      <text x="125" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">${xmlEscape(c.desc)}</text>
    </g>
  `).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#070a13" />

      <rect x="200" y="90" width="320" height="46" rx="23" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2" />
      <text x="360" y="122" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#7dd3fc" text-anchor="middle" letter-spacing="3">TÍNH NĂNG CHÍNH</text>

      <text x="360" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="900" fill="${page.themeColor}" text-anchor="middle">${xmlEscape(page.name.toUpperCase())}</text>
      <text x="360" y="260" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">${xmlEscape(page.tagline)}</text>
      <text x="360" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Website: ph-chem.web.app/${page.route}</text>

      <g transform="translate(50, 340)">
        ${cardsSvg}
      </g>

      <rect x="120" y="1000" width="480" height="54" rx="16" fill="#0d9488" fill-opacity="0.25" stroke="#2dd4bf" stroke-width="1.5" />
      <text x="360" y="1035" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" fill="#5eead4" text-anchor="middle">✨ Dữ liệu chuẩn xác, tiện ích vượt trội</text>
    </svg>
  `);

  await sharp(svg).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_02.jpg'));
}

async function buildSlide3(page, dir) {
  const s3 = page.scenes[2];
  const linesSvg = s3.demoLines.map((l, i) => `
    <text x="40" y="${90 + i * 55}" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#cbd5e1">${xmlEscape(l)}</text>
  `).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#090d16" />

      <text x="360" y="130" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="900" fill="${page.themeColor}" text-anchor="middle">TRỰC QUAN &amp; CHUẨN XÁC</text>
      <text x="360" y="180" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#2dd4bf" text-anchor="middle">Hỗ Trợ Học Tập &amp; Luyện Thi Toàn Diện</text>

      <g transform="translate(50, 260)">
        <rect width="620" height="320" rx="24" fill="#1e293b" stroke="${page.themeColor}" stroke-width="2.5" />
        <text x="310" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="${page.accentColor}" text-anchor="middle">${xmlEscape(s3.demoTitle)}</text>
        <line x1="30" y1="75" x2="590" y2="75" stroke="#334155" stroke-width="1.5" />
        <g transform="translate(0, 30)">
          ${linesSvg}
        </g>
      </g>

      <g transform="translate(50, 620)">
        <rect width="620" height="300" rx="24" fill="#1e293b" stroke="${page.accentColor}" stroke-width="2" />
        <text x="310" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">ĐẶC ĐIỂM NỔI BẬT</text>
        <line x1="30" y1="75" x2="590" y2="75" stroke="#334155" stroke-width="1.5" />
        <text x="40" y="125" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#cbd5e1">• Giao diện Dark Mode chống mỏi mắt</text>
        <text x="40" y="175" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#cbd5e1">• Cài đặt như App PWA, hoạt động offline 100%</text>
        <text x="40" y="225" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#cbd5e1">• 100% Miễn phí, không chứa quảng cáo rác</text>
      </g>

      <rect x="80" y="960" width="560" height="54" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="995" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">💡 Sử dụng trên điện thoại và máy tính mượt mà</text>
    </svg>
  `);

  await sharp(svg).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_03.jpg'));
}

async function buildSlide4(page, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const svg = Buffer.from(`
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

      <rect x="45" y="310" width="630" height="620" rx="30" fill="url(#ctaBg)" stroke="#2dd4bf" stroke-width="2.5" />

      <text x="360" y="385" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#f59e0b" text-anchor="middle">TRỢ THỦ ĐẮC LỰC MÔN HÓA</text>
      <text x="360" y="465" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="900" fill="#ffffff" text-anchor="middle">pH-Chem</text>
      
      <text x="360" y="525" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#94a3b8" text-anchor="middle">${xmlEscape(page.name)} · ${xmlEscape(page.tagline)}</text>

      <g transform="translate(85, 565)">
        <rect width="550" height="115" rx="24" fill="url(#btnGrad)" stroke="#5eead4" stroke-width="2" />
        <text x="275" y="45" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">👉 TRUY CẬP WEBSITE CHÍNH THỨC</text>
        <text x="275" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="900" fill="#fef08a" text-anchor="middle">ph-chem.web.app</text>
      </g>

      <rect x="120" y="715" width="480" height="50" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="748" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">🔗 ph-chem.web.app/${page.route}</text>

      <rect x="95" y="795" width="530" height="58" rx="18" fill="#16a34a" fill-opacity="0.2" stroke="#4ade80" stroke-width="1.5" />
      <text x="360" y="832" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#86efac" text-anchor="middle">✨ HOÀN TOÀN MIỄN PHÍ · CHẠY OFFLINE</text>

      <text x="360" y="900" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#e2e8f0" text-anchor="middle">Lưu lại hoặc chia sẻ cho bạn bè cùng học nhé! ❤️</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_04.jpg'));
}

export async function buildSinglePageVideo(page) {
  console.log(`\n======================================================`);
  console.log(`🎬 BẮT ĐẦU TẠO VIDEO CHO: ${page.name} (/ ${page.route})`);
  console.log(`======================================================`);

  const pageDir = path.join(PROMO_DIR, `page_${page.key}`);
  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

  const fullText = page.scenes.map(s => s.text).join(' ');
  const fullAudioPath = path.join(pageDir, 'full_audio.mp3');
  console.log('🎙️ Đang tạo TTS tốc độ 1.15x...');
  await saveSpeech(fullAudioPath, fullText, '+15%');

  const ffmpeg = getFfmpegPath();
  const sceneDurations = [];
  for (let i = 0; i < page.scenes.length; i++) {
    const sPath = path.join(pageDir, `scene_${i}.mp3`);
    await saveSpeech(sPath, page.scenes[i].text, '+15%');
    const probe = spawnSync(ffmpeg, ['-i', sPath], { encoding: 'utf8' });
    const match = probe.stderr.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    let dur = 7.0;
    if (match) {
      dur = parseFloat(match[1]) * 3600 + parseFloat(match[2]) * 60 + parseFloat(match[3]);
    }
    sceneDurations.push(dur);
  }

  console.log('🎨 Đang kết xuất 4 slide đồ họa 720x1280...');
  await buildSlide1(page, pageDir);
  await buildSlide2(page, pageDir);
  await buildSlide3(page, pageDir);
  await buildSlide4(page, pageDir);

  const concatPath = path.join(pageDir, 'concat.txt');
  const concatLines = [
    `file '${path.join(pageDir, 'slide_01.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[0].toFixed(2)}`,
    `file '${path.join(pageDir, 'slide_02.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[1].toFixed(2)}`,
    `file '${path.join(pageDir, 'slide_03.jpg').replace(/\\/g, '/')}'`,
    `duration ${sceneDurations[2].toFixed(2)}`,
    `file '${path.join(pageDir, 'slide_04.jpg').replace(/\\/g, '/')}'`,
    `duration ${(sceneDurations[3] + 0.5).toFixed(2)}`,
    `file '${path.join(pageDir, 'slide_04.jpg').replace(/\\/g, '/')}'`
  ];
  fs.writeFileSync(concatPath, concatLines.join('\n'), 'utf-8');

  const videoOut = path.join(PROMO_DIR, page.videoFileName);
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
    throw new Error(`FFmpeg lỗi khi tạo video ${page.name}`);
  }

  const stat = fs.statSync(videoOut);
  console.log(`✅ XUẤT VIDEO THÀNH CÔNG: ${videoOut} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
  return videoOut;
}

async function main() {
  const targetKey = process.argv[2];
  if (targetKey && targetKey !== 'all') {
    const p = VIDEO_PAGES.find(item => item.key === targetKey);
    if (!p) {
      console.error(`❌ Không tìm thấy trang với key: ${targetKey}`);
      process.exit(1);
    }
    await buildSinglePageVideo(p);
  } else {
    console.log(`🚀 Đang tạo video cho tất cả ${VIDEO_PAGES.length} trang còn lại...`);
    for (const page of VIDEO_PAGES) {
      await buildSinglePageVideo(page);
    }
    console.log(`\n🎉 HOÀN THÀNH TẤT CẢ ${VIDEO_PAGES.length} VIDEO!`);
  }
}

if (process.argv[1]?.endsWith('gen-page-videos.mjs')) {
  main().catch(err => {
    console.error('❌ Lỗi:', err);
    process.exit(1);
  });
}
