import { postMessage } from './fanpage-manager.mjs';

export const POSTS_WEEK_2 = [
  // 1. Thứ Hai (07/09/2026 19:45): Cấu trúc Bảng tuần hoàn hiện đại
  {
    day: 'Thứ Hai (07/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-07T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/table',
    message: `🔬 [BẢNG TUẦN HOÀN — BÀI 1] CẤU TRÚC 118 NGUYÊN TỐ & BÍ QUYẾT TRA CỨU NHANH NHẤT ⚗️

Bảng tuần hoàn các nguyên tố hóa học là "bản đồ kho báu" của mọi người học Hóa. Nhưng bạn đã thực sự nắm trọn cấu trúc của nó?

📊 Cấu trúc cốt lõi cần nhớ:
1️⃣ 118 Ô nguyên tố: Tương ứng 118 nguyên tố đã được IUPAC công nhận chính thức (từ Hydro Z=1 đến Oganesson Z=118).
2️⃣ 7 Chu kỳ: Xếp theo số lớp electron tăng dần từ 1 đến 7 (chu kỳ 1-3 là chu kỳ nhỏ, 4-7 là chu kỳ lớn).
3️⃣ 8 Nhóm A & 8 Nhóm B: Xếp theo số electron hóa trị, quyết định tính chất hóa học tương đồng.

✨ Trên pH-Chem, bạn chỉ cần bấm vào bất kỳ nguyên tố nào để xem ngay: Khối lượng nguyên tử chính xác, số hiệu Z, cấu hình e, độ âm điện và năm phát hiện!

👉 Trải nghiệm Bảng tuần hoàn tương tác tại:
🔗 https://ph-chem.web.app/table

#pHChem #BangTuanHoan #HoaHoc10 #NguyenToHoaHoc #HocHoaOnline #KienThucHoaHoc`,
  },

  // 2. Thứ Ba (08/09/2026 11:45): Quy luật biến đổi tuần hoàn
  {
    day: 'Thứ Ba (08/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-08T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/table',
    message: `⚡ [BẢNG TUẦN HOÀN — BÀI 2] 3 QUY LUẬT BIẾN ĐỔI TUẦN HOÀN KINH ĐIỂN CẦN NHỚ TRONG PHÒNG THI 🎯

Làm bài tập so sánh tính chất của các nguyên tố, chỉ cần nhớ 3 quy luật "bất biến" này:

Trong cùng một Chu kỳ (từ Trái sang Phải):
* 📉 Bán kính nguyên tử: GIẢM DẦN (do điện tích hạt nhân tăng, hút e mạnh hơn).
* 📈 Độ âm điện & Tính phi kim: TĂNG DẦN (Fluor là nguyên tố có độ âm điện lớn nhất: 3.98).
* 📉 Tính kim loại: GIẢM DẦN.

Trong cùng một Nhóm A (từ Trên xuống Dưới):
* 📈 Bán kính nguyên tử: TĂNG DẦN (thêm số lớp e).
* 📉 Độ âm điện & Tính phi kim: GIẢM DẦN.
* 📈 Tính kim loại: TĂNG DẦN (Francium/Caesium có tính kim loại mạnh nhất).

💡 Mở ngay pH-Chem để đối chiếu trực tiếp độ âm điện của từng nguyên tố:
🔗 https://ph-chem.web.app/table

#pHChem #QuyLuatTuanHoan #HoaHoc10 #DoAmDien #BanKinhNguyenTu #LuyenThiTHPTQG`,
  },

  // 3. Thứ Tư (09/09/2026 19:45): Sự thật về nguyên tố siêu nặng
  {
    day: 'Thứ Tư (09/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-09T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/table',
    message: `🌌 [BẢNG TUẦN HOÀN — BÀI 3] BÍ ẨN CÁC NGUYÊN TỐ SIÊU NẶNG & NGUYÊN TẮC DỮ LIỆU CỦA PH-CHEM 🧪

Từ nguyên tố 104 (Rutherfordium) đến 118 (Oganesson), đây là nhóm các nguyên tố siêu nặng nhân tạo được tổng hợp trong máy gia tốc hạt với thời gian sống chỉ tính bằng mili-giây hoặc micro-giây!

❓ Vì sao chúng tồn tại quá ngắn mà vẫn được đưa vào Bảng tuần hoàn?
Vì các nhà khoa học đang săn tìm "Đảo bền vững" (Island of Stability) — nơi các hạt nhân siêu nặng có thể tồn tại lâu hơn.

🛡️ Nguyên tắc trung thực dữ liệu tại pH-Chem:
* Những đại lượng nhiệt động (nhiệt độ nóng chảy/sôi, khối lượng riêng) chưa thể đo đạc thực nghiệm sẽ được để dấu gạch ngang (-), tuyệt đối không bịa số ngoại suy.
* Giúp học sinh và giáo viên luôn tiếp cận dữ liệu chuẩn mực khoa học nhất!

👉 Khám phá Bảng tuần hoàn 118 nguyên tố chuẩn quốc tế tại:
🔗 https://ph-chem.web.app/table

#pHChem #NguyenToSieuNang #Oganesson #IUPAC #KhoaHocMoiNgay #HoaHoc10`,
  },

  // 4. Thứ Năm (10/09/2026 19:45): Nhóm Khí Hiếm
  {
    day: 'Thứ Năm (10/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-10T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/table',
    message: `💡 [BẢNG TUẦN HOÀN — BÀI 4] NHÓM KHÍ HIẾM (VIIIA) — VÌ SAO "LƯỜI" PHẢN ỨNG NHƯNG LẠI TỎA SÁNG RỰC RỠ? 🌟

He, Ne, Ar, Kr, Xe, Rn — Nhóm VIIIA (nhóm 18) được mệnh danh là nhóm "quý tộc" của Bảng tuần hoàn:

🔒 Bí mật cấu hình:
Lớp electron ngoài cùng đã bão hòa tuyệt đối (2e với Heli, 8e ns²np⁶ với các khí hiếm còn lại) ➔ Cực kỳ bền vững, trơ về mặt hóa học, tồn tại dưới dạng đơn nguyên tử!

🎨 Ứng dụng chiếu sáng độc đáo:
Khi có dòng điện cao áp đi qua:
* 🔴 Neon (Ne): Phát ánh sáng màu đỏ cam rực rỡ (biển quảng cáo neon).
* 🔵 Argon (Ar): Phát ánh sáng tím xanh (dùng làm khí bảo vệ hàn kim loại & bóng đèn).
* ⚪ Xenon (Xe): Ánh sáng trắng cực mạnh (đèn flash máy ảnh, đèn pha xe hơi).

👉 Tra cứu chi tiết từng khí hiếm trên pH-Chem:
🔗 https://ph-chem.web.app/table

#pHChem #KhiHiem #Neon #Argon #UngDungHoaHoc #HoaHoc10 #HocHoaOnline`,
  },

  // 5. Thứ Sáu (11/09/2026 11:45): Kim loại kiềm & Kiềm thổ
  {
    day: 'Thứ Sáu (11/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-11T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/table',
    message: `🔥 [BẢNG TUẦN HOÀN — BÀI 5] KIM LOẠI KIỀM & KIỀM THỔ: VŨ ĐIỆU CỦA LỬA VÀ NƯỚC 💧

Nhóm IA (Li, Na, K, Rb, Cs) và Nhóm IIA (Be, Mg, Ca, Sr, Ba) là những kim loại có tính khử mạnh nhất:

⚡ Tính chất đặc trưng:
* Cực kỳ mềm (Na, K cắt được bằng dao), khối lượng riêng nhẹ (Li nhẹ hơn cả nước!).
* Phản ứng mãnh liệt với nước ở nhiệt độ thường sinh ra khí H₂ và dung dịch kiềm làm đổi màu quỳ tím.
* Phải bảo quản bằng cách ngâm chìm trong dầu hỏa!

🌈 Bí quyết nhận biết qua màu ngọn lửa khi đốt muối:
* 🔴 Liti (Li⁺): Đỏ tía
* 🟡 Natri (Na⁺): Vàng tươi
* 🟣 Kali (K⁺): Tím nhạt
* 🧱 Canxi (Ca²⁺): Đỏ da cam
* 🟢 Bari (Ba²⁺): Lục nõn chuối

👉 Tra cứu thông số kim loại kiềm tại:
🔗 https://ph-chem.web.app/table

#pHChem #KimLoaiKiem #KiemTho #NhanBietMauLua #HoaHoc12 #ThiTHPTQG`,
  },

  // 6. Thứ Bảy (12/09/2026 14:30): Nhóm Halogen
  {
    day: 'Thứ Bảy (12/09/2026 14:30)',
    time: Math.floor(new Date('2026-09-12T14:30:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/table',
    message: `🧂 [BẢNG TUẦN HOÀN — BÀI 6] NHÓM HALOGEN (VIIA) — "KẺ TẠO MUỐI" VĨ ĐẠI 🌊

Từ "Halogen" trong tiếng Hy Lạp có nghĩa là "sinh ra muối" (F, Cl, Br, I, At):

🧪 Đặc điểm nổi bật:
* Có 7 electron lớp ngoài cùng (ns²np⁵), xu hướng nhận thêm 1e để đạt cấu hình bền ➔ Có tính oxi hóa rất mạnh.
* Tính oxi hóa giảm dần: F₂ > Cl₂ > Br₂ > I₂ (Halogen đứng trước đẩy được halogen đứng sau ra khỏi dung dịch muối!).

🌍 Ứng dụng quanh ta:
* Clo (Cl₂): Khử trùng nước sinh hoạt, hồ bơi, tẩy trắng vải sợi.
* Iot (I₂): Trộn vào muối ăn chống bệnh bướu cổ; dung dịch cồn iot sát trùng vết thương.
* Flo (F₂): Hợp chất florua bảo vệ men răng và ngừa sâu răng.

👉 Tìm hiểu thêm về họ Halogen trên pH-Chem:
🔗 https://ph-chem.web.app/table

#pHChem #Halogen #Clo #Iot #HoaHoc10 #KienThucHoaHoc #HocHoaMoiNgay`,
  },

  // 7. Chủ Nhật (13/09/2026 20:00): Minigame đoán nguyên tố
  {
    day: 'Chủ Nhật (13/09/2026 20:00)',
    time: Math.floor(new Date('2026-09-13T20:00:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/quiz',
    message: `🏆 [MINIGAME CUỐI TUẦN] — THỬ TÀI "THÁM TỬ BẢNG TUẦN HOÀN" 🔍

Khép lại tuần lễ khám phá Bảng tuần hoàn, cùng thử tài với câu đố tư duy sau:

❓ NGUYÊN TỐ X LÀ AI?
1. Thuộc chu kỳ 3, nhóm VIA trong Bảng tuần hoàn.
2. Có cấu hình electron lớp ngoài cùng là 3s²3p⁴.
3. Đơn chất có màu vàng, cháy trong không khí tạo khí có mùi hắc đặc trưng.
4. Là thành phần không thể thiếu trong sản xuất axit sulfuric (H₂SO₄) — "vua của các loại hóa chất công nghiệp".

👇 Bạn có đoán ra nguyên tố X là gì không? Hãy comment ngay bên dưới nhé!
💡 Đừng quên vào mục Luyện tập trên pH-Chem để test nhanh 10 câu trắc nghiệm Bảng tuần hoàn có bấm giờ:
🔗 https://ph-chem.web.app/quiz

#pHChem #Minigame #DoVuiHoaHoc #BangTuanHoan #ThuThachCuoiTuan #HoaHoc10`,
  },
];

export async function scheduleWeek2() {
  console.log('🚀 ĐANG LÊN LỊCH TUẦN 2 (UNICODE CHUẨN ĐẸP)...\n');
  for (let i = 0; i < POSTS_WEEK_2.length; i++) {
    const p = POSTS_WEEK_2[i];
    console.log(`⏳ Đang lên lịch Bài ${i + 1} (${p.day})...`);
    const res = await postMessage({
      message: p.message,
      link: p.link,
      published: false,
      scheduledPublishTime: p.time,
    });
    console.log(`✅ Thành công Bài ${i + 1}! ID: ${res.id}\n`);
  }
  console.log('🎉 ĐÃ LÊN LỊCH THÀNH CÔNG TOÀN BỘ TUẦN 2!');
}

if (process.argv[1]?.endsWith('schedule-week-2.mjs')) {
  scheduleWeek2().catch(console.error);
}
