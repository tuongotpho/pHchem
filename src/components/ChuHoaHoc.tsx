import { phanTich, type Manh } from '../lib/kyHieuHoa.js';

// Vẽ một dòng chữ có lẫn ký hiệu hóa học. Phần phân tích nằm ở lib/kyHieuHoa.js
// — dùng chung với script sinh trang duyệt đề, để trang thầy cô duyệt và màn
// hình học sinh nhìn không bao giờ lệch nhau.
//
// KHÁC FormulaText Ở CHỖ NÀO: FormulaText nhận vào MỘT công thức đã biết chắc
// là công thức, rồi hạ mọi chữ số xuống. Component này nhận vào CẢ CÂU tiếng
// Việt lẫn lộn công thức, nên phải tự tìm đâu là công thức — và phải phân biệt
// hệ số với chỉ số, số mũ với chỉ số. Đem FormulaText áp vào câu ngân hàng đề
// thì "2NO2(g)" thành "₂NO₂(g)": hệ số 2 tụt xuống thành chỉ số, sai hóa học.

function VeManh({ m }: { m: Manh }) {
  switch (m.k) {
    case 'duoi':
      return <sub>{m.t}</sub>;
    case 'tren':
      return <sup>{m.t}</sup>;
    case 'trangThai':
      return <span className="italic text-slate-400">{m.t}</span>;
    case 'muiTen':
      // Điều kiện phản ứng phải nằm TRÊN mũi tên — đó là chỗ ký tự Unicode
      // trần chịu thua và là lý do bộ này tồn tại. Xếp chồng bằng flex, mũi
      // tên giãn ngang theo bề rộng chữ điều kiện để không bị chữ tràn hai bên.
      if (!m.tren && !m.duoi) return <span className="mx-1.5">{m.t}</span>;
      return (
        <span className="inline-flex flex-col items-center align-middle mx-1.5 leading-none">
          {m.tren && (
            <span className="text-[0.65em] text-slate-400 whitespace-nowrap px-1">{m.tren}</span>
          )}
          <span className="w-full text-center">{m.t}</span>
          {m.duoi && (
            <span className="text-[0.65em] text-slate-400 whitespace-nowrap px-1">{m.duoi}</span>
          )}
        </span>
      );
    default:
      return <>{m.t}</>;
  }
}

export default function ChuHoaHoc({ t, className }: { t: string; className?: string }) {
  // Số mũ và chỉ số của cùng một ký hiệu (ΔH°₂₉₈) vẽ NỐI TIẾP nhau, không xếp
  // chồng. Bản đầu có xếp chồng cho giống hệt đề in trên giấy, nhưng khối hai
  // dòng cao hơn hàng chữ nên trình duyệt đẩy giãn cả dòng ra, chữ "298" rơi
  // xuống hàng dưới — đo trên trang duyệt ngày 28/08/2026. Nối tiếp thì đọc
  // vẫn đúng, là cách thông dụng trên web, và không phá bố cục.
  return (
    <span className={className}>
      {phanTich(t).map((m, i) => (
        <VeManh key={i} m={m} />
      ))}
    </span>
  );
}
