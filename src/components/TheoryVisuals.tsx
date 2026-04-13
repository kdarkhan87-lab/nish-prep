"use client";

// SVG визуализации для математических тем

export function FractionPizzaSVG({ numerator, denominator }: { numerator: number; denominator: number }) {
  const size = 120;
  const cx = size / 2;
  const cy = size / 2;
  const r = 50;

  const slices = [];
  for (let i = 0; i < denominator; i++) {
    const startAngle = (i * 360) / denominator - 90;
    const endAngle = ((i + 1) * 360) / denominator - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = 360 / denominator > 180 ? 1 : 0;
    const filled = i < numerator;

    slices.push(
      <path
        key={i}
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
        fill={filled ? "#f97316" : "#f3f4f6"}
        stroke="white"
        strokeWidth="2"
      />
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-2 bg-white rounded-xl p-3 shadow-sm border">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth="2" />
      </svg>
      <span className="text-sm font-bold text-gray-700">
        {numerator}/{denominator}
      </span>
    </div>
  );
}

export function RectangleSVG({ a, b, showPerimeter, showArea }: { a: number; b: number; showPerimeter?: boolean; showArea?: boolean }) {
  const scale = 8;
  const w = a * scale;
  const h = b * scale;
  const pad = 30;
  const svgW = w + pad * 2;
  const svgH = h + pad * 2 + 20;

  return (
    <div className="inline-flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border">
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
        <rect x={pad} y={pad} width={w} height={h} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="2" />
        {/* a — жоғарғы */}
        <text x={pad + w / 2} y={pad - 8} textAnchor="middle" className="text-xs" fill="#3b82f6" fontWeight="bold" fontSize="12">
          a = {a}
        </text>
        {/* b — оң жақ */}
        <text x={pad + w + 12} y={pad + h / 2} textAnchor="start" className="text-xs" fill="#3b82f6" fontWeight="bold" fontSize="12" transform={`rotate(90, ${pad + w + 12}, ${pad + h / 2})`}>
          b = {b}
        </text>
        {/* Формулалар */}
        {showPerimeter && (
          <text x={pad + w / 2} y={pad + h + 18} textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="11">
            P = 2({a}+{b}) = {2 * (a + b)}
          </text>
        )}
        {showArea && (
          <text x={pad + w / 2} y={pad + h + 32} textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="11">
            S = {a}×{b} = {a * b}
          </text>
        )}
      </svg>
    </div>
  );
}

export function TriangleSVG({ a, h: height }: { a: number; h: number }) {
  const scale = 6;
  const baseW = a * scale;
  const triH = height * scale;
  const pad = 30;
  const svgW = baseW + pad * 2;
  const svgH = triH + pad * 2 + 20;

  const x1 = pad;
  const y1 = pad + triH;
  const x2 = pad + baseW;
  const y2 = pad + triH;
  const x3 = pad + baseW / 2;
  const y3 = pad;

  return (
    <div className="inline-flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border">
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
        <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        {/* Биіктік */}
        <line x1={x3} y1={y3} x2={x3} y2={y2} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4" />
        <text x={x3 + 8} y={pad + triH / 2} fill="#dc2626" fontWeight="bold" fontSize="11">h={height}</text>
        {/* Табаны */}
        <text x={pad + baseW / 2} y={y2 + 16} textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="11">a={a}</text>
        {/* Формула */}
        <text x={pad + baseW / 2} y={y2 + 30} textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="10">
          S = {a}×{height}/2 = {(a * height) / 2}
        </text>
      </svg>
    </div>
  );
}

export function CircleSVG({ r }: { r: number }) {
  const scale = 6;
  const radius = r * scale;
  const pad = 40;
  const size = (radius + pad) * 2;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="inline-flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={radius} fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        {/* Радиус */}
        <line x1={cx} y1={cy} x2={cx + radius} y2={cy} stroke="#dc2626" strokeWidth="2" />
        <text x={cx + radius / 2} y={cy - 6} textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="11">r={r}</text>
        {/* Диаметр */}
        <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
        {/* Центр */}
        <circle cx={cx} cy={cy} r={3} fill="#dc2626" />
        {/* Формулалар */}
        <text x={cx} y={cy + radius + 18} textAnchor="middle" fill="#7c3aed" fontWeight="bold" fontSize="10">
          d={r * 2} | C≈{(2 * 3.14 * r).toFixed(1)} | S≈{(3.14 * r * r).toFixed(1)}
        </text>
      </svg>
    </div>
  );
}

export function AnglesSVG() {
  const angles = [
    { name: "Сүйір", deg: 45, color: "#22c55e" },
    { name: "Тік", deg: 90, color: "#3b82f6" },
    { name: "Доғал", deg: 135, color: "#f59e0b" },
  ];

  return (
    <div className="flex gap-4 flex-wrap justify-center bg-white rounded-xl p-4 shadow-sm border my-4">
      {angles.map((angle) => {
        const rad = (angle.deg * Math.PI) / 180;
        const len = 40;
        const x2 = 10 + len * Math.cos(-rad);
        const y2 = 50 - len * Math.sin(-rad) + 10;

        return (
          <div key={angle.name} className="flex flex-col items-center">
            <svg width="80" height="70" viewBox="0 0 80 70">
              {/* Горизонтальная линия */}
              <line x1="10" y1="60" x2="70" y2="60" stroke={angle.color} strokeWidth="2" />
              {/* Угловая линия */}
              <line x1="10" y1="60" x2={x2} y2={y2} stroke={angle.color} strokeWidth="2" />
              {/* Дуга */}
              <path
                d={`M 25 60 A 15 15 0 0 ${angle.deg <= 180 ? 0 : 1} ${10 + 15 * Math.cos(-rad)} ${60 - 15 * Math.sin(-rad) + (angle.deg === 90 ? 0 : 0)}`}
                fill="none"
                stroke={angle.color}
                strokeWidth="1.5"
              />
              {angle.deg === 90 && (
                <rect x="10" y="45" width="10" height="10" fill="none" stroke={angle.color} strokeWidth="1.5" />
              )}
            </svg>
            <span className="text-xs font-bold" style={{ color: angle.color }}>
              {angle.name} ({angle.deg}°)
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Контейнер визуализации — вставляется в теорию
export function VisualBlock({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-200">
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎨</span>
          <span className="font-bold text-indigo-700 text-sm">{title}</span>
        </div>
      )}
      <div className="flex gap-4 flex-wrap justify-center">
        {children}
      </div>
    </div>
  );
}
