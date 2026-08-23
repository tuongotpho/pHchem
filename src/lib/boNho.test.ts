import { describe, it, expect, afterEach } from 'vitest';
import { doc, ghi } from './boNho';

// Giả lập ba tình huống thật của trình duyệt. Test chạy trong Node nên không
// có localStorage sẵn — ta tự gắn vào rồi gỡ ra sau mỗi phép kiểm.
const gan = (gia: unknown) => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: gia,
    configurable: true,
    writable: true,
  });
};

afterEach(() => {
  // Trả môi trường về đúng như lúc đầu: KHÔNG có localStorage.
  Reflect.deleteProperty(globalThis, 'localStorage');
});

describe('kho lưu chạy bình thường', () => {
  it('ghi rồi đọc lại được', () => {
    const kho = new Map<string, string>();
    gan({
      getItem: (k: string) => kho.get(k) ?? null,
      setItem: (k: string, v: string) => void kho.set(k, v),
    });
    ghi('chemipro.theme', 'light');
    expect(doc('chemipro.theme')).toBe('light');
  });

  it('chưa lưu gì thì trả null', () => {
    gan({ getItem: () => null, setItem: () => {} });
    expect(doc('chemipro.lang')).toBeNull();
  });
});

describe('kho lưu bị chặn — app vẫn phải sống', () => {
  // Đây là cả lý do file này tồn tại. Trước khi bọc, hai trường hợp dưới đây
  // ném lỗi ngay lúc dựng provider gốc và người dùng nhận một trang trắng.

  it('trình duyệt chặn khi đọc thì coi như chưa lưu gì', () => {
    gan({
      getItem: () => {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      },
      setItem: () => {},
    });
    expect(() => doc('chemipro.theme')).not.toThrow();
    expect(doc('chemipro.theme')).toBeNull();
  });

  it('bộ nhớ đầy khi ghi thì bỏ qua, không ném lỗi', () => {
    gan({
      getItem: () => null,
      setItem: () => {
        throw new DOMException('Quota exceeded.', 'QuotaExceededError');
      },
    });
    expect(() => ghi('chemipro.theme', 'dark')).not.toThrow();
  });

  it('không có localStorage nào cả cũng không sao', () => {
    // Trường hợp cực đoan: môi trường không hề có kho lưu (dựng trang trên
    // máy chủ, hoặc trình duyệt tắt hẳn). Nhắc tên biến thôi cũng ném lỗi.
    expect(() => doc('chemipro.lang')).not.toThrow();
    expect(doc('chemipro.lang')).toBeNull();
    expect(() => ghi('chemipro.lang', 'en')).not.toThrow();
  });
});
