// Đọc con số người dùng gõ vào ô nhập.
//
// VÌ SAO PHẢI CÓ FILE RIÊNG: người Việt gõ dấu phẩy thập phân — "5,6" chứ
// không phải "5.6". `Number('5,6')` cho NaN. Bốn tab của trang Máy tính đã tự
// xử lý chỗ này, mỗi tab một dòng chép đi chép lại; tab "Tính theo PT" thêm
// sau thì quên, nên gõ "5,6" bị lọc bỏ im lặng kèm lời báo lỗi sai hẳn ý
// ("Lượng chất phải lớn hơn 0"). Gom về một chỗ thì lần sau thêm tab mới
// không sót được nữa.

/**
 * Đọc số từ chuỗi người dùng gõ, chấp nhận cả dấu phẩy thập phân.
 * Không đọc được thì trả về NaN — nơi gọi tự quyết định báo lỗi thế nào.
 *
 * Chỉ đổi dấu phẩy ĐẦU TIÊN, cố ý giữ nguyên cách bốn tab cũ vẫn làm. Người
 * gõ kiểu phân nhóm nghìn ("1.234,5") thì vẫn chưa đọc đúng — chưa gặp ai gõ
 * vậy trong ô hóa học, gặp rồi hãy xử lý, đừng đoán trước.
 */
export const doSo = (s: string): number => parseFloat(s.trim().replace(',', '.'));

/** Như `doSo`, nhưng ô để trống thì trả về null thay vì NaN. */
export const doSoHoacTrong = (s: string): number | null => {
  const x = s.trim();
  return x === '' ? null : doSo(x);
};

/** Có phải một số dùng được không — vừa đọc được, vừa lớn hơn 0. */
export const laSoDuong = (s: string): boolean => {
  const x = doSo(s);
  return Number.isFinite(x) && x > 0;
};

/**
 * Tên những ô CÓ CHỮ nhưng không đọc ra số.
 *
 * Khác hẳn ô để trống: trống là người dùng cố ý chừa cho app tính, còn gõ bậy
 * là nhầm lẫn cần báo. Không phân biệt thì app đứng im không kết quả cũng
 * không lời nào — người dùng ngồi chờ mãi.
 *
 * @param cacO khóa là tên ô, giá trị là đúng chuỗi người dùng đang gõ
 */
export function oHong(cacO: Record<string, string>): string[] {
  return Object.entries(cacO)
    .filter(([, v]) => v.trim() !== '' && !Number.isFinite(doSo(v)))
    .map(([ten]) => ten);
}
