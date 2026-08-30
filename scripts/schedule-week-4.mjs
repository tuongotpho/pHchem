import { postMessage } from './fanpage-manager.mjs';

export const POSTS_WEEK_4 = [
  // 1. Thứ Hai (21/09/2026 19:45): Bản chất thang đo pH và pOH
  {
    day: 'Thứ Hai (21/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-21T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🧪 [MÁY TÍNH pH — BÀI 1] BẢN CHẤT CỦA THANG ĐO pH & MỐI QUAN HỆ GIỮA [H⁺] VÀ [OH⁻] 💧

Chữ "pH" viết tắt của "potential of Hydrogen" (tiềm năng Hydro), do nhà hóa học Đan Mạch Sørensen đề xuất năm 1909:

📐 Định nghĩa toán học chuẩn:
* pH = -log[H⁺]
* pOH = -log[OH⁻]
* Ở 25°C: [H⁺] × [OH⁻] = 10⁻¹⁴ ➔ pH + pOH = 14

🎯 Quy ước môi trường dung dịch:
* pH < 7: Môi trường Axit ([H⁺] > 10⁻⁷ M)
* pH = 7: Môi trường Trung tính ([H⁺] = 10⁻⁷ M)
* pH > 7: Môi trường Bazơ/Kiềm ([H⁺] < 10⁻⁷ M)

💡 Nhập ngay nồng độ dung dịch vào máy tính pH-Chem để nhận kết quả tức thì cả pH, pOH, [H⁺] và [OH⁻]:
🔗 https://ph-chem.web.app/calculator

#pHChem #ThangDopH #TinhpH #AxitBazo #HoaHoc11 #HocHoaOnline`,
  },

  // 2. Thứ Ba (22/09/2026 11:45): Axit mạnh & Bazơ mạnh
  {
    day: 'Thứ Ba (22/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-22T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `⚡ [MÁY TÍNH pH — BÀI 2] CÁCH TÍNH NHANH pH CỦA AXIT MẠNH & BAZƠ MẠNH ĐƠN CHỨC / ĐA CHỨC 🎯

Với chất điện li mạnh, chúng phân ly hoàn toàn 100% trong nước:

1️⃣ Axit mạnh đơn chức (HCl, HNO₃, HClO₄...):
* [H⁺] = C_axit ➔ pH = -log(C_axit).
* Ví dụ: Dung dịch HCl 0.01M ➔ [H⁺] = 10⁻² M ➔ pH = 2.

2️⃣ Axit mạnh đa chức (H₂SO₄ nấc 1):
* [H⁺] ≈ 2 × C_axit.
* Ví dụ: Dung dịch H₂SO₄ 0.005M ➔ [H⁺] = 0.01M ➔ pH = 2.

3️⃣ Bazơ mạnh (NaOH, KOH, Ba(OH)₂):
* Tính [OH⁻] ➔ pOH = -log[OH⁻] ➔ pH = 14 - pOH.
* Ví dụ: Ba(OH)₂ 0.005M ➔ [OH⁻] = 0.01M ➔ pOH = 2 ➔ pH = 12.

👉 Kiểm tra kết quả mọi bài toán tính pH tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #TinhpHNhanh #AxitManh #BazoManh #HoaHoc11 #LuyenThiTHPTQG`,
  },

  // 3. Thứ Tư (23/09/2026 19:45): Axit yếu và hằng số phân ly Ka
  {
    day: 'Thứ Tư (23/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-23T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🔬 [MÁY TÍNH pH — BÀI 3] TÍNH pH CỦA AXIT YẾU & BAZƠ YẾU QUA HẰNG SỐ PHÂN LY Ka, Kb ⚖️

Khác với axit mạnh, axit yếu (như CH₃COOH, HF, HNO₂, HCOOH...) chỉ phân ly một phần:
CH₃COOH ⇌ CH₃COO⁻ + H⁺ (Ka)

📐 Phương trình cân bằng:
Ka = ([CH₃COO⁻] × [H⁺]) / [CH₃COOH]
Nếu gọi x là [H⁺] phân ly: Ka = x² / (C₀ - x).

✨ Ưu thế của Máy tính pH-Chem:
* Tự động giải đúng phương trình bậc 2: x² + Ka·x - Ka·C₀ = 0 mà không cần xấp xỉ thô sơ (x << C₀), đảm bảo độ chính xác tuyệt đối kể cả khi hằng số Ka tương đối lớn!

👉 Tính pH axit yếu chuẩn xác tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #AxitYeu #HangSoKa #CanBangHoaHoc #HoaHoc11 #GiaiToanHoa`,
  },

  // 4. Thứ Năm (24/09/2026 19:45): Bẫy nồng độ cực loãng 10^-7 M
  {
    day: 'Thứ Năm (24/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-24T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `⚠️ [MÁY TÍNH pH — BÀI 4] "CÚ LỪA KINH ĐIỂN": DUNG DỊCH HCl 10⁻⁸ M CÓ pH = 8? 🤯

Một câu hỏi trắc nghiệm bẫy nổi tiếng: "Tính pH của dung dịch axit HCl nồng độ 10⁻⁸ M?"

❌ Sai lầm phổ biến:
pH = -log(10⁻⁸) = 8.
Nhưng pH = 8 là môi trường BAZƠ! Axit dù loãng đến đâu cũng không thể biến thành bazơ được!

🔑 Lời giải khoa học:
Ở nồng độ cực loãng, ta BẮT BUỘC phải tính cả sự phân ly của nước:
H₂O ⇌ H⁺ + OH⁻ (Kw = 10⁻¹⁴)
Tổng [H⁺] = [H⁺]_HCl + [H⁺]_H₂O = 10⁻⁸ + x.
Giải phương trình cân bằng: (10⁻⁸ + x)·x = 10⁻¹⁴ ➔ [H⁺] ≈ 1.05 × 10⁻⁷ M ➔ pH ≈ 6.98 (Vẫn là môi trường axit nhẹ gần trung tính!).

✨ Thuật toán của pH-Chem tự động xử lý chuẩn xác trường hợp loãng này!

👉 Thử nghiệm ngay tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #BayTrangNghiem #TinhpHAxitLoang #HoaHoc11 #LuyenThiDaiHoc`,
  },

  // 5. Thứ Sáu (25/09/2026 11:45): Độ pH trong thực tiễn và cơ thể
  {
    day: 'Thứ Sáu (25/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-25T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🌍 [MÁY TÍNH pH — BÀI 5] ĐỘ pH XUNG QUANH CHÚNG TA: TỪ DẠ DÀY, MÁU NGƯỜI ĐẾN ĐẤT TRỒNG CÂY 🌱

Chỉ số pH quyết định trực tiếp đến sự sống và cân bằng sinh học:

🩸 Trong cơ thể người:
* Máu người: Luôn duy trì ổn định ở pH = 7.35 – 7.45 (hơi kiềm nhẹ). Chỉ cần lệch quá 0.4 là nguy hiểm tính mạng!
* Dịch vị dạ dày: pH = 1.5 – 3.5 (chứa axit HCl giúp tiêu hóa thức ăn và diệt khuẩn).
* Nước bọt: pH = 6.5 – 7.5.

🏡 Trong nông nghiệp & đời sống:
* Đất chua (pH < 5): Cây trồng khó hấp thụ dinh dưỡng ➔ Nông dân phải bón vôi sống (CaO) để khử chua.
* Nước mưa bình thường: pH ≈ 5.6 (do hòa tan CO₂ khí quyển). Mưa axit có pH < 5.0 (do SO₂ và NOx).

👉 Khám phá thêm kiến thức Hóa học thực tiễn trên pH-Chem:
🔗 https://ph-chem.web.app/calculator

#pHChem #pHTrongDoiSong #KienThucHoaHoc #SinhHoc #HoaHocMoiNgay`,
  },

  // 6. Thứ Bảy (26/09/2026 14:30): Chất chỉ thị và sự đổi màu
  {
    day: 'Thứ Bảy (26/09/2026 14:30)',
    time: Math.floor(new Date('2026-09-26T14:30:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🎨 [MÁY TÍNH pH — BÀI 6] VŨ ĐIỆU ĐỔI MÀU CỦA CÁC CHẤT CHỈ THỊ AXIT - BAZƠ 🌈

Làm thế nào để biết một dung dịch có tính axit hay kiềm mà không cần nếm thử?

🧪 Bảng chuyển màu kinh điển:
1️⃣ Quỳ tím:
* Axit (pH < 6.0): Hóa ĐỎ
* Trung tính (pH = 6.0 – 8.0): TÍM
* Bazơ (pH > 8.0): Hóa XANH

2️⃣ Phenolphtalein (Chất chỉ thị kiềm):
* pH < 8.3: Không màu
* pH ≥ 8.3: Hóa HỒNG ĐẬM / ĐỎ CỜ

3️⃣ Quỳ tím tự nhiên từ bắp cải tím:
* Nước ép bắp cải tím chứa sắc tố Anthocyanin đổi màu từ đỏ (axit mạnh), tím (trung tính), xanh lá đến vàng (kiềm mạnh)!

👉 Tra cứu tính chất axit-bazơ cùng pH-Chem tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #ChatChiThi #QuyTim #Phenolphtalein #ThiNghiemHoaHoc #HoaHoc8 #HoaHoc11`,
  },

  // 7. Chủ Nhật (27/09/2026 20:00): Minigame đố vui pH
  {
    day: 'Chủ Nhật (27/09/2026 20:00)',
    time: Math.floor(new Date('2026-09-27T20:00:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/quiz',
    message: `🏆 [MINIGAME CUỐI TUẦN] — BẠN ĐOÁN ĐƯỢC pH CỦA CÁC DUNG DỊCH NÀY KHÔNG? 🎯

Thử tài ước lượng khoảng pH của 4 loại chất lỏng quen thuộc sau:

❓ Hãy ghép đúng cặp:
1. Nước chanh tươi
2. Nước lọc tinh khiết
3. Nước ngọt có ga (Coca/Pepsi)
4. Nước xà phòng / Nước rửa chén

Các khoảng pH:
A. pH ≈ 7.0
B. pH ≈ 2.0 – 2.5
C. pH ≈ 2.5 – 3.5
D. pH ≈ 9.0 – 10.0

👇 Comment đáp án ghép đôi của bạn (Ví dụ: 1B - 2A - 3C - 4D)!
💡 Đừng quên vào mục Luyện tập trên pH-Chem để thử sức 10 câu trắc nghiệm Sự điện li & pH:
🔗 https://ph-chem.web.app/quiz

#pHChem #MinigameHoaHoc #DoVuipH #SuDienLi #ThuThachCuoiTuan #HoaHoc11`,
  },
];

export async function scheduleWeek4() {
  console.log('🚀 ĐANG LÊN LỊCH TUẦN 4 (UNICODE CHUẨN ĐẸP)...\n');
  for (let i = 0; i < POSTS_WEEK_4.length; i++) {
    const p = POSTS_WEEK_4[i];
    console.log(`⏳ Đang lên lịch Bài ${i + 1} (${p.day})...`);
    const res = await postMessage({
      message: p.message,
      link: p.link,
      published: false,
      scheduledPublishTime: p.time,
    });
    console.log(`✅ Thành công Bài ${i + 1}! ID: ${res.id}\n`);
  }
  console.log('🎉 ĐÃ LÊN LỊCH THÀNH CÔNG TOÀN BỘ TUẦN 4!');
}

if (process.argv[1]?.endsWith('schedule-week-4.mjs')) {
  scheduleWeek4().catch(console.error);
}
