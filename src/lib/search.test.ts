import { describe, it, expect } from 'vitest';
import { searchAll } from './search';

// Người Việt gõ nhanh thường bỏ dấu. Tìm kiếm phải hiểu được cả hai lối gõ.

const co = (q: string, chua: string) =>
  searchAll(q, 'vi').some((r) => (r.title + ' ' + r.sub).includes(chua));

describe('tìm kiếm không dấu', () => {
  it('gõ không dấu vẫn ra kết quả có dấu', () => {
    expect(co('dong', 'Đồng')).toBe(true);
    expect(co('dien phan', 'Điện phân')).toBe(true);
    expect(co('luu huynh', 'Lưu huỳnh')).toBe(true);
  });

  it('chữ đ được coi như d — đây là chỗ từng gõ không ra gì', () => {
    // "đ" là một chữ cái riêng (U+0111), bước bỏ dấu thường không đụng tới nó.
    expect(searchAll('dien phan', 'vi').length).toBeGreaterThan(0);
    expect(searchAll('da voi', 'vi').length).toBeGreaterThan(0);
  });

  it('gõ có dấu vẫn ra bình thường', () => {
    expect(co('đồng', 'Đồng')).toBe(true);
    expect(co('điện phân', 'Điện phân')).toBe(true);
  });
});

describe('tìm theo từng chữ, không đòi liền mạch', () => {
  it('thiếu chữ đệm vẫn ra kết quả', () => {
    // thuật ngữ là "Bậc của ancol" — người dùng hiếm khi gõ đủ chữ "của"
    expect(co('bac ancol', 'Bậc của ancol')).toBe(true);
    expect(searchAll('trang guong glucozo', 'vi').length).toBeGreaterThan(0);
  });

  it('gõ đảo thứ tự vẫn ra', () => {
    expect(searchAll('ancol bac', 'vi').length).toBeGreaterThan(0);
  });

  it('gõ thừa chữ không liên quan thì KHÔNG ra bừa', () => {
    expect(searchAll('bac ancol xyzkhongcó', 'vi')).toEqual([]);
  });
});

describe('phạm vi tìm kiếm', () => {
  it('có tìm được phản ứng', () => {
    const kq = searchAll('dien phan', 'vi');
    expect(kq.some((r) => r.kind === 'reaction')).toBe(true);
  });

  it('mọi kết quả đều có đường dẫn trỏ tới đúng mục', () => {
    for (const q of ['natri', 'glucoz', 'dong', 'axit']) {
      for (const r of searchAll(q, 'vi')) {
        expect(r.to).toBeTruthy();
        expect(r.to.startsWith('/')).toBe(true);
        // trang chung không kèm mã mục thì coi như chưa trỏ thẳng tới nơi
        if (r.kind !== 'element') expect(r.to).toContain('?item=');
      }
    }
  });
});
