// Đọc chữ nằm trong công thức MathType của file Word.
//
// ═══ VÌ SAO CÓ FILE NÀY ═══
//
// Trước đây cả đường ống coi công thức MathType là thứ KHÔNG đọc nổi: nó nằm
// trong một đối tượng OLE nhị phân, bản xem trước WMF thì vẽ ra mấy vạch đen vì
// thiếu phông MT Extra. Đề Nitrogen vì vậy phải soi bằng mắt rồi gõ tay 15 câu
// vào bản vá.
//
// Đo lại trên đề "Sự điện li": bóc được TRỌN VẸN cả 46 công thức, kể cả chỉ số
// dưới và số mũ. Nên phần "phải gõ tay" co lại chỉ còn những chỗ máy tự khai là
// không hiểu. Bản vá vẫn còn nguyên tác dụng — nó vẫn đè lên được — nhưng không
// còn là đường duy nhất.
//
// ═══ ĐI QUA HAI LỚP VỎ ═══
//
// 1. File .bin trong word/embeddings/ là một OLE Compound File (CFB) — đúng cái
//    định dạng "ổ đĩa tí hon" mà file .doc đời cũ dùng. Bên trong có nhiều
//    luồng; thứ cần lấy tên là "Equation Native".
// 2. Luồng đó gồm 28 byte đầu đề rồi tới MTEF — định dạng riêng của MathType.
//    MTEF là chuỗi bản ghi: ký tự, dòng, khuôn (chỉ số dưới / số mũ / mũi tên
//    có điều kiện).
//
// KHÔNG PHẢI MÃ HÓA, chỉ là nhị phân. Ghi rõ ở đây vì kết luận cũ ghi nhầm là
// "mã hóa" nên cả đường ống né suốt một vòng.
//
// ═══ CHỖ KHÔNG CHẮC, VÀ CÁCH TỰ KIỂM ═══
//
// Bản ghi EQN_PREFS (thiết lập cỡ chữ, khoảng cách) mã hóa bằng nửa byte, đọc
// đúng rất rườm rà mà chẳng dùng vào việc gì. Nên KHÔNG đọc: thay vào đó thử
// đọc từ mọi vị trí, và chỉ nhận vị trí nào đọc trôi tới ĐÚNG cuối luồng, gốc
// đúng một dòng, mọi mã ký tự đều nằm trong khoảng hợp lệ. Sai một byte là kiểu
// đọc đó vỡ ngay, nên phép thử này chặt hơn nó trông. Trong hai vị trí cùng
// hợp lệ thì lấy vị trí cho ra NHIỀU CHỮ HƠN — vị trí sai luôn là một khúc đuôi.
//
// Gặp khuôn lạ thì KHÔNG đoán: trả về hieu = false để lớp trên còn bắt người soi.

/**
 * Lấy một luồng trong file OLE Compound.
 *
 * Đọc tối thiểu đủ dùng: bảng cấp phát (FAT) và bảng cấp phát nhỏ (miniFAT) cho
 * những luồng dưới 4 KB — mà "Equation Native" thì luôn nằm trong nhóm đó.
 *
 * @param {Buffer} buf
 * @param {string} tenCan
 * @returns {Buffer|null}
 */
