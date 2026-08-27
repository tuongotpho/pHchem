import { describe, it, expect } from 'vitest';
import { ICON_TRANG } from './iconTrang';

describe('icon của từng trang', () => {
  it('KHÔNG hai trang nào đội chung một icon', () => {
    // Người dùng đã bắt được đúng lỗi này: Dãy điện hóa và Phản ứng cùng một
    // icon trên thanh điều hướng, Luyện tập thì giống Máy tính. Nhìn vào thanh
    // nav không phân biệt được đang ở đâu.
    const theoIcon = new Map<unknown, string[]>();
    for (const [duong, Icon] of Object.entries(ICON_TRANG)) {
      theoIcon.set(Icon, [...(theoIcon.get(Icon) ?? []), duong]);
    }
    const dungChung = [...theoIcon.values()]
      .filter((ds) => ds.length > 1)
      .map((ds) => ds.join(' và '));
    expect(dungChung).toEqual([]);
  });

  it('phủ đủ mọi trang có trong thanh điều hướng', () => {
    // Thêm trang mới mà quên khai icon thì lọt ra ngoài bảng này, và cả hai
    // nơi dùng nó sẽ hỏng cùng lúc.
    const can = [
      '/',
      '/table',
      '/calculator',
      '/solubility',
      '/electro',
      '/reactions',
      '/formulas',
      '/dictionary',
      '/facts',
      '/quiz',
      '/settings',
    ];
    expect(Object.keys(ICON_TRANG).sort()).toEqual([...can].sort());
  });
});
