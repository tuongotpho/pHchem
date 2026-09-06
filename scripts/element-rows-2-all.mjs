/**
 * Gom toàn bộ các đợt dữ liệu nguyên tố mới thành một danh sách.
 * Mỗi đợt để một file riêng cho dễ viết và dễ sửa; thêm đợt mới thì
 * import thêm ở đây rồi nối vào mảng bên dưới.
 */
import { ROWS as A } from './element-rows-2.mjs';    // đợt 1: chuyển tiếp chu kỳ 4-5, á kim
import { ROWS as B } from './element-rows-2b.mjs';   // đợt 2: họ Lantan (đất hiếm)
import { ROWS as C } from './element-rows-2c.mjs';   // đợt 3: kim loại nặng chịu nhiệt + phóng xạ tự nhiên
import { ROWS as D } from './element-rows-2d.mjs';   // đợt 4: actini nhân tạo
import { ROWS as E } from './element-rows-2e.mjs';   // đợt 5: siêu nặng nhân tạo

export const ROWS = [...A, ...B, ...C, ...D, ...E];
