// Khung nổi (modal): bấm Esc là đóng, và nền phía sau thôi trôi.
//
// Trước đây hai việc này viết tay ở bốn chỗ — GlobalSearch, Formulas (khung
// phóng to hình), Reactions, Solubility — mỗi chỗ một bản chép lại. Bốn bản
// thì sớm muộn cũng lệch: thực tế đã lệch sẵn, hai chỗ có khóa cuộn nền, hai
// chỗ quên. Trên điện thoại, quên khóa nghĩa là mở khung ra rồi vuốt thì nền
// phía sau trôi tuột, đóng khung lại thấy mình lạc đi đâu mất.

import { useEffect, useRef } from 'react';

/**
 * @param dangMo khung có đang mở không. Đóng thì hook tự gỡ sạch.
 * @param dong việc cần làm khi bấm Esc.
 * @param khoaCuonNen có chặn cuộn trang nền không. Mặc định CÓ — khung nổi
 *   nào cũng nên chặn; chỗ nào không muốn thì phải nói rõ ra.
 */
export function useKhungNoi(
  dangMo: boolean,
  dong: () => void,
  { khoaCuonNen = true }: { khoaCuonNen?: boolean } = {},
): void {
  // Giữ bản MỚI NHẤT của `dong` trong một ô nhớ. Lý do: chỗ gọi hầu hết truyền
  // một hàm viết thẳng tại chỗ, mỗi lượt vẽ lại là một hàm mới. Cho nó vào
  // danh sách phụ thuộc thì cứ mỗi lượt vẽ lại gỡ rồi gắn lại người nghe phím
  // — thừa, và có lúc rơi đúng vào khoảnh khắc người dùng bấm.
  //
  // Gán trong effect chứ không gán thẳng lúc vẽ: React có thể vẽ thử một lượt
  // rồi bỏ, gán lúc vẽ là ghi đè bằng thứ chưa chắc được dùng.
  const dongRef = useRef(dong);
  useEffect(() => {
    dongRef.current = dong;
  });

  useEffect(() => {
    if (!dangMo) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dongRef.current();
    };
    window.addEventListener('keydown', onKey);

    // Nhớ giá trị CŨ rồi trả lại đúng nó lúc đóng, chứ không đặt cứng về ''.
    // Hai khung nổi chồng nhau (khung chi tiết chất, rồi phóng to hình bên
    // trong nó) mà cái trong đóng lại xóa trắng thì cái ngoài mất khóa cuộn.
    const cuonCu = khoaCuonNen ? document.body.style.overflow : null;
    if (khoaCuonNen) document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      if (cuonCu !== null) document.body.style.overflow = cuonCu;
    };
  }, [dangMo, khoaCuonNen]);
}
