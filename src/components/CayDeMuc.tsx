// CÂY THƯ MỤC CHỌN ĐỀ: Tất cả → Lớp → Chương → mục con.
//
// MỘT BẢN DÙNG CHO CẢ HAI NGUỒN ĐỀ (ngân hàng đề của thầy và đề AI tự tạo).
// Trước đây mỗi bên là một ô chọn xổ xuống phẳng, mà hai ô ấy lại xếp cạnh
// nhau trên cùng màn hình: một bên liệt kê tên file thầy gửi, một bên liệt kê
// dạng bài. Học sinh không nhìn ra hai bên có liên quan gì tới nhau, và cũng
// không tìm được "chương em đang học" ở bên nào cả.
//
// VÌ SAO KHÔNG DÙNG <select> LỒNG NHAU: ô xổ xuống của trình duyệt chỉ có một
// tầng, muốn ba tầng thì phải bày ba ô "Lớp / Chương / Mục", chọn ô trên mới
// mở được ô dưới. Trên điện thoại đó là ba lần mở bảng chọn để bắt đầu một
// lượt ôn 10 câu. Cây bấm mở thẳng ngay trên trang thì thấy luôn chương nào
// có bao nhiêu câu, và số câu ấy chính là thứ giúp học sinh chọn.

import { useState } from 'react';
import type { NutLop } from '../lib/cayDe';

/** Chỗ đang chọn. Chuỗi rỗng ở cả hai nghĩa là "tất cả". */
export interface ViTriChon {
  chuong: string;
  /** Khóa mục con trong chương; rỗng là lấy cả chương. */
  la: string;
}

interface Props {
  cay: NutLop[];
  chon: ViTriChon;
  doiChon: (v: ViTriChon) => void;
  vi: boolean;
  /** Nhãn của mục đầu tiên, vd "Tất cả — 127 câu". */
  nhanTatCa: string;
}

const MuiTen = ({ mo }: { mo: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`w-3.5 h-3.5 shrink-0 transition-transform ${mo ? 'rotate-90' : ''}`}
  >
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const dong = (dangChon: boolean) =>
  `w-full flex items-center gap-2 text-left rounded-lg px-2 py-1.5 transition ${
    dangChon
      ? 'bg-accent/15 text-accent'
      : 'text-slate-400 hover:text-slate-200 hover:bg-base-800/60'
  }`;

export default function CayDeMuc({ cay, chon, doiChon, vi, nhanTatCa }: Props) {
  // Mở sẵn nhánh của chỗ đang chọn, và mở sẵn lớp đầu tiên khi chưa chọn gì —
  // mở cây ra mà thấy một danh sách đóng kín thì phải bấm thêm một lần nữa
  // mới biết trong đó có gì.
  const lopDauTien = cay.length ? String(cay[0].lop) : '';
  const [moLop, setMoLop] = useState<Set<string>>(() => {
    const dang = cay.find((l) => l.chuong.some((c) => c.ma === chon.chuong));
    return new Set([dang ? String(dang.lop) : lopDauTien]);
  });
  const [moChuong, setMoChuong] = useState<Set<string>>(() => new Set(chon.chuong ? [chon.chuong] : []));

  const bat = (bo: Set<string>, k: string, dat: (x: Set<string>) => void) => {
    const moi = new Set(bo);
    if (moi.has(k)) moi.delete(k);
    else moi.add(k);
    dat(moi);
  };

  return (
    <div className="max-h-72 overflow-y-auto pr-1 text-sm">
      <button onClick={() => doiChon({ chuong: '', la: '' })} className={dong(!chon.chuong)}>
        <span className="w-3.5" />
        <span className="flex-1">{nhanTatCa}</span>
      </button>

      {cay.map((l) => {
        const khoaLop = String(l.lop);
        const mo = moLop.has(khoaLop);
        return (
          <div key={khoaLop}>
            <button
              onClick={() => bat(moLop, khoaLop, setMoLop)}
              className={`${dong(false)} font-semibold`}
              aria-expanded={mo}
            >
              <MuiTen mo={mo} />
              <span className="flex-1">{l.ten}</span>
              <span className="text-xs text-slate-500">{l.soCau}</span>
            </button>

            {mo &&
              l.chuong.map((c) => {
                const moC = moChuong.has(c.ma);
                const dangChonChuong = chon.chuong === c.ma && !chon.la;
                return (
                  <div key={c.ma}>
                    <div className="flex items-stretch pl-4">
                      {/* Hai việc khác nhau nên là HAI NÚT: bấm vào tên là
                          chọn cả chương để ôn ngay; bấm mũi tên là mở ra xem
                          trong chương có những mục nào. Gộp một nút thì mở
                          xem cũng thành chọn, học sinh không xem được trước
                          khi quyết. */}
                      <button
                        onClick={() => bat(moChuong, c.ma, setMoChuong)}
                        className="px-1 text-slate-500 hover:text-slate-300 shrink-0"
                        aria-label={vi ? `Mở chương ${c.ten}` : `Expand ${c.ten}`}
                        aria-expanded={moC}
                      >
                        <MuiTen mo={moC} />
                      </button>
                      <button
                        onClick={() => doiChon({ chuong: c.ma, la: '' })}
                        className={dong(dangChonChuong)}
                      >
                        <span className="flex-1 leading-snug">
                          {c.ten}
                          {/* Tên bài trong chương chỉ để nhận ra chương, nên
                              cắt gọn ĐÚNG MỘT DÒNG. Chương Nitrogen - Sulfur
                              có tám bài, để xuống dòng thì một chương chiếm
                              chỗ bằng ba chương khác. */}
                          {c.noiDung && (
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {c.noiDung}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-slate-500">{c.soCau}</span>
                      </button>
                    </div>

                    {moC &&
                      c.la.map((x) => (
                        <button
                          key={x.khoa}
                          onClick={() => doiChon({ chuong: c.ma, la: x.khoa })}
                          className={`${dong(chon.chuong === c.ma && chon.la === x.khoa)} pl-12`}
                        >
                          <span className="flex-1 leading-snug">{x.ten}</span>
                          <span className="text-xs text-slate-500">{x.soCau}</span>
                        </button>
                      ))}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
