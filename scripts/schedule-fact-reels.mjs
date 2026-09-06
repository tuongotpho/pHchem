import path from 'node:path';
import fs from 'node:fs';
import { postVideo } from './fanpage-manager.mjs';

const REELS_DIR = path.resolve('promo/reels');

// Lịch phát hành cho 10 tập Reel: MỖI NGÀY 2 VIDEO
// Ca trưa: 11:45 | Ca tối: 19:45 (từ Thứ Bảy 05/09/2026 đến Thứ Tư 09/09/2026)
export const REEL_SCHEDULE = [
  {
    id: 1,
    title: 'BỊ KIẾN CẮN: VÌ SAO BÔI VÔI HAY XÀ PHÒNG? 🐜⚡',
    videoFile: 'reel_01_kien_can.mp4',
    scheduleIso: '2026-09-05T11:45:00+07:00',
    caption: `Bị kiến hay ong đốt — Vì sao ông bà ta thường bảo bôi chút vôi ăn trầu hoặc xà phòng là dịu ngay? 🐜🤯

Dưới góc nhìn hóa học, thủ phạm gây sưng rát chính là Axit Formic (HCOOH) có trong nọc độc kiến.
Khi bôi vôi tôi Ca(OH)₂ hay xà phòng có tính kiềm, phản ứng trung hòa lập tức diễn ra:
👉 2 HCOOH + Ca(OH)₂ → (HCOO)₂Ca + 2 H₂O

Axit bị vô hiệu hóa thành muối canxi fomat và nước, dập tắt cơn đau ngứa tức thì!

📱 Khám phá kho tàng hóa học và tính pH siêu tốc tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #AxitFormic #MeoVatHoaHoc #HoaHocDoiSong #HocHoaOnline #CongCuHocTap`
  },
  {
    id: 2,
    title: 'NGHỊCH LÝ NƯỚC ĐÁ NỔI CỨU SỐNG CẢ HÀNH TINH 🧊🌍',
    videoFile: 'reel_02_da_noi.mp4',
    scheduleIso: '2026-09-05T19:45:00+07:00',
    caption: `Vì sao đá nổi trên nước? Một "lỗi lập trình" tuyệt đẹp của tự nhiên cứu sống cả Trái Đất! 🧊✨

Gần như mọi chất khi đông đặc đều co lại và chìm xuống. Nhưng khi nước hạ dưới 4°C, các liên kết hydro đẩy phân tử nước dãn nở thành mạng tinh thể lục giác rỗng kỳ lạ, làm khối lượng riêng của đá nhẹ hơn nước lỏng!

Nhờ đá nổi lên trên, bề mặt sông hồ tạo thành tấm chăn cách nhiệt hoàn hảo, giữ ấm cho sinh vật thủy sinh sống sót qua mùa đông buốt giá. Nếu đá chìm, các đại dương sẽ đông cứng từ đáy lên và sự sống Trái Đất bị xóa sổ!

📱 Xem cấu trúc phân tử 3D chuẩn IUPAC tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #NuocDa #LienKetHydro #KhoaHocThuVi #HocHoaDeDang #HoaHoc10`
  },
  {
    id: 3,
    title: 'VÌ SAO CỒN 70° DIỆT KHUẨN TỐT HƠN CỒN 90°? 🧪🧴',
    videoFile: 'reel_03_con_70_do.mp4',
    scheduleIso: '2026-09-06T11:45:00+07:00',
    caption: `Đừng nhầm lẫn: Cồn 70 độ sát trùng mạnh hơn cồn 90 độ rất nhiều! 🧪⚠️

Cồn 90% quá háo nước làm đông tụ lớp vỏ protein của vi khuẩn quá nhanh, vô tình tạo bức tường bảo vệ nhân vi khuẩn bên trong.

Trong khi đó, tỷ lệ vàng 70% ethanol + 30% nước làm chậm quá trình đông tụ, giúp cồn thẩm thấu sâu vào nhân tế bào và tiêu diệt mầm bệnh tận gốc!

📱 Tính toán tỷ lệ pha loãng nồng độ dung dịch siêu tốc tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Ethanol #SatKhuan #KienThucYKhoa #MayTinhHoaHoc #HocHoaOnline`
  },
  {
    id: 4,
    title: 'CẮT HÀNH TÂY VÌ SAO CHẢY NƯỚC MẮT? 🧅😭',
    videoFile: 'reel_04_hanh_cay_mat.mp4',
    scheduleIso: '2026-09-06T19:45:00+07:00',
    caption: `Hóa ra cắt hành bị cay mắt là vì mắt bạn vừa tự chế tạo ra axit! 🧅👀

Khi dao cắt vỡ tế bào hành, enzim giải phóng hợp chất lưu huỳnh bay hơi Syn-propanethial-S-oxide.
Khí này bay lên gặp nước mắt tạo thành dung dịch axit loãng kích thích tuyến lệ. Mắt lập tức xả nước ồ ạt để rửa trôi axit!

💡 Mẹo: Ngâm hành trong nước lạnh hoặc cho vào ngăn mát tủ lạnh trước khi cắt để giảm bay hơi nhé!

📱 Tra cứu hàng trăm hợp chất hữu cơ tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #HanhTay #HoaHocAmThuc #MeoNhaBep #KhoaHocCuocSong`
  },
  {
    id: 5,
    title: 'KIM CƯƠNG CÓ THỂ BỊ THIÊU RỤI BỞI LỬA KHÔNG? 💎🔥',
    videoFile: 'reel_05_kim_cuong_chay.mp4',
    scheduleIso: '2026-09-07T11:45:00+07:00',
    caption: `Vật chất tự nhiên cứng nhất hành tinh — liệu kim cương có bị ngọn lửa thiêu rụi thành khói không? 💎🤯

Câu trả lời là CÓ! Kim cương và ruột bút chì than thực chất đều được cấu tạo từ 100% nguyên tố Cacbon thuần khiết.
Ở khoảng 800°C trong oxy tinh khiết, kim cương sẽ bốc cháy rực rỡ và biến thành khí CO₂, bốc hơi sạch sẽ không để lại một hạt tro nào!
👉 C (kim cương) + O₂ → CO₂ ↑

📱 Khám phá bí mật nguyên tố Cacbon và 118 nguyên tố tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #KimCuong #Cacbon #BangTuanHoan #HoaHocKyThu`
  },
  {
    id: 6,
    title: 'BAKING SODA + GIẤM: NÚI LỬA TẨY RỬA THẦN THÁNH 🌋🧼',
    videoFile: 'reel_06_baking_soda_giam.mp4',
    scheduleIso: '2026-09-07T19:45:00+07:00',
    caption: `Trộn Baking Soda với Giấm — Bí mật tẩy rửa thần thánh dưới góc nhìn hóa học! 🌋✨

Baking soda mang tính kiềm nhẹ gặp axit axetic trong giấm xảy ra phản ứng trao đổi mãnh liệt:
👉 NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂ ↑

Áp lực cơ học từ hàng triệu bọt khí CO₂ giải phóng dồn dập giúp bóc tách mảng bám dầu mỡ cứng đầu mà không làm hại bề mặt thiết bị!

📱 Tự động cân bằng mọi phản ứng hóa học chỉ trong 1 giây tại:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #BakingSoda #CanBangPhuongTrinh #MeoVatGiaDinh #HocHoaDeHieu`
  },
  {
    id: 7,
    title: 'VÌ SAO PHÁO HOA CÓ MUÔN MÀU RỰC RỠ? 🎆✨',
    videoFile: 'reel_07_mau_phao_hoa.mp4',
    scheduleIso: '2026-09-08T11:45:00+07:00',
    caption: `Ai là "họa sĩ" bí mật vẽ nên những sắc màu rực rỡ bùng nổ của pháo hoa đêm giao thừa? 🎆🎨

Đó là vũ điệu của các electron trong ion kim loại! Khi bị nung nóng rồi hạ mức năng lượng, chúng phát ra ánh sáng đơn sắc đặc trưng:
🔹 Muối Đồng (Cu²⁺): Xanh lam huyền ảo
🔸 Muối Stronti (Sr²⁺): Đỏ son rực rỡ
🔹 Muối Bari (Ba²⁺): Xanh lục
🔸 Muối Natri (Na⁺): Vàng chói lọi!

📱 Tra cứu tính chất ngọn lửa và màu sắc kim loại tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #PhaoHoa #ThuMauNgonLua #KimLoai #VatLyHoaHoc`
  },
  {
    id: 8,
    title: 'VÌ SAO MỰC VÀ SAM BIỂN CÓ MÁU MÀU XANH DƯƠNG? 🦀🌊',
    videoFile: 'reel_08_mau_xanh_muc_cua.mp4',
    scheduleIso: '2026-09-08T19:45:00+07:00',
    caption: `Bí mật dòng máu màu xanh dương quý tộc của mực và sam biển! 🦀💙

Máu người màu đỏ vì protein Hemoglobin chứa ion Sắt (Fe²⁺) làm lõi vận chuyển oxy.
Còn mực, bạch tuộc và sam biển sống ở đáy biển sâu lạnh giá lại dùng protein Hemocyanin chứa ion Đồng (Cu²⁺) — khi gắn với oxy sẽ chuyển sang màu xanh lam ngọc bích quý giá!

📱 Tìm hiểu thế điện cực, phức chất và vai trò sinh học tại:
🌐 https://ph-chem.web.app/electro
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #MauXanh #Hemoglobin #Hemocyanin #SinhHocHoaHoc`
  },
  {
    id: 9,
    title: 'TIẾNG XÌ XÌ BÍ ẨN KHI MỞ LON NƯỚC NGỌT 🥤💨',
    videoFile: 'reel_09_nuoc_ngot_co_ga.mp4',
    scheduleIso: '2026-09-09T11:45:00+07:00',
    caption: `Tiếng "xì xì" sảng khoái khi mở lon nước ngọt từ đâu ra? 🥤💨

Trong nhà máy, khí CO₂ được nén dưới áp suất cao để hòa tan vào nước ngọt tạo axit cacbonic H₂CO₃ mang vị tê tê the mát.
Khi bạn mở nắp, áp suất tụt giảm đột ngột khiến cân bằng hóa học dịch chuyển theo chiều nghịch (nguyên lý Le Chatelier), giải phóng ồ ạt hàng triệu bọt khí CO₂ sủi tăm!
👉 CO₂ (khí) + H₂O ⇌ H₂CO₃ (dung dịch)

📱 Luyện đề trắc nghiệm cân bằng hóa học 30s tại:
🌐 https://ph-chem.web.app/quiz
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #NuocNgot #CanBangHoaHoc #LeChatelier #LuyenDeHoa`
  },
  {
    id: 10,
    title: 'TÚI KHÍ Ô TÔ: NỔ CỨU MẠNG TRONG 0.03 GIÂY 🚗⚡',
    videoFile: 'reel_10_tui_khi_o_to.mp4',
    scheduleIso: '2026-09-09T19:45:00+07:00',
    caption: `Chỉ 0,03 giây để cứu một mạng người — túi khí ô tô lấy đâu ra lượng khí khổng lồ nhanh đến vậy? 🚗⚡

Không có máy nén khí nào phản ứng kịp! Bên trong túi khí chứa một lượng thuốc nổ rắn Natri Azide (NaN₃).
Khi va chạm mạnh, cảm biến kích hoạt xung điện làm NaN₃ phân hủy siêu thanh:
👉 2 NaN₃ → 2 Na + 3 N₂ ↑
Giải phóng hàng chục lít khí Nitơ trơ vô hại thổi phồng túi đệm trước khi người lái bị va đập!

📱 Tính toán số mol, thể tích khí và khối lượng mol tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #TuiKhiOTo #TocDoPhanUng #HoaHocUngDung #CongCuHocTap`
  },
  {
    id: 11,
    title: 'VÌ SAO LÒNG ĐỎ TRỨNG CÓ VIỀN XÁM XANH? 🥚🍳',
    videoFile: 'reel_11_trung_luoc_xam_xanh.mp4',
    scheduleIso: '2026-09-10T11:45:00+07:00',
    caption: `Luộc trứng quá kỹ vì sao lòng đỏ lại xuất hiện một lớp viền màu xám xanh? 🥚🍳

Đun sôi lâu phân giải protein lòng trắng sinh khí hydro sunfua H₂S. Khí này khuếch tán vào lòng đỏ gặp ion sắt Fe²⁺ tạo kết tủa sắt(II) sunfua FeS màu xám đen bao quanh bề mặt!
👉 Fe²⁺ + H₂S → FeS ↓ + 2 H⁺

Lớp viền này hoàn toàn vô hại nhưng làm giảm vị béo ngậy. Mẹo nhỏ: Luộc xong ngâm ngay vào nước lạnh để hạ nhiệt tức thì nhé!

📱 Tra cứu cấu trúc 340 hợp chất hóa học tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #TrungLuoc #FeS #HoaHocAmThuc #MeoVatNhaBep`
  },
  {
    id: 12,
    title: 'ĐUN ĐƯỜNG THẮNG NƯỚC HÀNG: CARAMEL HÓA 🍮🔥',
    videoFile: 'reel_12_thang_duong_caramel.mp4',
    scheduleIso: '2026-09-10T19:45:00+07:00',
    caption: `Thắng đường kho thịt — Bí mật phản ứng Caramel hóa đỉnh cao của ẩm thực! 🍮✨

Ở nhiệt độ trên 160°C, các phân tử đường saccarozơ C₁₂H₂₂O₁₁ bị nhiệt phân và mất nước liên tục, bẻ gãy cấu trúc để tái tổ hợp thành hàng trăm chất mới:
🔹 Caramelan & Caramelen: Tạo màu nâu óng ả cánh gián
🔸 Hợp chất Furan: Tỏa hương thơm ngậy ngọt ngào kích thích khứu giác!

📱 Khám phá phản ứng hóa học tự động tại website:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Caramel #ThangDuong #HoaHocDoiSong #AmThucVietNam`
  },
  {
    id: 13,
    title: 'CHANH TẨY SẠCH CẶN ẤM ĐUN NƯỚC 🍋⚡',
    videoFile: 'reel_13_chanh_tay_can_am.mp4',
    scheduleIso: '2026-09-11T11:45:00+07:00',
    caption: `Đáy ấm đun nước bám cặn đá vôi cứng ngắc? Chỉ cần nửa quả chanh là sáng bóng như mới! 🍋✨

Cặn nước đun sôi chính là canxi cacbonat CaCO₃ kết tủa từ nước cứng.
Axit citric trong chanh phản ứng hòa tan hoàn toàn lớp cặn đá vôi thành muối canxi citrat tan biến trong nước:
👉 2 C₆H₈O₇ + 3 CaCO₃ → Ca₃(C₆H₅O₇)₂ + 3 CO₂ ↑ + 3 H₂O

Vừa sạch bong kin kít vừa thơm mát tự nhiên, an toàn gấp vạn lần hóa chất tẩy rửa công nghiệp!

📱 Máy tính pH và mô phỏng phản ứng axit - bazơ siêu tốc tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #AxitCitric #TayCanAm #MeoVatGiaDinh #HoaHocMoiNgay`
  },
  {
    id: 14,
    title: 'VÌ SAO UỐNG SỮA GIẢM CAY XÉ LƯỠI? 🥛🌶️',
    videoFile: 'reel_14_uong_sua_giam_cay.mp4',
    scheduleIso: '2026-09-11T19:45:00+07:00',
    caption: `Ăn ớt cay xé lưỡi — Uống nước lọc càng cay, nhưng uống sữa tươi lại êm dịu ngay? 🥛🌶️

Thủ phạm gây cay là Capsaicin — một chất kỵ nước tuyệt đối, không tan trong nước nên uống nước chỉ làm loang chất cay khắp khoang miệng!

Trong sữa tươi chứa hàm lượng lớn protein Casein ưa dầu. Casein hoạt động như "xà phòng sinh học", ôm lấy các phân tử capsaicin và cuốn trôi chúng khỏi thụ thể vị giác trên lưỡi!

📱 Tra cứu cấu trúc hóa học phân tử tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Capsaicin #Casein #GiamCay #KienThucSinhHoc`
  },
  {
    id: 15,
    title: 'BỘT NGỌT MSG: VỊ UMAMI THỨ NĂM 🍜✨',
    videoFile: 'reel_15_mi_chinh_msg.mp4',
    scheduleIso: '2026-09-12T11:45:00+07:00',
    caption: `Bột ngọt mì chính (MSG) thực chất là gì và vì sao lại mang vị ngọt thịt thần thánh? 🍜🔬

Mì chính là Monosodium Glutamate — muối natri của axit glutamic, một amino axit thiết yếu cấu tạo nên protein, có sẵn tự nhiên trong thịt bò, nấm và phô mai.

Khi nếm, ion glutamat kích hoạt thụ thể Umami (vị ngon thứ năm bên cạnh ngọt, mặn, chua, đắng), báo hiệu cho não bộ biết đây là nguồn thực phẩm giàu dinh dưỡng!

📱 Khám phá bảng tuần hoàn và các axit amin tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #BotNgot #MSG #Umami #HoaHocThucPham #GiaVi`
  },
  {
    id: 16,
    title: 'KHỬ MÙI TANH CỦA CÁ BẰNG GIẤM VÀ RƯỢU 🐟🍶',
    videoFile: 'reel_16_mui_tanh_ca_giam.mp4',
    scheduleIso: '2026-09-12T19:45:00+07:00',
    caption: `Khử sạch mùi tanh của cá chỉ với một thìa giấm ăn hoặc rượu trắng! 🐟🍶

Mùi tanh nồng của cá do hợp chất trimetylamin (CH₃)₃N gây ra — một amin mang tính bazơ hữu cơ rất dễ bay hơi vào không khí.

Axit axetic trong giấm lập tức phản ứng trung hòa amin bazơ thành muối không bay hơi:
👉 (CH₃)₃N + CH₃COOH → (CH₃)₃NH⁺ CH₃COO⁻

Muối này tan hoàn toàn trong nước và trôi sạch khi rửa, trả lại món cá thơm ngon tuyệt hảo!

📱 Tra cứu phản ứng hóa học tự động tại:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #MuiTanhCa #GiAmAn #MeoVatNauAn #HoaHocCuocSong`
  },
  {
    id: 17,
    title: 'BÁNH MÌ PHỒNG XỐP: CÔNG LAO CỦA KHÍ CO₂ 🍞🥖',
    videoFile: 'reel_17_men_no_banh_mi.mp4',
    scheduleIso: '2026-09-13T11:45:00+07:00',
    caption: `Làm thế nào mà cục bột mì đặc quánh lại nở phồng xốp thành ổ bánh mì giòn tan? 🍞✨

Đó là công lao của hàng tỷ sinh vật nấm men bánh mì! Chúng "ăn" đường trong bột và thực hiện phản ứng lên men rượu:
👉 C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂ ↑

Hàng triệu bọt khí CO₂ sinh ra bị giữ lại bên trong mạng lưới protein gluten dẻo dai. Khi đưa vào lò nướng, khí CO₂ dãn nở nhiệt làm phồng to các khoang rỗng tạo nên ruột bánh mềm xốp tuyệt hảo!

📱 Tính toán thể tích khí và khối lượng mol tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #BanhMi #NamMen #LênMen #KhiCO2 #HocHoaOnline`
  },
  {
    id: 18,
    title: 'VÌ SAO TÁO BỔ RA LẠI BỊ THÂM ĐEN? 🍏🍂',
    videoFile: 'reel_18_tao_got_vo_tham.mp4',
    scheduleIso: '2026-09-13T19:45:00+07:00',
    caption: `Vừa gọt quả táo đặt ra đĩa vài phút đã bị thâm xỉn — Thủ phạm khoa học là gì? 🍏🍂

Khi dao cắt làm rách tế bào thực vật, các hợp chất polyphenol bên trong tiếp xúc trực tiếp với oxy trong không khí.
Dưới sự xúc tác của enzim Polyphenol Oxidase (PPO), polyphenol bị oxy hóa liên hoàn tạo thành Melanin — sắc tố màu nâu sẫm tương tự sắc tố da người!

💡 Mẹo: Ngâm miếng táo vào nước muối loãng hoặc nước chanh để ức chế enzim, giữ táo trắng giòn suốt cả ngày nhé!

📱 Xem cấu trúc các chất chống oxy hóa tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #TaoTham #Polyphenol #OxyHoa #MeoNhaBep #KhoaHocThuVi`
  },
  {
    id: 19,
    title: 'MUỐI I-ỐT: NGUYÊN TỐ VI LƯỢNG SỐNG CÒN 🧂🧠',
    videoFile: 'reel_19_muoi_iot.mp4',
    scheduleIso: '2026-09-14T11:45:00+07:00',
    caption: `Cả đời người chỉ cần một lượng I-ốt bé bằng hạt đậu, nhưng thiếu nó sẽ dẫn tới hậu quả khôn lường! 🧂🧠

Tuyến giáp bắt buộc phải có ion iotua để tổng hợp hormone Thyroxine (T4) — hormone điều khiển tốc độ trao đổi chất, nhịp tim và sự phát triển trí tuệ.

Thiếu I-ốt làm tuyến giáp phải phình to hết cỡ để cố gắng bắt giữ từng phân tử iot, tạo thành khối bướu cổ và làm trẻ nhỏ bị thiểu năng trí tuệ vĩnh viễn.

📱 Khám phá vai trò sinh học của 118 nguyên tố tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #MuoiIot #TuyenGiap #YTeDuPhong #BangTuanHoan`
  },
  {
    id: 20,
    title: 'PHẢN ỨNG MAILLARD: MÙI THỊT NƯỚNG THẦN THÁNH 🥩🔥',
    videoFile: 'reel_20_phan_ung_maillard.mp4',
    scheduleIso: '2026-09-14T19:45:00+07:00',
    caption: `Mùi thịt nướng xèo xèo thơm nức mũi — Phép màu của phản ứng Maillard vĩ đại! 🥩✨

Khi nấu nướng ở nhiệt độ 140°C đến 165°C, các amino axit từ protein phản ứng với đường khử trong thực phẩm.
Phản ứng này tạo ra hàng trăm hợp chất mùi vị mới:
🔹 Mùi khói, mùi bơ, mùi hạt dẻ nướng
🔸 Sắc vàng nâu giòn rụm kích thích vị giác tột đỉnh!

📱 Thử thách trắc nghiệm hóa học tương tác 30s tại:
🌐 https://ph-chem.web.app/quiz
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #PhanUngMaillard #ThitNuong #KhoaHocAmThuc #LuyenDeHoa`
  },
  {
    id: 21,
    title: 'VẮT CHANH VÀO CANH RAU MUỐNG ĐỔI MÀU 🍋🥬',
    videoFile: 'reel_21_chanh_rau_muong.mp4',
    scheduleIso: '2026-09-15T11:45:00+07:00',
    caption: `Tại sao canh rau muống đang xanh ngắt, vắt chanh vào lại chuyển màu hồng đỏ thanh tao? 🍋🥬

Nước luộc rau muống chứa hợp chất chlorophyll và anthocyanin đóng vai trò như chất chỉ thị màu pH tự nhiên.
Axit citric trong chanh làm giảm độ pH của nước canh xuống môi trường axit. Dưới tác động của ion H⁺, ion magie trong nhân diệp lục bị tách ra biến chlorophyll thành pheophytin có màu vàng đỏ!

Vừa đổi màu đẹp mắt vừa kích thích tuyến tiêu hóa hoạt động tối ưu!

📱 Thử nghiệm các chất chỉ thị màu pH tự động tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #CanhRauMuong #VatChanh #ChiThiMau #TinhpH`
  },
  {
    id: 22,
    title: 'RƯỢU ĐỂ LÂU THÀNH GIẤM ĂN: VÌ SAO? 🍷🏺',
    videoFile: 'reel_22_len_men_giam.mp4',
    scheduleIso: '2026-09-15T19:45:00+07:00',
    caption: `Chai rượu vang mở nắp quên đậy, vài tuần sau lại hóa thành giấm chua loét? 🍷🏺

Đó là quá trình lên men giấm sinh học do vi khuẩn Acetobacter thực hiện.
Chúng sử dụng oxy trong không khí để oxy hóa rượu etylic thành axit axetic:
👉 C₂H₅OH + O₂ → CH₃COOH + H₂O

Đây cũng chính là bí quyết nuôi con giấm truyền thống mà các bà các mẹ vẫn làm tại nhà!

📱 Cân bằng phương trình lên men tự động tại:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #LenMenGiam #AxitAxetic #RuouVang #HoaHocHuuCo`
  },
  {
    id: 23,
    title: 'SỮA CHUA ĐÔNG TỤ MỊN MÀNG THẦN KỲ 🥛🥣',
    videoFile: 'reel_23_dong_tu_sua_chua.mp4',
    scheduleIso: '2026-09-16T11:45:00+07:00',
    caption: `Từ sữa tươi lỏng bỏng thành hũ sữa chua sánh mịn dẻo quánh — Bí mật nằm ở đâu? 🥛✨

Vi khuẩn lactic chuyển hóa đường lactose thành axit lactic, làm độ pH của sữa hạ dần xuống 4.6.
Tại điểm đẳng điện này, các phân tử protein Casein mất điện tích âm bảo vệ, không còn đẩy nhau mà liên kết chặt thành mạng lưới 3D giữ nước, tạo nên cấu trúc gel đông tụ mịn màng như thạch!

📱 Tính toán pH và nồng độ dung dịch siêu tốc tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SuaChua #AxitLactic #DongTuProtein #ViSinhVat`
  },
  {
    id: 24,
    title: 'COCA-COLA TẨY SẠCH MEN SỨ Ố VÀNG 🥤🚽',
    videoFile: 'reel_24_coca_tay_can.mp4',
    scheduleIso: '2026-09-16T19:45:00+07:00',
    caption: `Đổ lon Coca-Cola vào bồn cầu ố vàng rồi xả nước là sạch bong kin kít? 🥤✨

Không phải phép thuật — đó là sức mạnh của Axit Photphoric (H₃PO₄) có sẵn trong thành phần nước ngọt có ga để tạo vị chua sắc, với độ pH cực thấp ~ 2.5!
Axit photphoric dễ dàng hòa tan các cặn bám canxi cacbonat và các vết ố rỉ sét kim loại lâu ngày mà không ăn mòn men sứ:
👉 2 H₃PO₄ + 3 CaCO₃ → Ca₃(PO₄)₂ + 3 CO₂ ↑ + 3 H₂O

📱 Đo độ pH của mọi đồ uống hàng ngày tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #AxitPhotphoric #CocaCola #TayRua #HoaHocThucTe`
  },
{
    "id": 25,
    "title": "DẠ DÀY CHỨA AXIT HCl: VÌ SAO KHÔNG TỰ ĂN MÒN? 🥩🛡️",
    "videoFile": "reel_25_axit_da_day.mp4",
    "scheduleIso": "2026-09-17T11:45:00+07:00",
    "caption": `Dạ dày chứa axit HCl đủ sức làm tan chảy cả kim loại — Nhưng vì sao dạ dày không tự tiêu hóa chính mình? 🥩🛡️

Dưới góc nhìn hóa học, dịch vị dạ dày có nồng độ axit clohiđric (HCl) đậm đặc với pH cực thấp từ 1.5 đến 2.0. Để tự bảo vệ, các tế bào niêm mạc tiết ra lớp chất nhầy Mucin giàu ion Bicacbonat (HCO₃⁻).

Khi ion H⁺ từ lòng dạ dày khuếch tán vào, phản ứng trung hòa lập tức diễn ra ngay tại lớp màng nhầy:
👉 HCl + NaHCO₃ → NaCl + CO₂ ↑ + H₂O

Nhờ lớp lá chắn kiềm này, niêm mạc được bảo vệ an toàn tuyệt đối. Tuy nhiên, khi bị nhiễm vi khuẩn HP hoặc stress kéo dài, lớp màng nhầy bị bào mòn khiến axit tấn công trực tiếp gây viêm loét dạ dày!

📱 Kiểm tra nồng độ pH và cơ chế trung hòa axit tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #AxitDaDay #HCl #KienThucYKhoa #SucKhoe #HocHoaOnline`
  },
  {
    "id": 26,
    "title": "MỎI CƠ KHI TẬP THỂ THAO: THỦ PHẠM AXIT LACTIC 🏃‍♂️🦵",
    "videoFile": "reel_26_moi_co_axit_lactic.mp4",
    "scheduleIso": "2026-09-17T19:45:00+07:00",
    "caption": `Tại sao sau những buổi tập gym hay chạy bộ hết sức, cơ bắp lại đau mỏi rã rời suốt nhiều ngày sau đó? 🏃‍♂️💥

Thủ phạm hóa học chính là Axit Lactic (C₃H₆O₃)!
Khi cơ bắp vận động ở cường độ quá cao, lượng oxy hít thở không cung cấp kịp thời. Tế bào cơ buộc phải chuyển sang chế độ đường phân kị khí (yếm khí):
👉 C₆H₁₂O₆ (Glucose) → 2 C₃H₆O₃ (Axit Lactic) + Năng lượng (ATP)

Axit lactic tích tụ làm giảm pH nội bào, ức chế enzyme co bóp cơ và gây cảm giác nhức mỏi rã rời. Sau khi nghỉ ngơi, axit lactic được máu vận chuyển về gan để tái tạo lại glucose qua chu trình Cori!

💡 Mẹo: Hít thở sâu và giãn cơ sau khi tập giúp tăng cường oxy phân giải nhanh axit lactic!

📱 Khám phá công thức cấu tạo axit lactic tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #AxitLactic #TapGym #MoiCo #SinhHoa #KhoaHocTheThao`
  },
  {
    "id": 27,
    "title": "SÂU RĂNG: VI KHUẨN TIẾT AXIT ĂN MÒN MEN RĂNG 🦷🦠",
    "videoFile": "reel_27_sau_rang_axit.mp4",
    "scheduleIso": "2026-09-18T11:45:00+07:00",
    "caption": `Men răng là mô cứng nhất trong cơ thể con người — Thậm chí cứng hơn cả xương, nhưng tại sao chúng ta vẫn bị sâu răng? 🦷😱

Thực chất men răng được cấu tạo từ 96% tinh thể khoáng Hydroxyapatit Ca₅(PO₄)₃OH.
Khi chúng ta ăn đồ ngọt, vi khuẩn Streptococcus mutans trong mảng bám sẽ lên men đường và giải phóng axit lactic, kéo độ pH trong khoang miệng tụt xuống dưới ngưỡng tới hạn 5.5!

Ở môi trường axit này, cân bằng hòa tan dịch chuyển theo chiều thuận:
👉 Ca₅(PO₄)₃OH + 4 H⁺ ⇌ 5 Ca²⁺ + 3 HPO₄²⁻ + H₂O

Khoáng chất canxi photphat bị hòa tan và rửa trôi, khiến men răng xốp mềm và dần hình thành các lỗ sâu răng!

💡 Mẹo: Dùng kem đánh răng chứa Flo để ion F⁻ thay thế nhóm OH⁻ tạo thành Fluorapatit Ca₅(PO₄)₃F siêu bền chống axit ăn mòn!

📱 Tính toán pH khoang miệng và cân bằng phản ứng tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SauRang #MenRang #Hydroxyapatit #ChamSocRangMieng #HoaHoc11`
  },
  {
    "id": 28,
    "title": "THUỐC ĐAU DẠ DÀY: DẬP TẮT AXIT DƯ THẦN TỐC 💊🛡️",
    "videoFile": "reel_28_thuoc_dau_da_day.mp4",
    "scheduleIso": "2026-09-18T19:45:00+07:00",
    "caption": `Vì sao gói thuốc chữ P màu trắng sữa lại có thể dập tắt cơn đau rát dạ dày chỉ sau vài phút uống vào bụng? 💊⚡

Gói thuốc dạ dày chữ P (Phosphalugel hay Gastropulgite) là thuốc kháng axit antacid chứa các bazơ nhẹ không tan như Nhôm hiđroxit Al(OH)₃ hoặc Magie hiđroxit Mg(OH)₂.

Khi vào dạ dày, chúng thực hiện phản ứng trung hòa tức thì với axit clohiđric dư thừa:
👉 Al(OH)₃ + 3 HCl → AlCl₃ + 3 H₂O
👉 Mg(OH)₂ + 2 HCl → MgCl₂ + 2 H₂O

Phản ứng này nâng độ pH dịch vị từ mức quá chua 1.0 lên mức an toàn 3.5, ức chế enzyme Pepsin cắn phá niêm mạc. Do là bazơ không tan, thuốc không bị hấp thu vào máu nên cực kỳ an toàn!

📱 Cân bằng các phương trình trung hòa axit dạ dày siêu tốc tại:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #ThuocDaDay #TrungHoaAxit #NhomHidroxit #YDuoc #HocHoaDeDang`
  },
  {
    "id": 29,
    "title": "NGỘ ĐỘC KHÍ CO: KẺ GIẾT NGƯỜI VÔ HÌNH ☠️🪨",
    "videoFile": "reel_29_ngo_doc_khi_co.mp4",
    "scheduleIso": "2026-09-19T11:45:00+07:00",
    "caption": `Tại sao đốt than sưởi ấm trong phòng kín lại là cái bẫy chết người cực kỳ êm ái mà nạn nhân không hề hay biết? ☠️❄️

Khi đốt than củi hoặc than tổ ong trong phòng kín thiếu oxy, phản ứng cháy không hoàn toàn sinh ra khí Cacbon Monoxit (CO):
👉 2 C + O₂ (thiếu) → 2 CO ↑

Khí CO là kẻ sát nhân vô hình: Không màu, không mùi, không vị, không gây ho hay sặc.
Khi hít vào phổi, CO gắn chặt vào huyết sắc tố Hemoglobin (Hb) trong máu với ái lực mạnh gấp 250 lần so với khí Oxy (O₂):
👉 Hb + CO ⇌ HbCO

CO chiếm trọn các vị trí vận chuyển oxy, biến hồng cầu thành vô dụng. Tế bào toàn thân, đặc biệt là não bộ bị ngạt thở nghiêm trọng, khiến nạn nhân lịm dần đi trong giấc ngủ mà không thể kêu cứu!

⚠️ Tuyệt đối không bao giờ đốt than trong phòng kín đóng cửa!

📱 Tra cứu tính chất các oxit của cacbon tại website chính thức:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #NgoDocKhíCO #DotThanPhongKin #AnToanSong #HoaHoc11 #BaoVeGiaDinh`
  },
  {
    "id": 30,
    "title": "BÓNG CƯỜI N₂O: GÂY TÊ VÀ HIỂM HỌA THẦN KINH 🎈🧠",
    "videoFile": "reel_30_khi_cuoi_n2o.mp4",
    "scheduleIso": "2026-09-19T19:45:00+07:00",
    "caption": `Tại sao hít bóng cười lại khiến người ta cười ngặt nghẽo không kiểm soát, và tại sao nó có thể dẫn đến liệt hai chân? 🎈⚠️

Khí trong bóng cười là Đinitơ Monoxit (N₂O). Trong y học, N₂O được dùng làm thuốc gây mê giảm đau nha khoa nhờ khả năng kích thích giải phóng Dopamine tạo cảm giác lâng lâng sảng khoái tức thì.

Tuy nhiên, lạm dụng bóng cười để giải trí là một hiểm họa khôn lường!
N₂O có tính oxy hóa mạnh, nó sẽ oxy hóa nguyên tử Coban trung tâm trong Vitamin B12, làm bất hoạt hoàn toàn loại vitamin sống còn này.

Thiếu hụt B12 khiến cơ thể không thể tổng hợp Myelin — lớp vỏ bọc bảo vệ các sợi dây thần kinh dẫn truyền ở tủy sống. Hậu quả là người dùng bị tê bì chân tay, mất thăng bằng và cuối cùng là tê liệt tủy sống vĩnh viễn!

📱 Nói không với bóng cười! Tra cứu cấu trúc các oxide nitơ tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #BongCuoi #N2O #CanhBaoSucKhoe #ThanKinh #HocHoaOnline`
  },
  {
    "id": 31,
    "title": "SỎI THẬN: PHẢN ỨNG KẾT TỦA CANXI OXALAT 🪨💧",
    "videoFile": "reel_31_soi_than_canxi_oxalat.mp4",
    "scheduleIso": "2026-09-20T11:45:00+07:00",
    "caption": `Những viên sỏi thận sắc nhọn như mảnh kính gây ra những cơn đau quặn thắt lưng thực chất được sinh ra từ phản ứng hóa học nào? 🪨⚡

Hơn 80% trường hợp sỏi thận hiện nay là sỏi Canxi Oxalat (CaC₂O₄).
Khi chúng ta ăn nhiều thực phẩm giàu oxalate như khế chua, rau bina, măng tây, sô-cô-la nhưng lại lười uống nước, nồng độ các ion trong nước tiểu sẽ cô đặc vượt ngưỡng bão hòa tích số tan:
👉 Ca²⁺ + C₂O₄²⁻ → CaC₂O₄ ↓

Các vi tinh thể canxi oxalat kết tủa lại thành những khối tinh thể đa diện có gai nhọn hoắt găm vào niêm mạc thận và niệu quản, gây cọ xát chảy máu và đau đớn dữ dội!

💡 Lời khuyên vàng: Uống đủ 2 đến 2.5 lít nước mỗi ngày chính là liều thuốc hòa loãng nồng độ ion, ngăn chặn kết tủa sỏi thận hiệu quả nhất!

📱 Tính toán nồng độ dung dịch và tích số tan tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SoiThan #CanxiOxalat #AxitOxalic #SucKhoeDoiSong #MayTinhHoaHoc`
  },
  {
    "id": 32,
    "title": "PARACETAMOL: CƠ CHẾ HẠ SỐT GIẢM ĐAU QUỐC DÂN 💊🌡️",
    "videoFile": "reel_32_paracetamol_ha_sot.mp4",
    "scheduleIso": "2026-09-20T19:45:00+07:00",
    "caption": `Chỉ một viên thuốc Paracetamol nhỏ bé có thể dập tắt cơn sốt hầm hập và xua tan cơn đau đầu chỉ sau 30 phút — Nó hoạt động như thế nào? 💊🌡️

Paracetamol (hay Acetaminophen) có công thức phân tử C₈H₉NO₂.
Khi cơ thể bị nhiễm khuẩn hoặc chấn thương, các tế bào miễn dịch kích hoạt enzyme Cyclooxygenase (COX), tổng hợp ra chất trung gian Prostaglandin E₂ (PGE₂). PGE₂ tác động lên vùng dưới đồi não bộ, thiết lập lại điểm điều nhiệt cơ thể lên mức 38 - 39°C gây sốt và truyền tín hiệu đau.

Paracetamol thấm qua hàng rào máu não, ức chế enzyme COX tại hệ thần kinh trung ương, chặn đứng việc sản sinh PGE₂. Điểm điều nhiệt lập tức hạ về mức 37°C bình thường, cơ thể dãn mạch ngoại vi và toát mồ hôi để tỏa nhiệt hạ sốt nhanh chóng!

📱 Tra cứu cấu trúc chuẩn IUPAC của các loại dược phẩm tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Paracetamol #HaSotGiamDau #DuocLyHoc #KienThucYKhoa #HocHoaDeNho`
  },
  {
    "id": 33,
    "title": "TÌNH YÊU SÉT ĐÁNH: BẢN GIAO HƯỞNG HÓA HỌC CỦA HORMONE ❤️⚡",
    "videoFile": "reel_33_tinh_yeu_hormone.mp4",
    "scheduleIso": "2026-09-21T11:45:00+07:00",
    "caption": `Cảm giác tim đập thình thịch, má ửng hồng và bồn chồn rạo rực khi chạm mắt người ấy — Thực chất là một cơn bão hóa chất trong não bộ! ❤️⚡

Khoa học thần kinh chứng minh: Tình yêu sét đánh là sự bùng nổ của 3 phân tử hóa học diệu kỳ:
1. Phenylethylamine (PEA): Một amin tự nhiên kích thích não bộ tiết ra các chất hưng phấn cực độ.
2. Dopamine (C₈H₁₁NO₂): Hormone tưởng thưởng tạo cảm giác say mê, phấn khích và khao khát được ở bên người ấy không rời!
3. Noradrenaline: Kích thích nhịp tim đập dồn dập, huyết áp tăng nhẹ và lòng bàn tay đổ mồ hôi.

Bản giao hưởng hóa chất này tạo nên cảm giác lâng lâng say đắm hệt như một phản ứng dây chuyền rực rỡ của tự nhiên!

📱 Khám phá công thức cấu tạo của dopamine và các chất dẫn truyền thần kinh tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #TinhYeu #Dopamine #Hormone #HoaHocCuocSong #KhoaHocThuVi`
  },
  {
    "id": 34,
    "title": "OXY GIÀ SỦI BỌT TRẮNG TRÊN VẾT THƯƠNG: HIỆN TƯỢNG GÌ? 🧴🫧",
    "videoFile": "reel_34_oxy_gia_sui_bot.mp4",
    "scheduleIso": "2026-09-21T19:45:00+07:00",
    "caption": `Nhỏ giọt oxy già lên vết trầy xước, bạn sẽ thấy bọt trắng sủi lên xèo xèo kèm cảm giác xót buốt — Đó là phản ứng gì? 🧴🫧

Nước oxy già trong y tế là dung dịch Hiđro peoxit (H₂O₂) nồng độ 3%.
Khi chạm vào vết thương hở, H₂O₂ tiếp xúc với máu và các tế bào bị tổn thương. Trong hồng cầu có chứa enzyme xúc tác cực mạnh mang tên Catalase.

Enzyme Catalase đẩy nhanh phản ứng phân hủy H₂O₂ với tốc độ hàng triệu phân tử mỗi giây:
👉 2 H₂O₂ (xúc tác Catalase) → 2 H₂O + O₂ ↑ (Sủi bọt trắng)

Khí oxy thoát ra cuồn cuộn tạo bọt đẩy sạch bụi bẩn, đất cát ra khỏi miệng vết thương, đồng thời oxy hóa tiêu diệt vi khuẩn kị khí nguy hiểm như trực khuẩn uốn ván!

📱 Cân bằng phản ứng oxi hóa khử và phân hủy oxy già tại:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #OxyGia #H2O2 #EnzymeCatalase #SatTrung #HoaHoc10`
  },
  {
    "id": 35,
    "title": "ADRENALINE: HORMONE BÙNG NỔ NĂNG LƯỢNG ⚡🏃",
    "videoFile": "reel_35_adrenaline_chay_nhay.mp4",
    "scheduleIso": "2026-09-22T11:45:00+07:00",
    "caption": `Tại sao khi bị chó đuổi hay gặp hỏa hoạn, con người có thể nhảy qua bức tường cao mà ngày thường không bao giờ làm được? ⚡🏃‍♂️

Đó là nhờ sức mạnh thần kỳ của hormone Adrenaline (hay Epinephrine - C₉H₁₃NO₃)!
Khi não bộ nhận diện mối nguy hiểm cận kề, tuyến thượng thận lập tức phóng thích ồ ạt Adrenaline vào dòng máu, kích hoạt cơ chế \"Chiến đấu hoặc bỏ chạy\" (Fight or Flight):

👉 Tim đập nhanh và mạnh hơn, dồn máu về các cơ bắp lớn.
👉 Phế quản dãn rộng để nạp tối đa oxy vào phổi.
👉 Gan lập tức phân giải kho dự trữ Glycogen thành Glucose, bơm năng lượng dồi dào cho cơ bắp bùng nổ sức mạnh tức thì!

Chính phản ứng hóa sinh cấp tốc này giúp con người tạo nên những kỳ tích thể lực phi thường trong khoảnh khắc sinh tử!

📱 Tra cứu cấu trúc phân tử Adrenaline tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Adrenaline #NangLuongBungNo #SinhHoa #CoTheConNguoi #KhoaHocThuVi`
  },
  {
    "id": 36,
    "title": "VÀNG DA TRẺ SƠ SINH: KỲ DIỆU CHIẾU ĐÈN ÁNH SÁNG XANH 👶💡",
    "videoFile": "reel_36_vang_da_chieu_den.mp4",
    "scheduleIso": "2026-09-22T19:45:00+07:00",
    "caption": `Tại sao nhiều em bé sơ sinh vừa chào đời bị vàng da, bác sĩ chỉ cần đặt bé nằm dưới một bóng đèn ánh sáng xanh là khỏi? 👶💡

Nguyên nhân gây vàng da là do sự tích tụ sắc tố mật Bilirubin khi gan trẻ sơ sinh chưa hoàn thiện chức năng đào thải. Bilirubin dạng tự nhiên (đồng phân 4Z,15Z) có đặc tính kị nước, không tan trong nước nên bị ứ đọng dưới mô mỡ da.

Khi chiếu ánh sáng xanh dương có bước sóng đặc hiệu khoảng 460 nanomet:
Photon ánh sáng hấp thụ vào phân tử Bilirubin, kích hoạt phản ứng quang đồng phân hóa (Photoisomerization). Liên kết nội phân tử bị bẻ gãy, chuyển Bilirubin thành các đồng phân quang học tan tốt trong nước (như Lumirubin)!

Nhờ đó, cơ thể em bé dễ dàng đào thải sắc tố mật qua nước tiểu và phân mà không cần gan xử lý, giúp bé hết vàng da hoàn toàn!

📱 Khám phá các phản ứng quang hóa và cấu trúc phân tử tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #VangDaSoSinh #Bilirubin #QuangHoa #YKhoaThucTien #HocHoaOnline`
  },
  {
    "id": 37,
    "title": "HÍT KHÍ HELI BIẾN ĐỔI GIỌNG NÓI THE THÉ: VÌ SAO? 🎈🦆",
    "videoFile": "reel_37_hit_heli_giong_the_the.mp4",
    "scheduleIso": "2026-09-23T11:45:00+07:00",
    "caption": `Chỉ cần hít một ngụm khí từ quả bóng bay Heli, giọng nói của bạn bỗng biến thành the thé như nhân vật hoạt hình vịt Donald! 🎈🦆

Nhiều người nghĩ Heli làm co thắt dây thanh quản, nhưng sự thật hoàn toàn là vật lý và hóa học sóng âm!
Heli (He) là khí trơ nhẹ thứ hai trong vũ trụ, nhẹ hơn không khí tới 6 lần (khối lượng phân tử của He chỉ là 4 so với 29 của không khí).

Vì mật độ phân tử Heli cực kỳ loãng, vận tốc truyền âm thanh trong khí Heli đạt tới 965 m/s — nhanh gần gấp 3 lần so với trong không khí (343 m/s)!
Khi bạn phát âm, sóng âm di chuyển qua khoang miệng chứa đầy khí Heli nhanh hơn nhiều, làm tần số cộng hưởng của thanh quản vọt lên rất cao, tạo nên âm vực the thé chói tai hài hước!

⚠️ Lưu ý: Tuyệt đối không hít khí Heli quá nhiều vì sẽ gây ngạt thở thiếu oxy cho não nhé!

📱 Khám phá bảng tuần hoàn 118 nguyên tố tại website chính thức:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #KhiHeli #Helium #AmThanh #BangTuanHoan #VatLyHoaHoc`
  },
  {
    "id": 38,
    "title": "THUỐC ĐỎ POVIDONE IODINE: VŨ KHÍ SÁT TRÙNG KINH ĐIỂN 🩸🩺",
    "videoFile": "reel_38_thuoc_do_povidone_iod.mp4",
    "scheduleIso": "2026-09-23T19:45:00+07:00",
    "caption": `Chai cồn đỏ Povidone Iodine luôn có mặt trong tủ thuốc mọi gia đình — Tại sao dung dịch màu nâu đỏ này lại sát trùng mạnh mẽ đến vậy? 🩸🩺

Thuốc sát trùng Povidone Iodine là phức chất polymer của Polyvinylpyrrolidone kết hợp với Iot phân tử (PVP-I₂).
Polymer đóng vai trò như một kho dự trữ, liên tục giải phóng từ từ các phân tử Iot (I₂) tự do ở nồng độ vừa đủ để diệt khuẩn mà không gây bỏng rát hay kích ứng da như cồn iod cổ điển.

Iot tự do là chất oxy hóa cực mạnh: Nó nhanh chóng thấm qua màng tế bào của vi khuẩn, nấm và virus, oxy hóa các nhóm thiol (-SH) và axit amin thiết yếu, làm biến tính protein và phá hủy DNA của mầm bệnh trong vòng 30 giây!
Đặc biệt, cơ chế tấn công vật lý - hóa học này khiến vi khuẩn không bao giờ phát triển được khả năng kháng thuốc!

📱 Tra cứu tính chất halogen của Iot và chất sát khuẩn tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #PovidoneIodine #SatTrung #Iot #YTeGiaDinh #HoaHoc10`
  },
{
    "id": 39,
    "title": "MƯA AXIT: THẢM HỌA ĂN MÒN RỪNG CÂY VÀ TƯỢNG ĐÁ 🌧️🌲",
    "videoFile": "reel_39_mua_axit_tan_pha.mp4",
    "scheduleIso": "2026-09-24T11:45:00+07:00",
    "caption": `Những cơn mưa tưởng như mát lành lại có thể thiêu rụi cả cánh rừng và làm tan chảy tượng đá cổ — Đó là hiện tượng gì? 🌧️🌲

Thủ phạm chính là Mưa Axit!
Khí lưu huỳnh đioxit (SO₂) và các oxit nitơ (NOₓ) thải ra từ các nhà máy nhiệt điện than và phương tiện giao thông. Khi bay lên tầng đối lưu, chúng gặp hơi nước và oxy, bị oxy hóa tạo thành axit sunfuric (H₂SO₄) và axit nitric (HNO₃):
👉 2 SO₂ + O₂ + 2 H₂O → 2 H₂SO₄

Nước mưa rơi xuống có độ pH thấp dưới 5.0 (thậm chí dưới 4.0), hòa tan lớp đá vôi canxi cacbonat (CaCO₃) của tượng đài cổ:
👉 CaCO₃ + H₂SO₄ → CaSO₄ + CO₂ ↑ + H₂O

Axit còn rửa trôi các khoáng chất dinh dưỡng trong đất, làm rễ cây bị đầu độc và biến những cánh rừng xanh tươi thành nghĩa địa cây khô!

📱 Kiểm tra độ pH nước mưa và dung dịch hóa học tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #MuaAxit #SO2 #MoiTruong #HoaHoc10 #BaoVeHanhTinh`
  },
  {
    "id": 40,
    "title": "HIỆU ỨNG NHÀ KÍNH: TẤM CHĂN GIỮ NHIỆT CỦA TRÁI ĐẤT 🌡️🌍",
    "videoFile": "reel_40_hieu_ung_nha_kinh.mp4",
    "scheduleIso": "2026-09-24T19:45:00+07:00",
    "caption": `Nếu không có hiệu ứng nhà kính, Trái Đất sẽ là một tảng băng chết âm 18°C — Nhưng vì sao hiện nay nó lại là thảm họa khí hậu? 🌡️🌍

Về bản chất tự nhiên, hiệu ứng nhà kính là chiếc chăn giữ nhiệt ấm áp cho Trái Đất!
Bề mặt Trái Đất sau khi hấp thụ ánh nắng sẽ phát xạ nhiệt ngược lại không gian dưới dạng tia hồng ngoại.

Các phân tử khí nhà kính như Cacbonic (CO₂) và Mêtan (CH₄) có các liên kết cộng hóa trị dao động uốn và dãn ở tần số trùng với bước sóng bức xạ hồng ngoại (~15 µm). Chúng hấp thụ năng lượng nhiệt này rồi phát xạ ngược trở lại mặt đất, giữ nhiệt độ trung bình toàn cầu ở mức lý tưởng +15°C.

Tuy nhiên, việc con người đốt quá nhiều than đá và dầu mỏ đã đẩy nồng độ CO₂ vượt mức 420 ppm — mức cao nhất trong 2 triệu năm qua, biến chiếc chăn ấm thành một lò nướng khổng lồ làm tan băng hai cực!

📱 Tra cứu cấu trúc không gian 3D của các phân tử khí tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #HieuUngNhaKinh #CO2 #BienDoiKhiHau #KhoaHocMoiTruong #HocHoaOnline`
  },
  {
    "id": 41,
    "title": "TẦNG OZON: LÁ CHẮN TIA CỰC TÍM CỨU SỐNG SINH QUYỂN 🛡️☀️",
    "videoFile": "reel_41_tang_ozon_o3.mp4",
    "scheduleIso": "2026-09-25T11:45:00+07:00",
    "caption": `Bầu trời cách mặt đất 20 km có một tấm khiên vô hình mỏng manh — Nếu nó biến mất, sự sống trên cạn sẽ bị thiêu rụi! 🛡️☀️

Đó chính là Tầng Ozon (O₃) nằm ở tầng bình lưu!
Khác với phân tử oxy (O₂) thông thường, Ozon (O₃) gồm 3 nguyên tử oxy liên kết góc 116.8°. Cấu trúc này hấp thụ cực mạnh các photon ánh sáng tia cực tím UV-B có năng lượng cao từ Mặt Trời:
👉 O₃ + Tia UV-B → O₂ + O

Nhờ phản ứng này, tầng ozon lọc sạch tới 99% tia cực tím độc hại, bảo vệ DNA của con người khỏi ung thư da và bảo vệ sinh quyển Trái Đất.

Trước đây, con người sử dụng khí CFC (như Freon trong tủ lạnh). Khí này bay lên tầng bình lưu bị tia cực tím bẻ gãy giải phóng gốc Clo tự do (Cl•). Mỗi nguyên tử Clo có thể kích hoạt phản ứng dây chuyền phá hủy tới 100.000 phân tử Ozon gây ra lỗ thủng tầng ozon kinh hoàng!

📱 Khám phá cấu trúc các dạng thù hình của oxy tại:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #TangOzon #Ozon #O3 #TiaCucTim #KhoaHocVuTru #HoaHoc10`
  },
  {
    "id": 42,
    "title": "ĐOM ĐÓM PHÁT SÁNG: KỲ QUAN PHÁT QUANG SINH HỌC ✨🦗",
    "videoFile": "reel_42_dom_dom_phat_quang.mp4",
    "scheduleIso": "2026-09-25T19:45:00+07:00",
    "caption": `Những chú đom đóm lập lòe ánh sáng xanh ngọc trong đêm hè mà không hề bị nóng hay bỏng rát — Bí mật là gì? ✨🦗

Đó là hiện tượng Phát Quang Sinh Học (Bioluminescence) với hiệu suất chuyển hóa năng lượng đạt mức 100% hoàn hảo nhất tự nhiên!
Các bóng đèn điện thông thường chỉ chuyển 10-20% điện năng thành ánh sáng, còn lại bị thất thoát thành nhiệt. Nhưng đom đóm tạo ra \"ánh sáng lạnh\" hoàn toàn không tỏa nhiệt:

👉 Hợp chất Luciferin kết hợp với oxy (O₂) dưới sự xúc tác của enzym Luciferase và phân tử mang năng lượng ATP.
👉 Phản ứng sinh hóa tạo thành Oxyluciferin ở trạng thái kích thích điện tử.
👉 Khi trở về trạng thái cơ bản, nó giải phóng toàn bộ năng lượng dưới dạng các hạt photon ánh sáng xanh vàng lung linh!

📱 Khám phá các phản ứng sinh hóa phát quang kỳ diệu tại:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #DomDom #PhatQuangSinhHoc #Luciferin #KyQuanTuNhien #SinhHoa`
  },
  {
    "id": 43,
    "title": "MA TRƠI TRÊN NGHĨA ĐỊA: BẢN CHẤT TỰ CHÁY CỦA PHOTPHIN 👻🔥",
    "videoFile": "reel_43_ma_troi_photphin.mp4",
    "scheduleIso": "2026-09-26T11:45:00+07:00",
    "caption": `Những ngọn lửa xanh ma mị lập lòe trôi nổi trên các khu nghĩa địa lúc nửa đêm — Ma trơi có thật không? 👻🔥

Hoàn toàn không có yếu tố tâm linh nào ở đây — Đó là phản ứng hóa học tự nhiên 100%!
Xương cốt của con người và động vật chứa một lượng lớn nguyên tố Photpho ở dạng muối canxi photphat Ca₃(PO₄)₂.
Khi chôn cất dưới lòng đất ẩm và thiếu oxy, vi khuẩn phân hủy chất hữu cơ sinh ra hỗn hợp khí Photphin (PH₃) và Điphotphin (P₂H₄).

Khí này len lỏi qua các kẽ đất thoát lên mặt đất. Điphotphin (P₂H₄) là chất cực kỳ kém bền, nó tự bốc cháy ngay lập tức khi tiếp xúc với oxy không khí ở nhiệt độ phòng:
👉 2 P₂H₄ + 7 O₂ → 2 P₂O₅ + 4 H₂O

Ngọn lửa P₂H₄ châm ngòi cho khí PH₃ cháy theo với ánh sáng xanh lơ mờ ảo. Khi thấy ngọn lửa, người sợ hãi bỏ chạy tạo ra luồng gió hút khí bay theo, khiến người ta tưởng rằng ngọn lửa ma trơi đang đuổi theo mình!

📱 Khám phá tính chất hóa học của nguyên tố Photpho tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #MaTroi #Photphin #PH3 #GiaiMaHienTuong #HoaHoc11 #KhoaHocVui`
  },
  {
    "id": 44,
    "title": "BĂNG CHÁY ĐÁY ĐẠI DƯƠNG: NGUỒN NĂNG LƯỢNG KHỔNG LỒ 🧊🔥",
    "videoFile": "reel_44_bang_chay_methane.mp4",
    "scheduleIso": "2026-09-26T19:45:00+07:00",
    "caption": `Một tảng băng trắng muốt lấy từ đáy biển sâu, khi châm lửa lại bốc cháy rừng rực như ngọn đuốc — Băng làm sao có thể cháy? 🧊🔥

Thực chất đó không phải băng nước đá thông thường, mà là Băng Cháy (Methane Hydrate - CH₄ · 5.75 H₂O)!
Ở đáy đại dương sâu từ 500 đến 3.000 mét, nơi nhiệt độ chỉ khoảng 2 - 4°C và áp suất nước biển lên tới hàng trăm atmosphere:
Các phân tử nước kết tinh thành mạng lưới lồng tinh thể hình đa diện rỗng (Clathrate), nhốt chặt phân tử khí Mêtan (CH₄) vào bên trong.

Mỗi 1 mét khối băng cháy có thể giải phóng tới 164 mét khối khí mêtan nguyên chất!
Khi đưa lên bờ, áp suất giảm làm lồng băng tan chảy giải phóng khí mêtan bốc cháy dữ dội:
👉 CH₄ + 2 O₂ → CO₂ ↑ + 2 H₂O + Tỏa nhiệt lượng cực lớn!

Trữ lượng băng cháy dưới đáy biển ước tính gấp đôi toàn bộ trữ lượng than đá, dầu mỏ và khí đốt trên Trái Đất cộng lại!

📱 Xem cấu trúc 3D của phân tử mêtan tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #BangChay #MethaneHydrate #NangLuongTuongLai #HoaHoc11 #DiaChat`
  },
  {
    "id": 45,
    "title": "MÙI ĐẤT SAU CƠN MƯA: MÙI HƯƠNG KỲ DIỆU GEOSMIN 🌧️🌱",
    "videoFile": "reel_45_mui_dat_sau_mua.mp4",
    "scheduleIso": "2026-09-27T11:45:00+07:00",
    "caption": `Tại sao khi cơn mưa rào đầu mùa đổ xuống mảnh đất khô cằn, ta lại ngửi thấy mùi đất ngai ngái ngọt lành vô cùng khoan khoái? 🌧️🌱

Mùi hương dễ chịu này có tên khoa học là Petrichor!
Thủ phạm tạo nên mùi hương chính là hợp chất hữu cơ Geosmin (C₁₂H₂₂O) do các vi khuẩn xạ khuẩn (Actinomyces) sống trong đất màu mỡ tiết ra.

Khi giọt mưa rơi xuống bề mặt đất xốp, nó bẫy những túi khí siêu nhỏ bên dưới. Bọt khí này nhanh chóng bắn vọt lên không trung mang theo các phân tử Geosmin khuếch tán thành làn sương aerosol mỏng manh.

Điều kỳ diệu là khứu giác con người cực kỳ nhạy cảm với Geosmin: Chúng ta có thể phát hiện mùi này ở nồng độ cực nhỏ chỉ 5 phần nghìn tỷ (5 ppt) — nhạy hơn cả khả năng đánh hơi máu của cá mập!

📱 Tra cứu các hợp chất hữu cơ thiên nhiên tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #MuiDatSauMua #Geosmin #Petrichor #KhoaHocThuVi #HoaHocHuuCo`
  },
  {
    "id": 46,
    "title": "THẠCH NHŨ HANG ĐỘNG: KIỆT TÁC CÂN BẰNG HÓA HỌC ⛰️💧",
    "videoFile": "reel_46_thach_nhu_hang_dong.mp4",
    "scheduleIso": "2026-09-27T19:45:00+07:00",
    "caption": `Những cột thạch nhũ tráng lệ trong hang Sơn Đoòng hay vịnh Hạ Long lung linh như cung điện được kiến tạo như thế nào? ⛰️✨

Đó là kiệt tác của phản ứng hóa học hai chiều thuận nghịch diễn ra bền bỉ suốt hàng triệu năm!
1. Phản ứng thuận (Hòa tan đá vôi tạo hang động):
Nước mưa hấp thụ khí CO₂ trong không khí trở thành dung dịch axit cacbonic nhẹ, len lỏi qua các khe nứt hòa tan đá vôi Canxi cacbonat (CaCO₃) thành Canxi bicacbonat Ca(HCO₃)₂ tan trong nước:
👉 CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂

2. Phản ứng nghịch (Tái kết tủa tạo thạch nhũ):
Dung dịch chảy đến trần hang động, khi từng giọt nước nhỏ xuống, áp suất giảm và khí CO₂ thoát ra ngoài. Phản ứng đảo chiều khiến muối Canxi cacbonat kết tủa trở lại:
👉 Ca(HCO₃)₂ → CaCO₃ ↓ + CO₂ ↑ + H₂O

Từng phân tử CaCO₃ tích tụ qua hàng trăm năm mới bồi đắp nên 1 cm thạch nhũ rực rỡ!

📱 Cân bằng phản ứng thuận nghịch đá vôi tại website chính thức:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #ThachNhu #HangDong #SonDoong #DaVoi #CanBangHoaHoc #HoaHoc11`
  },
  {
    "id": 47,
    "title": "ĐẤT ĐỎ BAZAN: MÀU MỠ NHỜ KHOÁNG CHẤT SẮT 🌋☕",
    "videoFile": "reel_47_tro_nui_lua_do.mp4",
    "scheduleIso": "2026-09-28T11:45:00+07:00",
    "caption": `Tại sao đất đỏ bazan ở Tây Nguyên lại màu mỡ phì nhiêu đến vậy, trồng cà phê và cao su tốt tươi số 1 cả nước? 🌋☕

Hàng triệu năm trước, dung nham núi lửa phun trào và nguội đi tạo thành lớp đá macma bazan giàu khoáng chất.
Màu đỏ nâu đặc trưng của đất bazan đến từ hàm lượng cao của khoáng chất Sắt(III) Oxit (Fe₂O₃) và Nhôm Oxit (Al₂O₃) hình thành qua quá trình phong hóa feralit hóa.

Quá trình phân hủy tự nhiên của đá bazan liên tục giải phóng các nguyên tố dinh dưỡng vi lượng và đa lượng sống còn: Sắt (Fe), Magie (Mg), Kali (K), Canxi (Ca) và Photpho (P). Lớp đất có độ xốp cao, giữ nước và thoáng khí hoàn hảo giúp bộ rễ cây công nghiệp phát triển vượt bậc!

📱 Khám phá các hợp chất của Sắt và kim loại tại website chính thức:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #DatDoBazan #TayNguyen #Fe2O3 #KhoangChat #NongNghiep #HoaHoc12`
  },
  {
    "id": 48,
    "title": "TẠI SAO NƯỚC BIỂN CÓ VỊ MẶN CHÁT? 🌊🧂",
    "videoFile": "reel_48_nuoc_bien_vi_man.mp4",
    "scheduleIso": "2026-09-28T19:45:00+07:00",
    "caption": `Tất cả các dòng sông nước ngọt đều đổ ra biển lớn — Nhưng tại sao nước biển lại mặn chát đến mức không thể uống? 🌊🧂

Hành trình tích tụ muối của đại dương đã kéo dài hơn 3.8 tỷ năm!
Nước mưa khi rơi qua bầu khí quyển hòa tan khí CO₂ tạo thành axit yếu. Khi chảy qua bề mặt lục địa, dòng nước axit này bào mòn đá tảng, bóc tách các ion khoáng như Natri (Na⁺), Magie (Mg²⁺), Canxi (Ca²⁺) và cuốn trôi chúng theo các dòng sông đổ ra biển.

Đồng thời, các miệng núi lửa dưới đáy biển phun trào giải phóng một lượng khổng lồ ion Clorua (Cl⁻). Hai ion này gặp nhau tạo thành muối Natri Clorua (NaCl):
👉 Na⁺ + Cl⁻ ⇌ NaCl

Trong chu trình tuần hoàn, nước đại dương bốc hơi lên trời để tạo thành mây và mưa ngọt, nhưng TOÀN BỘ MUỐI ĐƯỢC GIỮ LẠI. Sau hàng tỷ năm tích tụ, độ mặn trung bình của biển đạt 35‰ (mỗi lít nước chứa 35 gam muối)!

📱 Tính toán nồng độ dung dịch muối tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #NuocBien #MuoiAn #NaCl #DaiDuong #DiaLyHoaHoc #HocHoaOnline`
  },
  {
    "id": 49,
    "title": "CÂY XANH NHẢ OXY: BÍ MẬT DIỆP LỤC CHỨA MAGIE 🍃☀️",
    "videoFile": "reel_49_quang_hop_clorophin.mp4",
    "scheduleIso": "2026-09-29T11:45:00+07:00",
    "caption": `Một chiếc lá nhỏ bé hấp thụ ánh nắng mặt trời và nước để tạo ra dòng khí oxy nuôi sống muôn loài ra sao? 🍃☀️

Trái tim của cỗ máy quang hợp chính là sắc tố Diệp Lục (Chlorophyll)!
Cấu trúc phân tử diệp lục là một vòng porphyrin khổng lồ, ở chính giữa trung tâm là ion Magie (Mg²⁺) liên kết phối trí với 4 nguyên tử nitơ.

Ion Magie đóng vai trò như một ăng-ten siêu nhạy, hấp thụ trọn vẹn năng lượng từ các photon ánh sáng đỏ và xanh lam (phản chiếu ánh sáng xanh lục tạo nên màu xanh của lá).
Năng lượng này kích hoạt phản ứng quang phân ly nước:
👉 2 H₂O (Quang phân ly) → O₂ ↑ + 4 H⁺ + 4 e⁻

Toàn bộ lượng khí oxy nuôi dưỡng bầu khí quyển Trái Đất thực chất được tách ra từ chính phân tử NƯỚC, đồng thời chuyển hóa CO₂ thành tinh bột nuôi sống cây trồng!

📱 Cân bằng phương trình quang hợp tự động tại website chính thức:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #QuangHop #DiepLuc #Magie #Oxy #SinhHoc11 #HoaHocXanh`
  },
  {
    "id": 50,
    "title": "SẤM SÉT TẠO PHÂN ĐẠM: TRỜI CHO MÙA MÀNG TỐT TƯƠI ⚡🌾",
    "videoFile": "reel_50_sam_set_phan_dam.mp4",
    "scheduleIso": "2026-09-29T19:45:00+07:00",
    "caption": `Dân gian có câu: \"Lúa chiêm lấp ló đầu bờ, hễ nghe tiếng sấm phất cờ mà lên\" — Tiếng sấm thì giúp ích gì cho cây lúa? ⚡🌾

Khí Nitơ (N₂) chiếm tới 78% bầu khí quyển, nhưng phân tử N₂ có liên kết ba cực kỳ bền vững (N≡N) nên rễ cây không thể tự hấp thụ được.

Khi có cơn giông, tia sét phóng điện tạo nhiệt độ cục bộ lên tới 3.000°C!
Nhiệt độ này bẻ gãy liên kết ba bền vững, ép Nitơ phản ứng với Oxy:
👉 N₂ + O₂ (Tia sét 3000°C) → 2 NO
👉 2 NO + O₂ → 2 NO₂ (Khí màu nâu đỏ)

Khí NO₂ tiếp tục hòa tan trong nước mưa tạo thành dung dịch Axit Nitric (HNO₃):
👉 4 NO₂ + O₂ + 2 H₂O → 4 HNO₃

Khi rơi xuống đất, axit phản ứng với khoáng chất kiềm tạo thành muối Đạm Nitrat (NO₃⁻) — nguồn phân đạm dinh dưỡng thiên nhiên vô giá giúp lúa tốt bời bời!

📱 Khám phá chuỗi phản ứng của Nitơ tại website chính thức:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SamSetTaoDam #PhanDam #Nito #NongNghiep #HoaHoc11`
  },
  {
    "id": 51,
    "title": "BONG BÓNG BĂNG METAN: KỲ QUAN ĐẸP NGUY HIỂM 🫧❄️",
    "videoFile": "reel_51_bong_bong_bang_metan.mp4",
    "scheduleIso": "2026-09-30T11:45:00+07:00",
    "caption": `Những chuỗi bong bóng trắng muốt xếp tầng tầng lớp lớp đông cứng dưới mặt hồ băng đẹp như tranh vẽ — Nhưng chớ dại châm lửa! 🫧❄️

Đây là hiện tượng kỳ quan thiên nhiên tại hồ Abraham (Canada) và hồ Baikal (Nga).
Dưới đáy hồ, các vi khuẩn kị khí liên tục phân hủy lá cây, rong rêu và xác động vật, giải phóng một lượng khổng lồ khí Mêtan (CH₄).

Vào mùa đông, khi mặt hồ đóng băng từ trên xuống dưới, các bong bóng khí mêtan nổi lên bị mắc kẹt lại dưới lớp băng trong suốt. Khi nhiệt độ tiếp tục hạ thấp, các bọt khí này bị đóng băng thành từng chuỗi đa tầng tuyệt đẹp.

Khí mêtan (CH₄) là chất khí cực kỳ dễ bắt lửa! Nếu dùng khoan đục một lỗ nhỏ trên mặt băng rồi châm que diêm, khí mêtan nén sẽ phụt lên và bùng cháy thành cột lửa xanh rực rỡ trên mặt băng lạnh giá!

📱 Tra cứu cấu trúc các hydrocacbon tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #BongBongBang #Metan #CH4 #KyQuanThienNhien #DiaChat #HoaHoc11`
  },
  {
    "id": 52,
    "title": "BIỂN CHẾT: VÌ SAO NGƯỜI NẰM ĐỌC SÁCH NỔI BỀNH BỒNG? 🌊📖",
    "videoFile": "reel_52_bien_chet_noi_bong_benh.mp4",
    "scheduleIso": "2026-09-30T19:45:00+07:00",
    "caption": `Tại Biển Chết, dù bạn hoàn toàn không biết bơi cũng không bao giờ bị chìm — Thậm chí có thể thảnh thơi nằm đọc báo trên mặt nước! 🌊📖

Bí mật nằm ở Định luật Vạn vật Nổi và lực đẩy Ác-si-mét!
Độ mặn của Biển Chết đạt tới 34.2% — gấp 10 lần độ mặn nước biển thông thường. Nồng độ muối khoáng bão hòa cao đến mức không một loài cá hay thực vật thủy sinh nào có thể sống sót (nên mới gọi là Biển Chết).

Do hòa tan một lượng muối khổng lồ (chủ yếu là NaCl, MgCl₂, CaCl₂), khối lượng riêng của nước Biển Chết đạt tới:
👉 D(nước Biển Chết) ≈ 1.24 g/cm³

Trong khi đó, khối lượng riêng trung bình của cơ thể con người chỉ là:
👉 D(cơ thể) ≈ 0.985 - 1.0 g/cm³

Vì D(nước) lớn hơn D(người) rất nhiều, lực đẩy Ác-si-mét nâng bổng cơ thể lên khỏi mặt nước. Trọng lượng cơ thể không đủ sức kéo bạn chìm xuống đáy!

📱 Tính toán khối lượng riêng và nồng độ dung dịch tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #BienChet #LucDayAcSiMet #KhoiLuongRieng #VatLyHoaHoc #HocHoaOnline`
  },
{
    "id": 53,
    "title": "SAO HỎA: HÀNH TINH ĐỎ BỊ RỈ SÉT BAO PHỦ 🔴🪐",
    "videoFile": "reel_53_sao_hoa_do_ri_set.mp4",
    "scheduleIso": "2026-10-01T11:45:00+07:00",
    "caption": `Nhìn lên bầu trời đêm, Sao Hỏa tỏa ra ánh sáng đỏ cam rực rỡ kỳ ảo — Tại sao hành tinh này lại có màu đỏ? 🔴🪐

Câu trả lời dưới góc nhìn hóa học: Toàn bộ Sao Hỏa thực chất bị \"rỉ sét\" bao phủ!
Hàng tỷ năm trước, lõi và bề mặt Sao Hỏa chứa hàm lượng khoáng sắt (Fe) cực kỳ dồi dào. Khi nước lỏng và khí quyển oxy cổ đại tác động, các khoáng sắt bị oxy hóa mạnh mẽ:
👉 4 Fe + 3 O₂ → 2 Fe₂O₃ (Sắt(III) Oxit - chất rỉ sét màu đỏ cam)

Lớp bụi rỉ sét hematit mịn màng này bao phủ toàn bộ lục địa. Những cơn bão bụi khổng lồ trên Sao Hỏa thường xuyên cuốn hàng triệu tấn bụi sắt bay lên không trung, nhuốm màu đỏ cam rực rỡ cho toàn bộ bầu trời hành tinh này!

📱 Khám phá các hợp chất của Sắt và kim loại tại website chính thức:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SaoHoa #Fe2O3 #RiSet #KhoaHocVuTru #HeMatTroi`
  },
  {
    "id": 54,
    "title": "PIN LITHIUM-ION: TRÁI TIM XE ĐIỆN VÀ SMARTPHONE 🔋🚗",
    "videoFile": "reel_54_pin_lithium_ion.mp4",
    "scheduleIso": "2026-10-01T19:45:00+07:00",
    "caption": `Từ chiếc smartphone trên tay đến những chiếc xe điện lướt êm ái trên đường — Tất cả đều vận hành nhờ một nguyên tố kỳ diệu! 🔋⚡

Đó chính là Lithium (Li) — nguyên tố kim loại nhẹ nhất trong bảng tuần hoàn!
Nhờ khối lượng nguyên tử cực nhỏ (M = 6.94) và thế điện cực chuẩn âm nhất (-3.04V), pin Lithium-ion có thể lưu trữ mật độ năng lượng khổng lồ trên một trọng lượng siêu nhẹ:

Cơ chế \"ghế bập bênh / con thoi\" (Rocking-chair):
👉 Khi sạc: Các ion Li⁺ tách khỏi cực catot (LiCoO₂) chạy qua dung dịch điện phân chui vào kẽ mạng tinh thể than chì cực anot (Li_x C₆).
👉 Khi xả: Ion Li⁺ chạy ngược lại về catot, giải phóng dòng electron chạy qua mạch ngoài thắp sáng màn hình điện thoại hay quay động cơ xe điện!

📱 Tính toán thế điện cực và phản ứng điện hóa tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #PinLithium #XeDien #LithiumIon #CongNgheTuongLai #HoaHoc12`
  },
  {
    "id": 55,
    "title": "SAO KIM: MƯA AXIT SUNFURIC TRÊN ĐỊA NGỤC 465°C 🌧️🌋",
    "videoFile": "reel_55_mua_axit_sao_kim.mp4",
    "scheduleIso": "2026-10-02T11:45:00+07:00",
    "caption": `Sao Kim sáng nhất bầu trời đêm như một viên ngọc — Nhưng bên dưới lớp mây lại là địa ngục khắc nghiệt bậc nhất Hệ Mặt Trời! 🌧️🌋

Nhiệt độ bề mặt Sao Kim lên tới 465°C (đủ làm tan chảy chì) do hiệu ứng nhà kính cực đoan của bầu khí quyển chứa 96.5% CO₂ và áp suất gấp 92 lần Trái Đất.
Chưa hết, bầu trời Sao Kim bao phủ bởi những tầng mây dày 20 km chứa toàn axit sunfuric đậm đặc (H₂SO₄)!

Những cơn mưa axit sunfuric liên tục trút xuống từ các tầng mây. Tuy nhiên, một nghịch lý kỳ ảo xảy ra:
Do bề mặt quá nóng, các giọt axit sunfuric bốc hơi ngược trở lại thành khí SO₃ và hơi nước ở độ cao 25 km trước khi kịp chạm đất! Chu trình tuần hoàn axit vĩnh cửu này biến Sao Kim thành một nồi hơi axit khổng lồ!

📱 Đo độ pH và tính chất của axit sunfuric tại:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SaoKim #H2SO4 #AxitSunfuric #VuTruKyBi #HoaHoc10`
  },
  {
    "id": 56,
    "title": "GRAPHENE: VẬT LIỆU MỎNG NHẤT CỨNG GẤP 200 LẦN THÉP 🛡️💎",
    "videoFile": "reel_56_graphene_sieu_vat_lieu.mp4",
    "scheduleIso": "2026-10-02T19:45:00+07:00",
    "caption": `Một tấm vật liệu mỏng đến mức trong suốt vô hình, nhưng có thể chịu được sức nặng của cả một con voi trưởng thành! 🛡️🐘

Đó chính là Siêu vật liệu Graphene — giải Nobel Vật lý năm 2010!
Graphene thực chất là một lớp đơn nguyên tử Carbon sắp xếp thành mạng lưới hình tổ ong 2 chiều, với độ dày chỉ 0.335 nanomet (mỏng hơn sợi tóc 300.000 lần).

Nhờ các liên kết cộng hóa trị lai hóa sp² cực ngắn và bền vững:
👉 Graphene cứng gấp 200 lần thép kết cấu!
👉 Dẫn điện nhanh hơn đồng 100 lần và dẫn nhiệt tốt hơn kim cương!
Nếu dùng một tấm màng bọc graphene mỏng như túi nilon, bạn có thể đặt một con voi đứng lên đầu một mũi kim nhọn đè lên mà không làm thủng được tấm màng!

📱 Khám phá các dạng thù hình của Carbon tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Graphene #VatLieuTuongLai #Cacbon #CongNgheNano #HoaHoc11`
  },
  {
    "id": 57,
    "title": "MẶT TRỜI TỎA SÁNG: PHẢN ỨNG NHIỆT HẠCH HẠT NHÂN ☀️🔥",
    "videoFile": "reel_57_mat_troi_nhiet_hach.mp4",
    "scheduleIso": "2026-10-03T11:45:00+07:00",
    "caption": `Mặt Trời không hề có oxy nhưng lại bốc cháy rực rỡ suốt 4.6 tỷ năm qua để nuôi dưỡng sự sống Trái Đất — Nguồn năng lượng đó từ đâu? ☀️🔥

Mặt Trời không cháy bằng phản ứng hóa học thông thường, mà là một lò phản ứng Nhiệt Hạch (Nuclear Fusion) vĩ đại!
Tại vùng lõi có nhiệt độ 15 triệu độ C và áp suất 250 tỷ atmosphere:
Các hạt nhân Hydro (¹H) bị nén chặt vượt qua lực đẩy tĩnh điện Coulomb, hợp hạch lại thành hạt nhân nguyên tố Heli (⁴He):
👉 4 ¹H → ⁴He + 2 e⁺ + 2 ν_e + Năng lượng khổng lồ!

Khối lượng của hạt nhân Heli tạo thành nhỏ hơn tổng khối lượng của 4 hạt Hydro ban đầu một chút. Lượng khối lượng hao hụt này (Δm) biến đổi thành năng lượng phát xạ theo phương trình nổi tiếng của Einstein: E = mc²!
Mỗi giây, Mặt Trời chuyển hóa 4 triệu tấn vật chất thành năng lượng ánh sáng tỏa khắp không gian!

📱 Khám phá nguyên tố Hydro và Heli tại website chính thức:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #MatTroi #NhietHach #Helium #Hydrogen #VatLyHoaHoc #VuTru`
  },
  {
    "id": 58,
    "title": "KÍNH JAMES WEBB MẠ VÀNG: MẮT THẦN DÒ TÌM VŨ TRỤ 🛰️✨",
    "videoFile": "reel_58_kinh_james_webb_ma_vang.mp4",
    "scheduleIso": "2026-10-03T19:45:00+07:00",
    "caption": `Kính thiên văn không gian trị giá 10 tỷ đô James Webb được trang bị 18 tấm gương lục giác mạ vàng chói lọi — Tại sao phải dùng Vàng? 🛰️✨

Các thiên hà cổ xưa nhất cách chúng ta hơn 13 tỷ năm ánh sáng. Do vũ trụ dãn nở, ánh sáng khả kiến của chúng bị kéo dãn bước sóng dịch chuyển đỏ thành tia hồng ngoại (Infrared).

Vàng (Au) là kim loại có cấu trúc đám mây electron phản xạ tia hồng ngoại tốt nhất vũ trụ — đạt hiệu suất lên tới 98.2% (vượt trội hơn hẳn bạc hay nhôm)!
Hơn nữa, vàng là kim loại trơ bậc nhất, hoàn toàn không bị oxy hóa hay biến tính trong chân không vũ trụ.

Điều đáng kinh ngạc: Lớp mạ vàng trên 18 tấm gương khổng lồ chỉ dày đúng 100 nanomet. Toàn bộ cỗ kính thiên văn 10 tỷ đô chỉ tiêu tốn đúng 4.8 gam vàng ròng (bằng một chiếc nhẫn cưới nhỏ)!

📱 Khám phá bảng tuần hoàn và tính chất nguyên tố Vàng tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #JamesWebb #KinhThienVan #Vang #Au #KhoaHocKhongGian #NASA`
  },
  {
    "id": 59,
    "title": "VÌ SAO SAO BĂNG BỐC CHÁY SÁNG RỰC TRÊN BẦU TRỜI? 🌠✨",
    "videoFile": "reel_59_sao_bang_chay_sang.mp4",
    "scheduleIso": "2026-10-04T11:45:00+07:00",
    "caption": `Một vệt sáng rạch ngang bầu trời đêm khiến triệu người ước nguyện — Bản chất khoa học của sao băng là gì? 🌠✨

Hầu hết sao băng không phải là những tảng đá khổng lồ, mà chỉ là những hạt bụi sao chổi bé li ti như hạt cát lao vào bầu khí quyển Trái Đất với tốc độ kinh hoàng: từ 11 đến 72 km/giây!

Ở vận tốc siêu âm này, không khí phía trước mảnh thiên thạch bị nén cực nhanh (nén khí động học). Áp suất nén sinh ra nhiệt độ cục bộ lên tới 1.600°C, làm bốc hơi mảnh bụi và ion hóa không khí xung quanh thành cột plasma sáng lóa!

Màu sắc của sao băng phản ánh chính xác các nguyên tố kim loại trong thiên thạch:
🟢 Xanh lục: Chứa Niken (Ni) hoặc Magie (Mg)
🟡 Vàng cam: Chứa Natri (Na)
🔵 Xanh lơ / Tím: Ion hóa Nitơ và Oxy trong khí quyển!

📱 Thử màu ngọn lửa và quang phổ kim loại tại website:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SaoBang #ThienThach #QuangPho #MauNgonLua #HocHoaOnline`
  },
  {
    "id": 60,
    "title": "HIỆN TƯỢNG SIÊU DẪN: TRUYỀN TẢI ĐIỆN KHÔNG TIÊU HAO ⚡🧲",
    "videoFile": "reel_60_sieu_dan_nhiet_do_phong.mp4",
    "scheduleIso": "2026-10-04T19:45:00+07:00",
    "caption": `Nếu dòng điện chạy mãi trong một sợi dây suốt 1.000 năm mà không hao hụt một milioat nào — Siêu dẫn sẽ thay đổi thế giới ra sao? ⚡🧲

Ở vật liệu dẫn điện thông thường (như đồng hay nhôm), electron chuyển động va chạm với các ion trong mạng tinh thể tạo ra điện trở (R), làm hao phí hàng tỷ đô la điện năng dưới dạng nhiệt tỏa ra dây dẫn.

Khi làm lạnh vật liệu siêu dẫn xuống nhiệt độ cực thấp:
Các electron liên kết lại thành \"Cặp Cooper\". Chúng chuyển động đồng bộ như một vũ điệu nhịp nhàng lướt qua mạng tinh thể mà HOÀN TOÀN KHÔNG BỊ VA CHẠM. Điện trở của vật liệu rơi thẳng về con số 0 tròn trĩnh (R = 0)!

Vật liệu siêu dẫn còn đẩy trọn vẹn mọi đường sức từ trường ra khỏi lòng nó (Hiệu ứng Meissner), giúp nam châm lơ lửng bồng bềnh trong không trung — ứng dụng cho tàu đệm từ Maglev chạy 600 km/h không ma sát!

📱 Tra cứu dãy điện hóa và tính chất dẫn điện tại:
🌐 https://ph-chem.web.app/electro
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #SieuDan #DienTro0 #TauDemTu #VatLieuMoi #VatLyHoaHoc`
  },
  {
    "id": 61,
    "title": "TITAN: KIM LOẠI CỦA VŨ TRỤ VÀ CẤY GHÉP Y HỌC ✈️🦴",
    "videoFile": "reel_61_titan_kim_loai_tuong_lai.mp4",
    "scheduleIso": "2026-10-05T11:45:00+07:00",
    "caption": `Kim loại nào vừa dùng làm vỏ tàu vũ trụ siêu thanh, vừa được cấy thẳng vào xương người mà không bao giờ bị đào thải? ✈️🦴

Đó chính là Titan (Ti - Nguyên tố số 22)!
Titan sở hữu tỷ số sức bền trên khối lượng vô địch: Cứng chắc như thép carbon cao cấp nhưng trọng lượng lại nhẹ hơn tới 45%! Titan chịu được nhiệt độ từ âm 250°C đến dương 600°C mà không bị biến dạng.

Điều kỳ diệu nhất của Titan là tính tương thích sinh học (Biocompatibility):
Ngay khi tiếp xúc với không khí hay dịch cơ thể, bề mặt Titan lập tức tạo ra lớp màng bảo vệ Titan đioxit (TiO₂) siêu trơ. Lớp màng này ngăn chặn hoàn toàn việc rỉ sét và không gây phản ứng miễn dịch. Các tế bào xương người có thể mọc bám chặt trực tiếp vào bề mặt kim loại Titan (hiện tượng Osseointegration)!

📱 Tra cứu nguyên tố Titan trong bảng tuần hoàn tương tác tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Titan #KimLoaiVuTru #CayGhepImplant #BangTuanHoan #HoaHoc12`
  },
  {
    "id": 62,
    "title": "KHÍ HIẾM NEON: ÁNH SÁNG ĐỎ CAM BẤT TẬN 💡🌃",
    "videoFile": "reel_62_khi_hiem_neon_den_quang_cao.mp4",
    "scheduleIso": "2026-10-05T19:45:00+07:00",
    "caption": `Những biển quảng cáo neon rực rỡ sắc màu thắp sáng các đại lộ sầm uất về đêm tại Tokyo hay Las Vegas hoạt động ra sao? 💡🌃

Bí mật nằm ở nhóm Khí Hiếm (Nhóm VIIIA) trơ bền!
Khi phóng dòng điện cao áp (hàng ngàn volt) qua một ống thủy tinh kín chứa khí hiếm ở áp suất thấp:
Các electron tự do bắn phá các nguyên tử khí trơ, kích thích electron lớp ngoài cùng nhảy lên các mức năng lượng cao hơn. Khi quay trở về trạng thái cơ bản, chúng giải phóng các hạt photon ánh sáng có bước sóng đặc trưng:

🔴 Khí Neon (Ne): Phát ánh sáng đỏ cam rực rỡ đặc trưng
🟣 Khí Argon (Ar): Phát ánh sáng tím xanh lam dịu nhẹ
🟡 Khí Heli (He): Phát ánh sáng vàng ấm
⚪ Khí Xenon (Xe): Phát ánh sáng trắng xanh cực mạnh trong đèn pha xe hơi

📱 Khám phá nhóm khí hiếm trong bảng tuần hoàn tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Neon #DenNeon #KhiHiem #QuangPho #HoaHoc10 #AnhSangThanhPho`
  },
  {
    "id": 63,
    "title": "NHIÊN LIỆU TÊN LỬA VŨ TRỤ: SỨC MẠNH HYDRO VÀ OXY LỎNG 🚀💧",
    "videoFile": "reel_63_nhien_lieu_ten_lua.mp4",
    "scheduleIso": "2026-10-06T11:45:00+07:00",
    "caption": `Lực đẩy nào đủ sức nâng một quả tên lửa nặng 3.000 tấn thắng lực hấp dẫn Trái Đất bay thẳng vào vũ trụ bao la? 🚀💧

Đó là sức mạnh của cặp nhiên liệu tên lửa Hydrolox: Hydro lỏng (LH₂) và Oxy lỏng (LOX)!
Hydro lỏng được giữ ở nhiệt độ cực hàn âm 253°C, khi kết hợp với oxy lỏng trong buồng đốt tên lửa:
👉 2 H₂ (lỏng) + O₂ (lỏng) → 2 H₂O (khí) + Tỏa nhiệt lượng khổng lồ!

Nhiệt độ buồng đốt vọt lên trên 3.000°C làm hơi nước dãn nở cực đại, phụt qua loa động cơ với vận tốc lên tới 4.500 m/s — nhanh gấp 13 lần vận tốc âm thanh!
Điều tuyệt vời nhất: Cột khói trắng khổng lồ bốc lên ngùn ngụt dưới bệ phóng tên lửa Saturn V hay Artemis thực chất chỉ là HƠI NƯỚC TINH KHIẾT 100%!

📱 Cân bằng phản ứng cháy nhiên liệu tên lửa tại website chính thức:
🌐 https://ph-chem.web.app/reactions
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #NhienLieuTenLua #HydroLanh #NASA #Artemis #HoaHocVuTru`
  },
  {
    "id": 64,
    "title": "AEROGEL: KHÓI ĐÔNG KẾT CÁCH NHIỆT VÔ ĐỊCH 🧊🔥",
    "videoFile": "reel_64_aerogel_khoi_dong_ket.mp4",
    "scheduleIso": "2026-10-06T19:45:00+07:00",
    "caption": `Một khối chất rắn trong suốt tựa như làn khói đông kết — Đặt bông hoa lên trên rồi châm lửa 1.000°C bên dưới mà hoa không hề héo! 🧊🔥

Đó chính là Aerogel (Khói đông kết) — chất rắn nhân tạo nhẹ nhất thế giới!
Được chế tạo từ Silic đioxit (SiO₂), Aerogel có cấu trúc mạng lưới xốp nano kỳ diệu: 99.8% thể tích của nó là không khí bị nhốt chặt trong các lỗ xốp siêu nhỏ (chỉ 20-40 nanomet).

Vì kích thước lỗ xốp nhỏ hơn quãng đường chuyển động tự do của các phân tử không khí, nhiệt lượng hoàn toàn KHÔNG THỂ DẪN và KHÔNG THỂ ĐỐI LƯU qua khối vật liệu này!
Chính nhờ đặc tính cách nhiệt siêu việt này, NASA dùng Aerogel bọc quanh các mạch điện tử của tàu thăm dò tự hành Curiosity và Perseverance trên Sao Hỏa để giữ ấm qua đêm đông âm 100°C!

📱 Khám phá cấu trúc mạng Silic Đioxit tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Aerogel #KhoiDongKet #VatLieuCachNhiet #NASA #SiO2 #HoaHocMoi`
  },
  {
    "id": 65,
    "title": "CHIP BÁN DẪN SILICON: BỘ NÃO CỦA KỶ NGUYÊN AI 💻🤖",
    "videoFile": "reel_65_chip_ban_dan_silicon.mp4",
    "scheduleIso": "2026-10-07T11:45:00+07:00",
    "caption": `Làm sao những hạt cát tầm thường trên bãi biển có thể biến thành những con chip xử lý trí tuệ nhân tạo thay đổi thế giới? 💻🤖

Hành trình hóa học đỉnh cao biến cát thành chip thông minh:
1. Cát thạch anh (SiO₂) được khử ở 2.000°C để tách lấy Silic thô.
2. Qua hàng chục bước chưng cất hóa học tinh vi để đạt độ tinh khiết 99.9999999% (chín con số 9) — chỉ 1 nguyên tử tạp chất lẫn trong 1 tỷ nguyên tử Silic!
3. Silic được đúc thành thỏi đơn tinh thể rồi cắt lát thành các đĩa tròn wafer mỏng tang.

Bằng công nghệ quang khắc tia cực tím cực ngắn (EUV), các kỹ sư khắc hàng chục tỷ bóng bán dẫn (transistor) kích thước chỉ 2-3 nanomet lên diện tích bằng móng tay, đóng ngắt dòng electron hàng tỷ lần mỗi giây tạo nên bộ não tính toán của AI!

📱 Khám phá nguyên tố Silic trong bảng tuần hoàn tương tác tại:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#BanCoBiet #pHChem #Silicon #ChipBanDan #TriTueNhanTao #AI #CongNgheNano #HoaHoc11`
  },
  {
    "id": 66,
    "title": "BỤI MẶT TRĂNG: BÍ ẨN MÙI THUỐC SÚNG CHÁY 🌕🔫",
    "videoFile": "reel_66_bui_mat_trang_mui_thuoc_sung.mp4",
    "scheduleIso": "2026-10-07T19:45:00+07:00",
    "caption": `Khi các phi hành gia Apollo trở về khoang tàu sau khi dạo bước Mặt Trăng, họ ngửi thấy bụi Mặt Trăng có mùi khét lẹt như thuốc súng vừa nổ! 🌕🔫

Mặt Trăng hoàn toàn không có thuốc súng hay chất nổ — Vậy mùi khét cay nồng đó từ đâu ra?
Mặt Trăng không có bầu khí quyển và từ trường che chắn. Suốt 4.5 tỷ năm qua, đất đá silicat trên bề mặt bị bão mặt trời, tia tử ngoại và vi thiên thạch liên tục bắn phá dữ dội.

Những tác động này bẻ gãy hàng loạt liên kết hóa học Si-O và Fe-O trong khoáng chất, tạo ra vô số \"liên kết dang dở\" (Dangling bonds) và các gốc tự do tích điện lơ lửng trong chân không.

Khi phi hành gia bước vào khoang tàu chứa đầy khí oxy và hơi ẩm, các gốc tự do này lập tức phản ứng oxy hóa cấp tốc, bốc cháy vi mô giải phóng các hợp chất hữu cơ bay hơi kích thích khứu giác, tạo nên mùi khét hệt như mùi thuốc súng vừa bốc hỏa!

📱 Khám phá trọn vẹn kho báu 325 sự thật hóa học kỳ thú tại:
🌐 https://ph-chem.web.app/
(Trang chủ chính thức của dự án pH-Chem)

---
#BanCoBiet #pHChem #MatTrang #BuiMatTrang #Apollo #GocTuDo #KhoaHocVuTru #BaoMatTroi`
  }
];

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
    }
  }
  return env;
}

