import fs from 'node:fs';
import path from 'node:path';

// Trích xuất facts từ facts.ts một cách an toàn
export function getSampleFact() {
  const factsFile = fs.readFileSync(path.resolve(process.cwd(), 'src/data/facts.ts'), 'utf8');
  // Lấy danh sách các fact từ text regex
  const regex = /{\s*t:\s*['"]([^'"]+)['"](?:,\s*el:\s*['"]([^'"]+)['"])?(?:,\s*nhom:\s*['"]([^'"]+)['"])?\s*}/g;
  const facts = [];
  let match;
  while ((match = regex.exec(factsFile)) !== null) {
    facts.push({
      text: match[1],
      element: match[2] || null,
      group: match[3] || null,
    });
  }
  if (facts.length === 0) return null;
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  return randomFact;
}

/**
 * Tạo bài viết mẫu: Sự thật Hóa học thú vị
 */
export function buildFactPost(fact) {
  const f = fact || getSampleFact();
  if (!f) return null;

  return `⚗️ [GÓC HÓA HỌC QUANH TA] — BẠN CÓ BIẾT?

${f.text}

---
💡 Hóa học không chỉ là những con số khô khan trên trang sách, mà chính là thế giới xung quanh chúng ta!
👉 Khám phá thêm hàng trăm sự thật thú vị, bảng tuần hoàn 118 nguyên tố và tính toán phản ứng hoàn toàn MIỄN PHÍ & OFFLINE tại:
🔗 https://ph-chem.web.app/

#pHChem #HoaHoc #KienThucHoaHoc #BangTuanHoan #HocHoaMoiNgay`;
}

/**
 * Tạo bài viết mẫu: Giới thiệu ứng dụng & cài đặt PWA
 */
export function buildIntroPost() {
  return `🔬 CHÀO MỪNG BẠN ĐẾN VỚI pH-Chem — BỘ CÔNG CỤ HÓA HỌC CHUYÊN NGHIỆP ⚗️

Bạn đang tìm kiếm một ứng dụng hỗ trợ học tập và giảng dạy Hóa học chính xác, mượt mà và đặc biệt là KHÔNG CẦN INTERNET?

✨ pH-Chem mang đến cho bạn:
1️⃣ Bảng tuần hoàn 118 nguyên tố: Đầy đủ nhiệt độ nóng chảy/sôi, khối lượng riêng, độ âm điện chuẩn IUPAC & PubChem.
2️⃣ Máy tính Hóa học thông minh: Cân bằng phương trình, tính số mol, khối lượng, nồng độ, pha loãng và tính pH giải tích chuẩn xác.
3️⃣ Thư viện 340+ chất: 274 hình công thức cấu tạo 2D chuẩn IUPAC sắc nét.
4️⃣ Luyện tập trắc nghiệm: Đề thi tạo tự động 6 dạng + Ngân hàng đề của giáo viên, xuất phiếu điểm PNG khoe bạn bè cực xịn!
5️⃣ Dãy điện hóa & Bảng độ tan: Tra cứu nhanh kim loại đẩy nhau và phản ứng trao đổi ion.

🛡️ Cam kết:
❌ Không theo dõi định danh
✅ Chạy 100% Offline (Cài đặt trực tiếp lên màn hình chính điện thoại / máy tính)

👉 Trải nghiệm ngay hôm nay tại:
🔗 https://ph-chem.web.app/

---
#pHChem #HoaHoc #PWA #CongCuHocTap #GiaoVienHoa #LuyenThiTHPT`;
}
