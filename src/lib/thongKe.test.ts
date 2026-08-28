import { describe, it, expect } from 'vitest';
import {
  docSo,
  dinhDang,
  docDaLuu,
  diaChiDem,
  diaChiTong,
} from './thongKe';

describe('docSo — bóc con số khỏi phần trả lời của GoatCounter', () => {
  it('bóc được chuỗi đã chấm phẩy sẵn kiểu Anh', () => {
    // Đây là dạng thật máy chủ trả về, không phải số.
    expect(docSo({ count: '1,234' })).toBe(1234);
    expect(docSo({ count: '12' })).toBe(12);
    expect(docSo({ count: '1,234,567' })).toBe(1234567);
  });

  it('bóc được dạng THẬT máy chủ đang trả: ngăn cách bằng dấu cách hẹp', () => {
    // Tài liệu GoatCounter ghi là dấu phẩy, nhưng gọi thật vào
    // stats.arp242.net ngày 28/08/2026 thì trả về U+202F. Bám theo tài liệu
    // là hỏng ngay: "1 089 627" sẽ bị đọc thành số 1.
    expect(docSo({ count: '1\u202f089\u202f627' })).toBe(1089627);
    expect(docSo({ count: '1\u00a0234' })).toBe(1234); // dấu cách không ngắt thường
    expect(docSo({ count: '1 234' })).toBe(1234); // dấu cách thường
    expect(docSo({ count: '1.234' })).toBe(1234); // kiểu chấm của châu Âu
  });

  it('nhận cả kiểu số phòng khi máy chủ đổi cách trả', () => {
    expect(docSo({ count: 42 })).toBe(42);
  });

  it('trả null khi không đọc được, KHÔNG trả 0', () => {
    // Phân biệt "chưa biết" với "đúng là không có ai" — hiện số 0 lên trang
    // trong khi thật ra chỉ là mạng hỏng thì thành nói dối người xem.
    expect(docSo(null)).toBeNull();
    expect(docSo(undefined)).toBeNull();
    expect(docSo('1,234')).toBeNull();
    expect(docSo({})).toBeNull();
    expect(docSo({ count: '' })).toBeNull();
    expect(docSo({ count: 'chưa có' })).toBeNull();
  });

  it('số 0 thật thì vẫn là 0', () => {
    expect(docSo({ count: '0' })).toBe(0);
  });
});

describe('dinhDang — chấm phẩy theo từng thứ tiếng', () => {
  it('tiếng Việt dùng dấu chấm', () => {
    expect(dinhDang(1234, 'vi')).toBe('1.234');
    expect(dinhDang(1234567, 'vi')).toBe('1.234.567');
  });

  it('tiếng Anh dùng dấu phẩy', () => {
    expect(dinhDang(1234, 'en')).toBe('1,234');
  });

  it('số nhỏ thì để nguyên', () => {
    expect(dinhDang(7, 'vi')).toBe('7');
    expect(dinhDang(0, 'vi')).toBe('0');
  });
});

describe('docDaLuu — đọc con số lần trước trong kho lưu', () => {
  it('đọc được bản ghi đúng', () => {
    expect(docDaLuu('{"so":50,"luc":1000}')).toEqual({ so: 50, luc: 1000 });
  });

  it('kho rỗng, chuỗi hỏng hay thiếu trường thì coi như chưa biết', () => {
    expect(docDaLuu(null)).toBeNull();
    expect(docDaLuu('')).toBeNull();
    expect(docDaLuu('không phải JSON')).toBeNull();
    expect(docDaLuu('{"so":50}')).toBeNull();
    expect(docDaLuu('{"luc":1000}')).toBeNull();
    expect(docDaLuu('{"so":"50","luc":1000}')).toBeNull();
    expect(docDaLuu('{"so":-1,"luc":1000}')).toBeNull();
  });
});

describe('địa chỉ gọi tới GoatCounter', () => {
  it('dựng đúng dạng máy chủ quy định', () => {
    expect(diaChiDem('abc')).toBe('https://abc.goatcounter.com/count');
    // TOTAL viết hoa, không gạch chéo đứng trước — sai một chữ là hỏng.
    expect(diaChiTong('abc')).toBe('https://abc.goatcounter.com/counter/TOTAL.json');
  });
});

describe('KHÔNG được nhớ số 0 rồi tin nó — lỗi thật ngày 28/08/2026', () => {
  it('số 0 vẫn đọc lại được, nhưng chỉ để hiện tạm', () => {
    // Sáng 28/08 máy chủ còn trả 0, app cất lại rồi tin suốt sáu tiếng; tới
    // trưa bảng điều khiển đã 21 lượt mà trang vẫn trơ số 0. Nay không còn hạn
    // chờ nào: mỗi lần mở app là hỏi lại, số cất chỉ để hiện lúc chờ.
    expect(docDaLuu('{"so":0,"luc":1787883591541}')).toEqual({ so: 0, luc: 1787883591541 });
  });

  it('không còn hàm nào chặn việc hỏi lại', async () => {
    // Chốt bằng mã: thêm lại một hạn chờ mà quên ca số 0 là lỗi cũ quay lại.
    const m = await import('./thongKe');
    expect(Object.keys(m)).not.toContain('canHoiLai');
    expect(Object.keys(m)).not.toContain('HAN_HOI_LAI');
  });
});