/**
 * Đăng/Hẹn giờ Reel bằng Meta Reels Publishing API
 */
export async function uploadMetaReel({ filePath, caption, scheduleIso }) {
  const env = loadEnv();
  const PAGE_ID = env.FB_PAGE_ID || '1409676485553930';
  const ACCESS_TOKEN = env.FB_PAGE_ACCESS_TOKEN;

  if (!ACCESS_TOKEN) {
    throw new Error('Thiếu FB_PAGE_ACCESS_TOKEN trong .env.local');
  }

  const scheduledEpoch = Math.floor(new Date(scheduleIso).getTime() / 1000);

  // BƯỚC 1: Khởi tạo phiên tải lên Reel
  console.log(`📡 [1/3] Đang khởi tạo phiên upload Reel lên Fanpage (ID: ${PAGE_ID})...`);
  const initUrl = `https://graph.facebook.com/v26.0/${PAGE_ID}/video_reels`;
  const initRes = await fetch(initUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      upload_phase: 'start',
      access_token: ACCESS_TOKEN
    })
  });

  const initData = await initRes.json();
  if (initData.error) {
    throw new Error(`Lỗi khởi tạo Reel: ${initData.error.message} (code ${initData.error.code})`);
  }

  const { video_id, upload_url } = initData;
  console.log(`✅ Khởi tạo thành công! Video ID: ${video_id}`);

  // BƯỚC 2: Tải dữ liệu video nhị phân lên server Meta
  console.log(`📤 [2/3] Đang tải tệp video lên Facebook CDN...`);
  const videoBuffer = fs.readFileSync(filePath);
  const uploadRes = await fetch(upload_url, {
    method: 'POST',
    headers: {
      'Authorization': `OAuth ${ACCESS_TOKEN}`,
      'offset': '0',
      'file_size': String(videoBuffer.length)
    },
    body: videoBuffer
  });

  const uploadData = await uploadRes.json();
  if (uploadData.error || uploadData.success === false) {
    throw new Error(`Lỗi upload file binary: ${uploadData.error?.message || 'Upload thất bại'}`);
  }
  console.log(`✅ Tải video lên CDN hoàn tất!`);

  // BƯỚC 3: Hoàn tất và Đặt lịch phát hành Reel
  console.log(`📅 [3/3] Đang thiết lập lịch hẹn giờ phát hành Reel: ${scheduleIso}...`);
  const finishRes = await fetch(initUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      upload_phase: 'finish',
      access_token: ACCESS_TOKEN,
      video_id: video_id,
      video_state: 'SCHEDULED',
      scheduled_publish_time: String(scheduledEpoch),
      description: caption
    })
  });

  const finishData = await finishRes.json();
  if (finishData.error) {
    throw new Error(`Lỗi đặt lịch Reel: ${finishData.error.message} (code ${finishData.error.code})`);
  }

  return { id: video_id, scheduled_publish_time: scheduledEpoch, status: 'SCHEDULED_REEL' };
}

