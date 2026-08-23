import { describe, it, expect } from 'vitest';
import { khopTuKhoa } from './reactionIndex';
import { REACTIONS, type Reaction } from '../data/reactions';

const loc = (tuKhoa: string): Reaction[] =>
  REACTIONS.filter((r) => khopTuKhoa(r, tuKhoa));

describe('lọc phản ứng theo từ khóa', () => {
  it('gõ công thức thì ra phản ứng có chất đó', () => {
    expect(loc('KMnO4').length).toBeGreaterThan(0);
    expect(loc('KMnO4').every((r) => r.eq.includes('KMnO4'))).toBe(true);
  });

  it('để trống thì giữ nguyên cả kho', () => {
    expect(loc('').length).toBe(REACTIONS.length);
    expect(loc('   ').length).toBe(REACTIONS.length);
  });

  it('gõ bậy thì không ra gì, không nổ', () => {
    expect(loc('zzzzqqq')).toEqual([]);
  });

  // Đây là cả lý do sửa: trước đây bộ lọc chỉ dò trường tiếng Việt nên người
  // dùng giao diện tiếng Anh gõ tiếng Anh thì không ra kết quả nào.
  it('gõ tiếng Anh cũng ra, không chỉ tiếng Việt', () => {
    const coTiengAnh = REACTIONS.filter((r) => r.phen_en || r.note_en || r.cond_en);
    expect(coTiengAnh.length).toBeGreaterThan(0);

    // Lấy một phản ứng thật có mô tả tiếng Anh, rút một cụm từ trong đó ra dò
    const mau = coTiengAnh.find((r) => (r.phen_en ?? '').split(' ').length > 2)!;
    const cum = mau.phen_en!.split(' ').slice(0, 2).join(' ');
    expect(loc(cum)).toContain(mau);
  });

  it('điều kiện tiếng Anh cũng dò được', () => {
    const mau = REACTIONS.find((r) => r.cond_en)!;
    expect(loc(mau.cond_en!)).toContain(mau);
  });

  it('không phân biệt hoa thường', () => {
    const a = loc('nhiệt độ thường').length;
    const b = loc('NHIỆT ĐỘ THƯỜNG').length;
    expect(a).toBe(b);
    expect(a).toBeGreaterThan(0);
  });
});
