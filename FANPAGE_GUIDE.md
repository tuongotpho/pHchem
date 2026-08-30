# Kế Hoạch Quản Lý & Phát Hành Nội Dung Fanpage Ph-Chem (Master Roadmap)

Tài liệu này là **kim chỉ nam nội dung dài hạn** cho Fanpage **Ph-Chem**. Mỗi tuần là một **chiến dịch chuyên sâu (Deep-dive)** vào 1 tính năng cốt lõi của webapp, gồm 7 – 8 bài viết đa dạng góc nhìn (lý thuyết trọng tâm, mẹo giải nhanh, bí mật thực tiễn, câu đố tương tác, bài tập bấm giờ).

---

## 1. Thông Tin Kỹ Thuật & Kết Nối Fanpage

* **Tên Fanpage:** `Ph-Chem` (ID: `1409676485553930`)
* **Link Trang:** https://www.facebook.com/1409676485553930
* **Quyền API:** `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`
* **File lưu Token:** `.env.local` (nằm trong `.gitignore`, tuyệt đối không commit)
* **Quy tắc thương hiệu:** 
  * ⚠️ **Tên miền duy nhất:** `https://ph-chem.web.app/` (KHÔNG đăng link `github.io`).
  * ⚠️ **Chính sách:** Đã gỡ bỏ tuyên bố "không quảng cáo" / "miễn phí" trong toàn bộ mã nguồn và bài đăng.
  * ⚠️ **Ảnh xem trước:** Thẻ `og:image` tự động lấy banner HD 1200×630 tại `public/og-image.png`.

---

## 2. Khung Giờ Vàng Đăng Bài (Golden Hours)

* **Khung trưa (11:30 – 12:00):** Mẹo giải nhanh, câu đố ngắn, infographic.
* **Khung tối (19:30 – 20:00):** Bài viết chuyên sâu, tra cứu, lý thuyết trọng tâm, video hướng dẫn.
* **Khung chiều Thứ 7 (14:30):** Khám phá cấu trúc 2D, sự thật kỳ thú.
* **Khung tối Chủ Nhật (20:00):** Đề thi trắc nghiệm bấm giờ, minigame khoe phiếu điểm.

---

## 3. Lịch Chi Tiết Từng Tuần (Mỗi Tuần 1 Tính Năng Chuyên Sâu)

```
Tuần 1: Khởi động 7 Tính năng chính (Đã lên lịch 100%)
Tuần 2: Chuyên sâu Bảng tuần hoàn 118 nguyên tố (/table)
Tuần 3: Chuyên sâu Máy tính Hóa học & Tính theo PT (/calculator)
Tuần 4: Chuyên sâu Máy tính pH & Nồng độ dung dịch (/calculator)
Tuần 5: Chuyên sâu Dãy điện hóa & Oxi hóa - Khử (/electro)
Tuần 6: Chuyên sâu Bảng độ tan & Phản ứng có hiện tượng (/solubility, /reactions)
Tuần 7: Chuyên sâu Thư viện Hóa hữu cơ & Cấu trúc 2D IUPAC (/formulas)
Tuần 8: Chuyên sâu Phòng Luyện đề 30s & Ngân hàng đề Thầy cô (/quiz)
```

---

### 🟢 TUẦN 1: Giới Thiệu Tổng Quan 7 Tính Năng Cốt Lõi (ĐÃ LÊN LỊCH LIVE)
* **Thứ 2 (19:45):** 🔬 Bảng tuần hoàn 118 nguyên tố tương tác (`...1013471598`) ➔ `/table`
* **Thứ 3 (11:45):** ⚡ Máy tính Hóa học: Cân bằng & Chất hết/dư (`...1037471598`) ➔ `/calculator`
* **Thứ 4 (19:45):** 🧪 Máy tính pH & Nồng độ dung dịch chuẩn xác (`...1067471598`) ➔ `/calculator`
* **Thứ 5 (19:45):** 🔋 Dãy điện hóa kim loại & Quy tắc Alpha (`...1133471598`) ➔ `/electro`
* **Thứ 6 (11:45):** 💧 Ma trận độ tan & Kho phản ứng có hiện tượng (`...1157471598`) ➔ `/solubility`
* **Thứ 7 (14:30):** 🧬 Thư viện 340+ chất & 274 hình 2D IUPAC (`...1199471598`) ➔ `/formulas`
* **Chủ Nhật (20:00):** 🎯 Phòng luyện đề & Xuất phiếu điểm (`...1277471598`) ➔ `/quiz`

