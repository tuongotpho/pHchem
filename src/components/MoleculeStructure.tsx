import { useEffect, useRef, useState } from 'react';
import SmilesDrawer from 'smiles-drawer';

// Vẽ cấu trúc phân tử từ mã SMILES bằng smiles-drawer (chạy offline, ra SVG).
export default function MoleculeStructure({
  smiles,
  size = 220,
  theme = 'dark',
}: {
  smiles: string;
  size?: number;
  theme?: 'dark' | 'light';
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    setError(false);
    svg.innerHTML = ''; // xóa hình cũ trước khi vẽ lại
    try {
      const drawer = new SmilesDrawer.SmiDrawer({
        width: size,
        height: size,
        padding: 16,
        bondThickness: 1.1,
      });
      drawer.draw(
        smiles,
        svg,
        theme,
        () => fitViewBox(svg),
        () => setError(true),
      );
      // phòng khi callback không kịp, co khung ở khung hình kế tiếp
      requestAnimationFrame(() => fitViewBox(svg));
    } catch {
      setError(true);
    }
  }, [smiles, size, theme]);

  // Co viewBox vừa đúng nội dung để phân tử dài ngang không bị cắt
  function fitViewBox(svg: SVGSVGElement) {
    try {
      const box = svg.getBBox();
      if (box.width === 0 || box.height === 0) return;
      const pad = Math.max(box.width, box.height) * 0.06 + 4;
      svg.setAttribute(
        'viewBox',
        `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`,
      );
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    } catch {
      /* getBBox có thể lỗi nếu chưa gắn DOM — bỏ qua */
    }
  }

  if (error) {
    return (
      <div
        className="grid place-items-center text-slate-600 text-xs"
        style={{ width: size, height: size }}
      >
        (không vẽ được cấu trúc)
      </div>
    );
  }

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      className="mx-auto"
      data-smiles={smiles}
    />
  );
}
