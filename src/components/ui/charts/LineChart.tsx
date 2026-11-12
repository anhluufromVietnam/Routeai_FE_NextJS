import type { CSSProperties } from "react";

export interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  fill?: boolean;
  style?: CSSProperties;
}

const VIEWBOX_HEIGHT = 100;
const PAD_TOP = 10;
const PAD_BOTTOM = 10;
const PAD_X = 14;

function formatValue(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function LineChart({ data, height = 160, color = "var(--color-primary)", fill = false, style }: LineChartProps) {
  if (data.length === 0) return null;

  const n = data.length;
  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const viewBoxWidth = Math.max(120, n * 32);
  const innerWidth = viewBoxWidth - PAD_X * 2;

  const points = data.map((d, i) => {
    const x = n === 1 ? viewBoxWidth / 2 : PAD_X + (i * innerWidth) / (n - 1);
    const y = PAD_TOP + (1 - (d.value - min) / range) * (VIEWBOX_HEIGHT - PAD_TOP - PAD_BOTTOM);
    return { x, y };
  });
  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath =
    fill && n > 1
      ? `M ${points[0].x} ${points[0].y} L ${points
          .slice(1)
          .map((p) => `${p.x} ${p.y}`)
          .join(" L ")} L ${points[n - 1].x} ${VIEWBOX_HEIGHT - PAD_BOTTOM} L ${points[0].x} ${
          VIEWBOX_HEIGHT - PAD_BOTTOM
        } Z`
      : null;

  const gradientId = `rt-linechart-grad-${color.replace(/[^a-zA-Z0-9]/g, "")}`;
  const mid = (max + min) / 2;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", ...style }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 6 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 10,
            color: "var(--color-text-muted)",
            padding: "0 0 0 4px",
            flexShrink: 0,
          }}
        >
          <span style={{ lineHeight: 1 }}>{formatValue(max)}</span>
          <span style={{ lineHeight: 1 }}>{formatValue(mid)}</span>
          <span style={{ lineHeight: 1 }}>{formatValue(min)}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${viewBoxWidth} ${VIEWBOX_HEIGHT}`}
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            {[PAD_TOP, VIEWBOX_HEIGHT / 2, VIEWBOX_HEIGHT - PAD_BOTTOM].map((y) => (
              <line
                key={y}
                x1={PAD_X}
                x2={viewBoxWidth - PAD_X}
                y1={y}
                y2={y}
                stroke="var(--color-border-light)"
                strokeWidth={1}
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {areaPath != null && (
              <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
            )}
            <polyline
              points={linePoints}
              fill="none"
              stroke={color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 28, gap: 4 }}>
        {data.map((d, i) => (
          <span
            key={`${d.label}-${i}`}
            style={{
              fontSize: 11,
              color: "var(--color-text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: 1.2,
            }}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
