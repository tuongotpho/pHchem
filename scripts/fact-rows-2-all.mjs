/**
 * Gom các đợt dữ liệu "Chuyện lạ hoá học" kiểu mới.
 * Thêm đợt thì import thêm ở đây rồi nối vào mảng bên dưới.
 */
import { ROWS as A } from './fact-rows-2.mjs';    // Đời sống + Nông nghiệp
import { ROWS as B } from './fact-rows-2b.mjs';   // Bất ngờ + Nguyên tố
import { ROWS as C } from './fact-rows-2c.mjs';   // Công nghiệp + Môi trường
import { ROWS as D } from './fact-rows-2d.mjs';   // Y học + An toàn + Nhận biết + Cơ thể + Vũ trụ

export const FACT_ROWS = [...A, ...B, ...C, ...D];