export function docLuongCFB(buf, tenCan) {
  if (buf.length < 512 || buf.readUInt32LE(0) !== 0xe011cfd0) return null;

  const SZ = 1 << buf.readUInt16LE(30);
  const MSZ = 1 << buf.readUInt16LE(32);
  const soFat = buf.readUInt32LE(44);
  const dauThuMuc = buf.readUInt32LE(48);
  const nguongNho = buf.readUInt32LE(56);
  const dauMiniFat = buf.readUInt32LE(60);
  const dauDifat = buf.readUInt32LE(68);
  const soDifat = buf.readUInt32LE(72);

  const viTri = (s) => (s + 1) * SZ;

  const difat = [];
  for (let i = 0; i < 109; i++) difat.push(buf.readUInt32LE(76 + i * 4));
  let d = dauDifat;
  for (let k = 0; k < soDifat && d < 0xfffffffa; k++) {
    const goc = viTri(d);
    for (let i = 0; i < SZ / 4 - 1; i++) difat.push(buf.readUInt32LE(goc + i * 4));
    d = buf.readUInt32LE(goc + SZ - 4);
  }

  const fat = [];
  for (let i = 0; i < soFat; i++) {
    const s = difat[i];
    if (s === undefined || s >= 0xfffffffa) continue;
    const goc = viTri(s);
    for (let j = 0; j < SZ / 4; j++) fat.push(buf.readUInt32LE(goc + j * 4));
  }

  const chuoi = (dau, bang) => {
    const ds = [];
    let s = dau;
    while (s !== undefined && s < 0xfffffffa && ds.length < 100000) {
      ds.push(s);
      s = bang[s];
    }
    return ds;
  };
  const gomSector = (dau, soByte) =>
    Buffer.concat(chuoi(dau, fat).map((s) => buf.slice(viTri(s), viTri(s) + SZ))).slice(0, soByte);

  const miniFat = [];
  for (const s of chuoi(dauMiniFat, fat)) {
    const goc = viTri(s);
    for (let j = 0; j < SZ / 4; j++) miniFat.push(buf.readUInt32LE(goc + j * 4));
  }

  const thuMuc = gomSector(dauThuMuc, undefined);
  const muc = [];
  for (let p = 0; p + 128 <= thuMuc.length; p += 128) {
    const dai = thuMuc.readUInt16LE(p + 64);
    if (!dai) continue;
    muc.push({
      ten: thuMuc.slice(p, p + Math.max(0, dai - 2)).toString('utf16le'),
      loai: thuMuc[p + 66],
      dau: thuMuc.readUInt32LE(p + 116),
      soByte: Number(thuMuc.readBigUInt64LE(p + 120)),
    });
  }

  const m = muc.find((x) => x.ten === tenCan);
  if (!m) return null;
  if (m.soByte >= nguongNho) return gomSector(m.dau, m.soByte);

  const goc = muc.find((x) => x.loai === 5);
  if (!goc) return null;
  const luongNho = gomSector(goc.dau, goc.soByte);
  return Buffer.concat(
    chuoi(m.dau, miniFat).map((s) => luongNho.slice(s * MSZ, s * MSZ + MSZ)),
  ).slice(0, m.soByte);
}

// ---------- MTEF ----------

// Những bản ghi có một byte tùy chọn đi ngay sau byte nhãn.
const CO_TUY_CHON = new Set([1, 2, 3, 4, 5, 6]);

/** Khuôn chỉ số dưới / số mũ. Cả ba đều có hai ô: ô 1 nằm dưới, ô 2 nằm trên. */
const KHUON_CHI_SO = new Set([27, 28, 29]);
/** Khuôn mũi tên kèm điều kiện: ô 1 trên, ô 2 dưới, mũi tên là con thứ ba trở đi. */
const KHUON_MUI_TEN = 14;
/**
 * Khuôn phân số: ô 1 là TỬ, ô 2 là MẪU.
 *
 * Thứ tự hai ô đã đối chiếu bằng hóa học chứ không đoán: đề "Cân bằng hóa học"
 * câu 21 hỏi biểu thức hằng số cân bằng của aA + bB ⇌ cC + dD, thầy gạch chân
 * đáp án D, và ô 1 của đáp án D đúng là [C]^c.[D]^d — tức tử số.
 */
const KHUON_PHAN_SO = 11;

/**
 * Dấu cách MathType vẽ bằng phông MT Extra, mã nằm trong vùng dành riêng của
 * Unicode nên không có nghĩa sẵn.
 *
 * Nhận là dấu cách chứ không đoán bừa: đo trên đề Nitrogen, mã này xuất hiện 9
 * lần trong 4 công thức và LẦN NÀO cũng đứng đúng chỗ một dấu cách — "xt, t°,
 * p", "t°, Pt", "N₂(g) + 3H₂(g)". Chỉ nhận đúng MỘT mã này; mọi mã vùng riêng
 * khác vẫn coi là không đọc được để còn có người soi.
 */
