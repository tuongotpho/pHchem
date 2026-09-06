import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

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

function cleanTextForTts(text) {
  return text
    .replace(/ph-chem\.web\.app(\/[a-z0-9_-]+)?/gi, (match, route) => {
      const routeClean = route ? route.replace('/', ' xuyệt ') : '';
      return 'ph gạch chem chấm web chấm áp' + routeClean;
    })
    .replace(/\.app\b/gi, ' chấm áp')
    .replace(/\bapp\b/gi, 'áp')
    .replace(/—/g, ', ')
    .replace(/–/g, ', ')
    .replace(/H2SO4/gi, 'H 2 S O 4')
    .replace(/HCl/gi, 'H C l')
    .replace(/HNO3/gi, 'H N O 3')
    .replace(/CH3COOH/gi, 'C H 3 C O O H')
    .replace(/CH4/gi, 'C H 4')
    .replace(/SO2/gi, 'S O 2')
    .replace(/NH3/gi, 'N H 3')
    .replace(/NaHCO3/gi, 'Na H C O 3')
    .replace(/Na2CO3/gi, 'Na 2 C O 3')
    .replace(/CaCO3/gi, 'Ca C O 3')
    .replace(/NaCl/gi, 'Na C l')
    .replace(/N2O/gi, 'N 2 O')
    .replace(/CO2/gi, 'C O 2')
    .replace(/H2O2/gi, 'H 2 O 2')
    .replace(/CH3OH/gi, 'C H 3 O H')
    .replace(/C2H5OH/gi, 'C 2 H 5 O H')
    .replace(/Ca\(OH\)2/gi, 'canxi hidroxit')
    .replace(/25°C/g, 'hai mươi lăm độ C')
    .replace(/0\.534\s*g\/cm3/gi, 'không phẩy năm trăm ba mươi tư gam trên xăng ti mét khối')
    .replace(/500\+/g, 'hơn năm trăm')
    .replace(/30s/g, 'ba mươi giây');
}

function wrapSvgLines(text, maxChars = 34) {
  if (!text) return [];
  const words = text.split(/\s+/);
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
  return lines;
}

