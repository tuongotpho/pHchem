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
    .replace(/Fe2O3/gi, 'sắt ba oxit')
    .replace(/Li\+/g, 'ion liti')
    .replace(/SiO2/gi, 'silic đioxit')
    .replace(/TiO2/gi, 'titan đioxit')
    .replace(/sp2/gi, 'ét pê hai')
    .replace(/VIIIA/gi, 'tám A')
    .replace(/465°C/g, 'bốn trăm sáu mươi lăm độ C')
    .replace(/1600°C/g, 'một ngàn sáu trăm độ C')
    .replace(/1000°C/g, 'một ngàn độ C')
    .replace(/3000°C/g, 'ba ngàn độ C')
    .replace(/300°C/g, 'ba trăm độ C')
    .replace(/4°C/g, '4 độ C')
    .replace(/800°C/g, '800 độ C')
    .replace(/4\.6\s*tỷ/g, 'bốn phẩy sáu tỷ')
    .replace(/6\.5\s*mét/g, 'sáu phẩy năm mét')
    .replace(/99\.8%/g, 'chín mươi chín phẩy tám phần trăm')
    .replace(/96%/g, 'chín mươi sáu phần trăm')
    .replace(/98%/g, 'chín mươi tám phần trăm')
    .replace(/45%/g, 'bốn mươi lăm phần trăm')
    .replace(/4\s*triệu/g, 'bốn triệu')
    .replace(/4\s*gam/g, 'bốn gam')
    .replace(/70\s*km\/s/g, 'bảy mươi kilômét một giây')
    .replace(/600\s*km\/h/g, 'sáu trăm kilômét một giờ')
    .replace(/4500\s*m\/s/g, 'bốn ngàn năm trăm mét trên giây')
    .replace(/253\s*độ\s*C/g, 'hai trăm năm mươi ba độ C');
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