---

### 🟢 TUẦN 2 (07/09 – 13/09): Chuyên Sâu Bảng Tuần Hoàn 118 Nguyên Tố
* **Link gắn kèm:** `https://ph-chem.web.app/table`
* **Hashtag:** `#pHChem #BangTuanHoan #NguyenToHoaHoc #HoaHoc10 #IUPAC #PubChem`
* **Danh sách bài viết:**
  1. *Thứ 2 (19:45):* Cấu trúc Bảng tuần hoàn hiện đại (118 ô, 7 chu kỳ, 8 nhóm A và 8 nhóm B).
  2. *Thứ 3 (11:45):* Quy luật biến đổi tuần hoàn: Bán kính nguyên tử & Độ âm điện biến thiên thế nào?
  3. *Thứ 4 (19:45):* [Chuyện Hóa Học] Nguyên tố siêu nặng: Vì sao pH-Chem không ghi số dự đoán?
  4. *Thứ 5 (19:45):* Nhóm Khí Hiếm (VIIIA) — Cấu hình bền vững & Ứng dụng chiếu sáng neon.
  5. *Thứ 6 (11:45):* Kim loại kiềm & kiềm thổ (Nhóm IA, IIA) — Bí quyết nhớ màu ngọn lửa.
  6. *Thứ 7 (14:30):* Nhóm Halogen (VIIA) — Tính oxi hóa mạnh và ứng dụng diệt khuẩn.
  7. *Chủ Nhật (20:00):* [Minigame Đố Vui] Đoán tên nguyên tố qua cấu hình electron và số hiệu Z.

---

### 🟢 TUẦN 3 (14/09 – 20/09): Chuyên Sâu Máy Tính Hóa Học & Giải Toán Theo Phương Trình
* **Link gắn kèm:** `https://ph-chem.web.app/calculator`
* **Hashtag:** `#pHChem #MayTinhHoaHoc #CanBangPhuongTrinh #GiaiToanHoa #HoaHoc10 #HoaHoc11`
* **Danh sách bài viết:**
  1. *Thứ 2 (19:45):* Thuật toán cân bằng phương trình đại số phân số — Không bao giờ sai số làm tròn.
  2. *Thứ 3 (11:45):* Mẹo giải bài toán Chất hết / Chất dư trong 3 giây không cần kẻ bảng 3 dòng.
  3. *Thứ 4 (19:45):* Chuyển đổi vạn năng giữa Mol ↔ Khối lượng (g) ↔ Thể tích khí (lít) ↔ Nồng độ.
  4. *Thứ 5 (19:45):* Công thức pha loãng dung dịch $C_1V_1 = C_2V_2$ và bài toán trộn lẫn nồng độ.
  5. *Thứ 6 (11:45):* Khối lượng mol của muối ngậm nước ($CuSO_4 \cdot 5H_2O$) tính thế nào cho chuẩn?
  6. *Thứ 7 (14:30):* Tính lượng chất theo hiệu suất phản ứng $H\%$ trong đề thi đại học.
  7. *Chủ Nhật (20:00):* [Thử Thách Cuối Tuần] Giải nhanh 5 bài toán phương trình phức tạp với pH-Chem.

---