async function saveSpeech(filePath, text, rate = '+12%') {
  const force = Boolean(process.env.FORCE === '1' || process.env.FORCE_AUDIO === '1');
  if (!force && fs.existsSync(filePath) && fs.statSync(filePath).size > 2000) {
    return filePath;
  }

  const ttsText = cleanTextForTts(text);

  let retries = 6;
  while (retries > 0) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata('vi-VN-HoaiMyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
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
        await new Promise(r => setTimeout(r, 500));
        return filePath;
      }
      throw new Error('Buffer audio quá nhỏ');
    } catch (err) {
      retries--;
      console.warn(`⚠️ Lỗi TTS (${err.message}). Thử lại... (${retries} lần)`);
      if (retries === 0) throw err;
      await new Promise(r => setTimeout(r, 2000));
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

export const QUIZ_REELS = [
  {
    id: 1,
    key: 'quiz_01_axit_da_day',
    videoFileName: 'quiz_01_axit_da_day.mp4',
    title: 'ĐỐ VUI HÓA HỌC #01: AXIT TRONG DẠ DÀY',
    tag: 'Cơ thể',
    themeColor: '#ef4444',
    accentColor: '#fca5a5',
    svgFile: 'public/hinh/HCl.3233372f.svg',
    correctOption: 'B',
    correctText: 'B. Axit Clohidric (HCl)',
    question: 'Axit nào có trong dịch vị dạ dày giúp tiêu hóa và diệt khuẩn?',
    options: [
      { key: 'A', text: 'H₂SO₄ (Sunfuric)' },
      { key: 'B', text: 'HCl (Clohidric)' },
      { key: 'C', text: 'HNO₃ (Nitric)' },
      { key: 'D', text: 'CH₃COOH (Axetic)' }
    ],
    hint: 'Gợi ý: Axit vô cơ đơn giản gồm 1 H và 1 Halogen, pH dịch vị từ 1.5 - 3.5!',
    explanation: 'HCl kích hoạt enzim pepsinogen thành pepsin để tiêu hóa protein và diệt vi khuẩn.',
    reaction: 'HCl + NaHCO₃ → NaCl + CO₂ ↑ + H₂O',
    scenes: [
      {
        text: 'Thử thách hóa học 30 giây! Axit nào có trong dịch vị dạ dày giúp tiêu hóa thức ăn và tiêu diệt vi khuẩn?'
      },
      {
        text: 'Năm giây đếm ngược bắt đầu! Gợi ý là axit vô cơ đơn chức có độ pH cực kỳ thấp từ một phẩy năm đến ba phẩy năm. Bình luận ngay đáp án nhé!'
      },
      {
        text: 'Đáp án chính xác là B: Axit Clohidric HCl! Khi đau dạ dày do thừa axit, chúng ta thường uống thuốc muối Nabica chứa NaHCO3 để trung hòa lượng axit dư này!'
      },
      {
        text: 'Luyện tập thêm hơn 500 câu trắc nghiệm hóa học có bấm giờ tại website: ph-chem.web.app/quiz nhé!'
      }
    ]
  },
  {
    id: 2,
    key: 'quiz_02_khi_metan_nha_kinh',
    videoFileName: 'quiz_02_khi_metan_nha_kinh.mp4',
    title: 'ĐỐ VUI HÓA HỌC #02: KHÍ GÂY HIỆU ỨNG NHÀ KÍNH',
    tag: 'Môi trường',
    themeColor: '#10b981',
    accentColor: '#6ee7b7',
    svgFile: 'public/hinh/CH4.78d17873.svg',
    correctOption: 'A',
    correctText: 'A. Methane (CH₄)',
    question: 'Khí nào sinh ra từ ruộng lúa và dạ dày trâu bò, giữ nhiệt gấp 28 lần CO₂?',
    options: [
      { key: 'A', text: 'CH₄ (Methane)' },
      { key: 'B', text: 'N₂ (Nitrogen)' },
      { key: 'C', text: 'SO₂ (Sunfurơ)' },
      { key: 'D', text: 'NH₃ (Amoniac)' }
    ],
    hint: 'Gợi ý: Là ankan đơn giản nhất gồm 1 Cacbon và 4 Hidro dạng tứ diện đều!',
    explanation: 'CH4 giữ nhiệt khí quyển gấp 28 lần CO2 trong chu kỳ 100 năm.',
    reaction: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O  (ΔH < 0)',
    scenes: [
      {
        text: 'Đố vui hóa học! Khí nào sinh ra từ ruộng lúa ngập nước và dạ dày gia súc, có khả năng giữ nhiệt gây hiệu ứng nhà kính gấp 28 lần khí CO2?'
      },
      {
        text: 'Năm giây đếm ngược! Gợi ý: Đây là hydrocacbon no đơn giản nhất, là thành phần chính của khí bùn ao và khí biogas!'
      },
      {
        text: 'Chúc mừng bạn nào chọn đáp án A: Khí Metan CH4! Metan là ankan nhẹ hơn không khí, cháy tỏa nhiệt lượng cực kỳ lớn!'
      },
      {
        text: 'Cân bằng phương trình và tra cứu cấu trúc phân tử tại website: ph-chem.web.app nhé!'
      }
    ]
  },
  {
    id: 3,
    key: 'quiz_03_kim_loai_the_long',
    videoFileName: 'quiz_03_kim_loai_the_long.mp4',
    title: 'ĐỐ VUI HÓA HỌC #03: KIM LOẠI THỂ LỎNG',
    tag: 'Nguyên tố',
    themeColor: '#06b6d4',
    accentColor: '#67e8f9',
    svgFile: 'public/hinh/HgO.39d4c245.svg',
    correctOption: 'B',
    correctText: 'B. Thủy ngân (Hg)',
    question: 'Kim loại duy nhất ở thể lỏng tại nhiệt độ phòng (25°C) là gì?',
    options: [
      { key: 'A', text: 'Gali (Ga)' },
      { key: 'B', text: 'Thủy ngân (Hg)' },
      { key: 'C', text: 'Brom (Br₂)' },
      { key: 'D', text: 'Xesi (Cs)' }
    ],
    hint: 'Gợi ý: Số hiệu nguyên tử 80, hay dùng trong nhiệt kế y tế cổ điển!',
    explanation: 'Hg có cấu hình electron 6s² bền vững do hiệu ứng tương đối tính làm co obitan.',
    reaction: 'Hg + S → HgS  (Thu hồi thủy ngân rơi vãi)',
    scenes: [
      {
        text: 'Câu hỏi trắc nghiệm kinh điển! Kim loại duy nhất ở trạng thái lỏng ở nhiệt độ phòng 25 độ C là kim loại nào?'
      },
      {
        text: 'Năm giây suy nghĩ bắt đầu! Chú ý đừng nhầm lẫn giữa kim loại và phi kim nhé. Mau để lại lựa chọn dưới phần bình luận nào!'
      },
      {
        text: 'Chính xác là đáp án B: Thủy ngân Hg! Brom cũng ở thể lỏng nhưng Brom là phi kim. Khi thủy ngân rơi vãi, ta dùng bột lưu huỳnh để thu gom an toàn!'
      },
      {
        text: 'Khám phá trọn bộ 118 nguyên tố hóa học tại website chính thức: ph-chem.web.app/table nhé!'
      }
    ]
  },
  {
    id: 4,
    key: 'quiz_04_baking_soda_lam_banh',
    videoFileName: 'quiz_04_baking_soda_lam_banh.mp4',
    title: 'ĐỐ VUI HÓA HỌC #04: BAKING SODA NỞ BÁNH',
    tag: 'Đời sống',
    themeColor: '#f59e0b',
    accentColor: '#fcd34d',
    svgFile: 'public/hinh/NaHCO3.3d03df6f.svg',
    correctOption: 'B',
    correctText: 'B. Natri hidrocacbonat (NaHCO₃)',
    question: 'Bột nở Baking Soda dùng làm bánh phồng xốp là muối hóa học nào?',
    options: [
      { key: 'A', text: 'Na₂CO₃ (Soda ash)' },
      { key: 'B', text: 'NaHCO₃ (Baking soda)' },
      { key: 'C', text: 'CaCO₃ (Đá vôi)' },
      { key: 'D', text: 'NaCl (Muối ăn)' }
    ],
    hint: 'Gợi ý: Muối axit của kim loại kiềm, bị nhiệt phân sinh ra khí CO₂!',
    explanation: 'Nhiệt phân hoặc tác dụng axit sinh ra khí CO2 tạo các lỗ xốp li ti trong bánh.',
    reaction: '2 NaHCO₃ → Na₂CO₃ + CO₂ ↑ + H₂O',
    scenes: [
      {
        text: 'Bí mật làm bánh! Bột nở Baking Soda giúp bánh bông lan phồng xốp mềm mịn thực chất là hợp chất hóa học nào?'
      },
      {
        text: 'Năm giây đếm ngược! Gợi ý: Hợp chất này có tính lưỡng tính, khi gặp nhiệt độ cao sẽ phân hủy giải phóng bọt khí CO2!'
      },
      {
        text: 'Đáp án chuẩn là B: Natri hidrocacbonat NaHCO3! Bọt khí CO2 thoát ra tạo nên hàng triệu lỗ xốp khí giúp ruột bánh phồng xốp tuyệt hảo!'
      },
      {
        text: 'Tra cứu tính chất và phương trình phản ứng hóa học tại: ph-chem.web.app nhé!'
      }
    ]
  },
  {
    id: 5,
    key: 'quiz_05_khi_cuoi_gay_me',
    videoFileName: 'quiz_05_khi_cuoi_gay_me.mp4',
    title: 'ĐỐ VUI HÓA HỌC #05: BẢN CHẤT KHÍ CƯỜI',
    tag: 'Y học',
    themeColor: '#ec4899',
    accentColor: '#f9a8d4',
    svgFile: 'public/hinh/N2O.160afff2.svg',
    correctOption: 'C',
    correctText: 'C. Đinitơ monoxit (N₂O)',
    question: 'Hợp chất khí nào được gọi là "khí cười", dùng gây tê trong nha khoa?',
    options: [
      { key: 'A', text: 'NO (Nitơ monoxit)' },
      { key: 'B', text: 'NO₂ (Nitơ đioxit)' },
      { key: 'C', text: 'N₂O (Đinitơ monoxit)' },
      { key: 'D', text: 'NH₃ (Amoniac)' }
    ],
    hint: 'Gợi ý: Khí không màu, vị hơi ngọt, số oxi hóa của Nitơ là +1!',
    explanation: 'N2O kích thích giải phóng dopamin nhưng lạm dụng sẽ gây tổn thương tủy sống.',
    reaction: 'NH₄NO₃ → N₂O ↑ + 2 H₂O  (t° = 200°C)',
    scenes: [
      {
        text: 'Đố bạn biết: Hợp chất khí nào thường được gọi là khí cười, có tác dụng giảm đau trong nha khoa nhưng lạm dụng sẽ gây liệt tủy sống?'
      },
      {
        text: 'Năm giây bắt đầu! Gợi ý: Đây là oxit trung tính của Nitơ có số oxi hóa dương một, khí không màu và có vị hơi ngọt nhẹ!'
      },
      {
        text: 'Đáp án chính xác là C: Dinitơ monoxit N2O! N2O kích thích hệ thần kinh nhưng phá hủy vitamin B12 gây tổn thương tủy sống cực kỳ nguy hiểm!'
      },
      {
        text: 'Cùng học hóa học thông minh và an toàn tại website chính thức: ph-chem.web.app nhé!'
      }
    ]
  },
  {
    id: 6,
    key: 'quiz_06_vi_chua_giam_an',
    videoFileName: 'quiz_06_vi_chua_giam_an.mp4',
    title: 'ĐỐ VUI HÓA HỌC #06: AXIT TRONG GIẤM ĂN',
    tag: 'Ẩm thực',
    themeColor: '#8b5cf6',
    accentColor: '#c4b5fd',
    svgFile: 'public/hinh/CH3COOH.0958c58f.svg',
    correctOption: 'B',
    correctText: 'B. Axit Axetic (CH₃COOH)',
    question: 'Axit hữu cơ nào tạo nên vị chua đặc trưng trong chai giấm ăn gia đình?',
    options: [
      { key: 'A', text: 'HCOOH (Fomic)' },
      { key: 'B', text: 'CH₃COOH (Axetic)' },
      { key: 'C', text: 'C₂H₅OH (Etanol)' },
      { key: 'D', text: 'HCl (Clohidric)' }
    ],
    hint: 'Gợi ý: Axit no đơn chức 2 Cacbon, lên men từ rượu etylic loãng!',
    explanation: 'Giấm ăn chứa 2 - 5% axit axetic, lên men tự nhiên nhờ vi khuẩn men giấm.',
    reaction: 'C₂H₅OH + O₂ → CH₃COOH + H₂O  (Men giấm)',
    scenes: [
      {
        text: 'Câu hỏi quen thuộc trong căn bếp! Axit hữu cơ nào tạo nên vị chua thanh đặc trưng trong chai giấm ăn hàng ngày?'
      },
      {
        text: 'Năm giây đếm ngược! Gợi ý: Axit này có hai nguyên tử cacbon trong phân tử, được lên men tự nhiên từ rượu trắng loãng!'
      },
      {
        text: 'Đáp án đúng là B: Axit Axetic CH3COOH! Trong giấm ăn, nồng độ axit axetic chỉ khoảng hai đến năm phần trăm, vừa đủ tạo vị chua thơm ngon an toàn!'
      },
      {
        text: 'Xem cấu trúc 2D và 3D của hàng trăm axit hữu cơ tại: ph-chem.web.app/formulas nhé!'
      }
    ]
  },
  {
    id: 7,
    key: 'quiz_07_van_duc_nuoc_voi_trong',
    videoFileName: 'quiz_07_van_duc_nuoc_voi_trong.mp4',
    title: 'ĐỐ VUI HÓA HỌC #07: KẾT TỦA NƯỚC VÔI TRONG',
    tag: 'Thí nghiệm',
    themeColor: '#0284c7',
    accentColor: '#38bdf8',
    svgFile: 'public/hinh/CaCO3.6a0a815f.svg',
    correctOption: 'C',
    correctText: 'C. Canxi cacbonat (CaCO₃)',
    question: 'Thổi hơi thở chứa CO₂ vào nước vôi trong, kết tủa trắng vẩn đục là gì?',
    options: [
      { key: 'A', text: 'CaO (Vôi sống)' },
      { key: 'B', text: 'Ca(HCO₃)₂' },
      { key: 'C', text: 'CaCO₃ (Đá vôi)' },
      { key: 'D', text: 'CaCl₂' }
    ],
    hint: 'Gợi ý: Hợp chất không tan trong nước, thành phần chính của đá vôi và vỏ sò!',
    explanation: 'CO2 phản ứng với Ca(OH)2 tạo kết tủa CaCO3 màu trắng không tan làm đục dung dịch.',
    reaction: 'CO₂ + Ca(OH)₂ → CaCO₃ ↓ + H₂O',
    scenes: [
      {
        text: 'Thí nghiệm nhận biết hóa học kinh điển! Khi dùng ống hút thổi hơi thở vào cốc nước vôi trong, vẩn đục màu trắng xuất hiện là chất gì?'
      },
      {
        text: 'Năm giây bắt đầu! Hơi thở của chúng ta chứa khí cacbonic. Khí này kết hợp với canxi hidroxit tạo ra chất gì nhỉ?'
      },
      {
        text: 'Rất chính xác, đáp án C: Canxi cacbonat CaCO3! Đây là phản ứng đặc trưng trong chương trình hóa học dùng để nhận biết khí CO2!'
      },
      {
        text: 'Ôn luyện đầy đủ phương trình hóa học và bài tập nhận biết tại: ph-chem.web.app nhé!'
      }
    ]
  },
  {
    id: 8,
    key: 'quiz_08_kim_loai_nhe_nhat',
    videoFileName: 'quiz_08_kim_loai_nhe_nhat.mp4',
    title: 'ĐỐ VUI HÓA HỌC #08: KIM LOẠI NHẸ NHẤT BẢNG TUẦN HOÀN',
    tag: 'Nguyên tố',
    themeColor: '#14b8a6',
    accentColor: '#5eead4',
    svgFile: 'public/hinh/LiOH.278e903f.svg',
    correctOption: 'C',
    correctText: 'C. Liti (Li)',
    question: 'Kim loại nào nhẹ nhất bảng tuần hoàn, có thể nổi bồng bềnh trên dầu hỏa?',
    options: [
      { key: 'A', text: 'Natri (Na)' },
      { key: 'B', text: 'Nhôm (Al)' },
      { key: 'C', text: 'Liti (Li)' },
      { key: 'D', text: 'Magiê (Mg)' }
    ],
    hint: 'Gợi ý: Nguyên tố số 3 nhóm IA, khối lượng riêng chỉ 0.534 g/cm³!',
    explanation: 'Liti nhẹ bằng một nửa nước, là trái tim của pin Lithium-ion trong smartphone và xe điện.',
    reaction: '2 Li + 2 H₂O → 2 LiOH + H₂ ↑',
    scenes: [
      {
        text: 'Thử tài trí nhớ bảng tuần hoàn! Kim loại nào nhẹ nhất trong tất cả các kim loại, nhẹ đến mức nổi bồng bềnh cả trên dầu hỏa?'
      },
      {
        text: 'Năm giây suy nghĩ! Gợi ý: Kim loại kiềm này có số hiệu nguyên tử là ba, là thành phần cốt lõi trong pin điện thoại và xe điện Tesla!'
      },
      {
        text: 'Đáp án đúng là C: Liti Li! Liti có khối lượng riêng chỉ không phẩy năm trăm ba mươi tư gam trên xăng ti mét khối, nhẹ bằng một nửa khối lượng riêng của nước!'
      },
      {
        text: 'Tra cứu nhiệt độ nóng chảy và bán kính nguyên tử Liti tại: ph-chem.web.app/table nhé!'
      }
    ]
  },
  {
    id: 9,
    key: 'quiz_09_oxy_gia_rua_vet_thuong',
    videoFileName: 'quiz_09_oxy_gia_rua_vet_thuong.mp4',
    title: 'ĐỐ VUI HÓA HỌC #09: BẢN CHẤT OXY GIÀ',
    tag: 'Y tế',
    themeColor: '#3b82f6',
    accentColor: '#93c5fd',
    svgFile: 'public/hinh/H2O2.90c5e405.svg',
    correctOption: 'B',
    correctText: 'B. Hiđro peoxit (H₂O₂)',
    question: 'Nước oxy già sát trùng vết thương sủi bọt trắng xóa thực chất là chất gì?',
    options: [
      { key: 'A', text: 'H₂O (Nước cất)' },
      { key: 'B', text: 'H₂O₂ (Hiđro peoxit)' },
      { key: 'C', text: 'O₃ (Ozon)' },
      { key: 'D', text: 'KMnO₄ (Thuốc tím)' }
    ],
    hint: 'Gợi ý: Phân tử gồm 2 nguyên tử H và 2 nguyên tử O liên kết đơn peoxit!',
    explanation: 'Enzim Catalase trong máu phân giải H2O2 thành O2 khí sủi bọt đẩy bụi bẩn ra ngoài.',
    reaction: '2 H₂O₂ → 2 H₂O + O₂ ↑  (Enzim Catalase)',
    scenes: [
      {
        text: 'Bí ẩn hộp cứu thương! Khi nhỏ nước oxy già vào vết thương thấy sủi bọt trắng xóa xèo xèo, bản chất hóa học của oxy già là gì?'
      },
      {
        text: 'Năm giây đếm ngược bắt đầu! Bọt khí sủi lên chính là khí oxy tinh khiết đẩy vi khuẩn ra ngoài đấy!'
      },
      {
        text: 'Đáp án là B: Hidro peoxit H2O2! Khi gặp enzim Catalase trong hồng cầu máu, H2O2 bị phân hủy thần tốc tạo nước và giải phóng hàng triệu bóng khí oxy sủi bọt!'
      },
      {
        text: 'Khám phá thêm hàng trăm cơ chế phản ứng hóa học tại: ph-chem.web.app nhé!'
      }
    ]
  },
  {
    id: 10,
    key: 'quiz_10_con_doc_methanol',
    videoFileName: 'quiz_10_con_doc_methanol.mp4',
    title: 'ĐỐ VUI HÓA HỌC #10: CỒN CÔNG NGHIỆP GÂY MÙ MẮT',
    tag: 'Sức khỏe',
    themeColor: '#f97316',
    accentColor: '#fdba74',
    svgFile: 'public/hinh/CH3OH.62557f83.svg',
    correctOption: 'B',
    correctText: 'B. Metanol (CH₃OH)',
    question: 'Cồn công nghiệp cực độc gây mù mắt và tử vong khi pha rượu giả là gì?',
    options: [
      { key: 'A', text: 'Etanol (C₂H₅OH)' },
      { key: 'B', text: 'Metanol (CH₃OH)' },
      { key: 'C', text: 'Glixerol' },
      { key: 'D', text: 'Propanol' }
    ],
    hint: 'Gợi ý: Ancol đơn giản nhất 1 Cacbon, bị gan chuyển hóa thành axit fomic phá hủy thần kinh!',
    explanation: 'Metanol bị enzym gan biến thành fomandehit và axit fomic gây toan hóa máu và mù lòa.',
    reaction: 'CH₃OH → HCHO → HCOOH  (Độc tố phá hủy thị giác)',
    scenes: [
      {
        text: 'Cảnh báo sức khỏe nghiêm trọng! Loại cồn công nghiệp cực độc bị kẻ xấu pha vào rượu giả, chỉ cần một chén nhỏ là gây mù mắt vĩnh viễn là gì?'
      },
      {
        text: 'Năm giây lựa chọn! Đây là ancol đơn chức nhỏ nhất chỉ có một nguyên tử cacbon trong phân tử!'
      },
      {
        text: 'Chính xác là B: Metanol CH3OH! Gan sẽ chuyển hóa metanol thành axit fomic cực độc tấn công trực diện vào dây thần kinh thị giác gây mù lòa và tử vong!'
      },
      {
        text: 'Truy cập ngay ph-chem.web.app để tra cứu phân biệt các loại ancol và rèn luyện kiến thức hóa học nhé!'
      }
    ]
  }
];

// 🎨 SLIDE 1: CÂU HỎI & 4 LỰA CHỌN (QUIZ QUESTION)
async function renderQuizSlide1(quiz, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const qLines = wrapSvgLines(quiz.question, 28);
  const qSvg = qLines.map((line, i) => 
    `<text x="360" y="${330 + i * 42}" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(line)}</text>`
  ).join('\n');

  // Render 4 options cards
  const optionsSvg = quiz.options.map((opt, i) => {
    const yBox = 480 + i * 115;
    return `
      <g transform="translate(60, ${yBox})">
        <rect width="600" height="96" rx="20" fill="#0f172a" fill-opacity="0.95" stroke="#334155" stroke-width="2" />
        <!-- Key circle -->
        <circle cx="56" cy="48" r="26" fill="${quiz.themeColor}" fill-opacity="0.25" stroke="${quiz.themeColor}" stroke-width="2" />
        <text x="56" y="56" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="900" fill="${quiz.accentColor}" text-anchor="middle">${opt.key}</text>
        <!-- Option text -->
        <text x="110" y="56" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">${xmlEscape(opt.text)}</text>
      </g>
    `;
  }).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050811" stop-opacity="1" />
          <stop offset="78%" stop-color="#050811" stop-opacity="1" />
          <stop offset="100%" stop-color="#050811" stop-opacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="${WIDTH}" height="240" fill="url(#topCoverGrad)" />
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#060913" fill-opacity="0.82" />

      <!-- Top Badge -->
      <rect x="130" y="70" width="460" height="54" rx="27" fill="${quiz.themeColor}" fill-opacity="0.25" stroke="${quiz.themeColor}" stroke-width="2.2" />
      <text x="360" y="106" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="900" fill="${quiz.accentColor}" text-anchor="middle" letter-spacing="2">🎯 THỬ THÁCH HÓA HỌC #${String(quiz.id).padStart(2, '0')}</text>

      <!-- Question Box -->
      <rect x="40" y="170" width="640" height="270" rx="26" fill="#1e293b" fill-opacity="0.9" stroke="${quiz.themeColor}" stroke-width="2.5" />
      <rect x="80" y="195" width="560" height="42" rx="12" fill="${quiz.themeColor}" fill-opacity="0.2" stroke="${quiz.themeColor}" stroke-width="1.2" />
      <text x="360" y="224" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="${quiz.accentColor}" text-anchor="middle">CHỦ ĐỀ: ${xmlEscape(quiz.tag).toUpperCase()}</text>

      ${qSvg}

      <!-- Options -->
      ${optionsSvg}

      <!-- Bottom Hint CTA -->
      <rect x="150" y="990" width="420" height="52" rx="26" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
      <text x="360" y="1024" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="bold" fill="#38bdf8" text-anchor="middle">💬 Bạn chọn đáp án A, B, C hay D?</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_01.jpg'));
}

// 🎨 SLIDE 2: ĐẾM NGƯỢC 5S & GỢI Ý CẤU TRÚC PHÂN TỬ
async function renderQuizSlide2(quiz, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  // Render SVG cấu trúc nếu có
  const svgAbs = path.join(ROOT_DIR, quiz.svgFile);
  let molBuf = null;
  if (fs.existsSync(svgAbs)) {
    molBuf = await sharp(svgAbs)
      .resize(320, 190, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0.96 } })
      .png()
      .toBuffer();
  }

  const hintLines = wrapSvgLines(quiz.hint, 32);
  const hintSvg = hintLines.map((line, i) => 
    `<text x="360" y="${840 + i * 38}" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#fde047" text-anchor="middle">${xmlEscape(line)}</text>`
  ).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="#060913" fill-opacity="0.86" />

      <!-- Top Badge -->
      <rect x="180" y="70" width="360" height="48" rx="24" fill="${quiz.themeColor}" fill-opacity="0.25" stroke="${quiz.themeColor}" stroke-width="2" />
      <text x="360" y="102" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="900" fill="${quiz.accentColor}" text-anchor="middle">⏱️ THỜI GIAN ĐẾM NGƯỢC</text>

      <!-- Countdown Giant Box -->
      <circle cx="360" cy="240" r="100" fill="#0f172a" stroke="url(#timerGrad)" stroke-width="8" stroke-dasharray="14 10" />
      <text x="360" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="96" font-weight="900" fill="#ffffff" text-anchor="middle">5s</text>

      <!-- Molecule Box Hint -->
      <rect x="50" y="380" width="620" height="380" rx="26" fill="#0f172a" stroke="${quiz.themeColor}" stroke-width="2" />
      <text x="360" y="425" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="${quiz.accentColor}" text-anchor="middle">💡 HÌNH ẢNH GỢI Ý CẤU TRÚC PHÂN TỬ</text>

      <!-- White Canvas for Molecule -->
      <rect x="180" y="450" width="360" height="220" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="3" />
      <text x="360" y="710" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8" text-anchor="middle">Cấu trúc 2D tiêu chuẩn IUPAC trên pH-Chem</text>

      <!-- Clue Text Card -->
      <rect x="50" y="790" width="620" height="170" rx="22" fill="#1e293b" stroke="#ca8a04" stroke-width="2" />
      ${hintSvg}

      <!-- Bottom comment callout -->
      <rect x="110" y="1010" width="500" height="60" rx="30" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" />
      <text x="360" y="1048" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="900" fill="#c7d2fe" text-anchor="middle">⚡ Bình luận nhanh trước khi hết giờ!</text>
    </svg>
  `);

  const composites = [{ input: svg, top: 0, left: 0 }];
  if (molBuf) {
    composites.push({ input: molBuf, top: 465, left: 200 });
  }

  await base.composite(composites).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_02.jpg'));
}

// 🎨 SLIDE 3: CÔNG BỐ ĐÁP ÁN ĐÚNG & GIẢI THÍCH CHI TIẾT
async function renderQuizSlide3(quiz, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const expLines = wrapSvgLines(quiz.explanation, 32);
  const expSvg = expLines.map((line, i) => 
    `<text x="60" y="${640 + i * 36}" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#f1f5f9">${xmlEscape(line)}</text>`
  ).join('\n');

  const rxLines = wrapSvgLines(quiz.reaction, 30);
  const rxSvg = rxLines.map((line, i) => 
    `<text x="360" y="${840 + i * 38}" font-family="Consolas, 'Segoe UI', monospace" font-size="24" font-weight="bold" fill="#38bdf8" text-anchor="middle">${xmlEscape(line)}</text>`
  ).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="answerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="#060913" fill-opacity="0.86" />

      <!-- Top Result Badge -->
      <rect x="160" y="70" width="400" height="52" rx="26" fill="#10b981" fill-opacity="0.25" stroke="#34d399" stroke-width="2.2" />
      <text x="360" y="104" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="900" fill="#6ee7b7" text-anchor="middle">🎉 CÔNG BỐ ĐÁP ÁN ĐÚNG</text>

      <!-- Main Answer Card Highlighted -->
      <rect x="40" y="160" width="640" height="230" rx="26" fill="url(#answerGlow)" stroke="#6ee7b7" stroke-width="3" />
      <text x="360" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#ecfdf5" text-anchor="middle">ĐÁP ÁN CHÍNH XÁC LÀ:</text>
      
      <!-- Big Key Badge -->
      <circle cx="360" cy="290" r="48" fill="#ffffff" stroke="#10b981" stroke-width="3" />
      <text x="360" y="306" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="900" fill="#047857" text-anchor="middle">${quiz.correctOption}</text>

      <text x="360" y="375" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(quiz.correctText)}</text>

      <!-- Explanation Box -->
      <rect x="40" y="420" width="640" height="540" rx="26" fill="#0f172a" stroke="#334155" stroke-width="2" />
      
      <rect x="70" y="450" width="580" height="46" rx="14" fill="#334155" />
      <text x="360" y="481" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#38bdf8" text-anchor="middle">🔬 GIẢI THÍCH BẢN CHẤT HÓA HỌC</text>

      <!-- Explanation Content -->
      <text x="60" y="550" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="${quiz.accentColor}">Cơ chế khoa học:</text>
      ${expSvg}

      <!-- Reaction Box Inner -->
      <rect x="60" y="750" width="600" height="170" rx="18" fill="#1e293b" stroke="${quiz.themeColor}" stroke-width="1.8" />
      <text x="360" y="790" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#94a3b8" text-anchor="middle">PHƯƠNG TRÌNH PHẢN ỨNG MINH HỌA</text>
      ${rxSvg}

      <!-- Bottom Tag -->
      <rect x="140" y="1000" width="440" height="50" rx="25" fill="#047857" fill-opacity="0.3" stroke="#10b981" stroke-width="1.5" />
      <text x="360" y="1033" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#6ee7b7" text-anchor="middle">✨ Bạn có trả lời đúng câu này không?</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_03.jpg'));
}

