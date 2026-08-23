import { describe, it, expect } from 'vitest';
import { NHOM_CHAT, NHOM_NGUYEN_TO } from './classes';
import { TERMS } from './dictionary';
import { ELEMENTS } from './elements';

const TU_DIEN = new Set(TERMS.map((t) => t.en));

describe('nối lớp chất sang từ điển', () => {
  it('mọi lớp chất đều trỏ tới một thuật ngữ có thật', () => {
    // Gõ sai một chữ trong khóa thì liên kết chết lặng, không ai biết.
    const hong = Object.entries(NHOM_CHAT)
      .filter(([, v]) => !TU_DIEN.has(v.term))
      .map(([k, v]) => `${k} -> "${v.term}"`);
    expect(hong).toEqual([]);
  });

  it('mọi nhóm nguyên tố đều trỏ tới một thuật ngữ có thật', () => {
    const hong = Object.entries(NHOM_NGUYEN_TO)
      .filter(([, term]) => !TU_DIEN.has(term!))
      .map(([k, term]) => `${k} -> "${term}"`);
    expect(hong).toEqual([]);
  });

  it('mọi nhóm nguyên tố đang dùng trong bảng tuần hoàn đều được nối', () => {
    // trừ 'unknown': nguyên tố siêu nặng chưa đo được tính chất nên không xếp nhóm
    const dangDung = [...new Set(ELEMENTS.map((e) => e.cat))].filter((c) => c !== 'unknown');
    const thieu = dangDung.filter((c) => !NHOM_NGUYEN_TO[c]);
    expect(thieu).toEqual([]);
  });

  it('không lớp chất nào bỏ trống tên', () => {
    const thieu = Object.entries(NHOM_CHAT)
      .filter(([, v]) => !v.vi.trim() || !v.en.trim())
      .map(([k]) => k);
    expect(thieu).toEqual([]);
  });
});