const HISTORY_FILE = path.join(path.resolve('.'), 'promo', 'scheduled_reels.json');

function getScheduledHistory() {
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveScheduledHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
}

export async function scheduleSingleReel(reelItem) {
  const history = getScheduledHistory();
  if (history[reelItem.id] && !process.env.FORCE) {
    console.log(`⏩ REEL #${reelItem.id} đã được lập lịch trước đó (Reel ID: ${history[reelItem.id].reel_id}). Bỏ qua.`);
    return history[reelItem.id];
  }

  const filePath = path.join(REELS_DIR, reelItem.videoFile);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Không tìm thấy file video: ${filePath}`);
  }

  console.log(`\n======================================================`);
  console.log(`📤 LẬP LỊCH REEL #${reelItem.id}: ${reelItem.title}`);
  console.log(`📅 Thời điểm phát hành: ${reelItem.scheduleIso}`);
  console.log(`📁 Tệp video: ${reelItem.videoFile}`);
  console.log(`======================================================`);

  let res;
  try {
    res = await uploadMetaReel({
      filePath,
      caption: reelItem.caption,
      scheduleIso: reelItem.scheduleIso
    });
    console.log(`🎉 LẬP LỊCH REEL THÀNH CÔNG! Reel ID: ${res.id}`);
  } catch (err) {
    console.warn(`⚠️ Thử lại qua fallback standard video endpoint: ${err.message}`);
    res = await postVideo({
      title: reelItem.title,
      description: reelItem.caption,
      videoPath: filePath,
      scheduledPublishTime: Math.floor(new Date(reelItem.scheduleIso).getTime() / 1000)
    });
    console.log(`🎉 LẬP LỊCH QUA VIDEO ENDPOINT THÀNH CÔNG! ID: ${res.id}`);
  }

  history[reelItem.id] = {
    id: reelItem.id,
    title: reelItem.title,
    videoFile: reelItem.videoFile,
    reel_id: res.id,
    scheduleIso: reelItem.scheduleIso,
    scheduledAt: new Date().toISOString()
  };
  saveScheduledHistory(history);

  return res;
}

export async function scheduleAllReels() {
  console.log(`🚀 BẮT ĐẦU LẬP LỊCH TOÀN BỘ 10 REEL (MỖI NGÀY 2 TẬP: 11:45 & 19:45)...`);
  for (const item of REEL_SCHEDULE) {
    await scheduleSingleReel(item);
    // Chờ 3s giữa các request để tránh rate limit
    await new Promise(r => setTimeout(r, 3000));
  }
  console.log(`\n🎉 HOÀN TẤT LẬP LỊCH TOÀN BỘ 10 REEL LÊN FANPAGE!`);
}

if (process.argv[1]?.endsWith('schedule-fact-reels.mjs')) {
  const targetId = process.argv[2];
  if (targetId) {
    const item = REEL_SCHEDULE.find(r => String(r.id) === targetId);
    if (!item) {
      console.error(`❌ Không tìm thấy reel với ID: ${targetId}`);
      process.exit(1);
    }
    scheduleSingleReel(item).catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  } else {
    scheduleAllReels().catch(err => {
      console.error('❌ Lỗi:', err);
      process.exit(1);
    });
  }
}