// 🎨 SLIDE 4: CALL TO ACTION (LUYỆN 500+ CÂU TRẮC NGHIỆM)
async function renderQuizSlide4(quiz, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

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
      <rect x="140" y="70" width="440" height="50" rx="25" fill="#3b82f6" fill-opacity="0.25" stroke="#60a5fa" stroke-width="2" />
      <text x="360" y="103" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="900" fill="#93c5fd" text-anchor="middle">🎓 PHÒNG LUYỆN THI HÓA HỌC 30S</text>

      <!-- Main CTA Card -->
      <rect x="40" y="160" width="640" height="820" rx="32" fill="url(#ctaCardGrad)" stroke="#6366f1" stroke-width="2.5" />

      <text x="360" y="240" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle">MUỐN THỬ THÁCH THÊM?</text>
      <text x="360" y="285" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#818cf8" text-anchor="middle">Kho 500+ đề trắc nghiệm thông minh</text>

      <!-- Feature List -->
      <g transform="translate(80, 340)">
        <rect width="560" height="80" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="30" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="26">⏱️</text>
        <text x="75" y="49" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#f8fafc">Đồng hồ đếm ngược 30s kịch tính</text>
      </g>

      <g transform="translate(80, 440)">
        <rect width="560" height="80" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="30" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="26">📊</text>
        <text x="75" y="49" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#f8fafc">Xuất phiếu điểm ảnh đẹp để khoe</text>
      </g>

      <g transform="translate(80, 540)">
        <rect width="560" height="80" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="30" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="26">🧪</text>
        <text x="75" y="49" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#f8fafc">Đề chuẩn từ giáo viên &amp; AI tự sinh</text>
      </g>

      <g transform="translate(80, 640)">
        <rect width="560" height="80" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="30" y="48" font-family="Segoe UI, Arial, sans-serif" font-size="26">⚡</text>
        <text x="75" y="49" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#f8fafc">Chạy mượt offline, 100% miễn phí</text>
      </g>

      <!-- Highlight Website URL -->
      <rect x="70" y="760" width="580" height="100" rx="20" fill="#0284c7" stroke="#38bdf8" stroke-width="2.5" />
      <text x="360" y="805" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#e0f2fe" text-anchor="middle">TRUY CẬP NGAY WEBSITE CHÍNH THỨC:</text>
      <text x="360" y="842" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">https://ph-chem.web.app/quiz</text>

      <text x="360" y="920" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#94a3b8" text-anchor="middle">Hóa học chuyên nghiệp • Tra cứu • Luyện đề</text>

      <!-- Bottom Tag -->
      <rect x="180" y="1030" width="360" height="48" rx="24" fill="#030712" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="1062" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">👉 Nhấn Lưu &amp; Chia sẻ ngay!</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_04.jpg'));
}

