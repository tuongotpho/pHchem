import { postMessage } from './fanpage-manager.mjs';

export const POSTS_WEEK_6 = [
  {
    day: 'Thứ Hai (05/10/2026 19:45)',
    time: Math.floor(new Date('2026-10-05T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/solubility',
    message: `💧 [BẢNG TÍNH TAN — BÀI 1] MA TRẬN 14 CATION × 8 ANION: BẤM Ô NÀO RA NGAY CÔNG THỨC & TÍNH TAN Ô ĐÓ 🔍

Bảng tính tan là công cụ tra cứu không thể thiếu khi học phản ứng trao đổi ion trong dung dịch.

✨ Ma trận tính tan trên pH-Chem có gì đặc biệt:
1️⃣ Ghép công thức tự động theo đúng hóa trị: Bấm vào ô giữa $Fe^{3+}$ và $SO_4^{2-}$ ➔ Tự động sinh ra $Fe_2(SO_4)_3$.
2️⃣ Phân loại màu sắc trực quan:
* 🟢 T (Tan): Tan tốt trong nước tạo dung dịch trong suốt.
* 🔴 K (Không tan / Kết tủa): Xuất hiện chất rắn lắng xuống.
* 🟡 I (Ít tan): Tan một phần (như $CaSO_4, PbCl_2$).
* ⚪ Bị thủy phân / Không tồn tại: Phân hủy trong nước (như $Al_2S_3, Fe_2(CO_3)_3$).

👉 Thử tra cứu ma trận độ tan thông minh tại:
🔗 https://ph-chem.web.app/solubility

#pHChem #BangTinhTan #DoTanHoaHoc #PhanUngTraoDoiIon #HoaHoc9 #HoaHoc11`,
  },
  {
    day: 'Thứ Ba (06/10/2026 11:45)',
    time: Math.floor(new Date('2026-10-06T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/solubility',
    message: `⚡ [BẢNG TÍNH TAN — BÀI 2] 3 ĐIỀU KIỆN BẮT BUỘC ĐỂ PHẢN ỨNG TRAO ĐỔI ION TRONG DUNG DỊCH XẢY RA 🎯

Phản ứng trao đổi ion chỉ diễn ra khi các ion kết hợp với nhau làm giảm nồng độ ion trong dung dịch!

🔑 3 Điều kiện (chỉ cần thỏa mãn ít nhất 1 trong 3):
1️⃣ Tạo thành chất KẾT TỦA (chất không tan):
Ví dụ: $BaCl_2 + Na_2SO_4 \\rightarrow BaSO_4\\downarrow \\text{ (trắng)} + 2NaCl$.
2️⃣ Tạo thành chất KHÍ (bay hơi):
Ví dụ: $CaCO_3 + 2HCl \\rightarrow CaCl_2 + CO_2\\uparrow + H_2O$.
3️⃣ Tạo thành chất ĐIỆN LI YẾU (như nước $H_2O$, axit yếu):
Ví dụ: $NaOH + HCl \\rightarrow NaCl + H_2O$.

👉 Tra cứu nhanh độ tan và phản ứng trao đổi tại:
🔗 https://ph-chem.web.app/solubility

#pHChem #PhanUngTraoDoiIon #DieuKienPhanUng #HoaHoc11 #LuyenThiTHPTQG`,
  },
  {
    day: 'Thứ Tư (07/10/2026 19:45)',
    time: Math.floor(new Date('2026-10-07T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/reactions',
    message: `📝 [BẢNG TÍNH TAN — BÀI 3] 3 BƯỚC VIẾT PHƯƠNG TRÌNH ION RÚT GỌN SIÊU TỐC KHÔNG BAO GIỜ SAI 🚀

Bản chất của phản ứng trong dung dịch chính là phản ứng giữa các ion:

📐 3 Bước chuẩn:
* Bước 1: Viết phương trình phân tử và cân bằng.
* Bước 2: Chuyển các chất điện li MẠNH, TAN thành ion (Axit mạnh, Bazơ tan, Muối tan). Các chất kết tủa, chất khí, chất điện li yếu (nước) GIỮ NGUYÊN dạng phân tử.
* Bước 3: Rút gọn các ion giống nhau ở 2 vế.

✨ Ví dụ: $AgNO_3 + NaCl \\rightarrow AgCl\\downarrow + NaNO_3$
PT ion đầy đủ: $Ag^+ + NO_3^- + Na^+ + Cl^- \\rightarrow AgCl\\downarrow + Na^+ + NO_3^-$
PT ion rút gọn: $Ag^+ + Cl^- \\rightarrow AgCl\\downarrow$.

👉 Xem hơn 60+ phương trình ion rút gọn kèm hiện tượng tại:
🔗 https://ph-chem.web.app/reactions

#pHChem #PhuongTrinhIonRutGon #HoaHoc11 #LuyenThiDaiHoc #KienThucHoaHoc`,
  },
  {
    day: 'Thứ Năm (08/10/2026 19:45)',
    time: Math.floor(new Date('2026-10-08T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/reactions',
    message: `🌈 [BẢNG TÍNH TAN — BÀI 4] BẢNG TRA CỨU MÀU SẮC KẾT TỦA KINH ĐIỂN DÙNG TRONG BÀI THI NHẬN BIẾT 🎨

Làm bài tập nhận biết hóa chất, màu sắc kết tủa chính là "chìa khóa" mở đáp án:

🎨 8 Màu kết tủa quan trọng nhất:
* ⚪ Trắng: $BaSO_4, CaCO_3, BaCO_3, AgCl, Mg(OH)_2, Al(OH)_3, Zn(OH)_2$.
* 🔵 Xanh lam: $Cu(OH)_2$.
* 🟤 Nâu đỏ: $Fe(OH)_3$.
* 🟢 Trắng xanh (hóa nâu đỏ trong không khí): $Fe(OH)_2 \\rightarrow Fe(OH)_3$.
* 🟡 Vàng nhạt: $AgBr$.
* 🟡 Vàng đậm: $AgI, Ag_3PO_4$.
* ⚫ Đen: $CuS, FeS, PbS, Ag_2S$.
* 🔴 Đỏ gạch: $Cu_2O$.

👉 Tra cứu màu sắc hiện tượng phản ứng tại:
🔗 https://ph-chem.web.app/reactions

#pHChem #MauKetTua #NhanBietHoaChat #HoaHoc11 #HoaHoc12 #LuyenThiTHPTQG`,
  },
  {
    day: 'Thứ Sáu (09/10/2026 11:45)',
    time: Math.floor(new Date('2026-10-09T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/reactions',
    message: `🧪 [BẢNG TÍNH TAN — BÀI 5] HIỆN TƯỢNG KẾT TỦA LƯỠNG TÍNH: Al(OH)₃ VÀ Zn(OH)₂ TAN TRONG KIỀM DƯ 💧

Hiện tượng "kết tủa keo trắng tăng dần đến cực đại, sau đó tan dần tạo dung dịch trong suốt":

🔬 Giải thích cơ chế:
1. Giai đoạn 1: $Al^{3+} + 3OH^- \\rightarrow Al(OH)_3\\downarrow$ (kết tủa keo trắng xuất hiện).
2. Giai đoạn 2: Do $Al(OH)_3$ là hiđroxit lưỡng tính, khi thêm kiềm dư $OH^-$:
$$Al(OH)_3 + OH^- \\rightarrow [Al(OH)_4]^- \\text{ (hoặc } AlO_2^- + 2H_2O)$$
Kết tủa tan hoàn toàn tạo muối aluminat tan trong nước!

⚠️ Lưu ý: $Al(OH)_3$ KHÔNG tan trong dung dịch bazơ yếu như $NH_3$, nhưng $Zn(OH)_2$ lại tan trong $NH_3$ dư do tạo phức chất tan!

👉 Tra cứu chi tiết phản ứng lưỡng tính tại:
🔗 https://ph-chem.web.app/reactions

#pHChem #KetTuaLuongTinh #AlOH3 #ZnOH2 #HoaHoc12 #NhanBietChat`,
  },
  {
    day: 'Thứ Bảy (10/10/2026 14:30)',
    time: Math.floor(new Date('2026-10-10T14:30:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/reactions',
    message: `💨 [BẢNG TÍNH TAN — BÀI 6] NHẬN DIỆN CÁC KHÍ CÓ MÙI ĐẶC TRƯNG SINH RA TỪ PHẢN ỨNG TRAO ĐỔI & OXI HÓA 👃

Nhận biết chất khí qua tính chất vật lý và hóa học đặc trưng:

1. $NH_3$ (Amoniac): Khí không màu, mùi khai nồng đặc trưng, làm xanh quỳ tím ẩm.
2. $H_2S$ (Hiđro sunfua): Khí mùi trứng thối, tạo kết tủa đen $PbS$ khi dẫn qua dung dịch muối chì $Pb(NO_3)_2$.
3. $SO_2$ (Lưu huỳnh đioxit): Khí mùi hắc, làm mất màu dung dịch nước brom và thuốc tím $KMnO_4$.
4. $NO_2$ (Nitơ đioxit): Khí màu nâu đỏ, mùi hắc độc hại.
5. $CO_2$ (Cacbon đioxit): Khí không màu, không mùi, làm đục nước vôi trong $Ca(OH)_2$.

👉 Khám phá kho 224+ phản ứng hóa học có hiện tượng tại:
🔗 https://ph-chem.web.app/reactions

#pHChem #NhanBietKhi #HienTuongHoaHoc #ThiNghiemHoa #HoaHoc10 #HoaHoc11`,
  },
  {
    day: 'Chủ Nhật (11/10/2026 20:00)',
    time: Math.floor(new Date('2026-10-11T20:00:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/quiz',
    message: `🏆 [MINIGAME CUỐI TUẦN] — THỬ TÀI NHẬN BIẾT HÓA CHẤT MẤT NHÃN 🎯

Một bài toán nhận biết kinh điển trong phòng thí nghiệm:

❓ Có 4 lọ mất nhãn chứa 4 dung dịch không màu:
$$NaCl, Na_2SO_4, BaCl_2, Na_2CO_3$$

Chỉ dùng thêm MỘT thuốc thử duy nhất, bạn có thể nhận biết được cả 4 dung dịch trên không? Thuốc thử đó là gì?
A. Dung dịch $AgNO_3$
B. Dung dịch $H_2SO_4$ loãng
C. Dung dịch $NaOH$
D. Dung dịch quỳ tím

👇 Hãy comment đáp án và giải thích cách làm của bạn nhé!
💡 Vào ngay mục Luyện tập trên pH-Chem để làm bài trắc nghiệm Nhận biết chất:
🔗 https://ph-chem.web.app/quiz

#pHChem #NhanBietHoaChat #MinigameHoaHoc #DoVuiHoa #ThuThachCuoiTuan #HoaHoc11`,
  },
];

export async function scheduleWeek6() {
  console.log('🚀 ĐANG LÊN LỊCH TUẦN 6 (CHUYÊN SÂU BẢNG ĐỘ TAN & PHẢN ỨNG CÓ HIỆN TƯỢNG)...\n');
  for (let i = 0; i < POSTS_WEEK_6.length; i++) {
    const p = POSTS_WEEK_6[i];
    console.log(`⏳ Đang lên lịch Bài ${i + 1} (${p.day})...`);
    const res = await postMessage({
      message: p.message,
      link: p.link,
      published: false,
      scheduledPublishTime: p.time,
    });
    console.log(`✅ Thành công Bài ${i + 1}! ID: ${res.id}\n`);
  }
  console.log('🎉 ĐÃ LÊN LỊCH THÀNH CÔNG TOÀN BỘ TUẦN 6!');
}

if (process.argv[1]?.endsWith('schedule-week-6.mjs')) {
  scheduleWeek6().catch(console.error);
}
