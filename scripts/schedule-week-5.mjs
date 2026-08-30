import { postMessage } from './fanpage-manager.mjs';

const POSTS_WEEK_5 = [
  // 1. Thứ Hai (28/09/2026 19:45): Bản chất 21 cặp oxi hóa - khử
  {
    day: 'Thứ Hai (28/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-28T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/electro',
    message: `🔋 [DÃY ĐIỆN HÓA — BÀI 1] BẢN CHẤT CỦA 21 CẶP OXI HÓA - KHỬ TRONG HÓA HỌC VÔ CƠ ⚡

Dãy điện hóa không đơn thuần là một dãy chữ học vẹt "Khi - Nào - May - Áo...", mà là sự sắp xếp khoa học của các cặp oxi hóa - khử (dạng oxi hóa / dạng khử):

📐 Quy luật 2 chiều:
* Dạng oxi hóa (ở trên): Tính oxi hóa TĂNG DẦN từ trái sang phải (K⁺ < Na⁺ < Mg²⁺ < ... < Ag⁺ < Au³⁺).
* Dạng khử (ở dưới): Tính khử GIẢM DẦN từ trái sang phải (K > Na > Mg > ... > Ag > Au).

✨ Khám phá công cụ Dãy điện hóa 21 cặp chuẩn trên pH-Chem để nắm chắc nền tảng Hóa học 12:
🔗 https://ph-chem.web.app/electro

#pHChem #DayDienHoa #OxiHoaKhu #CapOxiHoaKhu #HoaHoc12 #LuyenThiTHPTQG`,
  },

  // 2. Thứ Ba (29/09/2026 11:45): Thế điện cực chuẩn E0
  {
    day: 'Thứ Ba (29/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-29T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/electro',
    message: `⚡ [DÃY ĐIỆN HÓA — BÀI 2] THẾ ĐIỆN CỰC CHUẨN E⁰ LÀ GÌ & Ý NGHĨA QUYẾT ĐỊNH CHIỀU PHẢN ỨNG 🎯

Thế điện cực chuẩn E⁰ (đo bằng Volt ở 25°C, 1 atm, nồng độ 1M so với điện cực hydro tiêu chuẩn E⁰(2H⁺/H₂) = 0.00V):

🔑 Quy tắc vàng dự đoán phản ứng:
* E⁰ càng âm: Dạng khử càng mạnh (K⁺/K có E⁰ = -2.93V, Li⁺/Li có E⁰ = -3.04V).
* E⁰ càng dương: Dạng oxi hóa càng mạnh (Ag⁺/Ag có E⁰ = +0.80V, Au³⁺/Au có E⁰ = +1.50V).
* Suất điện động của pin E⁰_{pin} = E⁰_{catot} - E⁰_{anot} > 0 thì phản ứng mới tự diễn ra được!

👉 Tra cứu giá trị E⁰ chính xác từng cặp trên pH-Chem:
🔗 https://ph-chem.web.app/electro

#pHChem #TheDienCucChuan #SuatDienDong #DienHoaHoc #HoaHoc12 #OnThiTHPTQG`,
  },

  // 3. Thứ Tư (30/09/2026 19:45): Quy tắc Alpha (α)
  {
    day: 'Thứ Tư (30/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-30T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/electro',
    message: `📐 [DÃY ĐIỆN HÓA — BÀI 3] LÀM CHỦ "QUY TẮC ALPHA (α)" — BÍ QUYẾT GIẢI BÀI TOÁN KIM LOẠI ĐẨY MUỐI TRONG 5 GIÂY 🚀

Quy tắc Alpha (α) là vũ khí tối thượng để biết 2 chất có phản ứng với nhau không:

Viết 2 cặp theo thứ tự dãy điện hóa:
Cặp 1 (trước): Ox1 / Kh1  (Ví dụ: Fe²⁺ / Fe)
Cặp 2 (sau):   Ox2 / Kh2  (Ví dụ: Cu²⁺ / Cu)

Vẽ nét chữ Alpha (α):
Bắt đầu từ Ox2 ➔ tác dụng Kh1 ➔ sinh ra Ox1 + Kh2!
$$Cu^{2+} + Fe \\rightarrow Fe^{2+} + Cu$$

✨ "Chất oxi hóa mạnh hơn + Chất khử mạnh hơn ➔ Chất oxi hóa yếu hơn + Chất khử yếu hơn".

👉 Dùng ngay công cụ kiểm tra phản ứng tự động theo quy tắc Alpha trên pH-Chem:
🔗 https://ph-chem.web.app/electro

#pHChem #QuyTacAlpha #KimLoaiDayMuoi #GiaiNhanhHoa12 #ThiDaiHoc #MeoHocHoa`,
  },

  // 4. Thứ Năm (01/10/2026 19:45): Cặp Fe3+/Fe2+ và bẫy điểm 9
  {
    day: 'Thứ Năm (01/10/2026 19:45)',
    time: Math.floor(new Date('2026-10-01T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/electro',
    message: `⚠️ [DÃY ĐIỆN HÓA — BÀI 4] "BẪY ĐIỂM 9": VỊ TRÍ ĐẶC BIỆT CỦA CẶP Fe³⁺/Fe²⁺ & PHẢN ỨNG VỚI AgNO₃ DƯ 🤯

Trong Dãy điện hóa, Sắt (Fe) có tới 2 cặp:
Fe²⁺/Fe (-0.44V) đứng trước Cu²⁺/Cu (+0.34V), NHƯNG cặp Fe³⁺/Fe²⁺ (+0.77V) lại đứng sau Cu²⁺/Cu và đứng trước Ag⁺/Ag (+0.80V)!

🎯 Bài toán kinh điển: Cho Fe tác dụng với dung dịch AgNO₃ dư:
* Giai đoạn 1: Fe + 2Ag⁺ ➔ Fe²⁺ + 2Ag (Fe tan hết thành Fe²⁺).
* Giai đoạn 2 (BẪY): Do AgNO₃ còn dư, Ag⁺ tiếp tục oxi hóa Fe²⁺ lên Fe³⁺:
  Fe²⁺ + Ag⁺ ➔ Fe³⁺ + Ag!
* Kết luận: Sản phẩm cuối cùng thu được muối Fe(NO₃)₃ và kim loại Ag!

👉 Kiểm tra tương tác các cặp oxi hóa - khử phức tạp tại:
🔗 https://ph-chem.web.app/electro

#pHChem #BayDiem9 #HopChatSat #AgNO3 #HoaHoc12 #LuyenThiTHPTQG`,
  },

  // 5. Thứ Sáu (02/10/2026 11:45): Ăn mòn kim loại
  {
    day: 'Thứ Sáu (02/10/2026 11:45)',
    time: Math.floor(new Date('2026-10-02T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/electro',
    message: `⚓ [DÃY ĐIỆN HÓA — BÀI 5] ĂN MÒN ĐIỆN HÓA HỌC: VÌ SAO VỎ TÀU BIỂN BẰNG THÉP PHẢI GẮN CÁC TẤM KẼM (Zn)? 🚢

Ăn mòn điện hóa là quá trình kim loại bị phá hủy khi tiếp xúc với môi trường điện ly và tạo thành pin điện hóa vi mô:

🛡️ 3 Điều kiện để xảy ra ăn mòn điện hóa:
1. Có 2 điện cực khác bản chất (Kim loại - Kim loại hoặc Kim loại - Phi kim).
2. Hai điện cực tiếp xúc trực tiếp hoặc gián tiếp qua dây dẫn.
3. Cùng tiếp xúc với một dung dịch chất điện li (nước mưa, nước biển, không khí ẩm).

🔑 Phương pháp bảo vệ điện hóa (Dùng kim loại hy sinh):
* Vỏ tàu bằng Thép (Fe) ngâm trong nước biển ➔ Gắn các khối Kẽm (Zn) vào vỏ tàu.
* Do Zn có tính khử mạnh hơn Fe (đứng trước Fe trong dãy điện hóa), Zn sẽ bị ăn mòn trước để bảo vệ vỏ tàu bằng sắt không bị gỉ sét!

👉 Tìm hiểu thêm về dãy điện hóa và ăn mòn kim loại tại:
🔗 https://ph-chem.web.app/electro

#pHChem #AnMonKimLoai #AnMonDienHoa #UngDungHoaHoc #HoaHoc12 #TauBien`,
  },

  // 6. Thứ Bảy (03/10/2026 14:30): Pin điện hóa và Acquy
  {
    day: 'Thứ Bảy (03/10/2026 14:30)',
    time: Math.floor(new Date('2026-10-03T14:30:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/electro',
    message: `🔋 [DÃY ĐIỆN HÓA — BÀI 6] NGUYÊN TẮC HOẠT ĐỘNG CỦA PIN GALVANI & CÁCH HÓA NĂNG BIẾN THÀNH ĐIỆN NĂNG 💡

Làm thế nào phản ứng hóa học tạo ra dòng điện thắp sáng bóng đèn hay chạy xe điện?

⚡ Cấu tạo Pin Daniell - Jacobi (Zn - Cu):
* Anot (cực âm): Thanh Kẽm nhúng trong dung dịch ZnSO₄ ➔ Xảy ra quá trình oxi hóa: Zn ➔ Zn²⁺ + 2e (electron di chuyển qua dây dẫn sang cực dương).
* Catot (cực dương): Thanh Đồng nhúng trong dung dịch CuSO₄ ➔ Xảy ra quá trình khử: Cu²⁺ + 2e ➔ Cu (Đồng bám vào catot).
* Cầu muối: Cân bằng điện tích ion trong 2 cốc.
* Suất điện động chuẩn: E⁰_{pin} = E⁰(Cu²⁺/Cu) - E⁰(Zn²⁺/Zn) = 0.34 - (-0.76) = 1.10 V!

👉 Khám phá thế điện cực chuẩn của các cặp kim loại trên pH-Chem:
🔗 https://ph-chem.web.app/electro

#pHChem #PinDienHoa #PinGalvani #NangLuongSach #HoaHoc12 #VatLiHoaHoc`,
  },

  // 7. Chủ Nhật (04/10/2026 20:00): Trắc nghiệm Dãy điện hóa
  {
    day: 'Chủ Nhật (04/10/2026 20:00)',
    time: Math.floor(new Date('2026-10-04T20:00:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/quiz',
    message: `🏆 [THỬ THÁCH CUỐI TUẦN] — BẠN CÓ ĐẠT ĐIỂM 10 CHUYÊN ĐỀ DÃY ĐIỆN HÓA KIM LOẠI? ⏱️

Cùng thử sức với một câu hỏi trắc nghiệm hay và dễ nhầm:

❓ Cho các kim loại: Mg, Fe, Cu, Ag. Cho từng kim loại tác dụng lần lượt với các dung dịch: HCl, FeCl₃, AgNO₃. Số phản ứng hóa học xảy ra là:
A. 6
B. 7
C. 8
D. 9

👇 Hãy liệt kê các phản ứng và chọn đáp án của bạn dưới phần bình luận nhé!
💡 Vào ngay mục Luyện tập trên pH-Chem để làm bài thi trắc nghiệm Dãy điện hóa có bấm giờ 30s và nhận phiếu điểm PNG:
🔗 https://ph-chem.web.app/quiz

#pHChem #LuyenThiTHPTQG #TracNghiemHoa #DayDienHoa #ThuThachCuoiTuan #HoaHoc12`,
  },
];

export async function scheduleWeek5() {
  console.log('🚀 ĐANG LÊN LỊCH TUẦN 5 (CHUYÊN SÂU DÃY ĐIỆN HÓA & OXI HÓA - KHỬ)...\n');
  for (let i = 0; i < POSTS_WEEK_5.length; i++) {
    const p = POSTS_WEEK_5[i];
    console.log(`⏳ Đang lên lịch Bài ${i + 1} (${p.day})...`);
    const res = await postMessage({
      message: p.message,
      link: p.link,
      published: false,
      scheduledPublishTime: p.time,
    });
    console.log(`✅ Thành công Bài ${i + 1}! ID: ${res.id}\n`);
  }
  console.log('🎉 ĐÃ LÊN LỊCH THÀNH CÔNG TOÀN BỘ TUẦN 5!');
}

if (process.argv[1]?.endsWith('schedule-week-5.mjs')) {
  scheduleWeek5().catch(console.error);
}
