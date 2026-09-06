import path from 'node:path';
import fs from 'node:fs';
import { postVideo } from './fanpage-manager.mjs';

const REELS_DIR = path.resolve('promo/reels');
const HISTORY_FILE = path.resolve('promo/scheduled_quiz_reels.json');

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

// Lịch phát hành cho 10 tập Quiz Reel: MỖI NGÀY 2 VIDEO
// Ca trưa: 11:45 | Ca tối: 19:45 (Bắt đầu từ Thứ Năm 10/09/2026 đến Thứ Hai 14/09/2026)
export const QUIZ_SCHEDULE = [
  {
    id: 1,
    title: 'ĐỐ VUI HÓA HỌC #01: AXIT TRONG DẠ DÀY 🧪🩸',
    videoFile: 'quiz_01_axit_da_day.mp4',
    scheduleIso: '2026-09-10T11:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #01: Thử thách 30 giây! 🎯🧪

Axit nào có trong dịch vị dạ dày giúp tiêu hóa thức ăn và diệt khuẩn?
A. H₂SO₄ (Sunfuric)
B. HCl (Clohidric)
C. HNO₃ (Nitric)
D. CH₃COOH (Axetic)

👉 Bình luận ngay đáp án của bạn trước khi xem hết video nhé!

💡 Bản chất khoa học: HCl là axit vô cơ mạnh, tạo môi trường pH 1.5 - 3.5 kích hoạt enzym pepsin tiêu hóa đạm. Khi thừa axit gây ợ chua, người ta thường uống muối Nabica (NaHCO₃) để trung hòa:
👉 HCl + NaHCO₃ → NaCl + CO₂ ↑ + H₂O

📱 Luyện thêm 500+ câu trắc nghiệm hóa học có bấm giờ 30s tại:
🌐 https://ph-chem.web.app/quiz
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #TranhTaiHoaHoc #AxitDaDay #TracNghiemHoa #HocHoaOnline #CongCuHocTap`
  },
  {
    id: 2,
    title: 'ĐỐ VUI HÓA HỌC #02: KHÍ GÂY HIỆU ỨNG NHÀ KÍNH 🌾🐄',
    videoFile: 'quiz_02_khi_metan_nha_kinh.mp4',
    scheduleIso: '2026-09-10T19:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #02: Bạn có biết khí giữ nhiệt mạnh gấp 28 lần CO₂? 🌍🔥

Khí nào sinh ra từ ruộng lúa ngập nước và dạ dày trâu bò?
A. CH₄ (Methane)
B. N₂ (Nitrogen)
C. SO₂ (Sunfurơ)
D. NH₃ (Amoniac)

👉 Chọn A, B, C hay D? Để lại comment ngay nào!

💡 Bản chất khoa học: Metan (CH₄) là ankan đơn giản nhất, giữ nhiệt mạnh gấp 28 lần CO₂ trong chu kỳ 100 năm. Khi đốt cháy, metan tỏa nhiệt lượng rất cao:
👉 CH₄ + 2 O₂ → CO₂ + 2 H₂O

📱 Tra cứu cấu trúc phân tử 2D/3D chuẩn IUPAC tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #KhiMetan #HieuUngNhaKinh #HoaHocMoiTruong #HocHoa11 #HoaHocOnline`
  },
  {
    id: 3,
    title: 'ĐỐ VUI HÓA HỌC #03: KIM LOẠI DUY NHẤT Ở THỂ LỎNG 🌡️⚗️',
    videoFile: 'quiz_03_kim_loai_the_long.mp4',
    scheduleIso: '2026-09-11T11:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #03: Kim loại thể lỏng ở 25°C là gì? 🌡️💧

Kim loại duy nhất ở thể lỏng tại nhiệt độ phòng (25°C) là:
A. Gali (Ga)
B. Thủy ngân (Hg)
C. Brom (Br₂)
D. Xesi (Cs)

👉 Đố bạn không bị lừa giữa kim loại và phi kim! Comment đáp án ngay!

💡 Lưu ý kinh điển: Thủy ngân (Hg) là kim loại lỏng duy nhất. Brom (Br₂) cũng là chất lỏng màu nâu đỏ nhưng là phi kim! Khi thủy ngân bị vỡ nhiệt kế, hãy rắc bột lưu huỳnh (S) để tạo muối HgS không bay hơi an toàn:
👉 Hg + S → HgS

📱 Khám phá 118 nguyên tố trên Bảng tuần hoàn tương tác tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #BangTuanHoan #ThuyNgan #KimLoaiLong #KienThucHoaHoc #MeoThiHoa`
  },
  {
    id: 4,
    title: 'ĐỐ VUI HÓA HỌC #04: BAKING SODA NỞ BÁNH PHỒNG XỐP 🍞🍰',
    videoFile: 'quiz_04_baking_soda_lam_banh.mp4',
    scheduleIso: '2026-09-11T19:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #04: Bí mật của bột nở Baking Soda! 🍞✨

Bột nở Baking Soda dùng làm bánh phồng xốp là muối hóa học nào?
A. Na₂CO₃ (Soda ash)
B. NaHCO₃ (Baking soda)
C. CaCO₃ (Đá vôi)
D. NaCl (Muối ăn)

👉 Mau bình luận đáp án để xem bạn có phải chuyên gia làm bánh không nhé!

💡 Cơ chế khoa học: NaHCO₃ là muối lưỡng tính. Khi gặp nhiệt độ lò nướng, nó bị nhiệt phân giải phóng bọt khí CO₂ tạo hàng triệu lỗ xốp li ti trong ruột bánh:
👉 2 NaHCO₃ → Na₂CO₃ + CO₂ ↑ + H₂O

📱 Cân bằng phương trình và tra cứu phản ứng hóa học tự động tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #BakingSoda #HoaHocAmThuc #LamBanh #MeoNhaBep #HoaHoc11`
  },
  {
    id: 5,
    title: 'ĐỐ VUI HÓA HỌC #05: BẢN CHẤT CỦA KHÍ CƯỜI 🎈⚠️',
    videoFile: 'quiz_05_khi_cuoi_gay_me.mp4',
    scheduleIso: '2026-09-12T11:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #05: Hợp chất khí nào được gọi là "khí cười"? 🎈🧠

Khí gây tê trong nha khoa nhưng lạm dụng sẽ gây tổn thương tủy sống:
A. NO (Nitơ monoxit)
B. NO₂ (Nitơ đioxit)
C. N₂O (Đinitơ monoxit)
D. NH₃ (Amoniac)

👉 Đố bạn chọn đúng công thức hóa học! Hãy để lại bình luận nhé!

💡 Cảnh báo sức khỏe: N₂O là oxit trung tính, kích thích giải phóng dopamin tạo cảm giác cười ảo giác. Lạm dụng bóng cười làm bất hoạt vitamin B12, gây thoái hóa tủy sống và liệt vận động không thể phục hồi!

📱 Học Hóa thông minh, an toàn và chuyên nghiệp tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #KhiCuoi #N2O #CanhBaoSucKhoe #HoaHocVoCo #HoaHocChuyenNghiep`
  },
  {
    id: 6,
    title: 'ĐỐ VUI HÓA HỌC #06: AXIT TẠO NÊN VỊ CHUA GIẤM ĂN 🥗🍋',
    videoFile: 'quiz_06_vi_chua_giam_an.mp4',
    scheduleIso: '2026-09-12T19:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #06: Axit trong căn bếp gia đình! 🥗🍶

Axit hữu cơ nào tạo nên vị chua đặc trưng trong chai giấm ăn?
A. HCOOH (Axit fomic)
B. CH₃COOH (Axit axetic)
C. C₂H₅OH (Rượu etylic)
D. HCl (Axit clohidric)

👉 Bạn chắc chắn bao nhiêu % với lựa chọn của mình? Comment đáp án ngay!

💡 Bản chất khoa học: Giấm ăn chứa 2 - 5% axit axetic (CH₃COOH), được lên men từ rượu etylic loãng nhờ vi khuẩn men giấm:
👉 C₂H₅OH + O₂ → CH₃COOH + H₂O (Men giấm)

📱 Tính toán nồng độ và pH dung dịch trong 1 chạm tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #GiamAn #AxitAxetic #HoaHocHuuCo #HocHoa12 #MayTinhHoaHoc`
  },
  {
    id: 7,
    title: 'ĐỐ VUI HÓA HỌC #07: KẾT TỦA VẨN ĐỤC NƯỚC VÔI TRONG 🥛⚗️',
    videoFile: 'quiz_07_van_duc_nuoc_voi_trong.mp4',
    scheduleIso: '2026-09-13T11:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #07: Thí nghiệm nhận biết khí CO₂! 🌬️🥛

Thổi hơi thở chứa CO₂ vào nước vôi trong Ca(OH)₂, vẩn đục trắng là:
A. CaO (Vôi sống)
B. Ca(HCO₃)₂ (Canxi hidrocacbonat)
C. CaCO₃ (Canxi cacbonat)
D. CaCl₂ (Canxi clorua)

👉 Đáp án A, B, C hay D? Kiểm tra ngay kiến thức của bạn!

💡 Bản chất khoa học: CO₂ phản ứng với Ca(OH)₂ tạo kết tủa CaCO₃ không tan làm đục dung dịch. Nếu tiếp tục thổi dư CO₂, kết tủa sẽ tan lại do tạo muối tan Ca(HCO₃)₂:
👉 CO₂ + Ca(OH)₂ → CaCO₃ ↓ + H₂O

📱 Tra cứu bảng độ tan tương tác 14 cation x 8 anion tại:
🌐 https://ph-chem.web.app/solubility
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #NuocVoiTrong #NhanBietChat #BangDoTan #HoaHoc9 #HoaHoc11`
  },
  {
    id: 8,
    title: 'ĐỐ VUI HÓA HỌC #08: KIM LOẠI NHẸ NHẤT BẢNG TUẦN HOÀN 🔋⚡',
    videoFile: 'quiz_08_kim_loai_nhe_nhat.mp4',
    scheduleIso: '2026-09-13T19:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #08: Kim loại nào nhẹ nhất hành tinh? 🔋🕊️

Kim loại có khối lượng riêng nhẹ nhất, nổi bồng bềnh cả trên dầu:
A. Natri (Na)
B. Nhôm (Al)
C. Liti (Li)
D. Magiê (Mg)

👉 Bạn có nhớ số hiệu nguyên tử của nguyên tố này? Comment đáp án nhé!

💡 Sự thật thú vị: Liti (Li) có khối lượng riêng chỉ 0.534 g/cm³, nhẹ bằng một nửa nước! Nhờ thế điện cực cực kỳ âm (-3.04V), liti là nguyên liệu không thể thay thế cho pin Lithium-ion của smartphone và xe điện!

📱 Khám phá thông số chi tiết của 118 nguyên tố tại website:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #KimLoaiLiti #PinLithium #BangTuanHoan #VatLieuTuongLai #HoaHocOnline`
  },
  {
    id: 9,
    title: 'ĐỐ VUI HÓA HỌC #09: NƯỚC OXY GIÀ RỬA VẾT THƯƠNG 🩹🫧',
    videoFile: 'quiz_09_oxy_gia_rua_vet_thuong.mp4',
    scheduleIso: '2026-09-14T11:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #09: Vì sao oxy già sủi bọt trắng xóa? 🩹🫧

Chất sát trùng oxy già trong tủ thuốc gia đình có công thức là gì?
A. H₂O (Nước cất)
B. H₂O₂ (Hiđro peoxit)
C. O₃ (Ozon)
D. KMnO₄ (Thuốc tím)

👉 Đoán ngay chất này để xem hiểu biết y tế và hóa học của bạn!

💡 Cơ chế khoa học: Khi tiếp xúc với vết thương, enzim Catalase trong hồng cầu phân giải H₂O₂ thành bọt khí O₂ tinh khiết cực nhanh. Bọt khí đẩy dị vật và xác vi khuẩn ra ngoài để làm sạch vết rách:
👉 2 H₂O₂ → 2 H₂O + O₂ ↑ (Enzim Catalase)

📱 Tra cứu thư viện 340+ công thức hóa học trực quan tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #OxyGia #HydroPeroxide #KienThucYTe #HocHoaDeDang #HoaHoc10`
  },
  {
    id: 10,
    title: 'ĐỐ VUI HÓA HỌC #10: CỒN CÔNG NGHIỆP GÂY MÙ MẮT ☠️🚫',
    videoFile: 'quiz_10_con_doc_methanol.mp4',
    scheduleIso: '2026-09-14T19:45:00+07:00',
    caption: `ĐỐ VUI HÓA HỌC #10: Cảnh báo rượu giả pha cồn công nghiệp! ☠️⚠️

Chất cồn cực độc gây mù mắt vĩnh viễn và suy tạng khi uống phải là:
A. Etanol (C₂H₅OH)
B. Metanol (CH₃OH)
C. Glixerol (C₃H₈O₃)
D. Propanol (C₃H₇OH)

👉 Phân biệt ngay để bảo vệ bản thân và gia đình! Comment đáp án nào!

💡 Cơ chế nhiễm độc: Metanol (CH₃OH) khi vào cơ thể bị enzym gan chuyển hóa thành fomandehit (HCHO) và axit fomic (HCOOH). Axit này phá hủy tế bào thần kinh thị giác làm mù mắt tức thì và toan chuyển hóa gây tử vong!

📱 Kiểm tra và tra cứu công thức cấu tạo phân tử 2D tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#DoVuiHoaHoc #pHChem #Metanol #DocTinh #HoaHocCuocSong #AnToanSucKhoe #HocHoaOnline`
  }
];

