import { describe, it, expect } from 'vitest';
import { ELEMENTS } from './elements';
import { DETAILS } from './elements.details';

// Các phép kiểm CƠ HỌC cho dữ liệu gõ tay: máy soi lại, không dò bằng mắt.

const LOI_KHI: Record<string, number> = { He: 2, Ne: 10, Ar: 18, Kr: 36, Xe: 54, Rn: 86 };

/** Cộng tổng số electron trong một cấu hình, mở rộng ký hiệu lõi khí hiếm. */
function demElectron(config: string): number | null {
  let tong = 0;
  for (const phan of config.trim().split(/\s+/)) {
    const loi = phan.match(/^\[([A-Za-z]+)\]$/);
    if (loi) {
      if (!(loi[1] in LOI_KHI)) return null;
      tong += LOI_KHI[loi[1]];
      continue;
    }
    const pl = phan.match(/^\d+[spdf](\d+)$/);
    if (!pl) return null;
    tong += parseInt(pl[1], 10);
  }
  return tong;
}

describe('đối chiếu chéo dữ liệu nguyên tố', () => {
  // Phép mạnh nhất: gõ nhầm một chữ số trong cấu hình là tổng lệch ngay.
  it('cấu hình electron cộng đúng bằng số hiệu nguyên tử', () => {
    const sai: string[] = [];
    ELEMENTS.forEach((e) => {
      const n = demElectron(e.config);
      if (n === null) sai.push(`${e.sym}: không đọc được "${e.config}"`);
      else if (n !== e.n) sai.push(`${e.sym} (Z=${e.n}): cộng ra ${n}, lệch ${n - e.n}`);
    });
    expect(sai).toEqual([]);
  });

  it('khối lượng nguyên tử tăng dần theo số hiệu, trừ các cặp đảo đã biết', () => {
    // Chỉ xét tới urani (Z=92). Từ neptuni trở đi giá trị là SỐ KHỐI của đồng vị
    // thọ nhất chứ không phải nguyên tử khối trung bình, nên không so sánh được.
    const DAO_DA_BIET = new Set(['Ar-K', 'Co-Ni', 'Te-I', 'Th-Pa']);
    const sai: string[] = [];
    for (let i = 1; i < ELEMENTS.length; i++) {
      const a = ELEMENTS[i - 1];
      const b = ELEMENTS[i];
      if (b.n > 92) break;
      if (b.mass < a.mass && !DAO_DA_BIET.has(`${a.sym}-${b.sym}`))
        sai.push(`${a.sym}(${a.mass}) > ${b.sym}(${b.mass})`);
    }
    expect(sai).toEqual([]);
  });

  it('khối lượng riêng hợp với trạng thái ở 25°C', () => {
    const sai: string[] = [];
    ELEMENTS.forEach((e) => {
      const d = DETAILS[e.n];
      if (d.density === null) return;
      if (d.state === 'g' && d.density > 0.01)
        sai.push(`${e.sym}: chất khí mà ${d.density} g/cm³`);
      if (d.state === 's' && d.density < 0.4)
        sai.push(`${e.sym}: chất rắn mà chỉ ${d.density} g/cm³`);
      // Osmi 22,59 g/cm³ là đặc nhất trong các nguyên tố
      if (d.density > 23) sai.push(`${e.sym}: ${d.density} g/cm³, vượt cả osmi`);
    });
    expect(sai).toEqual([]);
  });

  it('độ âm điện nằm trong thang Pauling (0,7 của xesi đến 3,98 của flo)', () => {
    const sai: string[] = [];
    ELEMENTS.forEach((e) => {
      const d = DETAILS[e.n];
      if (d.en !== null && (d.en < 0.7 || d.en > 3.98))
        sai.push(`${e.sym}: ${d.en}`);
    });
    expect(sai).toEqual([]);
  });

  it('năm phát hiện nằm trong khoảng hợp lý', () => {
    // 0 = biết từ thời cổ đại. Asen ~1250 (Albertus Magnus) là mốc sớm nhất có năm.
    const sai: string[] = [];
    ELEMENTS.forEach((e) => {
      const d = DETAILS[e.n];
      if (d.disc !== null && d.disc !== 0 && (d.disc < 1200 || d.disc > 2026))
        sai.push(`${e.sym}: ${d.disc}`);
    });
    expect(sai).toEqual([]);
  });

  it('số hiệu, ký hiệu và tên đều không trùng lặp', () => {
    expect(new Set(ELEMENTS.map((e) => e.n)).size).toBe(118);
    expect(new Set(ELEMENTS.map((e) => e.sym)).size).toBe(118);
    expect(new Set(ELEMENTS.map((e) => e.vi)).size).toBe(118);
    expect(new Set(ELEMENTS.map((e) => e.en)).size).toBe(118);
  });
});
