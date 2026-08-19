import type { Struct, SAtom } from '../data/structures';

// Vẽ công thức cấu tạo từ dữ liệu tọa độ đặt tay.
// Màu nền để "xóa" nét liên kết chạy dưới chữ (chuẩn vẽ cấu trúc).
const BG = '#0f141b';
const BOND = '#94a3b8';
const COLOR: Record<string, string> = { o: '#fb7185', n: '#60a5fa' };
const LIGHT = '#e2e8f0';

// Khoảng chừa quanh nhãn để nét không đâm vào chữ
function gap(label: string): number {
  if (!label) return 2;
  return Math.min(9 + label.length * 3.5, 22);
}

function centroid(atoms: SAtom[]) {
  const n = atoms.length;
  return {
    x: atoms.reduce((s, a) => s + a.x, 0) / n,
    y: atoms.reduce((s, a) => s + a.y, 0) / n,
  };
}

export default function StructuralFormula({
  struct,
  size = 240,
}: {
  struct: Struct;
  size?: number;
}) {
  const { w, h, atoms, bonds } = struct;
  const cen = centroid(atoms);

  const lines: React.JSX.Element[] = [];

  bonds.forEach((b, i) => {
    const A = atoms[b.a];
    const B = atoms[b.b];
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const px = -uy; // pháp tuyến
    const py = ux;

    // cắt bớt hai đầu để chừa chữ
    const ga = gap(A.t);
    const gb = gap(B.t);
    const ax = A.x + ux * ga;
    const ay = A.y + uy * ga;
    const bx = B.x - ux * gb;
    const by = B.y - uy * gb;

    const order = b.o ?? 1;
    const line = (x1: number, y1: number, x2: number, y2: number, key: string) => (
      <line
        key={key}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={BOND}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    );

    if (order === 1) {
      lines.push(line(ax, ay, bx, by, `b${i}`));
    } else if (order === 2) {
      const off = 3.4;
      // chọn hướng lệch: về phía tâm phân tử (đẹp cho vòng & nhóm C=O)
      const mx = (ax + bx) / 2;
      const my = (ay + by) / 2;
      const toC = (cen.x - mx) * px + (cen.y - my) * py;
      if (Math.abs(toC) < 6) {
        // gần như đối xứng (vd C=C) → hai nét cân hai bên
        lines.push(line(ax + px * off, ay + py * off, bx + px * off, by + py * off, `b${i}a`));
        lines.push(line(ax - px * off, ay - py * off, bx - px * off, by - py * off, `b${i}b`));
      } else {
        const s = toC > 0 ? 1 : -1;
        const shrink = 0.14;
        const sx = ax + (bx - ax) * shrink;
        const sy = ay + (by - ay) * shrink;
        const ex = bx - (bx - ax) * shrink;
        const ey = by - (by - ay) * shrink;
        lines.push(line(ax, ay, bx, by, `b${i}m`));
        lines.push(line(sx + px * off * 2 * s, sy + py * off * 2 * s, ex + px * off * 2 * s, ey + py * off * 2 * s, `b${i}i`));
      }
    } else {
      const off = 4;
      lines.push(line(ax, ay, bx, by, `b${i}m`));
      lines.push(line(ax + px * off, ay + py * off, bx + px * off, by + py * off, `b${i}a`));
      lines.push(line(ax - px * off, ay - py * off, bx - px * off, by - py * off, `b${i}b`));
    }
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      className="mx-auto max-w-full"
      style={{ maxHeight: size }}
    >
      {lines}
      {atoms.map((a, i) =>
        a.t ? (
          <g key={`a${i}`}>
            {/* nền che nét dưới chữ */}
            <rect
              x={a.x - (a.t.length * 5.2 + 3)}
              y={a.y - 10}
              width={a.t.length * 10.4 + 6}
              height={20}
              fill={BG}
              rx={3}
            />
            <text
              x={a.x}
              y={a.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={15}
              fontWeight={600}
              fontFamily="system-ui, sans-serif"
              fill={a.c ? COLOR[a.c] : LIGHT}
            >
              {a.t}
            </text>
          </g>
        ) : null,
      )}
    </svg>
  );
}
