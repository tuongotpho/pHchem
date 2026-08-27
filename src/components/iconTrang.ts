// Icon của từng trang — tách riêng khỏi icons.tsx vì đây là HẰNG SỐ, không
// phải component. Để chung file với component thì cơ chế nạp nóng lúc lập
// trình không làm việc được (oxlint có cảnh báo đúng chỗ này).

import {
  IconHome,
  IconTable,
  IconCalc,
  IconGrid,
  IconElectro,
  IconReaction,
  IconFlask,
  IconBook,
  IconBulb,
  IconQuiz,
  IconSettings,
} from './icons';
/**
 * ICON CỦA TỪNG TRANG — MỘT NGUỒN DUY NHẤT.
 *
 * VÌ SAO PHẢI GOM: trước đây thanh điều hướng và lưới ở trang chủ mỗi nơi giữ
 * một danh sách icon riêng. Hai danh sách ấy lệch nhau lúc nào không hay —
 * người dùng đã bắt được: Dãy điện hóa và Phản ứng đội chung một icon trên
 * thanh nav, còn trang chủ thì Dãy điện hóa lại đội icon của Độ tan. Luyện tập
 * cũng vậy: giống Máy tính ở nav, giống Thực tiễn ở trang chủ.
 *
 * Gom về một chỗ thì hai nơi không thể lệch nữa, và có phép kiểm gác chuyện
 * hai trang đội chung một icon.
 */
export const ICON_TRANG = {
  '/': IconHome,
  '/table': IconTable,
  '/calculator': IconCalc,
  '/solubility': IconGrid,
  '/electro': IconElectro,
  '/reactions': IconReaction,
  '/formulas': IconFlask,
  '/dictionary': IconBook,
  '/facts': IconBulb,
  '/quiz': IconQuiz,
  '/settings': IconSettings,
} as const;

export type DuongDanCoIcon = keyof typeof ICON_TRANG;
