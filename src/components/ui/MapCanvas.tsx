import type { CSSProperties } from "react";

/**
 * Map canvas minh hoạ (không cần thư viện map):
 * gradient map + route SVG + pins đánh số + vị trí xe.
 */
export function MapCanvas({
  stops = [],
  progress = 0,
  children,
  style,
}: {
  /** Điểm giao: đánh số trên pin. done → nền success. */
  stops?: { x: number; y: number; label?: number | string; done?: boolean; current?: boolean }[];
  /** 0–1: route đã vẽ tới đâu (tính theo t trung bình của stops). */
  progress?: number;
  /** Nội dung nổi phía trên map (chip, nút). */
  children?: React.ReactNode;
  style?: CSSProperties;
}) {
  // Định tuyến zigzag cân đối theo stops; nếu không có stops, dùng đường mặc định
  const pts: [number, number][] =
    stops.length > 1
      ? stops.map((s) => [s.x, s.y])
      : [
          [10, 85],
          [30, 60],
          [35, 40],
          [55, 35],
          [70, 50],
          [90, 20],
        ];
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]} ${p[1]}` : `L${p[0]} ${p[1]}`)).join(" ");
  const upTo = Math.max(1, Math.min(stops.length, Math.ceil((progress ?? 0) * stops.length) || 1));
  const dDone = pts
    .slice(0, Math.max(2, upTo))
    .map((p, i) => (i === 0 ? `M${p[0]} ${p[1]}` : `L${p[0]} ${p[1]}`))
    .join(" ");
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #EAF0F8 0%, #DDE7F2 40%, #D3DFEC 100%)",
        ...style,
      }}
    >
      {/* Lưới map mờ */}
      <svg aria-hidden width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        {[20, 40, 60, 80].map((t) => (
          <line key={`h${t}`} x1="0" y1={`${t}%`} x2="100%" y2={`${t}%`} stroke="#C5D2E1" strokeWidth="1" strokeDasharray="4 6" />
        ))}
        {[25, 50, 75].map((t) => (
          <line key={`v${t}`} x1={`${t}%`} y1="0" x2={`${t}%`} y2="100%" stroke="#C5D2E1" strokeWidth="1" strokeDasharray="4 6" />
        ))}
      </svg>
      {/* Route: phần chưa đi (mờ) + phần đã đi (primary, shadow) */}
      <svg aria-hidden width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        <path d={d} fill="none" stroke="#B9CBE0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path
          d={dDone}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 2px 3px rgba(15,27,56,.25))" }}
        />
      </svg>
      {/* Pins */}
      {stops.map((s, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: "translate(-50%, -50%)",
            width: 26,
            height: 26,
            borderRadius: "var(--radius-pill)",
            backgroundColor: s.done ? "var(--color-success)" : s.current ? "var(--color-primary)" : "#fff",
            color: s.done || s.current ? "#fff" : "var(--color-navy)",
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(15,27,56,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {s.label ?? i + 1}
        </div>
      ))}
      {children}
    </div>
  );
}