const DAU_CACH_MT = 0xef02;

/**
 * Đọc chuỗi bản ghi MTEF bắt đầu từ vị trí batDau. Ném lỗi ngay khi thấy dấu
 * hiệu lệch — chính cái ném lỗi đó là thứ giúp dò ra vị trí bắt đầu đúng.
 */
function docBanGhi(mtef, batDau) {
  let p = batDau;
  let soChu = 0;
  let khuonLa = false;

  const doc = (ra) => {
    for (;;) {
      if (p >= mtef.length) throw new Error('hết luồng giữa chừng');
      const nhan = mtef[p++];
      if (nhan === 0) return;
      if (nhan > 19) throw new Error('nhãn lạ ' + nhan);

      let o = 0;
      if (CO_TUY_CHON.has(nhan)) {
        o = mtef[p++];
        if (o & 0x08) p += 2; // dịch chỗ
      }

      if (nhan === 1) {
        // DÒNG. Cờ 0x01 là dòng RỖNG: không có nội dung mà cũng không có bản
        // ghi kết thúc. Đây là cách MathType ghi "ô này bỏ trống" — NH₄⁺ chính
        // là khuôn chỉ số có ô dưới trống.
        if (o & 0x04) p += 2;
        if (o & 0x02) throw new Error('dòng có thước');
        if (o & 0x01) {
          ra.push({ dong: [] });
          continue;
        }
        const con = [];
        doc(con);
        ra.push({ dong: con });
        continue;
      }

      if (nhan === 2) {
        // KÝ TỰ: [kiểu chữ 1 byte] [mã 2 byte] [bản dự phòng 1 byte nếu cờ 0x04]
        p++;
        const ma = mtef.readUInt16LE(p);
        p += 2;
        if (o & 0x04) p += 1;
        if (ma < 0x20 || (ma > 0x2fff && ma !== DAU_CACH_MT)) throw new Error('mã ký tự lạ ' + ma);
        soChu++;
        ra.push({ ky: String.fromCharCode(ma) });
        if (o & 0x02) doc([]); // dấu phụ, không dùng tới
        continue;
      }

      if (nhan === 3) {
        const chon = mtef[p++];
        p += 2; // biến thể + tùy chọn của khuôn
        const con = [];
        doc(con);
        if (!con.length) throw new Error('khuôn rỗng');
        if (chon !== KHUON_MUI_TEN && chon !== KHUON_PHAN_SO && !KHUON_CHI_SO.has(chon)) {
          khuonLa = true;
        }
        ra.push({ khuon: chon, con });
        continue;
      }

      if (nhan === 4) {
        p += 2;
        if (o & 0x02) throw new Error('chồng có thước');
        doc(ra);
        continue;
      }
      if (nhan === 6) { p += 1; continue; }                        // dấu phụ
      if (nhan === 9) { if (mtef[p++] === 0xff) p += 2; continue; } // cỡ chữ khai riêng
      if (nhan >= 10 && nhan <= 14) continue;                      // cỡ chữ đặt sẵn
      if (nhan === 15) { p++; continue; }                          // màu
      if (nhan === 16) { p += 7; continue; }                       // khai báo màu
      throw new Error('nhãn chưa xử lý ' + nhan);
    }
  };

  const goc = [];
  doc(goc);
  while (p < mtef.length && mtef[p] === 0) p++;
  if (p !== mtef.length) throw new Error('còn thừa ' + (mtef.length - p) + ' byte');
  if (!soChu) throw new Error('không có chữ nào');
  if (goc.length !== 1 || !goc[0].dong) throw new Error('gốc phải là đúng một dòng');
  return { cay: goc[0].dong, khuonLa };
}

const demChu = (ds) => ds.reduce((t, n) => t + (n.ky ? 1 : demChu(n.dong ?? n.con)), 0);