### 🟢 TUẦN 4 (21/09 – 27/09): Chuyên Sâu Máy Tính pH & Nồng Độ Dung Dịch
* **Link gắn kèm:** `https://ph-chem.web.app/calculator`
* **Hashtag:** `#pHChem #TinhpH #AxitBazo #NongDoDungDich #HoaHoc11 #LuyenThiTHPTQG`
* **Danh sách bài viết:**
  1. *Thứ 2 (19:45):* Bản chất của thang đo pH, pOH và mối liên hệ giữa $[H^+]$ và $[OH^-]$.
  2. *Thứ 3 (11:45):* Cách tính nhanh pH của Axit mạnh & Bazơ mạnh đơn chức / đa chức.
  3. *Thứ 4 (19:45):* Axit yếu và hằng số phân ly $K_a$ — Tính pH giải tích không xấp xỉ.
  4. *Thứ 5 (19:45):* "Bẫy" kinh điển: Axit nồng độ cực loãng ($10^{-7}$ M) tại sao pH không thể bằng 8?
  5. *Thứ 6 (11:45):* [Hóa Học Thực Tiễn] Độ pH của máu, dịch vị dạ dày, đất chua và nước uống.
  6. *Thứ 7 (14:30):* Phản ứng trung hòa & Sự đổi màu của Quỳ tím, Phenolphtalein theo pH.
  7. *Chủ Nhật (20:00):* [Minigame] Dự đoán khoảng pH của các loại đồ uống quen thuộc quanh ta.

---

### 🟢 TUẦN 5 (28/09 – 04/10): Chuyên Sâu Dãy Điện Hóa Kim Loại & Phản Ứng Oxi Hóa - Khử
* **Link gắn kèm:** `https://ph-chem.web.app/electro`
* **Hashtag:** `#pHChem #DayDienHoa #OxiHoaKhu #LuyenThiTHPTQG #HoaHoc12 #KimLoai`
* **Danh sách bài viết:**
  1. *Thứ 2 (19:45):* Ý nghĩa của 21 cặp oxi hóa - khử trong Dãy điện hóa kim loại.
  2. *Thứ 3 (11:45):* Thế điện cực chuẩn $E^0$ là gì? Cách xác định chiều phản ứng tự phát.
  3. *Thứ 4 (19:45):* Làm chủ Quy tắc Alpha ($\alpha$) — Bí quyết giải bài toán kim loại đẩy muối.
  4. *Thứ 5 (19:45):* "Bẫy điểm 9": Cặp $Fe^{3+}/Fe^{2+}$ và phản ứng $Fe + AgNO_3$ dư ra muối gì?
  5. *Thứ 6 (11:45):* Phân biệt Ăn mòn hóa học và Ăn mòn điện hóa trong thực tế đời sống.
  6. *Thứ 7 (14:30):* Nguyên lý hoạt động của Pin điện hóa và Acquy chì.
  7. *Chủ Nhật (20:00):* [Phòng Luyện Đề] 10 câu trắc nghiệm Dãy điện hóa bấm giờ 30s/câu.

---

### 🟢 TUẦN 6 (05/10 – 11/10): Chuyên Sâu Bảng Độ Tan & Phản Ứng Có Hiện Tượng
* **Link gắn kèm:** `https://ph-chem.web.app/solubility`
* **Hashtag:** `#pHChem #BangTinhTan #DoTanHoaHoc #NhanBietChat #PhanUngHoaHoc #HoaHocTHCS`
* **Danh sách bài viết:**
  1. *Thứ 2 (19:45):* Ma trận 14 Cation × 8 Anion — Bấm ô nào ra ngay công thức chuẩn hóa trị ô đó.
  2. *Thứ 3 (11:45):* Điều kiện bắt buộc để phản ứng trao đổi ion trong dung dịch xảy ra.
  3. *Thứ 4 (19:45):* Bí quyết viết và cân bằng Phương trình ion rút gọn siêu tốc.
  4. *Thứ 5 (19:45):* Bảng tra cứu màu sắc các kết tủa kinh điển ($Cu(OH)_2, Fe(OH)_3, BaSO_4, AgCl...$).
  5. *Thứ 6 (11:45):* Hiện tượng kết tủa lưỡng tính ($Al(OH)_3, Zn(OH)_2$) tan trong dung dịch kiềm dư.
  6. *Thứ 7 (14:30):* [Thí Nghiệm Ảo] Phản ứng tạo khí có mùi đặc trưng ($NH_3, H_2S, SO_2$).
  7. *Chủ Nhật (20:00):* [Đố Vui] Nhận biết 4 lọ hóa chất mất nhãn chỉ bằng một thuốc thử duy nhất.

