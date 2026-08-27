import { describe, it, expect } from 'vitest';
import {
  docSo,
  dinhDang,
  docDaLuu,
  canHoiLai,
  diaChiDem,
  diaChiTong,
  HAN_HOI_LAI,
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

describe('canHoiLai — bao lâu mới phiền máy chủ một lần', () => {
  const gio = 60 * 60 * 1000;

  it('chưa có gì trong kho thì hỏi ngay', () => {
    expect(canHoiLai(null, 0)).toBe(true);
  });

  it('mới lấy cách đây một tiếng thì thôi', () => {
    // GoatCounter tự đệm tới bốn tiếng, hỏi lại lúc này chỉ nhận số cũ.
    expect(canHoiLai({ so: 10, luc: 0 }, gio)).toBe(false);
  });

  it('quá sáu tiếng thì hỏi lại', () => {
    expect(canHoiLai({ so: 10, luc: 0 }, HAN_HOI_LAI)).toBe(true);
    expect(canHoiLai({ so: 10, luc: 0 }, 7 * gio)).toBe(true);
  });

  it('đồng hồ máy lệch về tương lai thì hỏi lại chứ không kẹt cứng', () => {
    // Mốc lưu "sau" hiện tại: phép trừ ra số âm, nếu chỉ so với hạn thì con
    // số đứng im mãi cho tới khi người dùng chỉnh lại giờ máy.
    expect(canHoiLai({ so: 10, luc: 100 * gio }, gio)).toBe(true);
  });
});

describe('địa chỉ gọi tới GoatCounter', () => {
  it('dựng đúng dạng máy chủ quy định', () => {
    expect(diaChiDem('abc')).toBe('https://abc.goatcounter.com/count');
    // TOTAL viết hoa, không gạch chéo đứng trước — sai một chữ là hỏng.
    expect(diaChiTong('abc')).toBe('https://abc.goatcounter.com/counter/TOTAL.json');
  });
});