/** Ký tự mũi tên của MathType → cú pháp mhchem mà app hiểu. */
const MUI_TEN = [
  ['⇀↽', '<=>'],
  ['↽⇀', '<=>'],
  ['⇌', '<=>'],
  ['⇄', '<=>'],
  ['↔', '<->'],
  ['→', '->'],
  ['←', '<-'],
];

/** Ghép cây bản ghi thành chữ theo cú pháp mhchem của app (xem src/lib/kyHieuHoa.js). */
function veChu(ds, bao) {
  let ra = '';
  for (const n of ds) {
    if (n.ky) {
      // MathType chèn dấu cách bằng ký tự "khoảng trắng không ngắt dòng"
      // (U+00A0). Để nguyên thì chữ trông y hệt dấu cách thường nhưng mọi phép
      // so chuỗi đều trượt, và dòng dài không xuống hàng được trên màn hẹp.
      ra += n.ky === '\u00a0' || n.ky.charCodeAt(0) === DAU_CACH_MT ? ' ' : n.ky;
      continue;
    }
    if (n.dong) {
      ra += veChu(n.dong, bao);
      continue;
    }

    const o = (i) => (n.con[i]?.dong ? veChu(n.con[i].dong, bao).trim() : '');

    if (KHUON_CHI_SO.has(n.khuon)) {
      const duoi = o(0);
      const tren = o(1);
      if (duoi) ra += '_{' + duoi + '}';
      if (tren) ra += '^{' + tren + '}';
      continue;
    }

    if (n.khuon === KHUON_PHAN_SO) {
      // Viết thành một dòng "(tử)/(mẫu)". Bộ vẽ của app chưa xếp được phân số
      // hai tầng (xem đầu src/lib/kyHieuHoa.js), nhưng dạng một dòng thì đọc
      // vẫn đúng nghĩa — và hằng số cân bằng Kc thì đề nào cũng có.
      const tu = o(0);
      const mau = o(1);
      if (!tu || !mau) {
        bao.hieu = false;
        ra += tu + mau;
        continue;
      }
      ra += '(' + tu + ')/(' + mau + ')';
      continue;
    }

    if (n.khuon === KHUON_MUI_TEN) {
      const tren = o(0);
      const duoi = o(1);
      const than = veChu(n.con.slice(2), bao);
      const dau = MUI_TEN.find(([k]) => than.includes(k));
      if (!dau) {
        bao.hieu = false;
        ra += than;
        continue;
      }
      ra += dau[1] + (tren || duoi ? '[' + tren + ']' : '') + (duoi ? '[' + duoi + ']' : '');
      continue;
    }

    // Khuôn không nhận ra (phân số, căn...). KHÔNG đoán: khai là không hiểu rồi
    // đổ chữ con ra để người soi còn thấy nó là cái gì.
    bao.hieu = false;
    ra += n.con.map((c) => veChu(c.dong ?? [c], bao)).join(' ');
  }
  return ra;
}

/**
 * Bóc một đối tượng MathType thành chữ.
 *
 * @param {Buffer} oleBuf nội dung file word/embeddings/oleObjectN.bin
 * @returns {{ chu: string, hieu: boolean }} hieu = false nghĩa là PHẢI có người soi
 */
export function bocCongThuc(oleBuf) {
  const luong = docLuongCFB(oleBuf, 'Equation Native');
  if (!luong || luong.length < 32) return { chu: '', hieu: false };
  const mtef = luong.slice(28);

  let tot = null;
  for (let s = 20; s < mtef.length - 3; s++) {
    let r;
    try {
      r = docBanGhi(mtef, s);
    } catch {
      continue;
    }
    const n = demChu(r.cay);
    if (!tot || n > tot.n) tot = { ...r, n };
  }
  if (!tot) return { chu: '', hieu: false };

  const bao = { hieu: !tot.khuonLa };
  const chu = veChu(tot.cay, bao);
  return { chu, hieu: bao.hieu && chu.trim().length > 0 };
}
