import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'node:fs';
import path from 'node:path';

const SCRIPT_SCENES = [
  {
    id: 'scene_01_hook',
    title: 'Phần 1: Mở đầu cuốn hút (Hook)',
    text: 'Bạn đang đau đầu vì không nhớ nổi công thức cấu tạo hay cân bằng phương trình hóa học phức tạp? Đừng lo!'
  },
  {
    id: 'scene_02_intro',
    title: 'Phần 2: Giới thiệu pH-Chem',
    text: 'Hãy khám phá ngay pH-Chem, bộ công cụ hóa học chuyên nghiệp chạy trực tiếp trên trình duyệt, miễn phí và cài được như app trên mọi thiết bị!'
  },
  {
    id: 'scene_03_features',
    title: 'Phần 3: Tính năng nổi bật',
    text: 'Khám phá thư viện hơn 340 hợp chất với 274 cấu trúc hóa học chuẩn quốc tế IUPAC sắc nét. Đi kèm bộ máy tính thông minh: tự động cân bằng phản ứng, tính khối lượng mol, nồng độ và pH chỉ trong tích tắc!'
  },
  {
    id: 'scene_04_cta',
    title: 'Phần 4: Lời kêu gọi hành động (Call to action)',
    text: 'Học hóa thông minh hơn, nhẹ nhàng hơn với pH-Chem. Truy cập ngay đường link bên dưới để trải nghiệm hoàn toàn miễn phí nhé!'
  }
];

const FULL_SCRIPT = SCRIPT_SCENES.map(s => s.text).join(' ');

function saveSpeechToFile(tts, filePath, text) {
  return new Promise((resolve, reject) => {
    const { audioStream } = tts.toStream(text);
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
  const outDir = path.resolve('promo');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('🚀 Khởi tạo Edge TTS với giọng Hoài My (vi-VN-HoaiMyNeural)...');
  const tts = new MsEdgeTTS();
  await tts.setMetadata('vi-VN-HoaiMyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  // 1. Xuất file gộp toàn bài (Full)
  const fullAudioPath = path.join(outDir, 'phchem_promo_full_hoaimy.mp3');
  console.log(`🎙️ Đang tạo audio toàn bài: ${fullAudioPath}...`);
  await saveSpeechToFile(tts, fullAudioPath, FULL_SCRIPT);
  console.log(`✅ Đã tạo xong file toàn bài! Kích thước: ${fs.statSync(fullAudioPath).size} bytes`);

  // 2. Xuất từng scene riêng để thuận tiện ghép CapCut / Premiere
  for (const scene of SCRIPT_SCENES) {
    const scenePath = path.join(outDir, `${scene.id}.mp3`);
    console.log(`🎙️ Đang tạo audio cho ${scene.title}...`);
    await saveSpeechToFile(tts, scenePath, scene.text);
    console.log(`   -> Lưu tại: ${scenePath} (${fs.statSync(scenePath).size} bytes)`);
  }

  // 3. Tạo thêm 1 bản giọng Nam Minh (vi-VN-NamMinhNeural) để lựa chọn
  console.log('\n🚀 Tạo thêm bản giọng Nam Minh (vi-VN-NamMinhNeural)...');
  const ttsNam = new MsEdgeTTS();
  await ttsNam.setMetadata('vi-VN-NamMinhNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const fullNamPath = path.join(outDir, 'phchem_promo_full_namminh.mp3');
  await saveSpeechToFile(ttsNam, fullNamPath, FULL_SCRIPT);
  console.log(`✅ Đã tạo xong bản giọng Nam: ${fullNamPath} (${fs.statSync(fullNamPath).size} bytes)!`);

  console.log('\n🎉 Hoàn thành toàn bộ audio!');
  process.exit(0);
}

generateAudio().catch(err => {
  console.error('❌ Lỗi khi tạo audio:', err);
  process.exit(1);
});