async function saveSpeech(filePath, text, rate = '+14%') {
  const force = Boolean(process.env.FORCE === '1' || process.env.FORCE_AUDIO === '1');
  if (!force && fs.existsSync(filePath) && fs.statSync(filePath).size > 2000) {
    return filePath;
  }

  const ttsText = cleanTextForTts(text);

  let retries = 8;
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
        await new Promise(r => setTimeout(r, 600));
        return filePath;
      }
      throw new Error('Buffer audio quá nhỏ');
    } catch (err) {
      retries--;
      console.warn(`⚠️ Lỗi TTS (${err.message}). Đang thử lại... (${retries} lần còn lại)`);
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

export const FACT_REELS = [
  {
    id: 1,
    key: 'reel_01_kien_can',
    videoFileName: 'reel_01_kien_can.mp4',
    title: 'BỊ KIẾN CẮN: VÌ SAO BÔI VÔI HAY XÀ PHÒNG?',
    tag: 'Đời sống',
    themeColor: '#f59e0b',
    accentColor: '#fbbf24',
    svgFile: 'public/hinh/HCOOH.866fa1d3.svg',
    compoundName: 'Axit Formic (HCOOH)',
    reaction: '2 HCOOH + Ca(OH)₂ → (HCOO)₂Ca + 2 H₂O',
    route: 'calculator',
    scenes: [
      {
        text: 'Bạn có biết tại sao khi bị kiến cắn hay ong đốt, ông bà ta thường bảo bôi chút vôi hoặc xà phòng là dịu ngay không?',
        badge: 'BẠN CÓ BIẾT? #01',
        h1: 'BỊ KIẾN CẮN',
        h2: 'VÌ SAO BÔI VÔI & XÀ PHÒNG?',
        sub: 'Mẹo dân gian dưới góc nhìn hóa học'
      },
      {
        text: 'Thủ phạm gây ngứa rát chính là Axit Formic — một axit hữu cơ đặc trưng có trong nọc độc kiến và côn trùng!',
        factTitle: 'NỌC ĐỘC CHỨA AXIT FORMIC',
        factDesc: 'Axit formic (HCOOH) là axit cacboxylic đơn giản nhưng tính axit mạnh gấp 10 lần axit trong giấm ăn!'
      },
      {
        text: 'Vôi tôi Ca(OH)2 hay xà phòng có tính kiềm. Phản ứng trung hòa diễn ra tức thì, chuyển axit thành muối và nước vô hại, dập tắt cơn đau ngứa!',
        rxTitle: 'PHẢN ỨNG TRUNG HÒA TỨC THÌ',
        rxDesc: 'Chuyển hóa axit nọc độc thành muối canxi fomat vô hại'
      },
      {
        text: 'Kiểm tra độ pH và mô phỏng phản ứng trung hòa chỉ trong 1 giây tại website chính thức: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    id: 2,
    key: 'reel_02_da_noi',
    videoFileName: 'reel_02_da_noi.mp4',
    title: 'NGHỊCH LÝ ĐÁ NỔI CỨU SỐNG HÀNH TINH',
    tag: 'Tự nhiên',
    themeColor: '#06b6d4',
    accentColor: '#22d3ee',
    svgFile: 'public/hinh/H2O.d9875909.svg',
    compoundName: 'Phân tử Nước (H₂O)',
    reaction: 'D(đá) = 0.917 g/cm³ < D(nước) = 1.0 g/cm³',
    route: 'formulas',
    scenes: [
      {
        text: 'Gần như mọi chất khi đóng băng đều co lại và chìm xuống, nhưng tại sao nước đá lại nổi bồng bềnh trên mặt nước?',
        badge: 'BẠN CÓ BIẾT? #02',
        h1: 'NGHỊCH LÝ NƯỚC ĐÁ NỔI',
        h2: 'CỨU SỐNG CẢ HÀNH TINH',
        sub: 'Sự kỳ diệu của liên kết Hydro'
      },
      {
        text: 'Theo dữ liệu thực tiễn trên pH-Chem: Khi hạ dưới 4 độ C, các liên kết hydro đẩy phân tử nước dãn nở thành mạng tinh thể lục giác rỗng!',
        factTitle: 'MẠNG TINH THỂ LỤC GIÁC RỖNG',
        factDesc: 'Khoảng trống giữa các phân tử dãn nở làm khối lượng riêng của băng nhẹ hơn nước lỏng!'
      },
      {
        text: 'Nhờ đá nổi lên, bề mặt hồ tạo thành tấm chăn cách nhiệt hoàn hảo, giúp sinh vật thủy sinh dưới đáy sống sót qua mùa đông buốt giá!',
        rxTitle: 'TẤM CHĂN GIỮ NHIỆT KỲ DIỆU',
        rxDesc: 'Nếu đá chìm, các đại dương sẽ đông cứng từ đáy lên và sự sống Trái Đất bị xóa sổ'
      },
      {
        text: 'Khám phá cấu trúc không gian 3D của Nước và hơn 340 hợp chất hóa học tại website: ph-chem.web.app/formulas nhé!',
        ctaUrl: 'ph-chem.web.app/formulas'
      }
    ]
  },
  {
    id: 3,
    key: 'reel_03_con_70_do',
    videoFileName: 'reel_03_con_70_do.mp4',
    title: 'VÌ SAO CỒN 70° DIỆT KHUẨN TỐT HƠN CỒN 90°?',
    tag: 'Y học',
    themeColor: '#10b981',
    accentColor: '#34d399',
    svgFile: 'public/hinh/C2H5OH.870981b5.svg',
    compoundName: 'Ethanol (C₂H₅OH)',
    reaction: 'C₁V₁ = C₂V₂ (Pha loãng nồng độ)',
    route: 'calculator',
    scenes: [
      {
        text: 'Độ cồn càng cao thì diệt khuẩn càng mạnh? Sự thật hoàn toàn ngược lại: Cồn 70 độ sát trùng tốt hơn cồn 90 độ rất nhiều!',
        badge: 'BẠN CÓ BIẾT? #03',
        h1: 'CỒN 70° DIỆT KHUẨN',
        h2: 'TỐT HƠN CỒN 90°?',
        sub: 'Nghịch lý y học ít người để ý'
      },
      {
        text: 'Cồn 90% quá háo nước, làm đông tụ vỏ ngoài protein của vi khuẩn quá nhanh, vô tình tạo bức tường bảo vệ nhân vi khuẩn bên trong!',
        factTitle: 'CƠ CHẾ ĐÔNG TỤ PROTEIN',
        factDesc: 'Vỏ ngoài bị chai cứng tức thì ngăn cồn thấm sâu, vi khuẩn bên trong vẫn tồn tại'
      },
      {
        text: 'Tỷ lệ vàng 70% cồn và 30% nước giúp làm chậm quá trình đông tụ, cho phép cồn thẩm thấu sâu vào nhân và tiêu diệt mầm bệnh tận gốc!',
        rxTitle: 'TỶ LỆ VÀNG 70% ETHANOL',
        rxDesc: 'Nước đóng vai trò dung môi dẫn đường cho ethanol ngấm sâu vào màng tế bào'
      },
      {
        text: 'Tính toán tỷ lệ pha loãng nồng độ cồn và dung dịch chỉ trong 1 chạm tại: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    id: 4,
    key: 'reel_04_hanh_cay_mat',
    videoFileName: 'reel_04_hanh_cay_mat.mp4',
    title: 'CẮT HÀNH TÂY VÌ SAO CHẢY NƯỚC MẮT?',
    tag: 'Ẩm thực',
    themeColor: '#ec4899',
    accentColor: '#f472b6',
    svgFile: 'public/hinh/H2SO3.0e91d833.svg',
    compoundName: 'Axit Sunfurơ (H₂SO₃)',
    reaction: 'Khí lưu huỳnh + H₂O mắt → Axit loãng kích ứng',
    route: 'formulas',
    scenes: [
      {
        text: 'Tại sao dù tâm trạng đang rất vui, nhưng chỉ cần bổ một củ hành tây là bạn lại khóc nức nở không kìm được?',
        badge: 'BẠN CÓ BIẾT? #04',
        h1: 'CẮT HÀNH TÂY',
        h2: 'VÌ SAO RƠI NƯỚC MẮT?',
        sub: 'Vũ khí phòng vệ hóa học của thực vật'
      },
      {
        text: 'Khi dao cắt đứt tế bào, enzim lập tức phân giải axit amin thành một chất khí chứa lưu huỳnh bay lơ lửng: Syn-propanethial-S-oxide!',
        factTitle: 'KHÍ LƯU HUỲNH BAY HƠI',
        factDesc: 'Hợp chất lưu huỳnh dễ bay hơi là cơ chế tự nhiên giúp hành xua đuổi sâu bọ gặm nhấm'
      },
      {
        text: 'Khí này bay lên tiếp xúc với nước mắt và chuyển thành dung dịch axit loãng. Tuyến lệ lập tức xả nước ồ ạt để bảo vệ giác mạc!',
        rxTitle: 'PHẢN ỨNG TẠO AXIT TRONG MẮT',
        rxDesc: 'Mẹo hay: Ngâm hành trong nước lạnh hoặc làm lạnh trước khi cắt để giảm bay hơi'
      },
      {
        text: 'Tra cứu hàng trăm hợp chất hữu cơ và cấu trúc hóa học sinh động tại website chính thức: ph-chem.web.app/formulas nhé!',
        ctaUrl: 'ph-chem.web.app/formulas'
      }
    ]
  },
  {
    id: 5,
    key: 'reel_05_kim_cuong_chay',
    videoFileName: 'reel_05_kim_cuong_chay.mp4',
    title: 'KIM CƯƠNG CÓ BỊ THIÊU RỤI THÀNH KHÓI?',
    tag: 'Bất ngờ',
    themeColor: '#a855f7',
    accentColor: '#c084fc',
    svgFile: 'public/hinh/CO2.f9e76a2b.svg',
    compoundName: 'Cacbon Đioxit (CO₂)',
    reaction: 'C (kim cương) + O₂ → CO₂ ↑ (t° ≈ 800°C)',
    route: 'table',
    scenes: [
      {
        text: 'Vật chất tự nhiên cứng nhất hành tinh — liệu một viên kim cương đắt giá có thể bị ngọn lửa thiêu rụi hoàn toàn không?',
        badge: 'BẠN CÓ BIẾT? #05',
        h1: 'KIM CƯƠNG ĐẮT TIỀN',
        h2: 'CÓ CHÁY ĐƯỢC KHÔNG?',
        sub: 'Biến hàng tỷ đồng thành làn khói vô hình'
      },
      {
        text: 'Câu trả lời là CÓ! Kim cương và ruột bút chì than thực chất đều được cấu tạo từ một nguyên tố duy nhất: Cacbon thuần khiết!',
        factTitle: '100% NGUYÊN TỐ CACBON',
        factDesc: 'Chỉ khác biệt ở mạng tinh thể: kim cương tứ diện cứng chắc, than chì dạng lớp mềm mại'
      },
      {
        text: 'Ở khoảng 800 độ C trong khí oxy, kim cương sẽ bốc cháy rực rỡ và biến thành khí CO2, bốc hơi sạch sẽ không để lại chút tro nào!',
        rxTitle: 'CHÁY THÀNH KHÍ CO2 VÔ HÌNH',
        rxDesc: 'Cacbon tác dụng với oxy ở nhiệt độ cao sinh khí cacbonic nguyên chất bay đi'
      },
      {
        text: 'Khám phá bí mật của nguyên tố Cacbon và trọn bộ 118 nguyên tố trên Bảng tuần hoàn tại: ph-chem.web.app/table nhé!',
        ctaUrl: 'ph-chem.web.app/table'
      }
    ]
  },
  {
    id: 6,
    key: 'reel_06_baking_soda_giam',
    videoFileName: 'reel_06_baking_soda_giam.mp4',
    title: 'BAKING SODA + GIẤM: NÚI LỬA TẨY RỬA',
    tag: 'Ẩm thực',
    themeColor: '#3b82f6',
    accentColor: '#60a5fa',
    svgFile: 'public/hinh/CH3COOH.0958c58f.svg',
    compoundName: 'Axit Axetic (CH₃COOH)',
    reaction: 'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂ ↑',
    route: 'reactions',
    scenes: [
      {
        text: 'Mẹo vặt dọn nhà nào cũng bảo trộn Baking Soda với Giấm. Nhưng dưới góc nhìn hóa học, điều gì thực sự xảy ra?',
        badge: 'BẠN CÓ BIẾT? #06',
        h1: 'BAKING SODA + GIẤM',
        h2: 'BÍ MẬT TẨY RỬA THẦN THÁNH',
        sub: 'Áp lực sủi bọt hàng triệu bọt khí CO2'
      },
      {
        text: 'Baking soda mang tính kiềm nhẹ, còn giấm là dung dịch axit axetic. Khi gặp nhau, chúng xảy ra phản ứng trao đổi cực kỳ mãnh liệt!',
        factTitle: 'PHẢN ỨNG TRAO ĐỔI AXIT - BAZƠ',
        factDesc: 'Natri hidrocacbonat phản ứng tức thì với axit giải phóng khí CO2 sủi bọt dâng trào'
      },
      {
        text: 'Chính áp lực cơ học từ hàng triệu bọt khí CO2 sủi tăm liên tục đã bóc tách các mảng bám dầu mỡ cứng đầu trong đường ống!',
        rxTitle: 'BÓC TÁCH CẶN BẨN CƠ HỌC',
        rxDesc: 'Khí CO2 thoát ra đẩy tung cặn bẩn mà không làm hại lớp men thiết bị'
      },
      {
        text: 'Cân bằng tự động mọi phương trình hóa học và xem hiện tượng thực tế chỉ trong 1 giây tại: ph-chem.web.app/reactions nhé!',
        ctaUrl: 'ph-chem.web.app/reactions'
      }
    ]
  },
  {
    id: 7,
    key: 'reel_07_mau_phao_hoa',
    videoFileName: 'reel_07_mau_phao_hoa.mp4',
    title: 'VÌ SAO PHÁO HOA CÓ MUÔN MÀU RỰC RỠ?',
    tag: 'Đời sống',
    themeColor: '#f97316',
    accentColor: '#fb923c',
    svgFile: 'public/hinh/CuSO4.2d478c5e.svg',
    compoundName: 'Đồng Sunfat (CuSO₄)',
    reaction: 'Cu²⁺ (Lam) · Sr²⁺ (Đỏ) · Ba²⁺ (Lục) · Na⁺ (Vàng)',
    route: 'table',
    scenes: [
      {
        text: 'Ai là họa sĩ bí mật vẽ nên những sắc màu rực rỡ bùng nổ của pháo hoa đêm giao thừa? Khám phá ngay bí mật hóa học này!',
        badge: 'BẠN CÓ BIẾT? #07',
        h1: 'VŨ ĐIỆU PHÁO HOA',
        h2: 'VÌ SAO MUÔN MÀU RỰC RỠ?',
        sub: 'Phổ phát xạ màu sắc ngọn lửa kim loại'
      },
      {
        text: 'Đó là vũ điệu của các nguyên tố kim loại! Khi bị nung nóng, các electron nhảy lên mức năng lượng cao rồi rơi về, phát ra ánh sáng đơn sắc!',
        factTitle: 'PHỔ PHÁT XẠ NGUYÊN TỬ',
        factDesc: 'Mỗi ion kim loại phát ra bước sóng quang phổ ánh sáng đặc trưng không thể nhầm lẫn'
      },
      {
        text: 'Muối đồng cho màu xanh lam huyền ảo, Stronti cho màu đỏ rực, Bari cho màu xanh lục, và Natri cho ánh sáng vàng chói lọi!',
        rxTitle: 'BẢNG MÀU NGUYÊN TỐ KIM LOẠI',
        rxDesc: 'Các nhà chế tạo pháo hoa phối trộn muối kim loại chính xác để tạo hiệu ứng ánh sáng'
      },
      {
        text: 'Tra cứu tính chất ngọn lửa và màu sắc nhận biết kim loại trong Bảng tuần hoàn tại: ph-chem.web.app/table nhé!',
        ctaUrl: 'ph-chem.web.app/table'
      }
    ]
  },
  {
    id: 8,
    key: 'reel_08_mau_xanh_muc_cua',
    videoFileName: 'reel_08_mau_xanh_muc_cua.mp4',
    title: 'VÌ SAO SAM BIỂN CÓ MÁU XANH DƯƠNG?',
    tag: 'Cơ thể',
    themeColor: '#0284c7',
    accentColor: '#38bdf8',
    svgFile: 'public/hinh/CuCl2.4833741e.svg',
    compoundName: 'Phức Đồng Cu(II)',
    reaction: 'Máu đỏ: Fe²⁺ (Hemoglobin)  vs  Máu xanh: Cu²⁺ (Hemocyanin)',
    route: 'electro',
    scenes: [
      {
        text: 'Bạn có tin trên hành tinh chúng ta thực sự tồn tại những sinh vật mang dòng máu màu xanh dương quý tộc tự nhiên không?',
        badge: 'BẠN CÓ BIẾT? #08',
        h1: 'DÒNG MÁU XANH DƯƠNG',
        h2: 'CỦA MỰC VÀ SAM BIỂN',
        sub: 'Ion Sắt vs Ion Đồng trong tự nhiên'
      },
      {
        text: 'Máu con người màu đỏ vì protein Hemoglobin chứa ion Sắt Fe2+ làm lõi vận chuyển phân tử oxy đi khắp cơ thể.',
        factTitle: 'SẮT (Fe) LÀM NÊN MÁU ĐỎ',
        factDesc: 'Khi Fe(II) liên kết với oxy tạo phức mang màu đỏ tươi của máu động vật có vú'
      },
      {
        text: 'Nhưng mực và sam biển sống dưới đáy biển lạnh lại dùng Hemocyanin chứa ion Đồng Cu2+. Khi gắn với oxy, máu của chúng hóa màu xanh biếc!',
        rxTitle: 'ĐỒNG (Cu) HÓA MÁU XANH BIẾC',
        rxDesc: 'Hemocyanin hoạt động hiệu quả vượt trội trong môi trường nước biển lạnh giá thiếu oxy'
      },
      {
        text: 'Khám phá thế điện cực, phức chất và tính chất kim loại trên công cụ Dãy điện hóa tại: ph-chem.web.app/electro nhé!',
        ctaUrl: 'ph-chem.web.app/electro'
      }
    ]
  },
  {
    id: 9,
    key: 'reel_09_nuoc_ngot_co_ga',
    videoFileName: 'reel_09_nuoc_ngot_co_ga.mp4',
    title: 'TIẾNG XÌ XÌ BÍ ẨN CỦA NƯỚC NGỌT',
    tag: 'Ẩm thực',
    themeColor: '#ef4444',
    accentColor: '#f87171',
    svgFile: 'public/hinh/H2CO3.9d103b92.svg',
    compoundName: 'Axit Cacbonic (H₂CO₃)',
    reaction: 'CO₂ (khí) + H₂O ⇌ H₂CO₃ (dung dịch)',
    route: 'quiz',
    scenes: [
      {
        text: 'Tiếng xì xì sảng khoái mỗi khi giật nắp lon nước ngọt thực chất là một bài toán cân bằng hóa học kinh điển trong đời sống!',
        badge: 'BẠN CÓ BIẾT? #09',
        h1: 'MỞ LON NƯỚC NGỌT',
        h2: 'TIẾNG XÌ XÌ TỪ ĐÂU RA?',
        sub: 'Nguyên lý chuyển dịch cân bằng Le Chatelier'
      },
      {
        text: 'Trong nhà máy, khí CO2 được nén dưới áp suất cao vào nước ngọt để hòa tan thành axit cacbonic H2CO3 tạo vị tê the mát.',
        factTitle: 'HÒA TAN KHÍ CO2 DƯỚI ÁP SUẤT CAO',
        factDesc: 'Định luật Henry: Áp suất chất khí càng cao thì độ tan trong dung dịch càng lớn'
      },
      {
        text: 'Khi mở nắp, áp suất giảm đột ngột. Cân bằng lập tức chuyển dịch sang chiều nghịch, giải phóng ồ ạt hàng triệu bọt khí CO2 ra ngoài!',
        rxTitle: 'NGUYÊN LÝ LE CHATELIER',
        rxDesc: 'Hệ thống tự dịch chuyển cân bằng khi áp suất bên ngoài giảm đột ngột'
      },
      {
        text: 'Ôn luyện ngay các câu hỏi thực tế về Chuyển dịch cân bằng hóa học trong phòng thi 30 giây tại: ph-chem.web.app/quiz nhé!',
        ctaUrl: 'ph-chem.web.app/quiz'
      }
    ]
  },
  {
    id: 10,
    key: 'reel_10_tui_khi_o_to',
    videoFileName: 'reel_10_tui_khi_o_to.mp4',
    title: 'TÚI KHÍ Ô TÔ: NỔ CỨU MẠNG TRONG 0.03s',
    tag: 'An toàn',
    themeColor: '#14b8a6',
    accentColor: '#2dd4bf',
    svgFile: 'public/hinh/N2.82183cd1.svg',
    compoundName: 'Khí Nitơ (N₂)',
    reaction: '2 NaN₃ → 2 Na + 3 N₂ ↑ (Thời gian < 0.03s)',
    route: 'calculator',
    scenes: [
      {
        text: 'Chỉ mất 0,03 giây để cứu mạng một con người — túi khí ô tô lấy đâu ra lượng khí khổng lồ nhanh thần tốc đến như vậy?',
        badge: 'BẠN CÓ BIẾT? #10',
        h1: 'TÚI KHÍ Ô TÔ BUNG TRONG 0.03s',
        h2: 'PHẢN ỨNG NỔ CỨU MẠNG',
        sub: 'Tốc độ phản ứng siêu thanh trong đời sống'
      },
      {
        text: 'Không có máy nén khí nào phản ứng kịp! Bên trong túi khí chứa một lượng thuốc nổ rắn Natri Azide NaN3!',
        factTitle: 'THUỐC NỔ RẮN NATRI AZIDE',
        factDesc: 'Hợp chất NaN3 cực kỳ bền ở nhiệt độ thường nhưng kích nổ chớp nhoáng khi nhận xung điện va chạm'
      },
      {
        text: 'Khi va chạm mạnh, cảm biến kích hoạt tia lửa điện làm NaN3 phân hủy chớp nhoáng, tạo ra hàng chục lít khí Nitơ N2 thổi phồng túi khí!',
        rxTitle: 'PHÂN HỦY THÀNH KHÍ NITƠ VÔ HẠI',
        rxDesc: 'Khí N2 trơ không độc hại làm phồng túi đệm trước khi người lái bị va đập'
      },
      {
        text: 'Tính toán thể tích khí sinh ra, số mol và giải bài tập hóa học siêu tốc tại: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    id: 11,
    key: 'reel_11_trung_luoc_xam_xanh',
    videoFileName: 'reel_11_trung_luoc_xam_xanh.mp4',
    title: 'VÌ SAO LÒNG ĐỎ TRỨNG CÓ VIỀN XÁM XANH?',
    tag: 'Ẩm thực',
    themeColor: '#eab308',
    accentColor: '#fde047',
    svgFile: 'public/hinh/FeS.dcaaa4a7.svg',
    compoundName: 'Sắt(II) Sunfua (FeS)',
    reaction: 'Fe²⁺ (lòng đỏ) + H₂S (lòng trắng) → FeS ↓',
    route: 'formulas',
    scenes: [
      {
        text: 'Bạn có biết tại sao khi luộc trứng gà quá lâu, bề mặt lòng đỏ lại xuất hiện một lớp viền màu xám xanh kỳ lạ không?',
        badge: 'BẠN CÓ BIẾT? #11',
        h1: 'LUỘC TRỨNG QUÁ KỸ',
        h2: 'VÌ SAO XUẤT HIỆN VIỀN XÁM XANH?',
        sub: 'Bí mật ẩm thực dưới góc nhìn hóa học'
      },
      {
        text: 'Khi bị đun nóng lâu, protein lòng trắng giải phóng khí hydro sunfua H2S có mùi đặc trưng.',
        factTitle: 'GIẢI PHÓNG KHÍ HYDRO SUNFUA',
        factDesc: 'Nhiệt độ cao phân hủy liên kết chứa lưu huỳnh trong protein albumin tạo khí H2S'
      },
      {
        text: 'Khí H2S khuếch tán vào lòng đỏ gặp ion sắt Fe2+ tạo kết tủa sắt sunfua FeS màu xám đen bao quanh lòng đỏ!',
        rxTitle: 'KẾT TỦA SẮT(II) SUNFUA FeS',
        rxDesc: 'Lớp FeS hoàn toàn vô hại nhưng làm giảm vị béo ngậy của trứng'
      },
      {
        text: 'Khám phá cấu trúc của 340 hợp chất hóa học tại website chính thức: ph-chem.web.app/formulas nhé!',
        ctaUrl: 'ph-chem.web.app/formulas'
      }
    ]
  },
  {
    id: 12,
    key: 'reel_12_thang_duong_caramel',
    videoFileName: 'reel_12_thang_duong_caramel.mp4',
    title: 'ĐUN ĐƯỜNG THẮNG NƯỚC HÀNG: CARAMEL HÓA',
    tag: 'Ẩm thực',
    themeColor: '#d97706',
    accentColor: '#fbbf24',
    svgFile: 'public/hinh/C12H22O11.37594f3b.svg',
    compoundName: 'Saccarozơ (C₁₂H₂₂O₁₁)',
    reaction: 'C₁₂H₂₂O₁₁ → Hợp chất màu nâu caramel + Hương thơm',
    route: 'reactions',
    scenes: [
      {
        text: 'Tại sao khi thắng đường kho thịt, từ những hạt đường trắng tinh lại biến thành màu nâu cánh gián thơm nức mũi?',
        badge: 'BẠN CÓ BIẾT? #12',
        h1: 'THẮNG ĐƯỜNG KHO THỊT',
        h2: 'BÍ MẬT PHẢN ỨNG CARAMEL HÓA',
        sub: 'Nghệ thuật nấu nướng đỉnh cao'
      },
      {
        text: 'Đó là phản ứng Caramel hóa! Ở nhiệt độ trên 160 độ C, đường saccarozơ bị nhiệt phân và mất nước liên tục.',
        factTitle: 'NHIỆT PHÂN & MẤT NƯỚC SACCAROZƠ',
        factDesc: 'Cấu trúc disaccarit bị bẻ gãy tạo hàng trăm hợp chất màu và mùi mới'
      },
      {
        text: 'Các phân tử mới tạo màu nâu óng ả và hợp chất furan mang lại mùi thơm ngậy kích thích khứu giác!',
        rxTitle: 'HÀNG TRĂM HỢP CHẤT MÙI VỊ MỚI',
        rxDesc: 'Sự kết hợp giữa caramelan, caramelen và các furan bay hơi'
      },
      {
        text: 'Tra cứu phản ứng hóa học và cân bằng phương trình tự động tại: ph-chem.web.app/reactions nhé!',
        ctaUrl: 'ph-chem.web.app/reactions'
      }
    ]
  },
  {
    id: 13,
    key: 'reel_13_chanh_tay_can_am',
    videoFileName: 'reel_13_chanh_tay_can_am.mp4',
    title: 'CHANH TẨY SẠCH CẶN ẤM ĐUN NƯỚC',
    tag: 'Mẹo vặt',
    themeColor: '#84cc16',
    accentColor: '#a3e635',
    svgFile: 'public/hinh/C6H8O7.0df22518.svg',
    compoundName: 'Axit Citric (C₆H₈O₇)',
    reaction: '2 C₆H₈O₇ + 3 CaCO₃ → Ca₃(C₆H₅O₇)₂ + 3 CO₂ ↑',
    route: 'calculator',
    scenes: [
      {
        text: 'Đáy ấm đun nước bám cặn vôi cứng ngắc cọ mãi không sạch? Chỉ cần nửa quả chanh đun sôi là sáng bóng như mới!',
        badge: 'BẠN CÓ BIẾT? #13',
        h1: 'ĐÁY ẤM BÁM CẶN VÔI',
        h2: 'TẨY SẠCH CHỈ VỚI NỬA QUẢ CHANH',
        sub: 'Mẹo gia đình hóa giải cặn nước cứng'
      },
      {
        text: 'Cặn ấm chính là canxi cacbonat CaCO3 kết tủa khi đun sôi nước cứng chứa muối canxi hidrocacbonat.',
        factTitle: 'KẾT TỦA CẶN NƯỚC CỨNG CaCO3',
        factDesc: 'Ca(HCO3)2 bị nhiệt phân thành cặn đá vôi cứng bám chặt vào đáy ấm kim loại'
      },
      {
        text: 'Axit citric trong chanh phản ứng hòa tan hoàn toàn lớp cặn đá vôi thành muối canxi citrat tan biến trong nước!',
        rxTitle: 'HÒA TAN ĐÁ VÔI BẰNG AXIT HỮU CƠ',
        rxDesc: 'Giải phóng khí CO2 sủi tăm và rửa trôi cặn vôi an toàn tuyệt đối'
      },
      {
        text: 'Tính toán pH và mô phỏng phản ứng axit bazơ siêu tốc tại website: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    id: 14,
    key: 'reel_14_uong_sua_giam_cay',
    videoFileName: 'reel_14_uong_sua_giam_cay.mp4',
    title: 'VÌ SAO UỐNG SỮA GIẢM CAY XÉ LƯỠI?',
    tag: 'Ẩm thực',
    themeColor: '#06b6d4',
    accentColor: '#22d3ee',
    svgFile: 'public/hinh/C12H22O11_lac.572e4733.svg',
    compoundName: 'Protein Casein & Capsaicin',
    reaction: 'Casein (ưa dầu) + Capsaicin → Rửa trôi chất cay',
    route: 'formulas',
    scenes: [
      {
        text: 'Khi ăn phải ớt cay xé lưỡi, uống cả lít nước lọc vẫn rát bỏng, nhưng chỉ cần một ngụm sữa tươi là êm dịu ngay?',
        badge: 'BẠN CÓ BIẾT? #14',
        h1: 'ĂN ỚT CAY XÉ LƯỠI',
        h2: 'VÌ SAO UỐNG SỮA LÀ DỊU NGAY?',
        sub: 'Cơ chế giải cứu vị giác kỳ diệu'
      },
      {
        text: 'Thủ phạm gây cay là Capsaicin — một chất kỵ nước, không tan trong nước nên uống nước lọc chỉ làm chất cay loang khắp miệng!',
        factTitle: 'CAPSAICIN KỴ NƯỚC TUYỆT ĐỐI',
        factDesc: 'Capsaicin bám chặt vào thụ thể cảm nhận nhiệt TRPV1 trên lưỡi gây cảm giác bỏng rát'
      },
      {
        text: 'Trong sữa chứa protein Casein ưa dầu đóng vai trò như xà phòng sinh học, bao bọc và cuốn trôi capsaicin khỏi lưỡi.',
        rxTitle: 'PROTEIN CASEIN CUỐN TRÔI CHẤT CAY',
        rxDesc: 'Chuỗi peptide bọc lấy phân tử capsaicin và rửa sạch cảm giác cay rát tức thì'
      },
      {
        text: 'Khám phá thế giới hóa học ẩm thực kỳ thú tại website chính thức: ph-chem.web.app/formulas nhé!',
        ctaUrl: 'ph-chem.web.app/formulas'
      }
    ]
  },
  {
    id: 15,
    key: 'reel_15_mi_chinh_msg',
    videoFileName: 'reel_15_mi_chinh_msg.mp4',
    title: 'BỘT NGỌT MSG: VỊ UMAMI THỨ NĂM',
    tag: 'Ẩm thực',
    themeColor: '#10b981',
    accentColor: '#34d399',
    svgFile: 'public/hinh/C5H9NO4.2cbba10a.svg',
    compoundName: 'Mononatri Glutamat (MSG)',
    reaction: 'Glutamat kích hoạt thụ thể Umami trên lưỡi',
    route: 'table',
    scenes: [
      {
        text: 'Bột ngọt hay mì chính thực chất được tạo ra từ đâu và vì sao nó lại mang lại vị ngọt thịt quyến rũ đến thế?',
        badge: 'BẠN CÓ BIẾT? #15',
        h1: 'BỘT NGỌT MÌ CHÍNH (MSG)',
        h2: 'BÍ MẬT VỊ UMAMI THỨ NĂM',
        sub: 'Giải mã gia vị quen thuộc đời sống'
      },
      {
        text: 'Mì chính là muối natri của axit glutamic — một axit amin có mặt tự nhiên trong thịt bò, nấm và cà chua chín mọng.',
        factTitle: 'MUỐI NATRI CỦA AXIT GLUTAMIC',
        factDesc: 'Lên men mật rỉ đường tự nhiên tạo ra axit amin glutamat tinh khiết'
      },
      {
        text: 'Khi hòa tan, ion glutamat gắn vào thụ thể Umami trên lưỡi, báo hiệu cho não bộ biết đây là món ăn giàu đạm dinh dưỡng!',
        rxTitle: 'KÍCH HOẠT THỤ THỂ VỊ UMAMI',
        rxDesc: 'Tạo cảm giác đậm đà, ngon miệng tự nhiên được khoa học công nhận an toàn'
      },
      {
        text: 'Khám phá bí mật các axit amin và 118 nguyên tố tại website: ph-chem.web.app/table nhé!',
        ctaUrl: 'ph-chem.web.app/table'
      }
    ]
  },
  {
    id: 16,
    key: 'reel_16_mui_tanh_ca_giam',
    videoFileName: 'reel_16_mui_tanh_ca_giam.mp4',
    title: 'KHỬ MÙI TANH CÁ BẰNG GIẤM HOẶC RƯỢU',
    tag: 'Mẹo vặt',
    themeColor: '#3b82f6',
    accentColor: '#60a5fa',
    svgFile: 'public/hinh/CH3COOH.0958c58f.svg',
    compoundName: 'Axit Axetic & Trimetylamin',
    reaction: '(CH₃)₃N (mùi tanh) + CH₃COOH → Muối tan',
    route: 'reactions',
    scenes: [
      {
        text: 'Tại sao khi sơ chế cá sống, chỉ cần rửa qua một chút giấm ăn hoặc rượu trắng là mùi tanh biến mất không còn dấu vết?',
        badge: 'BẠN CÓ BIẾT? #16',
        h1: 'KHỬ MÙI TANH CỦA CÁ',
        h2: 'TẠI SAO DÙNG GIẤM VÀ RƯỢU TRẮNG?',
        sub: 'Mẹo nhà bếp chuẩn xác khoa học'
      },
      {
        text: 'Mùi tanh đặc trưng của cá do hợp chất trimetylamin gây ra — một amin mang tính bazơ hữu cơ rất dễ bay hơi.',
        factTitle: 'THỦ PHẠM: TRIMETYLAMIN BAY HƠI',
        factDesc: 'Hợp chất bazơ hữu cơ sinh ra khi protein thịt cá bắt đầu phân giải tự nhiên'
      },
      {
        text: 'Axit axetic trong giấm lập tức trung hòa amin bazơ thành muối không bay hơi, triệt tiêu hoàn toàn mùi tanh khó chịu!',
        rxTitle: 'PHẢN ỨNG TRUNG HÒA AMIN BAZƠ',
        rxDesc: 'Chuyển hóa chất bay hơi thành muối tan trong nước và rửa trôi dễ dàng'
      },
      {
        text: 'Tra cứu phản ứng trung hòa và cấu trúc hóa học tại: ph-chem.web.app/reactions nhé!',
        ctaUrl: 'ph-chem.web.app/reactions'
      }
    ]
  },
  {
    id: 17,
    key: 'reel_17_men_no_banh_mi',
    videoFileName: 'reel_17_men_no_banh_mi.mp4',
    title: 'BÁNH MÌ PHỒNG XỐP: SINH KHÍ CO₂',
    tag: 'Ẩm thực',
    themeColor: '#f97316',
    accentColor: '#fb923c',
    svgFile: 'public/hinh/CO2.f9e76a2b.svg',
    compoundName: 'Khí Cacbonic (CO₂)',
    reaction: 'C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂ ↑ (làm nở bột)',
    route: 'calculator',
    scenes: [
      {
        text: 'Làm thế nào mà một cục bột mì đặc quánh lại nở phồng xốp thành ổ bánh mì giòn tan thơm phức?',
        badge: 'BẠN CÓ BIẾT? #17',
        h1: 'BÁNH MÌ NỞ PHỒNG XỐP',
        h2: 'CÔNG LAO CỦA KHÍ CO2 VÀ NẤM MEN',
        sub: 'Sinh học & Hóa học trong lò nướng'
      },
      {
        text: 'Bí mật nằm ở nấm men bánh mì! Chúng phân giải đường trong bột mì và thực hiện quá trình lên men sinh khí.',
        factTitle: 'QUÁ TRÌNH LÊN MEN NẤM MEN',
        factDesc: 'Nấm men Saccharomyces cerevisiae tiêu hóa đường giải phóng khí CO2 và ethanol'
      },
      {
        text: 'Hàng triệu bọt khí CO2 bị mạng lưới gluten giữ lại, dãn nở mạnh khi nướng tạo nên những lỗ xốp mềm mại!',
        rxTitle: 'BỌT KHÍ CO2 BỊ GIỮ TRONG GLUTEN',
        rxDesc: 'Nhiệt độ nướng làm phồng căng các bóng khí và tạo cấu trúc ruột bánh xốp mịn'
      },
      {
        text: 'Tính toán lượng chất khí và nồng độ dung dịch siêu tốc tại: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    id: 18,
    key: 'reel_18_tao_got_vo_tham',
    videoFileName: 'reel_18_tao_got_vo_tham.mp4',
    title: 'VÌ SAO TÁO BỔ RA LẠI BỊ THÂM ĐEN?',
    tag: 'Ẩm thực',
    themeColor: '#ef4444',
    accentColor: '#f87171',
    svgFile: 'public/hinh/C6H5OH.4bf7a664.svg',
    compoundName: 'Polyphenol & Enzim Oxy Hóa',
    reaction: 'Polyphenol + O₂ (xúc tác PPO) → Melanin nâu xỉn',
    route: 'formulas',
    scenes: [
      {
        text: 'Vừa gọt xong quả táo đặt ra đĩa được vài phút là miếng táo đã bị thâm xỉn xấu xí — thủ phạm hóa học là gì?',
        badge: 'BẠN CÓ BIẾT? #18',
        h1: 'TÁO GỌT VỎ BỊ THÂM',
        h2: 'PHẢN ỨNG OXY HÓA BỞI KHÔNG KHÍ',
        sub: 'Bảo quản trái cây dưới góc nhìn khoa học'
      },
      {
        text: 'Khi dao cắt rách tế bào, các hợp chất polyphenol bên trong tiếp xúc trực tiếp với oxy trong không khí.',
        factTitle: 'TẾ BÀO GIẢI PHÓNG POLYPHENOL',
        factDesc: 'Polyphenol đóng vai trò bảo vệ thực vật nhưng nhạy cảm với oxy tự do'
      },
      {
        text: 'Enzim polyphenol oxidase xúc tác phản ứng tạo ra sắc tố melanin màu nâu sẫm — tương tự sắc tố da người!',
        rxTitle: 'HÌNH THÀNH SẮC TỐ MELANIN NÂU',
        rxDesc: 'Ngâm vào nước muối loãng sẽ ức chế enzim và giữ miếng táo trắng tinh tươm'
      },
      {
        text: 'Khám phá thế giới phân tử tự nhiên kỳ thú tại website chính thức: ph-chem.web.app/formulas nhé!',
        ctaUrl: 'ph-chem.web.app/formulas'
      }
    ]
  },
  {
    id: 19,
    key: 'reel_19_muoi_iot',
    videoFileName: 'reel_19_muoi_iot.mp4',
    title: 'MUỐI I-ỐT: VI LƯỢNG CỨU TUYẾN GIÁP',
    tag: 'Y học',
    themeColor: '#8b5cf6',
    accentColor: '#a78bfa',
    svgFile: 'public/hinh/KI.30ae526e.svg',
    compoundName: 'Kali Iotua (KI)',
    reaction: 'Iot là nguyên liệu tổng hợp hormone Thyroxine',
    route: 'table',
    scenes: [
      {
        text: 'Cả đời người chỉ cần một lượng I-ốt bé bằng hạt đậu, nhưng nếu thiếu nó thì cơ thể sẽ phải đối mặt với thảm họa gì?',
        badge: 'BẠN CÓ BIẾT? #19',
        h1: 'MUỐI ĂN CẦN THÊM I-ỐT',
        h2: 'NGUYÊN TỐ VI LƯỢNG SỐNG CÒN',
        sub: 'Y học dự phòng bảo vệ giống nòi'
      },
      {
        text: 'Tuyến giáp bắt buộc phải có ion iotua để tổng hợp hormone thyroxine điều hòa toàn bộ quá trình trao đổi chất của cơ thể.',
        factTitle: 'NGUYÊN LIỆU TỔNG HỢP HORMONE',
        factDesc: 'Hormone thyroxine T4 chứa 4 nguyên tử I-ốt quyết định sự phát triển thể chất và não bộ'
      },
      {
        text: 'Thiếu I-ốt khiến tuyến giáp phải phình to thành bướu cổ và làm trẻ nhỏ suy giảm trí tuệ vĩnh viễn!',
        rxTitle: 'PHÒNG NGỪA BƯỚU CỔ HIỆU QUẢ',
        rxDesc: 'Bổ sung vi lượng muối iot mỗi ngày là biện pháp y tế thông minh và kinh tế nhất'
      },
      {
        text: 'Khám phá vai trò sinh học của 118 nguyên tố tại website: ph-chem.web.app/table nhé!',
        ctaUrl: 'ph-chem.web.app/table'
      }
    ]
  },
  {
    id: 20,
    key: 'reel_20_phan_ung_maillard',
    videoFileName: 'reel_20_phan_ung_maillard.mp4',
    title: 'PHẢN ỨNG MAILLARD: MÙI THỊT NƯỚNG',
    tag: 'Ẩm thực',
    themeColor: '#b45309',
    accentColor: '#f59e0b',
    svgFile: 'public/hinh/C2H5NO2.3c25683e.svg',
    compoundName: 'Amino Axit & Đường Khử',
    reaction: 'Amino Axit + Đường (ở 140°C) → Mùi thơm phức',
    route: 'quiz',
    scenes: [
      {
        text: 'Mùi thịt nướng xèo xèo, vỏ bánh mì giòn rụm thơm lừng kích thích mọi giác quan — điều kỳ diệu nào tạo nên?',
        badge: 'BẠN CÓ BIẾT? #20',
        h1: 'MÙI THỊT NƯỚNG THƠM NỨC',
        h2: 'PHÉP MÀU PHẢN ỨNG MAILLARD',
        sub: 'Phản ứng tạo hương vị vĩ đại nhất ẩm thực'
      },
      {
        text: 'Đó là phản ứng Maillard kinh điển! Xảy ra ở nhiệt độ 140 đến 165 độ C giữa amino axit và đường khử.',
        factTitle: 'TƯƠNG TÁC AMINO AXIT VÀ ĐƯỜNG',
        factDesc: 'Khám phá bởi nhà hóa học Louis-Camille Maillard từ năm 1912'
      },
      {
        text: 'Phản ứng sinh ra hàng trăm phân tử hương thơm đặc trưng: mùi bơ, mùi hạt dẻ và màu vàng nâu bắt mắt!',
        rxTitle: 'BÙNG NỔ HÀNG TRĂM MÙI HƯƠNG MỚI',
        rxDesc: 'Tạo nên hương vị đỉnh cao cho món bít tết, cà phê rang và bánh nướng'
      },
      {
        text: 'Luyện đề trắc nghiệm hóa học tương tác 30 giây cực vui tại: ph-chem.web.app/quiz nhé!',
        ctaUrl: 'ph-chem.web.app/quiz'
      }
    ]
  },
  {
    id: 21,
    key: 'reel_21_chanh_rau_muong',
    videoFileName: 'reel_21_chanh_rau_muong.mp4',
    title: 'VẮT CHANH VÀO CANH RAU MUỐNG',
    tag: 'Ẩm thực',
    themeColor: '#15803d',
    accentColor: '#4ade80',
    svgFile: 'public/hinh/C6H8O7.0df22518.svg',
    compoundName: 'Axit Citric & Clorophyl',
    reaction: 'Axit biến Clorophyl thành Pheophytin vàng đỏ',
    route: 'calculator',
    scenes: [
      {
        text: 'Tại sao bát canh rau muống đang xanh ngắt, chỉ cần vắt vào nửa quả chanh là nước canh chuyển sang màu hồng đỏ?',
        badge: 'BẠN CÓ BIẾT? #21',
        h1: 'VẮT CHANH VÀO CANH RAU',
        h2: 'VÌ SAO NƯỚC CANH ĐỔI MÀU?',
        sub: 'Thí nghiệm hóa học ngay trên mâm cơm'
      },
      {
        text: 'Nước luộc rau muống chứa hợp chất diệp lục và anthocyanin có đặc tính đổi màu theo độ pH của môi trường.',
        factTitle: 'SẮC TỐ THAY ĐỔI THEO ĐỘ PH',
        factDesc: 'Chất chỉ thị màu tự nhiên nhạy cảm với sự thay đổi nồng độ ion H+'
      },
      {
        text: 'Axit citric trong chanh hạ độ pH xuống môi trường axit, làm ion magie trong diệp lục bị thay thế và đổi màu nước canh!',
        rxTitle: 'CHUYỂN HÓA CLOROPHYL THÀNH PHEOPHYTIN',
        rxDesc: 'Nước canh trong veo và chuyển ánh đỏ hồng thanh mát kích thích vị giác'
      },
      {
        text: 'Kiểm tra độ pH và các thang chỉ thị màu hóa học tại website: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    id: 22,
    key: 'reel_22_len_men_giam',
    videoFileName: 'reel_22_len_men_giam.mp4',
    title: 'RƯỢU ĐỂ LÂU THÀNH GIẤM ĂN: VÌ SAO?',
    tag: 'Ẩm thực',
    themeColor: '#ca8a04',
    accentColor: '#facc15',
    svgFile: 'public/hinh/CH3COOH.0958c58f.svg',
    compoundName: 'Axit Axetic (CH₃COOH)',
    reaction: 'C₂H₅OH + O₂ (men giấm) → CH₃COOH + H₂O',
    route: 'reactions',
    scenes: [
      {
        text: 'Chai rượu vang mở nắp quên không đậy, vài tuần sau nếm thử lại thấy chua ngắt như giấm ăn — tại sao?',
        badge: 'BẠN CÓ BIẾT? #22',
        h1: 'RƯỢU ĐỂ LÂU HÓA THÀNH GIẤM',
        h2: 'QUÁ TRÌNH LÊN MEN AXETIC TỰ NHIÊN',
        sub: 'Bí mật chuyển hóa cồn thành axit'
      },
      {
        text: 'Vi khuẩn Acetobacter trong không khí đã xâm nhập vào chai rượu và tiến hành quá trình lên men axetic sinh học.',
        factTitle: 'VI KHUẨN MEN GIẤM ACETOBACTER',
        factDesc: 'Vi khuẩn hiếu khí sử dụng oxy trong không khí để chuyển hóa ethanol'
      },
      {
        text: 'Chúng oxy hóa rượu etylic thành axit axetic CH3COOH — thành phần chính tạo nên vị chua thanh của giấm ăn!',
        rxTitle: 'OXY HÓA ETANOL THÀNH AXIT AXETIC',
        rxDesc: 'Cơ chế tự nhiên tạo ra giấm ăn nuôi truyền thống trong đời sống'
      },
      {
        text: 'Cân bằng phương trình lên men và tra cứu chất hữu cơ tại: ph-chem.web.app/reactions nhé!',
        ctaUrl: 'ph-chem.web.app/reactions'
      }
    ]
  },
  {
    id: 23,
    key: 'reel_23_dong_tu_sua_chua',
    videoFileName: 'reel_23_dong_tu_sua_chua.mp4',
    title: 'SỮA CHUA ĐÔNG TỤ THẦN KỲ',
    tag: 'Ẩm thực',
    themeColor: '#0284c7',
    accentColor: '#38bdf8',
    svgFile: 'public/hinh/C3H6O3.ff6a1116.svg',
    compoundName: 'Axit Lactic (C₃H₆O₃)',
    reaction: 'pH hạ xuống 4.6 → Protein Casein đông tụ mịn màng',
    route: 'calculator',
    scenes: [
      {
        text: 'Từ sữa tươi lỏng bỏng, làm thế nào vi khuẩn lại biến thành hũ sữa chua dẻo quánh, mịn màng thơm ngon?',
        badge: 'BẠN CÓ BIẾT? #23',
        h1: 'SỮA CHUA ĐÔNG TỤ MỊN MÀNG',
        h2: 'KỲ QUAN CỦA AXIT LACTIC',
        sub: 'Hóa học của quá trình đông tụ protein'
      },
      {
        text: 'Vi khuẩn lactic lên men đường lactose trong sữa thành axit lactic, làm giảm độ pH của môi trường xuống mức 4.6.',
        factTitle: 'LÊN MEN LACTOSE THÀNH AXIT LACTIC',
        factDesc: 'Lactobacillus biến đường sữa thành axit lactic tạo vị chua thanh'
      },
      {
        text: 'Tại điểm đẳng điện này, các phân tử protein casein mất điện tích bảo vệ, hút chặt vào nhau tạo cấu trúc gel dẻo mịn!',
        rxTitle: 'ĐÔNG TỤ CASEIN Ở ĐIỂM ĐẲNG ĐIỆN',
        rxDesc: 'Protein liên kết mạng lưới ba chiều giữ nước tạo kết cấu sánh mịn'
      },
      {
        text: 'Tính toán nồng độ mol và pH dung dịch tại website chính thức: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
  {
    id: 24,
    key: 'reel_24_coca_tay_can',
    videoFileName: 'reel_24_coca_tay_can.mp4',
    title: 'COCA-COLA TẨY SẠCH CẶN BỒN CẦU',
    tag: 'Mẹo vặt',
    themeColor: '#dc2626',
    accentColor: '#f87171',
    svgFile: 'public/hinh/H3PO4.e41f96d0.svg',
    compoundName: 'Axit Photphoric (H₃PO₄)',
    reaction: '2 H₃PO₄ + 3 CaCO₃ → Ca₃(PO₄)₂ + 3 CO₂ + 3 H₂O',
    route: 'calculator',
    scenes: [
      {
        text: 'Đổ một lon Coca-Cola vào bồn cầu ố vàng rồi xả nước là men sứ trắng tinh tươm — nước ngọt có axit thật sao?',
        badge: 'BẠN CÓ BIẾT? #24',
        h1: 'COCA TẨY SẠCH MEN SỨ Ố VÀNG',
        h2: 'SỨC MẠNH CỦA AXIT PHOTPHORIC',
        sub: 'Hóa chất thực phẩm và ứng dụng tẩy rửa'
      },
      {
        text: 'Trong thành phần nước ngọt có ga chứa axit photphoric H3PO4 tạo vị chua sắc, với độ pH cực thấp khoảng 2.5!',
        factTitle: 'CHỨA AXIT PHOTPHORIC H3PO4',
        factDesc: 'Nồng độ ion H+ cao mang lại tính axit mạnh tương đương giấm ăn'
      },
      {
        text: 'Axit photphoric dễ dàng hòa tan các cặn bám đá vôi canxi cacbonat và vết rỉ sét kim loại lâu ngày!',
        rxTitle: 'HÒA TAN CẶN KHOÁNG VÀ VẾT RỈ SÉT',
        rxDesc: 'Bóc tách mảng bám hữu cơ và khoáng chất cứng đầu nhanh chóng'
      },
      {
        text: 'Đo độ pH của mọi dung dịch trong đời sống tại website chính thức: ph-chem.web.app/calculator nhé!',
        ctaUrl: 'ph-chem.web.app/calculator'
      }
    ]
  },
{
    "id": 25,
    "key": "reel_25_axit_da_day",
    "videoFileName": "reel_25_axit_da_day.mp4",
    "title": "DẠ DÀY CHỨA AXIT HCl: VÌ SAO KHÔNG TỰ ĂN MÒN?",
    "tag": "Cơ thể",
    "themeColor": "#ef4444",
    "accentColor": "#f87171",
    "svgFile": "public/hinh/HCl.3233372f.svg",
    "compoundName": "Axit Clohiđric (HCl)",
    "reaction": "HCl + NaHCO₃ → NaCl + CO₂ ↑ + H₂O",
    "route": "calculator",
    "scenes": [
      {
        "text": "Bạn có biết dịch vị dạ dày có nồng độ axit HCl đủ sức làm tan chảy cả kim loại, nhưng tại sao dạ dày lại không tự tiêu hóa chính mình?",
        "badge": "BẠN CÓ BIẾT? #25",
        "h1": "DẠ DÀY CHỨA AXIT HCl",
        "h2": "VÌ SAO KHÔNG TỰ THỦNG?",
        "sub": "Lá chắn kiềm HCO3- thần kỳ"
      },
      {
        "text": "Bản chất là tế bào dạ dày tiết ra lớp chất nhầy Mucin giàu ion Bicacbonat HCO3- phủ kín niêm mạc, tạo thành lá chắn trung hòa axit bảo vệ!",
        "factTitle": "CHẤT NHẦY MUCIN & HCO3-",
        "factDesc": "Ion bicacbonat trung hòa ion H+ ngay trên bề mặt niêm mạc dạ dày"
      },
      {
        "text": "Khi lớp nhầy bị tổn thương do vi khuẩn HP hoặc stress, ion H+ sẽ tấn công lớp mô gây viêm loét dạ dày cực kỳ nguy hiểm!",
        "rxTitle": "CƠ CHẾ BẢO VỆ NIÊM MẠC",
        "rxDesc": "Ngăn chặn hiện tượng tự tiêu hóa của enzym Pepsin và HCl"
      },
      {
        "text": "Kiểm tra độ pH dịch vị dạ dày từ 1.5 đến 2.0 tại website chính thức: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
  {
    "id": 26,
    "key": "reel_26_moi_co_axit_lactic",
    "videoFileName": "reel_26_moi_co_axit_lactic.mp4",
    "title": "MỎI CƠ KHI TẬP THỂ THAO: THỦ PHẠM AXIT LACTIC",
    "tag": "Cơ thể",
    "themeColor": "#f59e0b",
    "accentColor": "#fbbf24",
    "svgFile": "public/hinh/C3H6O3.ff6a1116.svg",
    "compoundName": "Axit Lactic (C₃H₆O₃)",
    "reaction": "C₆H₁₂O₆ (Glucose) → 2 C₃H₆O₃ (Axit Lactic) + Năng lượng",
    "route": "formulas",
    "scenes": [
      {
        "text": "Tại sao sau những buổi tập gym hay chạy bộ hết sức, các bó cơ bắp của bạn lại đau mỏi rã rời suốt nhiều ngày sau đó?",
        "badge": "BẠN CÓ BIẾT? #26",
        "h1": "MỎI CƠ KHI VẬN ĐỘNG",
        "h2": "THỦ PHẠM AXIT LACTIC",
        "sub": "Hô hấp kị khí của tế bào cơ bắp"
      },
      {
        "text": "Thủ phạm chính là Axit Lactic sinh ra khi cơ bắp vận động cường độ cao thiếu oxy, đường Glucose chuyển hóa yếm khí tích tụ axit!",
        "factTitle": "TÍCH TỤ AXIT LACTIC TRONG CƠ",
        "factDesc": "Quá trình đường phân kị khí sinh ra axit lactic gây toan hóa mô"
      },
      {
        "text": "Ion H+ từ axit lactic làm giảm pH nội bào, ức chế enzyme co cơ gây nhức mỏi. Xoa bóp và hít thở sâu giúp oxy hóa phân giải axit nhanh chóng!",
        "rxTitle": "CƠ CHẾ PHỤC HỒI CƠ BẮP",
        "rxDesc": "Gan chuyển hóa axit lactic ngược lại thành glucose qua chu trình Cori"
      },
      {
        "text": "Tra cứu công thức cấu tạo của Axit Lactic tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 27,
    "key": "reel_27_sau_rang_axit",
    "videoFileName": "reel_27_sau_rang_axit.mp4",
    "title": "SÂU RĂNG: VI KHUẨN TIẾT AXIT ĐỤC THỦNG MEN",
    "tag": "Y học",
    "themeColor": "#06b6d4",
    "accentColor": "#22d3ee",
    "svgFile": "public/hinh/Ca3_PO4_2.e6e550d2.svg",
    "compoundName": "Men Răng Hydroxyapatit",
    "reaction": "Ca₅(PO₄)₃OH + 4 H⁺ ⇌ 5 Ca²⁺ + 3 HPO₄²⁻ + H₂O",
    "route": "calculator",
    "scenes": [
      {
        "text": "Men răng là mô cứng nhất trong cơ thể con người, thậm chí cứng hơn cả xương, nhưng tại sao chúng ta vẫn bị sâu răng đục lỗ?",
        "badge": "BẠN CÓ BIẾT? #27",
        "h1": "MEN RĂNG CỨNG HƠN CẢ XƯƠNG",
        "h2": "TẠI SAO VẪN BỊ SÂU RĂNG?",
        "sub": "Quá trình mất khoáng ở pH dưới 5.5"
      },
      {
        "text": "Vi khuẩn trong mảng bám lên men đường dư thừa tạo thành axit hữu cơ, kéo độ pH khoang miệng tụt dốc xuống dưới ngưỡng tới hạn 5.5!",
        "factTitle": "AXIT HÓA KHOANG MIỆNG (pH < 5.5)",
        "factDesc": "Vi khuẩn Streptococcus mutans chuyển hóa đường thành axit hữu cơ"
      },
      {
        "text": "Ở môi trường axit cao, tinh thể Hydroxyapatit của men răng bị hòa tan phân giải ion canxi, khiến men răng xốp mềm và hình thành lỗ sâu!",
        "rxTitle": "PHẢN ỨNG MẤT KHOÁNG MEN RĂNG",
        "rxDesc": "Ion H+ hòa tan muối canxi photphat làm xói mòn cấu trúc tinh thể"
      },
      {
        "text": "Đánh răng bằng kem chứa Flo để bảo vệ men răng chắc khỏe. Tìm hiểu thêm tại website: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
  {
    "id": 28,
    "key": "reel_28_thuoc_dau_da_day",
    "videoFileName": "reel_28_thuoc_dau_da_day.mp4",
    "title": "THUỐC ĐAU DẠ DÀY: DẬP TẮT AXIT DƯ THẦN TỐC",
    "tag": "Y học",
    "themeColor": "#10b981",
    "accentColor": "#34d399",
    "svgFile": "public/hinh/Al_OH_3.9dca03d5.svg",
    "compoundName": "Nhôm Hiđroxit Al(OH)₃",
    "reaction": "Al(OH)₃ + 3 HCl → AlCl₃ + 3 H₂O",
    "route": "reactions",
    "scenes": [
      {
        "text": "Vì sao gói thuốc chữ P màu trắng sữa lại có thể làm dịu cơn đau rát dạ dày chỉ sau vài phút uống vào bụng?",
        "badge": "BẠN CÓ BIẾT? #28",
        "h1": "THUỐC DẠ DÀY CHỮ P",
        "h2": "DẬP TẮT CƠN ĐAU NHƯ THẾ NÀO?",
        "sub": "Phản ứng trung hòa kiềm nhẹ an toàn"
      },
      {
        "text": "Thuốc kháng axit chứa các hợp chất kiềm nhẹ như Nhôm hiđroxit Nhôm hiđroxit và Magie hiđroxit không tan trong nước!",
        "factTitle": "HỢP CHẤT KIỀM NHẸ KHÔNG TAN",
        "factDesc": "Al(OH)3 và Mg(OH)2 trung hòa axit mà không hấp thu vào máu"
      },
      {
        "text": "Khi vào dạ dày, chúng lập tức trung hòa lượng axit dư thừa, nâng độ pH dạ dày lên mức an toàn mà không làm kiềm hóa toàn thân!",
        "rxTitle": "PHẢN ỨNG TRUNG HÒA DỊCH VỊ",
        "rxDesc": "Chuyển hóa axit ăn mòn thành muối clorua và nước dịu êm"
      },
      {
        "text": "Cân bằng các phản ứng trung hòa axit dạ dày trong nháy mắt tại website chính thức: ph-chem.web.app/reactions nhé!",
        "ctaUrl": "ph-chem.web.app/reactions"
      }
    ]
  },
  {
    "id": 29,
    "key": "reel_29_ngo_doc_khi_co",
    "videoFileName": "reel_29_ngo_doc_khi_co.mp4",
    "title": "NGỘ ĐỘC KHÍ CO: KẺ GIẾT NGƯỜI VÔ HÌNH",
    "tag": "Đời sống",
    "themeColor": "#64748b",
    "accentColor": "#94a3b8",
    "svgFile": "public/hinh/CO.f825aa97.svg",
    "compoundName": "Cacbon Monoxit (CO)",
    "reaction": "Hb + CO ⇌ HbCO (Ái lực gấp 250 lần O₂)",
    "route": "table",
    "scenes": [
      {
        "text": "Tại sao đốt than sưởi ấm trong phòng kín vào mùa đông lại là cạm bẫy chết người cực kỳ êm ái mà nạn nhân không hề hay biết?",
        "badge": "BẠN CÓ BIẾT? #29",
        "h1": "ĐỐT THAN SƯỞI PHÒNG KÍN",
        "h2": "KẺ GIẾT NGƯỜI VÔ HÌNH",
        "sub": "Khí CO cướp oxy trong hồng cầu"
      },
      {
        "text": "Quá trình cháy thiếu oxy sinh ra khí Cacbon Monoxit — một chất khí không màu, không mùi, không gây sặc nhưng cực độc!",
        "factTitle": "KHÍ CO KHÔNG MÀU KHÔNG MÙI",
        "factDesc": "Khí độc tích tụ âm thầm khiến nạn nhân lịm dần đi trong giấc ngủ"
      },
      {
        "text": "Khí CO gắn chặt vào huyết sắc tố trong máu với lực hút gấp 250 lần khí Oxy, làm các tế bào não chết ngạt!",
        "rxTitle": "TẠO PHỨC CARBOXYHEMOGLOBIN",
        "rxDesc": "Lực liên kết cực mạnh làm tê liệt khả năng hô hấp tế bào"
      },
      {
        "text": "Tuyệt đối không đốt than phòng kín! Tra cứu tính chất độc hại của khí CO tại website: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 30,
    "key": "reel_30_khi_cuoi_n2o",
    "videoFileName": "reel_30_khi_cuoi_n2o.mp4",
    "title": "BÓNG CƯỜI N₂O: GÂY TÊ VÀ HIỂM HỌA THẦN KINH",
    "tag": "Y học",
    "themeColor": "#8b5cf6",
    "accentColor": "#a78bfa",
    "svgFile": "public/hinh/N2O.160afff2.svg",
    "compoundName": "Đinitơ Monoxit (N₂O)",
    "reaction": "N₂O + Vitamin B12 → Phá hủy Myelin sợi thần kinh",
    "route": "formulas",
    "scenes": [
      {
        "text": "Tại sao hít bóng cười lại khiến người ta cười mất kiểm soát, và tại sao trào lưu nguy hiểm này có thể dẫn tới liệt hai chân?",
        "badge": "BẠN CÓ BIẾT? #30",
        "h1": "BÓNG CƯỜI N₂O",
        "h2": "HIỂM HỌA TÊ LIỆT TỦY SỐNG",
        "sub": "Cơ chế kích thích và tàn phá thần kinh"
      },
      {
        "text": "Khí trong bóng cười là khí N2O, vốn là thuốc gây mê trong nha khoa nhờ tác dụng kích thích giải phóng Dopamine tạo hưng phấn!",
        "factTitle": "KHÍ GÂY MÊ N₂O",
        "factDesc": "Tác động lên hệ thần kinh trung ương tạo ảo giác và sảng khoái giả"
      },
      {
        "text": "Lạm dụng N2O sẽ oxy hóa phá hủy Vitamin B12, làm thoái hóa màng bảo vệ dây thần kinh tủy sống, dẫn đến tê liệt vĩnh viễn!",
        "rxTitle": "PHÁ HỦY TẬN GỐC VITAMIN B12",
        "rxDesc": "Mất dẫn truyền thần kinh vận động cảm giác ở tứ chi"
      },
      {
        "text": "Hãy nói không với bóng cười! Khám phá cấu trúc các oxide của nitơ tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 31,
    "key": "reel_31_soi_than_canxi_oxalat",
    "videoFileName": "reel_31_soi_than_canxi_oxalat.mp4",
    "title": "SỎI THẬN: PHẢN ỨNG KẾT TỦA CANXI OXALAT",
    "tag": "Cơ thể",
    "themeColor": "#eab308",
    "accentColor": "#fde047",
    "svgFile": "public/hinh/H2C2O4.ddd03be0.svg",
    "compoundName": "Axit Oxalic (H₂C₂O₄)",
    "reaction": "Ca²⁺ + C₂O₄²⁻ → CaC₂O₄ ↓ (Tinh thể hình gai)",
    "route": "calculator",
    "scenes": [
      {
        "text": "Những viên sỏi thận sắc nhọn như mảnh kính gây đau quặn thắt lưng thực chất được hình thành từ phản ứng hóa học nào trong cơ thể?",
        "badge": "BẠN CÓ BIẾT? #31",
        "h1": "SỎI THẬN SẮC NHỌN",
        "h2": "HÌNH THÀNH NHƯ THẾ NÀO?",
        "sub": "Phản ứng kết tủa Canxi Oxalat"
      },
      {
        "text": "Hơn 80% sỏi thận là Canxi Oxalat. Khi chúng ta ăn nhiều thực phẩm giàu oxalate như khế chua hay rau bina mà lại uống quá ít nước!",
        "factTitle": "KẾT TINH CANXI OXALAT",
        "factDesc": "Nồng độ ion Ca2+ và C2O4(2-) vượt quá tích số tan bão hòa"
      },
      {
        "text": "Nồng độ ion canxi và oxalat tích tụ quá mức, lập tức kết tủa thành tinh thể sắc nhọn găm vào thành niệu quản!",
        "rxTitle": "TÍCH SỐ TAN QUÁ NGƯỠNG BÃO HÒA",
        "rxDesc": "Uống đủ nước là biện pháp hòa tan và ngăn kết tủa tốt nhất"
      },
      {
        "text": "Uống đủ 2 lít nước mỗi ngày để hòa loãng ion nhé! Tính toán nồng độ dung dịch tại website chính thức: ph-chem.web.app/calculator!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
  {
    "id": 32,
    "key": "reel_32_paracetamol_ha_sot",
    "videoFileName": "reel_32_paracetamol_ha_sot.mp4",
    "title": "PARACETAMOL: CƠ CHẾ HẠ SỐT GIẢM ĐAU",
    "tag": "Y học",
    "themeColor": "#0ea5e9",
    "accentColor": "#38bdf8",
    "svgFile": "public/hinh/C8H9NO2.f2665182.svg",
    "compoundName": "Paracetamol (C₈H₉NO₂)",
    "reaction": "Ức chế COX-2 → Giảm Prostaglandin E2 (PGE2)",
    "route": "formulas",
    "scenes": [
      {
        "text": "Chỉ một viên thuốc Paracetamol nhỏ bé có thể dập tắt cơn sốt hầm hập và xua tan cơn đau đầu chỉ sau ba mươi phút hoạt động thế nào?",
        "badge": "BẠN CÓ BIẾT? #32",
        "h1": "VIÊN THUỐC QUỐC DÂN PARACETAMOL",
        "h2": "HẠ SỐT GIẢM ĐAU NHƯ THẾ NÀO?",
        "sub": "Cơ chế ức chế tổng hợp Prostaglandin"
      },
      {
        "text": "Khi vào cơ thể, Paracetamol ức chế chọn lọc các enzym gây viêm tại hệ thần kinh trung ương não bộ!",
        "factTitle": "CÔNG THỨC C8H9NO2",
        "factDesc": "Dẫn xuất p-aminophenol tác động ức chế enzyme tổng hợp chất gây sốt"
      },
      {
        "text": "Quá trình này chặn đứng việc tạo ra các chất trung gian gây viêm và sốt, giúp hạ nhiệt vùng dưới đồi và dãn mạch tỏa nhiệt!",
        "rxTitle": "ỨC CHẾ ENZYME COX TRUNG ƯƠNG",
        "rxDesc": "Lập lại điểm cân bằng nhiệt độ sinh học bình thường của cơ thể"
      },
      {
        "text": "Khám phá cấu trúc chuẩn IUPAC của Paracetamol và thuốc tây tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 33,
    "key": "reel_33_tinh_yeu_hormone",
    "videoFileName": "reel_33_tinh_yeu_hormone.mp4",
    "title": "TÌNH YÊU SÉT ĐÁNH: BÃI CHIẾN TRƯỜNG HORMONE",
    "tag": "Cơ thể",
    "themeColor": "#ec4899",
    "accentColor": "#f472b6",
    "svgFile": "public/hinh/C8H11NO2.226777df.svg",
    "compoundName": "Dopamine (C₈H₁₁NO₂)",
    "reaction": "PEA (C₈H₁₁N) + Dopamine → Hưng phấn não bộ",
    "route": "formulas",
    "scenes": [
      {
        "text": "Cảm giác tim đập thình thịch, bồn chồn rạo rực khi vừa chạm mắt một ai đó thực chất là một cơn bão hóa chất quét qua não bộ!",
        "badge": "BẠN CÓ BIẾT? #33",
        "h1": "TÌNH YÊU SÉT ĐÁNH",
        "h2": "BÃI CHIẾN TRƯỜNG HORMONE",
        "sub": "Cơ chế Dopamine và Phenylethylamine"
      },
      {
        "text": "Các hormone hưng phấn và Dopamine ồ ạt tiết ra, kích hoạt mạnh mẽ trung tâm tưởng thưởng của não!",
        "factTitle": "CƠN BÃO DOPAMINE & PEA",
        "factDesc": "Kích thích thụ thể thần kinh mang lại cảm giác ngất ngây say đắm"
      },
      {
        "text": "Sự bùng nổ của các hormone này tạo cảm giác hưng phấn cuồng nhiệt và si mê, hệt như phản ứng dây chuyền không thể dừng lại!",
        "rxTitle": "BẢN GIAO HƯỞNG HÓA HỌC",
        "rxDesc": "Noradrenaline kích thích tim đập nhanh và giãn nở đồng tử"
      },
      {
        "text": "Khám phá cấu trúc phân tử của tình yêu và hạnh phúc tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 34,
    "key": "reel_34_oxy_gia_sui_bot",
    "videoFileName": "reel_34_oxy_gia_sui_bot.mp4",
    "title": "OXY GIÀ SỦI BỌT TRẮNG TRÊN VẾT THƯƠNG",
    "tag": "Y học",
    "themeColor": "#14b8a6",
    "accentColor": "#2dd4bf",
    "svgFile": "public/hinh/H2O2.90c5e405.svg",
    "compoundName": "Hiđro Peoxit (H₂O₂)",
    "reaction": "2 H₂O₂ (xúc tác Catalase) → 2 H₂O + O₂ ↑ (Sủi bọt)",
    "route": "reactions",
    "scenes": [
      {
        "text": "Nhỏ giọt oxy già lên vết thương trầy xước, bạn sẽ thấy bọt trắng sủi lên xèo xèo kèm cảm giác xót buốt. Đó là phản ứng gì?",
        "badge": "BẠN CÓ BIẾT? #34",
        "h1": "OXY GIÀ SỦI BỌT TRẮNG",
        "h2": "VÌ SAO LẠI XÓT BUỐT?",
        "sub": "Enzyme Catalase xúc tác phân hủy H2O2"
      },
      {
        "text": "Oxy già là dung dịch dung dịch oxy già. Khi tiếp xúc máu và tế bào bị rách, nó gặp ngay enzym xúc tác có sẵn trong hồng cầu!",
        "factTitle": "XÚC TÁC ENZYME CATALASE",
        "factDesc": "Catalase phân hủy hàng triệu phân tử H2O2 mỗi giây"
      },
      {
        "text": "Enzyme này thúc đẩy phân hủy H2O2 giải phóng oxy nguyên tử và khí O2 sủi bọt cuồn cuộn, tiêu diệt vi khuẩn kị khí và đẩy đất cát ra ngoài!",
        "rxTitle": "GIẢI PHÓNG KHÍ O₂ VÀ O NGUYÊN TỬ",
        "rxDesc": "Tính oxy hóa mạnh tiêu diệt mầm bệnh và làm sạch dị vật"
      },
      {
        "text": "Cân bằng phản ứng phân hủy oxy già cực nhanh tại website chính thức: ph-chem.web.app/reactions nhé!",
        "ctaUrl": "ph-chem.web.app/reactions"
      }
    ]
  },
  {
    "id": 35,
    "key": "reel_35_adrenaline_chay_nhay",
    "videoFileName": "reel_35_adrenaline_chay_nhay.mp4",
    "title": "ADRENALINE: HORMONE BÙNG NỔ NĂNG LƯỢNG",
    "tag": "Cơ thể",
    "themeColor": "#f97316",
    "accentColor": "#fb923c",
    "svgFile": "public/hinh/C9H13NO3.9c7d3f5c.svg",
    "compoundName": "Adrenaline (C₉H₁₃NO₃)",
    "reaction": "Phóng thích Glucose từ Glycogen tức thì",
    "route": "formulas",
    "scenes": [
      {
        "text": "Tại sao khi bị chó đuổi hay gặp nguy hiểm tính mạng, con người có thể nhảy qua bức tường cao mà ngày thường không bao giờ làm được?",
        "badge": "BẠN CÓ BIẾT? #35",
        "h1": "ADRENALINE BÙNG NỔ",
        "h2": "SỨC MẠNH PHI THƯỜNG",
        "sub": "Phản ứng chiến đấu hay bỏ chạy"
      },
      {
        "text": "Tuyến thượng thận lập tức phóng thích ồ ạt hormone Adrenaline vào dòng máu, kích hoạt chế độ chiến đấu hoặc bỏ chạy!",
        "factTitle": "CÔNG THỨC C9H13NO3",
        "factDesc": "Hormone kích hoạt hệ thần kinh giao cảm nâng ngưỡng chịu đựng cơ thể"
      },
      {
        "text": "Adrenaline làm tim đập mạnh, dãn phế quản nạp oxy tối đa, chuyển hóa đường dự trữ cung cấp năng lượng bùng nổ cho cơ bắp!",
        "rxTitle": "CUNG CẤP NĂNG LƯỢNG BÙNG NỔ",
        "rxDesc": "Dồn máu về các cơ bắp lớn giúp tăng cường sức mạnh tức thì"
      },
      {
        "text": "Tra cứu công thức của hormone sinh học tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 36,
    "key": "reel_36_vang_da_chieu_den",
    "videoFileName": "reel_36_vang_da_chieu_den.mp4",
    "title": "VÀNG DA SƠ SINH: CHIẾU ĐÈN ÁNH SÁNG XANH",
    "tag": "Y học",
    "themeColor": "#eab308",
    "accentColor": "#facc15",
    "svgFile": "public/hinh/C6H5OH.4bf7a664.svg",
    "compoundName": "Sắc Tố Mật Bilirubin",
    "reaction": "Bilirubin (kị nước) + Photon xanh → Đồng phân quang học",
    "route": "formulas",
    "scenes": [
      {
        "text": "Tại sao nhiều em bé sơ sinh vừa chào đời bị vàng da, các bác sĩ chỉ cần đặt bé nằm dưới một bóng đèn ánh sáng xanh là khỏi?",
        "badge": "BẠN CÓ BIẾT? #36",
        "h1": "VÀNG DA TRẺ SƠ SINH",
        "h2": "ĐIỀU TRỊ BẰNG ÁNH SÁNG XANH",
        "sub": "Phản ứng đồng phân quang học quang hóa"
      },
      {
        "text": "Vàng da do tích tụ sắc tố mật khi gan bé chưa kịp đào thải. Sắc tố này không tan trong nước nên ứ đọng dưới da!",
        "factTitle": "SẮC TỐ MẬT DƯ THỪA",
        "factDesc": "Hồng cầu thai nhi vỡ giải phóng heme chuyển hóa thành bilirubin"
      },
      {
        "text": "Quang phổ ánh sáng xanh 460 nanomet bẻ gãy liên kết nội phân tử, chuyển sắc tố thành dạng tan được trong nước để bài tiết an toàn!",
        "rxTitle": "QUANG HÓA ĐỒNG PHÂN HÓA",
        "rxDesc": "Chuyển hóa dạng kị nước thành dạng tan trong nước đào thải qua thận"
      },
      {
        "text": "Khám phá phản ứng quang hóa và cấu trúc phân tử tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 37,
    "key": "reel_37_hit_heli_giong_the_the",
    "videoFileName": "reel_37_hit_heli_giong_the_the.mp4",
    "title": "HÍT KHÍ HELI BIẾN ĐỔI GIỌNG NÓI THE THÉ",
    "tag": "Đời sống",
    "themeColor": "#38bdf8",
    "accentColor": "#7dd3fc",
    "svgFile": "public/hinh/He.svg",
    "compoundName": "Khí Heli (He · Khí hiếm)",
    "reaction": "V(âm thanh trong He) = 965 m/s > V(không khí) = 343 m/s",
    "route": "table",
    "scenes": [
      {
        "text": "Chỉ cần hít một ngụm khí từ bóng bay Heli, giọng nói trầm ấm của bạn bỗng biến thành the thé như nhân vật hoạt hình vịt Donald!",
        "badge": "BẠN CÓ BIẾT? #37",
        "h1": "HÍT KHÍ HELI BIẾN ĐỔI GIỌNG",
        "h2": "NHƯ PHIM HOẠT HÌNH VỊT DONALD",
        "sub": "Vận tốc truyền âm thanh siêu nhanh"
      },
      {
        "text": "Heli là khí trơ nhẹ thứ hai vũ trụ, nhẹ hơn không khí tới sáu lần, khiến tốc độ truyền âm thanh trong Heli nhanh gấp ba lần bình thường!",
        "factTitle": "KHÍ TRƠ NHẸ THỨ HAI VŨ TRỤ",
        "factDesc": "Khối lượng phân tử cực nhỏ chỉ bằng 4 so với 29 của không khí"
      },
      {
        "text": "Khi bạn nói, sóng âm đi qua khí Heli nhanh hơn nhiều làm tần số cộng hưởng thanh quản vọt lên cao, tạo nên chất giọng the thé hài hước!",
        "rxTitle": "TĂNG TẦN SỐ CỘNG HƯỞNG THANH QUẢN",
        "rxDesc": "Vận tốc âm thanh đạt gần 1000 m/s đẩy cao tần số sóng âm thanh"
      },
      {
        "text": "Lưu ý không lạm dụng hít nhiều gây ngạt nhé! Khám phá nguyên tố Heli tại website chính thức: ph-chem.web.app/table!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 38,
    "key": "reel_38_thuoc_do_povidone_iod",
    "videoFileName": "reel_38_thuoc_do_povidone_iod.mp4",
    "title": "THUỐC ĐỎ POVIDONE IODINE: SÁT TRÙNG DIỆT KHUẨN",
    "tag": "Y học",
    "themeColor": "#b91c1c",
    "accentColor": "#f87171",
    "svgFile": "public/hinh/I2.8d05656d.svg",
    "compoundName": "Iốt & Pô-vi-đôn I-ốt (PVP-I₂)",
    "reaction": "I₂ + Protein vi khuẩn → Biến tính protein vi khuẩn",
    "route": "calculator",
    "scenes": [
      {
        "text": "Chai cồn đỏ Pô-vi-đôn I-ốt luôn có mặt trong tủ thuốc mỗi gia đình. Tại sao dung dịch màu nâu đỏ này lại sát trùng mạnh mẽ đến vậy?",
        "badge": "BẠN CÓ BIẾT? #38",
        "h1": "THUỐC ĐỎ POVIDONE IODINE",
        "h2": "VŨ KHÍ SÁT TRÙNG HUYỀN THOẠI",
        "sub": "Oxy hóa màng tế bào vi khuẩn trong 30 giây"
      },
      {
        "text": "Thuốc là phức chất của hợp chất phóng thích chậm phân tử I-ốt tự do — một chất oxy hóa cực mạnh tiêu diệt mầm bệnh!",
        "factTitle": "PHÓNG THÍCH IÔT TỰ DO",
        "factDesc": "Polymer mang iod phóng thích đều đặn không gây bỏng rát như cồn iod"
      },
      {
        "text": "I-ốt thấm qua màng tế bào, oxy hóa axit amin và làm đông tụ protein của vi khuẩn và virus trong 30 giây mà không bị kháng thuốc!",
        "rxTitle": "OXY HÓA PROTEIN VI SINH VẬT",
        "rxDesc": "Tiêu diệt vi khuẩn, nấm, virus phổ rộng an toàn và hiệu quả"
      },
      {
        "text": "Tra cứu tính chất halogen của Iot và chất sát khuẩn tại website chính thức: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
{
    "id": 39,
    "key": "reel_39_mua_axit_tan_pha",
    "videoFileName": "reel_39_mua_axit_tan_pha.mp4",
    "title": "MƯA AXIT: THẢM HỌA ĂN MÒN RỪNG CÂY VÀ TƯỢNG ĐÁ",
    "tag": "Môi trường",
    "themeColor": "#06b6d4",
    "accentColor": "#22d3ee",
    "svgFile": "public/hinh/SO2.fa0f286a.svg",
    "compoundName": "Lưu Huỳnh Đioxit (SO₂)",
    "reaction": "2 SO₂ + O₂ + 2 H₂O → 2 H₂SO₄",
    "route": "calculator",
    "scenes": [
      {
        "text": "Những cơn mưa nhìn như làn nước mát lành nhưng lại có thể thiêu rụi cả cánh rừng xanh mướt và làm tan chảy những bức tượng đá cổ — Đó là hiện tượng gì?",
        "badge": "BẠN CÓ BIẾT? #39",
        "h1": "MƯA AXIT HỦY DIỆT",
        "h2": "THẢM HỌA KHÔNG BÁO TRƯỚC",
        "sub": "Sự tích tụ SO2 và oxit nitơ khí quyển"
      },
      {
        "text": "Thủ phạm là khí lưu huỳnh đioxit và oxit nitơ từ khói bụi nhà máy, hòa tan trong nước mưa bị oxy hóa thành axit sunfuric đậm đặc!",
        "factTitle": "KHÍ SO₂ TẠO AXIT SUNFURIC",
        "factDesc": "Khí thải công nghiệp phản ứng với hơi nước và oxy tạo axit mạnh"
      },
      {
        "text": "Nước mưa axit có độ pH dưới 5.0, hòa tan canxi cacbonat của tượng đá và rửa trôi khoáng chất trong đất, hủy diệt thảm thực vật!",
        "rxTitle": "ĂN MÒN ĐÁ VÔI VÀ THẢM RỪNG",
        "rxDesc": "Axit sunfuric hòa tan muối canxi cacbonat thành canxi sunfat"
      },
      {
        "text": "Đo độ pH nước mưa và dung dịch môi trường tại website chính thức: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
  {
    "id": 40,
    "key": "reel_40_hieu_ung_nha_kinh",
    "videoFileName": "reel_40_hieu_ung_nha_kinh.mp4",
    "title": "HIỆU ỨNG NHÀ KÍNH: TẤM CHĂN GIỮ NHIỆT CỦA TRÁI ĐẤT",
    "tag": "Tự nhiên",
    "themeColor": "#f59e0b",
    "accentColor": "#fbbf24",
    "svgFile": "public/hinh/CO2.f9e76a2b.svg",
    "compoundName": "Khí Cacbonic (CO₂)",
    "reaction": "Hấp thụ bức xạ hồng ngoại (Bước sóng 15 µm)",
    "route": "formulas",
    "scenes": [
      {
        "text": "Nếu không có hiệu ứng nhà kính, Trái Đất của chúng ta sẽ là một tảng băng chết âm 18 độ C, nhưng tại sao hiện nay nó lại là thảm họa khí hậu?",
        "badge": "BẠN CÓ BIẾT? #40",
        "h1": "HIỆU ỨNG NHÀ KÍNH",
        "h2": "TẤM CHĂN GIỮ NHIỆT TRÁI ĐẤT",
        "sub": "Cơ chế dao động phân tử CO2 và Mêtan"
      },
      {
        "text": "Các phân tử khí CO2 và mêtan có cấu trúc liên kết dao động hấp thụ bức xạ hồng ngoại tỏa ra từ mặt đất, giữ nhiệt lượng lại bầu khí quyển!",
        "factTitle": "HẤP THỤ BỨC XẠ HỒNG NGOẠI",
        "factDesc": "Liên kết C=O dao động hấp thụ chọn lọc sóng nhiệt phản xạ"
      },
      {
        "text": "Lượng khí nhà kính tăng vọt do con người đốt nhiên liệu hóa thạch, biến tấm chăn ấm áp thành một lò hơi khổng lồ làm tan băng hai cực!",
        "rxTitle": "MẤT CÂN BẰNG NHIỆT TOÀN CẦU",
        "rxDesc": "Nồng độ CO2 vượt 420 ppm gây nóng lên toàn cầu và biến đổi khí hậu"
      },
      {
        "text": "Tra cứu cấu trúc ba chiều của các phân tử khí nhà kính tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 41,
    "key": "reel_41_tang_ozon_o3",
    "videoFileName": "reel_41_tang_ozon_o3.mp4",
    "title": "TẦNG OZON: LÁ CHẮN TIA CỰC TÍM CỨU SỐNG SINH QUYỂN",
    "tag": "Tự nhiên",
    "themeColor": "#3b82f6",
    "accentColor": "#60a5fa",
    "svgFile": "public/hinh/O3.1545db8d.svg",
    "compoundName": "Khí Ozon (O₃)",
    "reaction": "O₃ + Tia UV-B → O₂ + O",
    "route": "formulas",
    "scenes": [
      {
        "text": "Bầu trời cách mặt đất hai mươi kilômét có một lớp màng vô hình mỏng manh, nhưng nếu nó biến mất, toàn bộ sự sống trên cạn sẽ bị thiêu rụi!",
        "badge": "BẠN CÓ BIẾT? #41",
        "h1": "TẦNG OZON MỎNG MANH",
        "h2": "LÁ CHẮN SỐNG CỦA HÀNH TINH",
        "sub": "Hấp thụ 99% bức xạ cực tím tử ngoại"
      },
      {
        "text": "Tầng ozon gồm các phân tử O3 liên kết đặc biệt, hấp thụ tới 99% tia cực tím độc hại từ Mặt Trời chiếu xuống Trái Đất!",
        "factTitle": "PHÂN TỬ OZON GÓC 116.8°",
        "factDesc": "Cấu trúc cộng hưởng đặc biệt có khả năng hấp thụ photon UV-B mạnh"
      },
      {
        "text": "Khí làm lạnh CFC từng làm thủng tầng ozon vì giải phóng clo tự do, một nguyên tử clo có thể phá hủy tới một trăm ngàn phân tử ozon!",
        "rxTitle": "PHẢN ỨNG DÂY CHUYỀN PHÁ HỦY",
        "rxDesc": "Gốc tự do Clo xúc tác phân hủy O3 thành oxy thông thường"
      },
      {
        "text": "Khám phá cấu trúc của ozon và các đơn chất khí tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 42,
    "key": "reel_42_dom_dom_phat_quang",
    "videoFileName": "reel_42_dom_dom_phat_quang.mp4",
    "title": "ĐOM ĐÓM PHÁT SÁNG: KỲ QUAN PHÁT QUANG SINH HỌC",
    "tag": "Tự nhiên",
    "themeColor": "#84cc16",
    "accentColor": "#a3e635",
    "svgFile": "public/hinh/C10H14N2.de4e981e.svg",
    "compoundName": "Phát Quang Sinh Học Luciferin",
    "reaction": "Luciferin + O₂ + ATP → Oxyluciferin + Photon",
    "route": "reactions",
    "scenes": [
      {
        "text": "Những chú đom đóm lập lòe ánh sáng xanh ngọc trong đêm hè tĩnh lặng mà không hề bị nóng hay bỏng rát — Bí mật đằng sau là gì?",
        "badge": "BẠN CÓ BIẾT? #42",
        "h1": "ĐOM ĐÓM LẬP LÒE TRONG ĐÊM",
        "h2": "KỲ QUAN PHÁT QUANG SINH HỌC",
        "sub": "Hiệu suất chuyển hóa ánh sáng 100%"
      },
      {
        "text": "Đó là phản ứng phát quang sinh học hoàn hảo bậc nhất tự nhiên, nơi 100% năng lượng hóa học được chuyển hóa trực tiếp thành ánh sáng lạnh!",
        "factTitle": "ÁNH SÁNG LẠNH HIỆU SUẤT 100%",
        "factDesc": "Khác bóng đèn sợi đốt, gần như không có năng lượng bị thất thoát dưới dạng nhiệt"
      },
      {
        "text": "Hợp chất Luciferin kết hợp oxy dưới sự xúc tác của enzym và năng lượng tế bào, giải phóng photon ánh sáng mà không tỏa nhiệt!",
        "rxTitle": "OXY HÓA HỢP CHẤT LUCIFERIN",
        "rxDesc": "Phản ứng sinh hóa biến đổi phân tử lên trạng thái kích thích phát photon"
      },
      {
        "text": "Cân bằng và mô phỏng phản ứng sinh hóa tại website chính thức: ph-chem.web.app/reactions nhé!",
        "ctaUrl": "ph-chem.web.app/reactions"
      }
    ]
  },
  {
    "id": 43,
    "key": "reel_43_ma_troi_photphin",
    "videoFileName": "reel_43_ma_troi_photphin.mp4",
    "title": "MA TRƠI TRÊN NGHĨA ĐỊA: BẢN CHẤT TỰ CHÁY CỦA PHOTPHIN",
    "tag": "Tự nhiên",
    "themeColor": "#a855f7",
    "accentColor": "#c084fc",
    "svgFile": "public/hinh/PH3.5de702fe.svg",
    "compoundName": "Khí Photphin (PH₃)",
    "reaction": "2 P₂H₄ + 7 O₂ → 2 P₂O₅ + 4 H₂O",
    "route": "table",
    "scenes": [
      {
        "text": "Những ngọn lửa xanh ma mị lập lòe trôi nổi trên các khu nghĩa địa lúc nửa đêm, ai đuổi theo thì nó lại chạy theo — Ma trơi có thật không?",
        "badge": "BẠN CÓ BIẾT? #43",
        "h1": "MA TRƠI TRÊN NGHĨA ĐỊA",
        "h2": "BẢN CHẤT HÓA HỌC TỰ CHÁY",
        "sub": "Sự phân hủy sinh khí Photphin và Điphotphin"
      },
      {
        "text": "Khoa học chứng minh đó là phản ứng hóa học tự nhiên! Xương người và động vật chứa nhiều photpho, khi phân hủy yếm khí sinh ra khí photphin!",
        "factTitle": "PHÂN HỦY PHOTPHO HỮU CƠ",
        "factDesc": "Xương cốt phân hủy sinh ra khí photphin PH3 và tạp chất điphotphin P2H4"
      },
      {
        "text": "Đi kèm photphin là tạp chất điphotphin có khả năng tự bốc cháy ngay ở nhiệt độ phòng, tạo ngọn lửa bay theo luồng gió khi có người bước tới!",
        "rxTitle": "TỰ BỐC CHÁY TRONG KHÔNG KHÍ",
        "rxDesc": "P2H4 tự bốc cháy ở nhiệt độ thường châm ngòi cho PH3 bốc cháy"
      },
      {
        "text": "Khám phá các hợp chất của nguyên tố photpho tại website chính thức: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 44,
    "key": "reel_44_bang_chay_methane",
    "videoFileName": "reel_44_bang_chay_methane.mp4",
    "title": "BĂNG CHÁY ĐÁY ĐẠI DƯƠNG: NGUỒN NĂNG LƯỢNG KHỔNG LỒ",
    "tag": "Tự nhiên",
    "themeColor": "#0284c7",
    "accentColor": "#38bdf8",
    "svgFile": "public/hinh/CH4.78d17873.svg",
    "compoundName": "Mêtan Hydrat (Băng Cháy)",
    "reaction": "CH₄ + 2 O₂ → CO₂ ↑ + 2 H₂O",
    "route": "formulas",
    "scenes": [
      {
        "text": "Một tảng băng trắng muốt lấy từ đáy biển sâu, khi châm lửa lại bùng cháy rực rỡ như một ngọn đuốc — Băng làm sao có thể cháy?",
        "badge": "BẠN CÓ BIẾT? #44",
        "h1": "TẢNG BĂNG TỰ BỐC CHÁY",
        "h2": "NGUỒN NĂNG LƯỢNG ĐÁY ĐẠI DƯƠNG",
        "sub": "Mạng tinh thể bọc khí Methane Hydrate"
      },
      {
        "text": "Đó là Băng Cháy Mêtan Hydrat. Dưới đáy biển sâu hàng ngàn mét với áp suất cực lớn và nhiệt độ thấp, phân tử nước nhốt chặt khí mêtan bên trong!",
        "factTitle": "LỒNG TINH THỂ NƯỚC NHỐT CH4",
        "factDesc": "Mỗi mét khối băng cháy giải phóng tới 164 mét khối khí mêtan"
      },
      {
        "text": "Khi đưa lên mặt nước, lớp lồng băng tan chảy giải phóng khí mêtan nguyên chất bốc cháy cuồn cuộn, trữ lượng gấp đôi mọi nhiên liệu hóa thạch!",
        "rxTitle": "CHÁY RỰC RỠ TỎA NHIỆT KHỔNG LỒ",
        "rxDesc": "Quá trình cháy tạo CO2 và hơi nước, giải phóng năng lượng sạch"
      },
      {
        "text": "Xem cấu trúc không gian ba chiều của phân tử mêtan tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 45,
    "key": "reel_45_mui_dat_sau_mua",
    "videoFileName": "reel_45_mui_dat_sau_mua.mp4",
    "title": "MÙI ĐẤT SAU CƠN MƯA: MÙI HƯƠNG KỲ DIỆU GEOSMIN",
    "tag": "Tự nhiên",
    "themeColor": "#10b981",
    "accentColor": "#34d399",
    "svgFile": "public/hinh/C10H20O.df908eb2.svg",
    "compoundName": "Hợp Chất Mùi Đất Geosmin",
    "reaction": "Khứu giác con người nhận biết ở 5 ppt",
    "route": "formulas",
    "scenes": [
      {
        "text": "Tại sao khi cơn mưa rào đầu mùa vừa đổ xuống mảnh đất khô cằn, bạn lại ngửi thấy một mùi hương ngai ngái ngọt lành vô cùng dễ chịu?",
        "badge": "BẠN CÓ BIẾT? #45",
        "h1": "MÙI ĐẤT SAU CƠN MƯA RÀO",
        "h2": "MÙI HƯƠNG KỲ DIỆU CỦA ĐẤT MẸ",
        "sub": "Hợp chất hữu cơ Petrichor và Geosmin"
      },
      {
        "text": "Mùi hương này có tên khoa học là Petrichor, được tạo nên bởi hợp chất hữu cơ Geosmin do vi khuẩn trong đất màu mỡ tiết ra!",
        "factTitle": "HỢP CHẤT HỮU CƠ GEOSMIN",
        "factDesc": "Hợp chất bicyclic alcohol được xạ khuẩn Actinomyces giải phóng vào đất"
      },
      {
        "text": "Giọt nước mưa rơi xuống bắn tung các bọt khí mang phân tử Geosmin vào không khí. Mũi người nhạy với Geosmin gấp hàng trăm lần cá mập ngửi máu!",
        "rxTitle": "CƠ CHẾ KHUẾCH TÁN BỌT KHÍ",
        "rxDesc": "Mũi người cảm nhận được ở nồng độ cực nhỏ chỉ 5 phần nghìn tỷ"
      },
      {
        "text": "Tra cứu các hợp chất hữu cơ vòng trong tự nhiên tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 46,
    "key": "reel_46_thach_nhu_hang_dong",
    "videoFileName": "reel_46_thach_nhu_hang_dong.mp4",
    "title": "THẠCH NHŨ HANG ĐỘNG: KIỆT TÁC CÂN BẰNG HÓA HỌC",
    "tag": "Tự nhiên",
    "themeColor": "#eab308",
    "accentColor": "#fde047",
    "svgFile": "public/hinh/CaCO3.6a0a815f.svg",
    "compoundName": "Đá Vôi Canxi Cacbonat",
    "reaction": "CaCO₃ + CO₂ + H₂O ⇌ Ca(HCO₃)₂",
    "route": "reactions",
    "scenes": [
      {
        "text": "Những cột thạch nhũ tráng lệ trong hang Sơn Đoòng hay vịnh Hạ Long lung linh như cung điện, được bàn tay tự nhiên kiến tạo ra sao?",
        "badge": "BẠN CÓ BIẾT? #46",
        "h1": "THẠCH NHŨ HANG ĐỘNG",
        "h2": "CÂN BẰNG HÓA HỌC TRIỆU NĂM",
        "sub": "Phản ứng hòa tan và tái kết tủa đá vôi"
      },
      {
        "text": "Bản chất là phản ứng thuận nghịch kỳ diệu: Nước mưa chứa CO2 hòa tan đá vôi canxi cacbonat tạo dung dịch canxi bicacbonat!",
        "factTitle": "HÒA TAN ĐÁ VÔI BẰNG CO2 VÀ NƯỚC",
        "factDesc": "Nước ngầm hòa tan núi đá vôi tạo thành các hang động ngầm khổng lồ"
      },
      {
        "text": "Khi từng giọt nước nhỏ từ trần hang xuống, CO2 bay hơi đẩy phản ứng ngược lại tái tạo canxi cacbonat, bồi đắp từng milimét thạch nhũ qua triệu năm!",
        "rxTitle": "TÁI KẾT TỦA TỪNG GIỌT NƯỚC",
        "rxDesc": "Phản ứng nghịch nhả khí CO2 giúp tinh thể canxi cacbonat kết tinh lấp lánh"
      },
      {
        "text": "Cân bằng các phản ứng hòa tan và tái kết tủa đá vôi tại website chính thức: ph-chem.web.app/reactions nhé!",
        "ctaUrl": "ph-chem.web.app/reactions"
      }
    ]
  },
  {
    "id": 47,
    "key": "reel_47_tro_nui_lua_do",
    "videoFileName": "reel_47_tro_nui_lua_do.mp4",
    "title": "ĐẤT ĐỎ BAZAN: MÀU MỠ NHỜ KHOÁNG CHẤT SẮT",
    "tag": "Tự nhiên",
    "themeColor": "#dc2626",
    "accentColor": "#f87171",
    "svgFile": "public/hinh/Fe2O3.51ab914b.svg",
    "compoundName": "Sắt(III) Oxit (Fe₂O₃)",
    "reaction": "Dung nham bazan phong hóa giàu Fe, K, P",
    "route": "table",
    "scenes": [
      {
        "text": "Tại sao vùng đất đỏ bazan ở Tây Nguyên lại màu mỡ phì nhiêu đến vậy, trồng cà phê và cao su tốt tươi bậc nhất cả nước?",
        "badge": "BẠN CÓ BIẾT? #47",
        "h1": "ĐẤT ĐỎ BAZAN TÂY NGUYÊN",
        "h2": "MẦU MỠ NHỜ KHOÁNG CHẤT SẮT",
        "sub": "Sản phẩm phong hóa từ dung nham núi lửa"
      },
      {
        "text": "Hàng triệu năm trước, dung nham núi lửa phun trào nguội đi tạo thành đá bazan. Màu đỏ thẫm đặc trưng đến từ khoáng chất sắt ba oxit!",
        "factTitle": "KHOÁNG CHẤT SẮT BA OXIT",
        "factDesc": "Fe2O3 tạo nên màu nâu đỏ trù phú và khả năng giữ ẩm vượt trội"
      },
      {
        "text": "Quá trình phong hóa liên tục giải phóng khoáng vi lượng sắt, magie, kali và photpho, tạo nên tầng đất xốp giàu dưỡng chất nuôi sống cây trồng!",
        "rxTitle": "KHO KHOÁNG DINH DƯỠNG TỰ NHIÊN",
        "rxDesc": "Cung cấp đầy đủ vi lượng sống còn giúp cây cà phê, cao su phát triển mạnh"
      },
      {
        "text": "Khám phá nguyên tố Sắt và các oxit kim loại tại website chính thức: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 48,
    "key": "reel_48_nuoc_bien_vi_man",
    "videoFileName": "reel_48_nuoc_bien_vi_man.mp4",
    "title": "TẠI SAO NƯỚC BIỂN CÓ VỊ MẶN CHÁT?",
    "tag": "Tự nhiên",
    "themeColor": "#0ea5e9",
    "accentColor": "#38bdf8",
    "svgFile": "public/hinh/NaCl.42ad885d.svg",
    "compoundName": "Muối Ăn Natri Clorua (NaCl)",
    "reaction": "Độ mặn trung bình 35‰ đại dương",
    "route": "calculator",
    "scenes": [
      {
        "text": "Tất cả các dòng sông nước ngọt đều chảy ra biển lớn, nhưng tại sao nước biển lại mặn chát đến mức không thể uống được?",
        "badge": "BẠN CÓ BIẾT? #48",
        "h1": "VÌ SAO NƯỚC BIỂN CÓ VỊ MẶN?",
        "h2": "BÍ MẬT KHOÁNG CHẤT BA TỶ NĂM",
        "sub": "Hành trình tích tụ muối qua các dòng sông"
      },
      {
        "text": "Nước mưa hơi có tính axit bào mòn đá trên lục địa giải phóng ion khoáng như natri, magie. Các con sông cuốn trôi khoáng chất đổ về đại dương!",
        "factTitle": "BÀO MÒN LỤC ĐỊA & KHOÁNG CHẤT",
        "factDesc": "Hàng tỷ tấn ion Na+ và Cl- được rửa trôi từ đất đá ra biển mỗi năm"
      },
      {
        "text": "Nước biển bốc hơi liên tục tạo thành mây để lại toàn bộ muối natri clorua tích tụ qua hơn ba tỷ năm, tạo nên độ mặn ba mươi lăm phần nghìn!",
        "rxTitle": "NƯỚC BAY HƠI, MUỐI Ở LẠI",
        "rxDesc": "Vòng tuần hoàn nước hàng tỷ năm biến đại dương thành kho muối khổng lồ"
      },
      {
        "text": "Tính toán nồng độ phần trăm và độ mặn dung dịch tại website chính thức: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
  {
    "id": 49,
    "key": "reel_49_quang_hop_clorophin",
    "videoFileName": "reel_49_quang_hop_clorophin.mp4",
    "title": "CÂY XANH NHẢ OXY: BÍ MẬT DIỆP LỤC CHỨA MAGIE",
    "tag": "Tự nhiên",
    "themeColor": "#16a34a",
    "accentColor": "#4ade80",
    "svgFile": "public/hinh/MgO.100548cb.svg",
    "compoundName": "Chất Diệp Lục (Lõi Magie Mg²⁺)",
    "reaction": "6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂ ↑",
    "route": "reactions",
    "scenes": [
      {
        "text": "Một cái cây lặng lẽ đứng trong vườn, hấp thụ ánh nắng mặt trời và nước để nuôi sống cả hành tinh bằng nguồn khí oxy bất tận ra sao?",
        "badge": "BẠN CÓ BIẾT? #49",
        "h1": "CÂY XANH TẠO RA OXY",
        "h2": "BÍ MẬT PHÂN TỬ DIỆP LỤC MAGIE",
        "sub": "Cỗ máy quang hợp vĩ đại của tự nhiên"
      },
      {
        "text": "Trung tâm của cỗ máy quang hợp là chất diệp lục Clorophin — một phức chất hữu cơ khổng lồ với nguyên tử Magie nằm ở lõi trung tâm!",
        "factTitle": "LÕI MAGIE TRONG DIỆP LỤC",
        "factDesc": "Ion Mg2+ phối trí với 4 vòng pyrrole hấp thụ chọn lọc ánh sáng đỏ và xanh"
      },
      {
        "text": "Diệp lục bắt trọn photon ánh sáng bẻ gãy phân tử nước giải phóng khí oxy, đồng thời cố định khí cacbonic thành đường nuôi cây lớn lên!",
        "rxTitle": "QUANG PHÂN LY NƯỚC GIẢI PHÓNG O₂",
        "rxDesc": "Nguồn oxy khí quyển nuôi sống muôn loài bắt nguồn từ phân tử nước"
      },
      {
        "text": "Cân bằng phương trình quang hợp kinh điển trong nháy mắt tại website chính thức: ph-chem.web.app/reactions nhé!",
        "ctaUrl": "ph-chem.web.app/reactions"
      }
    ]
  },
  {
    "id": 50,
    "key": "reel_50_sam_set_phan_dam",
    "videoFileName": "reel_50_sam_set_phan_dam.mp4",
    "title": "SẤM SÉT TẠO PHÂN ĐẠM: TRỜI CHO MÙA MÀNG TỐT TƯƠI",
    "tag": "Tự nhiên",
    "themeColor": "#eab308",
    "accentColor": "#fde047",
    "svgFile": "public/hinh/HNO3.f792a2d5.svg",
    "compoundName": "Axit Nitric & Muối Nitrat",
    "reaction": "N₂ + O₂ (Tia sét 3000°C) → 2 NO → 2 NO₂ → HNO₃",
    "route": "reactions",
    "scenes": [
      {
        "text": "Dân gian có câu: Lúa chiêm lấp ló đầu bờ, hễ nghe tiếng sấm phất cờ mà lên! Tiếng sấm sét thì có liên quan gì đến việc lúa tốt tươi?",
        "badge": "BẠN CÓ BIẾT? #50",
        "h1": "HỄ NGHE TIẾNG SẤM PHẤT CỜ MÀ LÊN",
        "h2": "SẤM SÉT TẠO PHÂN ĐẠM TRỜI CHO",
        "sub": "Cơ chế bẻ gãy liên kết ba của khí Nitơ"
      },
      {
        "text": "Khí nitơ trong không khí cực kỳ bền vững. Nhưng tia sét có nhiệt độ tới ba ngàn độ C bẻ gãy liên kết ba, ép nitơ phản ứng với oxy tạo khí NO!",
        "factTitle": "BẺ GÃY LIÊN KẾT BA BẰNG TIA SÉT",
        "factDesc": "Nhiệt độ cực cao của luồng sét cung cấp năng lượng hoạt hóa phản ứng"
      },
      {
        "text": "Khí NO bị oxy hóa và hòa tan trong nước mưa rơi xuống đất biến thành muối đạm nitrat quý giá, phân bón tự nhiên tưới tắm cho mùa màng!",
        "rxTitle": "CHUYỂN HÓA THÀNH PHÂN ĐẠM NITRAT",
        "rxDesc": "NO2 kết hợp nước mưa tạo axit nitric rồi thành ion đạm NO3- rễ cây dễ hấp thu"
      },
      {
        "text": "Khám phá chuỗi phản ứng của nitơ và axit nitric tại website chính thức: ph-chem.web.app/reactions nhé!",
        "ctaUrl": "ph-chem.web.app/reactions"
      }
    ]
  },
  {
    "id": 51,
    "key": "reel_51_bong_bong_bang_metan",
    "videoFileName": "reel_51_bong_bong_bang_metan.mp4",
    "title": "BONG BÓNG BĂNG METAN: KỲ QUAN ĐẸP NGUY HIỂM",
    "tag": "Tự nhiên",
    "themeColor": "#38bdf8",
    "accentColor": "#7dd3fc",
    "svgFile": "public/hinh/CH4.78d17873.svg",
    "compoundName": "Khí Mêtan (CH₄)",
    "reaction": "CH₄ + 2 O₂ → CO₂ ↑ + 2 H₂O",
    "route": "formulas",
    "scenes": [
      {
        "text": "Những chuỗi bong bóng trắng muốt xếp tầng tầng lớp lớp bị đóng băng vĩnh cửu dưới mặt hồ băng đẹp như cổ tích, nhưng chớ dại châm lửa!",
        "badge": "BẠN CÓ BIẾT? #51",
        "h1": "BONG BÓNG BĂNG METAN",
        "h2": "KỲ QUAN ĐẸP VÀ NGUY HIỂM",
        "sub": "Khí Mêtan đông kết dưới mặt hồ băng"
      },
      {
        "text": "Đó là các bọc khí mêtan sinh ra khi vi khuẩn phân hủy lá cây và xác sinh vật dưới đáy hồ trong điều kiện thiếu oxy!",
        "factTitle": "PHÂN HỦY YẾM KHÍ ĐÁY HỒ",
        "factDesc": "Vi khuẩn cổ sinh methanogen phân giải chất hữu cơ sinh ra khí mêtan"
      },
      {
        "text": "Khí mêtan bay lên gặp tầng nước mặt đóng băng bị chặn lại đông kết thành khối. Nếu đục một lỗ nhỏ rồi châm lửa, ngọn lửa sẽ bùng cháy dữ dội!",
        "rxTitle": "BẪY KHÍ MÊTAN DỄ CHÁY NỔ",
        "rxDesc": "Khí CH4 nguyên chất cháy mạnh với ngọn lửa xanh lam tỏa nhiệt cao"
      },
      {
        "text": "Xem cấu trúc phân tử hydrocacbon tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 52,
    "key": "reel_52_bien_chet_noi_bong_benh",
    "videoFileName": "reel_52_bien_chet_noi_bong_benh.mp4",
    "title": "BIỂN CHẾT: VÌ SAO NGƯỜI NẰM ĐỌC SÁCH NỔI BỀNH BỒNG?",
    "tag": "Tự nhiên",
    "themeColor": "#14b8a6",
    "accentColor": "#2dd4bf",
    "svgFile": "public/hinh/NaCl.42ad885d.svg",
    "compoundName": "Dung Dịch Muối Khoáng Bão Hòa",
    "reaction": "D(nước) = 1.24 g/cm³ > D(người) = 1.0 g/cm³",
    "route": "calculator",
    "scenes": [
      {
        "text": "Tại Biển Chết, dù bạn không biết bơi cũng không bao giờ bị chìm, thậm chí có thể ngả lưng đọc báo bồng bềnh trên mặt nước!",
        "badge": "BẠN CÓ BIẾT? #52",
        "h1": "NGHỊCH LÝ Ở BIỂN CHẾT",
        "h2": "KHÔNG BIẾT BƠI VẪN NỔI BỒNG BỀNH",
        "sub": "Khối lượng riêng cực lớn của dung dịch muối"
      },
      {
        "text": "Độ mặn của Biển Chết lên tới ba mươi tư phần trăm, gấp mười lần nước biển thông thường, nồng độ muối khoáng bão hòa đẩy khối lượng riêng lên cực cao!",
        "factTitle": "ĐỘ MẶN BÃO HÒA 34%",
        "factDesc": "Nồng độ muối cực đại khiến không sinh vật nào sống sót ngoại trừ vi khuẩn chịu mặn"
      },
      {
        "text": "Nước biển nặng tới 1.24 gam trên centimét khối, lớn hơn nhiều khối lượng riêng cơ thể người, tạo lực đẩy Ác-si-mét nâng bổng cơ thể nổi lên!",
        "rxTitle": "LỰC ĐẨY ÁC-SI-MÉT VƯỢT TRỘI",
        "rxDesc": "D(nước) 1.24 g/cm3 lớn hơn D(cơ thể) 1.0 g/cm3 giúp nổi tự nhiên"
      },
      {
        "text": "Tính toán khối lượng riêng và nồng độ dung dịch tại website chính thức: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
{
    "id": 53,
    "key": "reel_53_sao_hoa_do_ri_set",
    "videoFileName": "reel_53_sao_hoa_do_ri_set.mp4",
    "title": "SAO HỎA: HÀNH TINH ĐỎ BỊ RỈ SÉT BAO PHỦ",
    "tag": "Vũ trụ",
    "themeColor": "#ef4444",
    "accentColor": "#f87171",
    "svgFile": "public/hinh/Fe2O3.51ab914b.svg",
    "compoundName": "Sắt(III) Oxit (Fe₂O₃)",
    "reaction": "4 Fe + 3 O₂ → 2 Fe₂O₃ (Lớp rỉ sét đỏ cam)",
    "route": "table",
    "scenes": [
      {
        "text": "Nhìn lên bầu trời đêm, Sao Hỏa tỏa ra ánh sáng đỏ cam rực rỡ kỳ ảo. Tại sao hành tinh này lại có màu sắc đặc biệt như vậy?",
        "badge": "BẠN CÓ BIẾT? #53",
        "h1": "BÍ ẨN HÀNH TINH ĐỎ",
        "h2": "SAO HỎA BỊ RỈ SÉT BAO PHỦ",
        "sub": "Hàng tỷ tấn oxit sắt bao bọc bề mặt"
      },
      {
        "text": "Bề mặt Sao Hỏa thực chất được bao phủ bởi một lớp bụi sắt ba oxit Fe2O3 khổng lồ — chính là chất rỉ sét kim loại quen thuộc!",
        "factTitle": "LỚP BỤI RỈ SÉT Fe₂O₃",
        "factDesc": "Khoáng chất hematit sắt oxit phản chiếu ánh sáng đỏ cam khắp bề mặt"
      },
      {
        "text": "Hàng tỷ năm trước, sắt trong đá núi lửa Sao Hỏa phản ứng với nước và khí quyển cổ đại, oxy hóa toàn bộ bề mặt thành một hành tinh rỉ sét!",
        "rxTitle": "QUÁ TRÌNH OXY HÓA TOÀN HÀNH TINH",
        "rxDesc": "Gió bão bụi thổi tung hạt oxit sắt tạo nên bầu trời đỏ cam huyền bí"
      },
      {
        "text": "Khám phá nguyên tố Sắt và các oxit kim loại tại website chính thức: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 54,
    "key": "reel_54_pin_lithium_ion",
    "videoFileName": "reel_54_pin_lithium_ion.mp4",
    "title": "PIN LITHIUM-ION: TRÁI TIM XE ĐIỆN VÀ SMARTPHONE",
    "tag": "Công nghệ",
    "themeColor": "#06b6d4",
    "accentColor": "#22d3ee",
    "svgFile": "public/hinh/Li2CO3.a868f6d9.svg",
    "compoundName": "Lithium & Hợp Chất Ion Li⁺",
    "reaction": "LiCoO₂ + C₆ ⇌ Li_{1-x}CoO₂ + Li_x C₆",
    "route": "calculator",
    "scenes": [
      {
        "text": "Từ chiếc điện thoại trên tay đến những chiếc xe điện lướt đi êm ái trên đường phố — Tất cả đều hoạt động nhờ một nguyên tố kỳ diệu!",
        "badge": "BẠN CÓ BIẾT? #54",
        "h1": "PIN LITHIUM-ION",
        "h2": "TRÁI TIM CÔNG NGHỆ HIỆN ĐẠI",
        "sub": "Nguyên tố kim loại nhẹ nhất bảng tuần hoàn"
      },
      {
        "text": "Lithium là kim loại nhẹ nhất vũ trụ, thế điện cực âm nhất, giúp tích trữ mật độ năng lượng khổng lồ trong một kích thước nhỏ bé!",
        "factTitle": "MẬT ĐỘ NĂNG LƯỢNG VƯỢT TRỘI",
        "factDesc": "Bán kính ion cực nhỏ giúp ion Li+ dễ dàng xen vào mạng lưới điện cực"
      },
      {
        "text": "Khi sạc và xả, các ion Li+ di chuyển con thoi giữa hai điện cực mà không phá hủy cấu trúc vật liệu, cho phép sạc lại hàng ngàn lần!",
        "rxTitle": "CƠ CHẾ DI CHUYỂN CON THOI",
        "rxDesc": "Phản ứng điện hóa thuận nghịch bền bỉ cung cấp dòng điện liên tục"
      },
      {
        "text": "Tính toán thế điện cực và phản ứng điện hóa tại website chính thức: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
  {
    "id": 55,
    "key": "reel_55_mua_axit_sao_kim",
    "videoFileName": "reel_55_mua_axit_sao_kim.mp4",
    "title": "SAO KIM: MƯA AXIT SUNFURIC TRÊN ĐỊA NGỤC 465°C",
    "tag": "Vũ trụ",
    "themeColor": "#eab308",
    "accentColor": "#fde047",
    "svgFile": "public/hinh/H2SO4.300b7501.svg",
    "compoundName": "Axit Sunfuric (H₂SO₄)",
    "reaction": "SO₂ + H₂O → H₂SO₃; H₂SO₄ bốc hơi ở 300°C",
    "route": "calculator",
    "scenes": [
      {
        "text": "Sao Kim sáng nhất bầu trời đêm như một viên ngọc, nhưng thực tế bên dưới lại là một địa ngục nóng bốn trăm sáu mươi lăm độ C!",
        "badge": "BẠN CÓ BIẾT? #55",
        "h1": "ĐỊA NGỤC SAO KIM 465°C",
        "h2": "CƠN MƯA AXIT SUNFURIC ĐẬM ĐẶC",
        "sub": "Hiệu ứng nhà kính mất kiểm soát cực đoan"
      },
      {
        "text": "Bầu khí quyển Sao Kim chứa chín mươi sáu phần trăm khí CO2 và những tầng mây khổng lồ bằng axit sunfuric nguyên chất!",
        "factTitle": "MÂY AXIT SUNFURIC NGUYÊN CHẤT",
        "factDesc": "Nồng độ H2SO4 trong các giọt mây đạt tới 85 - 90%"
      },
      {
        "text": "Những cơn mưa axit sunfuric trút xuống nhưng không bao giờ chạm đất, vì nhiệt độ quá nóng làm giọt axit bốc hơi ngược lên trời!",
        "rxTitle": "BỐC HƠI TRƯỚC KHI CHẠM ĐẤT",
        "rxDesc": "Hiện tượng virga: mưa axit bốc hơi tạo vòng tuần hoàn axit vĩnh cửu"
      },
      {
        "text": "Đo độ pH và tính toán nồng độ axit tại website chính thức: ph-chem.web.app/calculator nhé!",
        "ctaUrl": "ph-chem.web.app/calculator"
      }
    ]
  },
  {
    "id": 56,
    "key": "reel_56_graphene_sieu_vat_lieu",
    "videoFileName": "reel_56_graphene_sieu_vat_lieu.mp4",
    "title": "GRAPHENE: VẬT LIỆU MỎNG NHẤT CỨNG GẤP 200 LẦN THÉP",
    "tag": "Công nghệ",
    "themeColor": "#0284c7",
    "accentColor": "#38bdf8",
    "svgFile": "public/hinh/Graphene.svg",
    "compoundName": "Siêu Vật Liệu Graphene (C)",
    "reaction": "Mạng lưới Carbon sp² độ dày 1 nguyên tử (0.335 nm)",
    "route": "formulas",
    "scenes": [
      {
        "text": "Một tấm vật liệu mỏng đến mức vô hình với độ dày chỉ một nguyên tử, nhưng có thể đỡ được một con voi trưởng thành — Đó là chất gì?",
        "badge": "BẠN CÓ BIẾT? #56",
        "h1": "SIÊU VẬT LIỆU GRAPHENE",
        "h2": "CỨNG GẤP 200 LẦN THÉP",
        "sub": "Độ dày chỉ đúng một lớp nguyên tử Carbon"
      },
      {
        "text": "Đó là Graphene — lớp đơn nguyên tử carbon sắp xếp theo hình tổ ong lục giác, dẫn điện tốt hơn đồng và dẫn nhiệt số một thế giới!",
        "factTitle": "CẤU TRÚC TỔ ONG LỤC GIÁC 2D",
        "factDesc": "Liên kết cộng hóa trị sp2 siêu bền mang lại độ bền cơ học vô địch"
      },
      {
        "text": "Nếu dùng một tấm graphene phủ lên miệng ly cà phê, một cây bút chì đỡ cả con voi đặt lên trên cũng không làm rách được nó!",
        "rxTitle": "ĐỘ BỀN KÉO VÔ ĐỊCH VŨ TRỤ",
        "rxDesc": "Ứng dụng trong pin sạc siêu tốc, vi mạch lượng tử và áo giáp nano"
      },
      {
        "text": "Khám phá các dạng thù hình của cacbon tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 57,
    "key": "reel_57_mat_troi_nhiet_hach",
    "videoFileName": "reel_57_mat_troi_nhiet_hach.mp4",
    "title": "MẶT TRỜI TỎA SÁNG: PHẢN ỨNG NHIỆT HẠCH HẠT NHÂN",
    "tag": "Vũ trụ",
    "themeColor": "#f97316",
    "accentColor": "#fb923c",
    "svgFile": "public/hinh/He.svg",
    "compoundName": "Phản Ứng Nhiệt Hạch (Hydro → Heli)",
    "reaction": "4 ¹H → ⁴He + 2 e⁺ + 2 ν_e + 26.7 MeV",
    "route": "table",
    "scenes": [
      {
        "text": "Mặt Trời không hề có oxy nhưng lại bốc cháy rừng rực suốt 4.6 tỷ năm qua để sưởi ấm cho Trái Đất. Nguồn lửa đó bắt nguồn từ đâu?",
        "badge": "BẠN CÓ BIẾT? #57",
        "h1": "LÒ LỬA BẤT TẬN CỦA VŨ TRỤ",
        "h2": "BẢN CHẤT PHẢN ỨNG NHIỆT HẠCH",
        "sub": "Hợp hạch bốn hạt nhân Hydro thành Heli"
      },
      {
        "text": "Mặt Trời không cháy bằng phản ứng hóa học mà bằng phản ứng nhiệt hạch: Áp suất khổng lồ ép các hạt nhân hydro hợp hạch thành heli!",
        "factTitle": "HỢP HẠCH HẠT NHÂN TẠI LÕI",
        "factDesc": "Nhiệt độ 15 triệu độ C ép 600 triệu tấn hydro hợp hạch mỗi giây"
      },
      {
        "text": "Mỗi giây, 4 triệu tấn vật chất biến thành năng lượng theo phương trình E bằng m c bình phương của Einstein, tỏa ánh sáng muôn nơi!",
        "rxTitle": "CHUYỂN HÓA KHỐI LƯỢNG THÀNH NĂNG LƯỢNG",
        "rxDesc": "Phát ra photon ánh sáng mất hàng trăm ngàn năm thoát khỏi lõi Mặt Trời"
      },
      {
        "text": "Khám phá nguyên tố Hydro và Heli tại website chính thức: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 58,
    "key": "reel_58_kinh_james_webb_ma_vang",
    "videoFileName": "reel_58_kinh_james_webb_ma_vang.mp4",
    "title": "KÍNH JAMES WEBB MẠ VÀNG: MẮT THẦN DÒ TÌM VŨ TRỤ",
    "tag": "Vũ trụ",
    "themeColor": "#eab308",
    "accentColor": "#fde047",
    "svgFile": "public/hinh/Au.svg",
    "compoundName": "Kim Loại Vàng Nguyên Chất (Au)",
    "reaction": "Lớp mạ vàng dày 100 nm phản xạ 98% tia hồng ngoại",
    "route": "table",
    "scenes": [
      {
        "text": "Chiếc kính thiên văn đắt nhất lịch sử loài người James Webb được đưa vào không gian với những tấm gương mạ vàng óng ánh — Tại sao phải dùng vàng?",
        "badge": "BẠN CÓ BIẾT? #58",
        "h1": "KÍNH THIÊN VĂN JAMES WEBB",
        "h2": "VÌ SAO ĐƯỢC MẠ VÀNG RÒNG?",
        "sub": "Kim loại phản xạ tia hồng ngoại tốt nhất"
      },
      {
        "text": "Vàng là nguyên tố phản xạ bức xạ hồng ngoại hoàn hảo nhất vũ trụ, đạt tới chín mươi tám phần trăm mà không hề bị oxy hóa hay hoen rỉ!",
        "factTitle": "PHẢN XẠ 98% BỨC XẠ HỒNG NGOẠI",
        "factDesc": "Bắt trọn những tia sáng mờ nhạt từ các thiên hà thuở sơ khai của vũ trụ"
      },
      {
        "text": "Lớp mạ vàng trên gương chỉ dày một trăm nanomet, toàn bộ tấm gương khổng lồ 6.5 mét chỉ tiêu tốn đúng bốn gam vàng ròng!",
        "rxTitle": "LỚP PHỦ NANO SIÊU MỎNG",
        "rxDesc": "Chỉ 4 gam vàng đã giúp nhân loại nhìn ngược về 13.5 tỷ năm trước"
      },
      {
        "text": "Khám phá nguyên tố Vàng và kim loại quý tại website chính thức: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 59,
    "key": "reel_59_sao_bang_chay_sang",
    "videoFileName": "reel_59_sao_bang_chay_sang.mp4",
    "title": "VÌ SAO SAO BĂNG BỐC CHÁY SÁNG RỰC TRÊN BẦU TRỜI?",
    "tag": "Vũ trụ",
    "themeColor": "#38bdf8",
    "accentColor": "#7dd3fc",
    "svgFile": "public/hinh/MgO.100548cb.svg",
    "compoundName": "Khoáng Vật Silicat & Kim Loại Vũ Trụ",
    "reaction": "Nén khí động học sinh nhiệt 1600°C bốc cháy",
    "route": "table",
    "scenes": [
      {
        "text": "Một vệt sáng lướt nhanh qua bầu trời đêm khiến triệu người ước nguyện — Nhưng bản chất hóa học của một ngôi sao băng là gì?",
        "badge": "BẠN CÓ BIẾT? #59",
        "h1": "VỆT SÁNG SAO BĂNG BẦU TRỜI",
        "h2": "BẢN CHẤT BỐC CHÁY LÀ GÌ?",
        "sub": "Nén khí động học với vận tốc 70 km/s"
      },
      {
        "text": "Hầu hết sao băng chỉ là những hạt bụi vũ trụ nhỏ bằng hạt cát lao vào khí quyển với vận tốc lên tới bảy mươi kilômét một giây!",
        "factTitle": "ÁP SUẤT NÉN KHÍ ĐỘNG HỌC",
        "factDesc": "Không khí phía trước bị nén cực mạnh sinh nhiệt độ trên 1600 độ C"
      },
      {
        "text": "Nhiệt độ này ion hóa không khí và bốc hơi các kim loại sắt, magie, canxi phát ra những dải sáng màu xanh lam rực rỡ!",
        "rxTitle": "ION HÓA BỐC HƠI KIM LOẠI",
        "rxDesc": "Màu sắc vệt sáng phản ánh thành phần kim loại chứa trong thiên thạch"
      },
      {
        "text": "Tìm hiểu màu sắc ion kim loại và thử màu ngọn lửa tại website: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 60,
    "key": "reel_60_sieu_dan_nhiet_do_phong",
    "videoFileName": "reel_60_sieu_dan_nhiet_do_phong.mp4",
    "title": "HIỆN TƯỢNG SIÊU DẪN: TRUYỀN TẢI ĐIỆN KHÔNG TIÊU HAO",
    "tag": "Công nghệ",
    "themeColor": "#8b5cf6",
    "accentColor": "#a78bfa",
    "svgFile": "public/hinh/TiO2.151b02b6.svg",
    "compoundName": "Vật Liệu Siêu Dẫn (YBCO)",
    "reaction": "Điện trở R = 0 & Hiệu ứng Meissner đẩy từ trường",
    "route": "electro",
    "scenes": [
      {
        "text": "Nếu dòng điện chạy qua một cuộn dây suốt một ngàn năm mà không hao hụt một milioat nào — Giấc mơ siêu dẫn có thể thay đổi thế giới ra sao?",
        "badge": "BẠN CÓ BIẾT? #60",
        "h1": "HIỆN TƯỢNG SIÊU DẪN",
        "h2": "TRUYỀN ĐIỆN KHÔNG HAO PHÍ",
        "sub": "Điện trở bằng không và hiệu ứng nâng từ tính"
      },
      {
        "text": "Khi hạ dưới nhiệt độ tới hạn, electron kết cặp thành cặp Cooper lướt qua mạng tinh thể mà hoàn toàn không bị va chạm hay sinh nhiệt!",
        "factTitle": "ĐIỆN TRỞ HOÀN TOÀN BẰNG KHÔNG",
        "factDesc": "Dòng điện siêu dẫn có thể chạy vĩnh cửu trong vòng lặp không tiêu hao"
      },
      {
        "text": "Vật liệu siêu dẫn còn đẩy toàn bộ từ trường ra ngoài, khiến nam châm lơ lửng bồng bềnh — chìa khóa của tàu đệm từ chạy 600 km/h!",
        "rxTitle": "HIỆU ỨNG TỪ TÍNH MEISSNER",
        "rxDesc": "Khát vọng siêu dẫn nhiệt độ phòng mở ra kỷ nguyên năng lượng vô tận"
      },
      {
        "text": "Khám phá dãy điện hóa và tính chất dẫn điện tại website chính thức: ph-chem.web.app/electro nhé!",
        "ctaUrl": "ph-chem.web.app/electro"
      }
    ]
  },
  {
    "id": 61,
    "key": "reel_61_titan_kim_loai_tuong_lai",
    "videoFileName": "reel_61_titan_kim_loai_tuong_lai.mp4",
    "title": "TITAN: KIM LOẠI CỦA VŨ TRỤ VÀ CẤY GHÉP Y HỌC",
    "tag": "Công nghệ",
    "themeColor": "#14b8a6",
    "accentColor": "#2dd4bf",
    "svgFile": "public/hinh/TiO2.151b02b6.svg",
    "compoundName": "Titan & Titan Đioxit (TiO₂)",
    "reaction": "Ti + O₂ → TiO₂ (Màng oxit trơ bảo vệ tuyệt đối)",
    "route": "table",
    "scenes": [
      {
        "text": "Kim loại nào vừa dùng chế tạo vỏ tàu vũ trụ siêu thanh, vừa được cấy thẳng vào xương tủy con người mà không bao giờ bị đào thải?",
        "badge": "BẠN CÓ BIẾT? #61",
        "h1": "KIM LOẠI VŨ TRỤ TITAN",
        "h2": "TƯƠNG THÍCH SINH HỌC KỲ DIỆU",
        "sub": "Bền như thép nhưng nhẹ hơn gần một nửa"
      },
      {
        "text": "Đó là Titan — kim loại có tỷ lệ sức bền trên trọng lượng cao nhất, nhẹ hơn thép 45% nhưng chịu được nhiệt độ và áp suất cực hạn!",
        "factTitle": "BỀN NHẸ VÔ ĐỊCH HÀNG KHÔNG",
        "factDesc": "Chống ăn mòn tuyệt đối trong nước biển và các dung dịch axit mạnh"
      },
      {
        "text": "Trên bề mặt Titan luôn tự hình thành màng oxit TiO2 trơ tuyệt đối, cho phép mô xương người phát triển bám chặt như một thể thống nhất!",
        "rxTitle": "TÍCH HỢP XƯƠNG CẤY GHÉP Y KHOA",
        "rxDesc": "Vật liệu hoàn hảo cho khớp nhân tạo và răng cấy ghép implant"
      },
      {
        "text": "Tra cứu tính chất nguyên tố Titan trong bảng tuần hoàn tại: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 62,
    "key": "reel_62_khi_hiem_neon_den_quang_cao",
    "videoFileName": "reel_62_khi_hiem_neon_den_quang_cao.mp4",
    "title": "KHÍ HIẾM NEON: ÁNH SÁNG ĐỎ CAM BẤT TẬN",
    "tag": "Công nghệ",
    "themeColor": "#f43f5e",
    "accentColor": "#fb7185",
    "svgFile": "public/hinh/Ne.svg",
    "compoundName": "Khí Hiếm Neon (Ne)",
    "reaction": "Kích thích điện áp 15000V → Phát quang vạch đỏ cam",
    "route": "table",
    "scenes": [
      {
        "text": "Những bảng hiệu quảng cáo rực rỡ sắc màu thắp sáng các đại lộ sầm uất về đêm tại Tokyo hay New York hoạt động như thế nào?",
        "badge": "BẠN CÓ BIẾT? #62",
        "h1": "ÁNH SÁNG ĐÈN QUẢNG CÁO",
        "h2": "BÍ MẬT CỦA CÁC KHÍ HIẾM",
        "sub": "Hiện tượng phóng điện qua chất khí trơ"
      },
      {
        "text": "Đó là các khí trơ nhóm VIIIA: Khí Neon nguyên chất phát ra màu đỏ cam rực rỡ, Argon tạo màu tím xanh, còn Heli phát ánh vàng!",
        "factTitle": "QUANG PHỔ PHÁT XẠ ĐẶC TRƯNG",
        "factDesc": "Mỗi khí hiếm có mức năng lượng electron riêng tạo nên màu sắc cố định"
      },
      {
        "text": "Khi phóng điện áp cao qua ống chân không, electron va chạm kích thích nguyên tử neon nhảy lên mức năng lượng cao rồi phát ra photon ánh sáng!",
        "rxTitle": "PHÁT QUANG VẠCH QUY TẮC BÁT TỬ",
        "rxDesc": "Lớp vỏ 8 electron trơ bền giúp bóng đèn hoạt động hàng chục năm không hỏng"
      },
      {
        "text": "Khám phá nhóm khí hiếm và bảng tuần hoàn tại website chính thức: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 63,
    "key": "reel_63_nhien_lieu_ten_lua",
    "videoFileName": "reel_63_nhien_lieu_ten_lua.mp4",
    "title": "NHIÊN LIỆU TÊN LỬA VŨ TRỤ: SỨC MẠNH HYDRO VÀ OXY LỎNG",
    "tag": "Vũ trụ",
    "themeColor": "#0ea5e9",
    "accentColor": "#38bdf8",
    "svgFile": "public/hinh/H2O.d9875909.svg",
    "compoundName": "Hydro Lỏng & Oxy Lỏng (Hydrolox)",
    "reaction": "2 H₂ (lỏng) + O₂ (lỏng) → 2 H₂O (khí) + Vận tốc phụt 4500 m/s",
    "route": "reactions",
    "scenes": [
      {
        "text": "Lực đẩy nào đủ sức nâng một quả tên lửa nặng ba ngàn tấn bay thẳng ra khỏi lực hấp dẫn của Trái Đất để tới các vì sao xa xôi?",
        "badge": "BẠN CÓ BIẾT? #63",
        "h1": "SỨC MẠNH ĐẨY TÊN LỬA VŨ TRỤ",
        "h2": "HYDRO VÀ OXY LỎNG",
        "sub": "Động cơ tên lửa Hydrolox siêu sạch"
      },
      {
        "text": "Nhiên liệu tên lửa mạnh nhất là Hydro lỏng âm 253 độ C kết hợp Oxy lỏng, tạo ra xung động đẩy riêng lớn nhất trong các nhiên liệu hóa học!",
        "factTitle": "NHIÊN LIỆU HYDROLOX SIÊU LẠNH",
        "factDesc": "Tỷ lệ tỏa năng lượng trên khối lượng cao gấp 3 lần xăng dầu thông thường"
      },
      {
        "text": "Phản ứng cháy sinh ra hơi nước siêu nhiệt phụt ra loa động cơ với vận tốc 4500 m/s, tạo phản lực khổng lồ đẩy tên lửa vút bay!",
        "rxTitle": "KHÍ THẢI CHỈ DUY NHẤT LÀ NƯỚC",
        "rxDesc": "Khói trắng khổng lồ dưới bệ phóng tên lửa thực chất chỉ là hơi nước tinh khiết"
      },
      {
        "text": "Cân bằng phản ứng đốt cháy nhiên liệu tên lửa tại website chính thức: ph-chem.web.app/reactions nhé!",
        "ctaUrl": "ph-chem.web.app/reactions"
      }
    ]
  },
  {
    "id": 64,
    "key": "reel_64_aerogel_khoi_dong_ket",
    "videoFileName": "reel_64_aerogel_khoi_dong_ket.mp4",
    "title": "AEROGEL: KHÓI ĐÔNG KẾT CÁCH NHIỆT VÔ ĐỊCH",
    "tag": "Công nghệ",
    "themeColor": "#67e8f9",
    "accentColor": "#a5f3fc",
    "svgFile": "public/hinh/SiO2.33c02194.svg",
    "compoundName": "Khói Đông Kết Aerogel (SiO₂)",
    "reaction": "Chứa 99.8% không khí; D = 0.001 g/cm³",
    "route": "formulas",
    "scenes": [
      {
        "text": "Một khối chất rắn trong suốt như làn khói đông kết, đặt bông hoa lên trên rồi châm ngọn lửa một ngàn độ C bên dưới mà hoa không hề héo!",
        "badge": "BẠN CÓ BIẾT? #64",
        "h1": "AEROGEL: KHÓI ĐÔNG KẾT",
        "h2": "VẬT LIỆU CÁCH NHIỆT VÔ ĐỊCH",
        "sub": "Chất rắn nhẹ nhất thế giới chứa 99.8% không khí"
      },
      {
        "text": "Đó là Aerogel — một cấu trúc xốp nano bằng silic đioxit SiO2, nơi 99.8% thể tích là không khí bị khóa chặt trong các lỗ xốp siêu nhỏ!",
        "factTitle": "CẤU TRÚC LỖ XỐP NANO SiO₂",
        "factDesc": "Kích thước lỗ xốp nhỏ hơn quãng đường tự do trung bình của phân tử khí"
      },
      {
        "text": "Không khí không thể đối lưu, nhiệt không thể truyền qua khiến Aerogel trở thành tấm khiên cách nhiệt bảo vệ các tàu đổ bộ Sao Hỏa!",
        "rxTitle": "TRIỆT TIÊU DẪN NHIỆT VÀ ĐỐI LƯU",
        "rxDesc": "NASA sử dụng Aerogel để giữ ấm tàu thăm dò vũ trụ trong đêm đông âm 100°C"
      },
      {
        "text": "Tra cứu cấu trúc Silic Đioxit và vật liệu mới tại website chính thức: ph-chem.web.app/formulas nhé!",
        "ctaUrl": "ph-chem.web.app/formulas"
      }
    ]
  },
  {
    "id": 65,
    "key": "reel_65_chip_ban_dan_silicon",
    "videoFileName": "reel_65_chip_ban_dan_silicon.mp4",
    "title": "CHIP BÁN DẪN SILICON: BỘ NÃO CỦA KỶ NGUYÊN AI",
    "tag": "Công nghệ",
    "themeColor": "#0284c7",
    "accentColor": "#38bdf8",
    "svgFile": "public/hinh/SiO2.33c02194.svg",
    "compoundName": "Silic Bán Dẫn Siêu Tinh Khiết (Si)",
    "reaction": "Độ tinh khiết 99.9999999% (9 con số 9)",
    "route": "table",
    "scenes": [
      {
        "text": "Làm thế nào mà những hạt cát trắng tầm thường trên bãi biển lại có thể biến thành những con chip thông minh điều khiển cả thế giới?",
        "badge": "BẠN CÓ BIẾT? #65",
        "h1": "TỪ CÁT BIỂN ĐẾN TRÍ TUỆ NHÂN TẠO",
        "h2": "BẢN CHẤT CHIP BÁN DẪN SILICON",
        "sub": "Vật liệu bán dẫn tinh khiết bậc nhất"
      },
      {
        "text": "Cát biển là silic đioxit SiO2, được nung chảy khử oxy và tinh chế thành Silic siêu tinh khiết với độ chính xác chín con số chín!",
        "factTitle": "ĐỘ TINH KHIẾT CHÍN SỐ CHÍN",
        "factDesc": "Chỉ 1 nguyên tử tạp chất trên 1 tỷ nguyên tử silic tinh khiết"
      },
      {
        "text": "Khắc hàng chục tỷ bóng bán dẫn kích thước vài nanomet lên tấm silic, điều khiển dòng electron đóng ngắt tạo nên mã nhị phân xử lý AI!",
        "rxTitle": "ĐIỀU KHIỂN DÒNG ELECTRON NANO",
        "rxDesc": "Pha tạp phospho và bo để tạo nên các cổng logic bán dẫn siêu tốc"
      },
      {
        "text": "Khám phá nguyên tố Silic và vật liệu bán dẫn tại website chính thức: ph-chem.web.app/table nhé!",
        "ctaUrl": "ph-chem.web.app/table"
      }
    ]
  },
  {
    "id": 66,
    "key": "reel_66_bui_mat_trang_mui_thuoc_sung",
    "videoFileName": "reel_66_bui_mat_trang_mui_thuoc_sung.mp4",
    "title": "BỤI MẶT TRĂNG: BÍ ẨN MÙI THUỐC SÚNG CHÁY",
    "tag": "Vũ trụ",
    "themeColor": "#94a3b8",
    "accentColor": "#cbd5e1",
    "svgFile": "public/hinh/Fe2O3.51ab914b.svg",
    "compoundName": "Đá Silicat Mặt Trăng (Regolith)",
    "reaction": "Gốc tự do tiếp xúc O₂ trong phi thuyền tạo mùi khét",
    "route": "table",
    "scenes": [
      {
        "text": "Khi các phi hành gia Apollo trở về khoang tàu sau khi dạo bước trên Mặt Trăng, họ kinh ngạc nhận ra bụi Mặt Trăng có mùi khét như thuốc súng vừa nổ!",
        "badge": "BẠN CÓ BIẾT? #66",
        "h1": "BỤI MẶT TRĂNG CÓ MÙI GÌ?",
        "h2": "BÍ ẨN MÙI THUỐC SÚNG VỪA NỔ",
        "sub": "Hiện tượng liên kết hóa học bẻ gãy do gió mặt trời"
      },
      {
        "text": "Mặt Trăng không có khí quyển, hàng tỷ năm bị gió mặt trời và bức xạ vũ trụ bắn phá làm bẻ gãy các liên kết hóa học trong bụi silicat!",
        "factTitle": "CÁC LIÊN KẾT BỊ BẺ GÃY DANG DỞ",
        "factDesc": "Các hạt bụi mang đầy gốc tự do và electron chưa ghép đôi lơ lửng"
      },
      {
        "text": "Khi bụi bám vào phi phục gặp oxy và hơi ẩm trong phi thuyền, chúng lập tức phản ứng oxy hóa cấp tốc giải phóng mùi khét hệt thuốc súng cháy!",
        "rxTitle": "OXY HÓA CẤP TỐC TRONG KHOANG TÀU",
        "rxDesc": "Phản ứng kích thích tức thì của các gốc tự do silicat giải phóng mùi đặc trưng"
      },
      {
        "text": "Trải nghiệm bách khoa 325 sự thật hóa học kỳ thú tại website: ph-chem.web.app nhé!",
        "ctaUrl": "ph-chem.web.app"
      }
    ]
  }
];

// 🎨 SLIDE 1: HOOK (GÂY TÒ MÒ)
async function renderSlide1(reel, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const s1 = reel.scenes[0];
  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hookCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.97" />
        </linearGradient>
        <linearGradient id="topCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050811" stop-opacity="1" />
          <stop offset="78%" stop-color="#050811" stop-opacity="1" />
          <stop offset="100%" stop-color="#050811" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Xóa dòng chữ INTERACTIVE PERIODIC TABLE ở đỉnh, giữ nguyên các nguyên tử bên dưới -->
      <rect x="0" y="0" width="${WIDTH}" height="260" fill="url(#topCoverGrad)" />

      <!-- Badge Top -->
      <rect x="120" y="90" width="480" height="54" rx="27" fill="${reel.themeColor}" fill-opacity="0.25" stroke="${reel.themeColor}" stroke-width="2.2" />
      <text x="360" y="126" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="${reel.accentColor}" text-anchor="middle" letter-spacing="2">💡 ${xmlEscape(s1.badge)}</text>

      <!-- Main Hook Box -->
      <rect x="40" y="340" width="640" height="500" rx="32" fill="url(#hookCardGrad)" stroke="${reel.themeColor}" stroke-width="2.5" />
      
      <rect x="80" y="380" width="560" height="54" rx="14" fill="${reel.themeColor}" fill-opacity="0.2" stroke="${reel.themeColor}" stroke-width="1.5" />
      <text x="360" y="416" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="${reel.accentColor}" text-anchor="middle">🔍 BÍ MẬT HÓA HỌC THỰC TIỄN</text>

      <text x="360" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(s1.h1)}</text>
      <text x="360" y="565" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="900" fill="${reel.accentColor}" text-anchor="middle">${xmlEscape(s1.h2)}</text>

      <text x="360" y="635" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600" fill="#cbd5e1" text-anchor="middle">${xmlEscape(s1.sub)}</text>
      
      <rect x="90" y="690" width="540" height="80" rx="18" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="728" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Trích từ kho bách khoa sự thật</text>
      <text x="360" y="756" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">Website: ph-chem.web.app</text>

      <!-- Footer indicator -->
      <rect x="180" y="1140" width="360" height="48" rx="24" fill="#030712" fill-opacity="0.8" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="1172" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="600" fill="#94a3b8" text-anchor="middle">👉 Cùng khám phá bí mật ngay sau đây!</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_01.jpg'));
}

// 🎨 SLIDE 2: FACT & CẤU TRÚC PHÂN TỬ
async function renderSlide2(reel, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const s2 = reel.scenes[1];
  
  // Render SVG cấu trúc thành PNG đệm
  const svgAbs = path.join(ROOT_DIR, reel.svgFile);
  let molBuf = null;
  if (fs.existsSync(svgAbs)) {
    molBuf = await sharp(svgAbs)
      .resize(340, 210, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0.96 } })
      .png()
      .toBuffer();
  }

  const factLines = wrapSvgLines(s2.factDesc, 34);
  const factSvg = factLines.map((line, i) => 
    `<text x="40" y="${110 + i * 36}" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#e2e8f0">${xmlEscape(line)}</text>`
  ).join('\n');

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050811" stop-opacity="1" />
          <stop offset="78%" stop-color="#050811" stop-opacity="1" />
          <stop offset="100%" stop-color="#050811" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Xóa dòng chữ INTERACTIVE PERIODIC TABLE ở đỉnh -->
      <rect x="0" y="0" width="${WIDTH}" height="260" fill="url(#topCoverGrad)" />
      <!-- Lớp backdrop mờ tối giữ lại các nguyên tố phát sáng bên dưới -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#070a13" fill-opacity="0.84" />

      <!-- Top capsule -->
      <rect x="160" y="80" width="400" height="48" rx="24" fill="${reel.themeColor}" fill-opacity="0.2" stroke="${reel.themeColor}" stroke-width="2" />
      <text x="360" y="112" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="${reel.accentColor}" text-anchor="middle" letter-spacing="2">🔬 BẢN CHẤT HÓA HỌC</text>

      <text x="360" y="185" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(s2.factTitle)}</text>
      <text x="360" y="225" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="${reel.accentColor}" text-anchor="middle">${xmlEscape(reel.compoundName)}</text>

      <!-- Molecular Frame Card -->
      <rect x="50" y="270" width="620" height="450" rx="24" fill="#0f172a" stroke="${reel.themeColor}" stroke-width="2.5" />
      <text x="360" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#94a3b8" text-anchor="middle">CẤU TRÚC PHÂN TỬ CHUẨN IUPAC</text>

      <!-- Khung trắng chứa hình phân tử -->
      <rect x="170" y="350" width="380" height="240" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="3" />
      
      <rect x="90" y="620" width="540" height="70" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="662" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#38bdf8" text-anchor="middle">Tra cứu trực quan trên thư viện pH-Chem</text>

      <!-- Explanation Box -->
      <g transform="translate(50, 760)">
        <rect width="620" height="280" rx="24" fill="#1e293b" stroke="#334155" stroke-width="2" />
        <text x="40" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="${reel.accentColor}">💡 Giải thích khoa học:</text>
        <line x1="30" y1="75" x2="590" y2="75" stroke="#334155" stroke-width="1.5" />
        <g>
          ${factSvg}
        </g>
      </g>

      <!-- Bottom Tag -->
      <rect x="130" y="1100" width="460" height="50" rx="16" fill="#0d9488" fill-opacity="0.25" stroke="#2dd4bf" stroke-width="1.5" />
      <text x="360" y="1134" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" fill="#5eead4" text-anchor="middle">✨ Dữ liệu thực tiễn được kiểm chứng</text>
    </svg>
  `);

  const composites = [{ input: svg, top: 0, left: 0 }];
  if (molBuf) {
    composites.push({ input: molBuf, top: 365, left: 190 });
  }

  await base.composite(composites).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_02.jpg'));
}

// 🎨 SLIDE 3: PHƯƠNG TRÌNH & CƠ CHẾ
async function renderSlide3(reel, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const s3 = reel.scenes[2];

  // Xử lý xuống dòng cho phương trình
  const rxLines = wrapSvgLines(reel.reaction, 32);
  const rxFontSize = rxLines.length > 1 ? 23 : 26;
  const rxSvg = rxLines.map((line, i) => {
    const yPos = rxLines.length > 1 ? (115 + i * 36) : 135;
    return `<text x="315" y="${yPos}" font-family="Consolas, 'Segoe UI', monospace" font-size="${rxFontSize}" font-weight="bold" fill="${reel.accentColor}" text-anchor="middle">${xmlEscape(line)}</text>`;
  }).join('\n');

  // Xử lý xuống dòng cho phần mô tả cơ chế
  const descLines = wrapSvgLines(s3.rxDesc, 34);
  const descSvg = descLines.map((line, i) =>
    `<text x="40" y="${150 + i * 34}" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="#cbd5e1">${xmlEscape(line)}</text>`
  ).join('\n');

  const descHeightOffset = descLines.length * 34;

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="topCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050811" stop-opacity="1" />
          <stop offset="78%" stop-color="#050811" stop-opacity="1" />
          <stop offset="100%" stop-color="#050811" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Xóa dòng chữ INTERACTIVE PERIODIC TABLE ở đỉnh -->
      <rect x="0" y="0" width="${WIDTH}" height="260" fill="url(#topCoverGrad)" />
      <!-- Lớp backdrop mờ tối giữ lại các nguyên tố phát sáng bên dưới -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#070a13" fill-opacity="0.84" />

      <!-- Top Header -->
      <rect x="150" y="80" width="420" height="48" rx="24" fill="${reel.themeColor}" fill-opacity="0.2" stroke="${reel.themeColor}" stroke-width="2" />
      <text x="360" y="112" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="${reel.accentColor}" text-anchor="middle" letter-spacing="2">⚡ PHẢN ỨNG &amp; CƠ CHẾ</text>

      <text x="360" y="185" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle">${xmlEscape(s3.rxTitle)}</text>
      <text x="360" y="230" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#2dd4bf" text-anchor="middle">Lý Giải Hiện Tượng Đời Sống</text>

      <!-- Reaction Box (Cyber Glow) -->
      <g transform="translate(45, 275)">
        <rect width="630" height="220" rx="24" fill="#0f172a" stroke="${reel.themeColor}" stroke-width="3" />
        <text x="315" y="45" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="bold" fill="#94a3b8" text-anchor="middle" letter-spacing="2">PHƯƠNG TRÌNH HÓA HỌC / CƠ CHẾ</text>
        <line x1="30" y1="65" x2="600" y2="65" stroke="#334155" stroke-width="1.5" />
        <g>
          ${rxSvg}
        </g>
      </g>

      <!-- Detailed Explanation Card -->
      <g transform="translate(45, 530)">
        <rect width="630" height="420" rx="24" fill="#1e293b" stroke="#334155" stroke-width="2" />
        <text x="40" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">📌 Bản chất hiện tượng:</text>
        <line x1="30" y1="75" x2="600" y2="75" stroke="#334155" stroke-width="1.5" />
        
        <!-- Bullet 1: Cơ chế -->
        <text x="40" y="115" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="${reel.accentColor}">• Cơ chế khoa học:</text>
        ${descSvg}

        <!-- Bullet 2 & 3 -->
        <g transform="translate(0, ${descHeightOffset})">
          <text x="40" y="180" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8">• Ứng dụng thực tế:</text>
          <text x="40" y="215" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="#cbd5e1">Xử lý tình huống đời sống an toàn &amp; chuẩn xác khoa học.</text>

          <text x="40" y="260" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#4ade80">• Phương pháp học tập:</text>
          <text x="40" y="295" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="#cbd5e1">Học hóa cực kỳ dễ nhớ khi gắn liền phản ứng với thực tiễn!</text>
        </g>
      </g>

      <!-- Bottom Hint -->
      <rect x="80" y="1000" width="560" height="54" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="1035" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">💡 Cân bằng phản ứng tự động tại ph-chem.web.app</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_03.jpg'));
}

// 🎨 SLIDE 4: APP CTA (CALL TO ACTION)
async function renderSlide4(reel, dir) {
  const posterPath = path.join(PROMO_DIR, 'phchem_table_poster.jpg');
  const base = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ctaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" stop-opacity="0.94" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.98" />
        </linearGradient>
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0d9488" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
        <linearGradient id="topCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050811" stop-opacity="1" />
          <stop offset="78%" stop-color="#050811" stop-opacity="1" />
          <stop offset="100%" stop-color="#050811" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Xóa dòng chữ INTERACTIVE PERIODIC TABLE ở đỉnh -->
      <rect x="0" y="0" width="${WIDTH}" height="260" fill="url(#topCoverGrad)" />

      <rect x="40" y="270" width="640" height="690" rx="32" fill="url(#ctaBg)" stroke="#2dd4bf" stroke-width="2.5" />

      <text x="360" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#f59e0b" text-anchor="middle">TRỢ THỦ ĐẮC LỰC MÔN HÓA</text>
      <text x="360" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="900" fill="#ffffff" text-anchor="middle">pH-Chem</text>
      
      <text x="360" y="475" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="${reel.themeColor}" text-anchor="middle">${xmlEscape(reel.title)}</text>
      <text x="360" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cbd5e1" text-anchor="middle">Kho tàng 325 sự thật &amp; 340 hợp chất cấu trúc chuẩn IUPAC</text>

      <g transform="translate(85, 560)">
        <rect width="550" height="115" rx="24" fill="url(#btnGrad)" stroke="#5eead4" stroke-width="2" />
        <text x="275" y="45" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">👉 TRẢI NGHIỆM NGAY TẠI</text>
        <text x="275" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="900" fill="#fef08a" text-anchor="middle">ph-chem.web.app</text>
      </g>

      <rect x="85" y="710" width="550" height="54" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="360" y="745" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">🔗 ph-chem.web.app/${reel.route}</text>

      <rect x="85" y="790" width="550" height="60" rx="18" fill="#16a34a" fill-opacity="0.2" stroke="#4ade80" stroke-width="1.5" />
      <text x="360" y="827" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#86efac" text-anchor="middle">✨ 100% MIỄN PHÍ · CÀI ĐẶT CHẠY OFFLINE</text>

      <text x="360" y="900" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#e2e8f0" text-anchor="middle">Thả tim ❤️ và Lưu lại để áp dụng ngay nhé!</text>
    </svg>
  `);

  await base.composite([{ input: svg, top: 0, left: 0 }]).jpeg({ quality: 92 }).toFile(path.join(dir, 'slide_04.jpg'));
}

export async function buildSingleFactReel(reel) {
  console.log(`\n======================================================`);
  console.log(`🎬 BẮT ĐẦU TẠO REEL #${reel.id}: ${reel.title}`);
  console.log(`======================================================`);

  const videoOut = path.join(REELS_DIR, reel.videoFileName);
  if (fs.existsSync(videoOut) && !process.env.FORCE) {
    const stat = fs.statSync(videoOut);
    console.log(`⏩ REEL #${reel.id} ĐÃ TỒN TẠI: ${videoOut} (${(stat.size / (1024 * 1024)).toFixed(2)} MB). Bỏ qua.`);
    return videoOut;
  }

  const reelDir = path.join(REELS_DIR, `reel_${String(reel.id).padStart(2, '0')}`);
  if (!fs.existsSync(reelDir)) fs.mkdirSync(reelDir, { recursive: true });

  const ffmpeg = getFfmpegPath();
  const sceneDurations = [];
  const audioList = [];

  console.log('🎙️ Đang tạo TTS từng cảnh (1.14x)...');
  for (let i = 0; i < reel.scenes.length; i++) {
    const sPath = path.join(reelDir, `scene_${i}.mp3`);
    await saveSpeech(sPath, reel.scenes[i].text, '+14%');
    const probe = spawnSync(ffmpeg, ['-i', sPath], { encoding: 'utf8' });
    const match = probe.stderr.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    let dur = 7.0;
    if (match) {
      dur = parseFloat(match[1]) * 3600 + parseFloat(match[2]) * 60 + parseFloat(match[3]);
    }
    sceneDurations.push(dur);
    audioList.push(`file '${sPath.replace(/\\/g, '/')}'`);
  }

  const fullAudioPath = path.join(reelDir, 'full_audio.mp3');
  const audioConcatPath = path.join(reelDir, 'audio_concat.txt');
  fs.writeFileSync(audioConcatPath, audioList.join('\n'), 'utf-8');
  spawnSync(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', audioConcatPath, '-c', 'copy', fullAudioPath]);

  console.log('🎨 Đang kết xuất 4 slide đồ họa 720x1280...');
  await renderSlide1(reel, reelDir);
  await renderSlide2(reel, reelDir);
  await renderSlide3(reel, reelDir);
  await renderSlide4(reel, reelDir);

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

  // videoOut đã được định nghĩa ở đầu hàm
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
    throw new Error(`FFmpeg lỗi khi tạo video ${reel.title}`);
  }

  const stat = fs.statSync(videoOut);
  console.log(`✅ XUẤT REEL THÀNH CÔNG: ${videoOut} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
  return videoOut;
}

export async function generateAllReels() {
  console.log(`🚀 KHỞI ĐỘNG TIẾN TRÌNH TẠO 10 REEL "BẠN CÓ BIẾT?"...`);
  const results = [];
  for (const reel of FACT_REELS) {
    const vPath = await buildSingleFactReel(reel);
    results.push({ ...reel, path: vPath });
  }
  console.log(`\n🎉 HOÀN TẤT TẠO TOÀN BỘ 10 REEL TRONG promo/reels/!`);
  return results;
}

if (process.argv[1]?.endsWith('gen-fact-reels.mjs')) {
  const targetId = process.argv[2];
  if (targetId && targetId !== 'all') {
    const r = FACT_REELS.find(item => String(item.id) === targetId || item.key === targetId);
    if (!r) {
      console.error(`❌ Không tìm thấy reel với ID/key: ${targetId}`);
      process.exit(1);
    }
    buildSingleFactReel(r).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else {
    generateAllReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  }
}