export async function buildSingleQuizReel(quiz) {
  const ffmpeg = getFfmpegPath();
  const reelDir = path.join(REELS_DIR, quiz.key);
  if (!fs.existsSync(reelDir)) fs.mkdirSync(reelDir, { recursive: true });

  const videoOut = path.join(REELS_DIR, quiz.videoFileName);
  console.log(`\n==================================================`);
  console.log(`🎬 BẮT ĐẦU DỰNG QUIZ REEL #${quiz.id}: ${quiz.title}`);
  console.log(`📁 Thư mục làm việc: ${reelDir}`);

  // 1. Tạo audio TTS cho 4 cảnh
  const audioList = [];
  const sceneDurations = [];

  for (let i = 0; i < quiz.scenes.length; i++) {
    const s = quiz.scenes[i];
    const sPath = path.join(reelDir, `speech_${String(i + 1).padStart(2, '0')}.mp3`);
    console.log(`🎙️ [Cảnh ${i + 1}/4] Đang tạo giọng thuyết minh AI...`);
    await saveSpeech(sPath, s.text, '+12%');

    // FFmpeg khi chỉ có -i mà không có file ra thì luôn thoát với mã lỗi 1,
    // nên execSync sẽ ném ngoại lệ. Dùng spawnSync và đọc stderr thay vì vậy.
    const probeRes = spawnSync(ffmpeg, ['-i', sPath], { encoding: 'utf8' });
    const probe = (probeRes.stderr || '') + (probeRes.stdout || '');
    const match = probe.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
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

  // 2. Render 4 slide đồ họa
  console.log('🎨 Đang kết xuất 4 slide đồ họa 720x1280...');
  await renderQuizSlide1(quiz, reelDir);
  await renderQuizSlide2(quiz, reelDir);
  await renderQuizSlide3(quiz, reelDir);
  await renderQuizSlide4(quiz, reelDir);

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
    throw new Error(`FFmpeg lỗi khi tạo video ${quiz.title}`);
  }

  const stat = fs.statSync(videoOut);
  console.log(`✅ XUẤT QUIZ REEL THÀNH CÔNG: ${videoOut} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
  return videoOut;
}

export async function generateAllQuizReels() {
  console.log(`🚀 KHỞI ĐỘNG TIẾN TRÌNH TẠO 10 QUIZ REEL "ĐỐ VUI HÓA HỌC"...`);
  const results = [];
  for (const quiz of QUIZ_REELS) {
    const vPath = await buildSingleQuizReel(quiz);
    results.push({ ...quiz, path: vPath });
  }
  console.log(`\n🎉 HOÀN TẤT TẠO TOÀN BỘ 10 QUIZ REEL TRONG promo/reels/!`);
  return results;
}

if (process.argv[1]?.endsWith('gen-quiz-reels.mjs')) {
  const targetId = process.argv[2];
  if (targetId && targetId !== 'all') {
    const q = QUIZ_REELS.find(item => String(item.id) === targetId || item.key === targetId);
    if (!q) {
      console.error(`❌ Không tìm thấy quiz reel với ID/key: ${targetId}`);
      process.exit(1);
    }
    buildSingleQuizReel(q).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else {
    generateAllQuizReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  }
}