---

### 🟢 TUẦN 7 (12/10 – 18/10): Chuyên Sâu Thư Viện Hóa Hữu Cơ & Cấu Trúc 2D IUPAC
* **Link gắn kèm:** `https://ph-chem.web.app/formulas`
* **Hashtag:** `#pHChem #HoaHocHuuCo #CongThucCauTao #DanhPhapIUPAC #HoaHoc12 #RDKit`
* **Danh sách bài viết:**
  1. *Thứ 2 (19:45):* Thư viện 340+ chất hữu cơ và công nghệ sinh hình RDKit chuẩn IUPAC 2008.
  2. *Thứ 3 (11:45):* Đồng phân & Danh pháp thay thế của Hiđrocacbon (Ankan, Anken, Ankin).
  3. *Thứ 4 (19:45):* Cấu trúc và liên kết hiđro của Ancol, Phenol — Vì sao nhiệt độ sôi cao hơn Este?
  4. *Thứ 5 (19:45):* Phản ứng Este hóa & Cấu trúc phân tử các este tạo mùi hương hoa quả.
  5. *Thứ 6 (11:45):* Amino Axit & Peptit — Cấu trúc lưỡng cực và phản ứng màu Biure.
  6. *Thứ 7 (14:30):* Phân biệt cấu trúc mắt xích $\alpha$-glucopyranose (Tinh bột) và $\beta$ (Xenlulozơ).
  7. *Chủ Nhật (20:00):* [Infographic] Bản đồ sơ đồ chuyển hóa các hợp chất hữu cơ trọng tâm lớp 12.

---

### 🟢 TUẦN 8 (19/10 – 25/10): Chuyên Sâu Phòng Luyện Đề 30s & Ngân Hàng Đề Thầy Cô
* **Link gắn kèm:** `https://ph-chem.web.app/quiz`
* **Hashtag:** `#pHChem #TracNghiemHoa #LuyenThiTHPT #DeThiHoa #PhieuDiem #GiaoVienHoa`
* **Danh sách bài viết:**
  1. *Thứ 2 (19:45):* 6 dạng đề thi tự tạo không bao giờ cạn từ dữ liệu thuật toán của app.
  2. *Thứ 3 (11:45):* Ngân hàng đề của Giáo viên: Đọc trực tiếp từ file Word MathType chuẩn từng công thức.
  3. *Thứ 4 (19:45):* Kỹ năng phân bổ thời gian 30 giây/câu để tối ưu điểm số thi trắc nghiệm.
  5. *Thứ 5 (19:45):* Bộ đề ôn tập Chuyên đề Nitrogen & Hợp chất của Nitrogen 2026.
  6. *Thứ 6 (11:45):* Bộ đề ôn tập Chuyên đề Sự điện li & Cân bằng hóa học.
  7. *Thứ 7 (14:30):* Hướng dẫn lưu Phiếu kết quả PNG để nộp bài hoặc chia sẻ khoe bạn bè.
  8. *Chủ Nhật (20:00):* [Đại Hội Luyện Đề Cuối Tuần] Vinh danh các bạn đạt điểm 10 trên Fanpage.

---

## 4. Công Cụ Hỗ Trợ Tự Động (`scripts/`)

Mỗi khi bắt đầu một tuần mới, bạn chỉ cần yêu cầu:
> *"Lên lịch cho Tuần 2 (Bảng tuần hoàn)"*  
> Tôi sẽ tự động chạy script và đẩy toàn bộ 7 bài viết của tuần đó lên hệ thống hẹn giờ của Facebook chỉ trong vài giây!