export async function scheduleSingleQuizReel(quizItem) {
  const history = loadScheduledHistory();
  if (history[quizItem.id]) {
    console.log(`⏭️ Quiz Reel #${quizItem.id} đã được lập lịch trước đó (ID: ${history[quizItem.id].reel_id}). Bỏ qua.`);
    return history[quizItem.id];
  }

  const vPath = path.join(REELS_DIR, quizItem.videoFile);
  if (!fs.existsSync(vPath)) {
    throw new Error(`Không tìm thấy file video: ${vPath}. Hãy chạy build video trước!`);
  }

  console.log(`\n==================================================`);
  console.log(`📅 ĐANG LẬP LỊCH ĐĂNG QUIZ REEL #${quizItem.id}: ${quizItem.title}`);
  console.log(`⏱️ Thời gian phát: ${quizItem.scheduleIso}`);

  const res = await postVideo(vPath, quizItem.caption, {
    title: quizItem.title,
    scheduledPublishTime: quizItem.scheduleIso
  });

  history[quizItem.id] = {
    id: quizItem.id,
    title: quizItem.title,
    videoFile: quizItem.videoFile,
    reel_id: res.id,
    scheduleIso: quizItem.scheduleIso,
    scheduledAt: new Date().toISOString()
  };
  saveScheduledHistory(history);

  console.log(`🎉 LẬP LỊCH QUIZ REEL #${quizItem.id} THÀNH CÔNG! Reel ID: ${res.id}`);
  return res;
}

export async function scheduleAllQuizReels() {
  console.log(`🚀 BẮT ĐẦU LẬP LỊCH TOÀN BỘ 10 QUIZ REEL LÊN FANPAGE...`);
  for (const item of QUIZ_SCHEDULE) {
    await scheduleSingleQuizReel(item);
    await new Promise(r => setTimeout(r, 3000));
  }
  console.log(`\n🎉 HOÀN TẤT LẬP LỊCH 10 QUIZ REEL THÀNH CÔNG!`);
}

if (process.argv[1]?.endsWith('schedule-quiz-reels.mjs')) {
  const targetId = process.argv[2];
  if (targetId) {
    const item = QUIZ_SCHEDULE.find(r => String(r.id) === targetId);
    if (!item) {
      console.error(`❌ Không tìm thấy quiz reel với ID: ${targetId}`);
      process.exit(1);
    }
    scheduleSingleQuizReel(item).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else {
    scheduleAllQuizReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  }
}
