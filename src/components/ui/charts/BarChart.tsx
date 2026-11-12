import type { CSSProperties } from "react";

export interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  highlightMax?: boolean;
  style?: CSSProperties;
}

export function BarChart({ data, height = 160, color = "var(--color-primary)", highlightMax = false, style }: BarChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const maxIndex = data.reduce(
    (best, d, i) => (d.value > data[best].value ? i : best),
    0,
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        gap: 4,
        height,
        width: "100%",
        ...style,
      }}
    >
      {data.map((d, i) => {
        const isMax = i === maxIndex;
        const dimmed = highlightMax && !isMax;
        const barColor = dimmed ? "rgba(59, 130, 246, 0.25)" : color;
        const barHeightPct = Math.max((d.value / maxValue) * 100, d.value > 0 ? 4 : 0);
        return (
          <div
            key={`${d.label}-${i}`}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 4,
              minWidth: 0,
              height: "100%",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-navy)",
                visibility: highlightMax && !isMax ? "hidden" : "visible",
                lineHeight: 1.2,
              }}
            >
              {d.value}
            </span>
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                minHeight: 0,
              }}
            >
              <div
                style={{
                  width: "60%",
                  minWidth: 16,
                  height: `${barHeightPct}%`,
                  background: barColor,
                  borderRadius: "6px 6px 2px 2px",
                  transition: "height .3s ease",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                color: "var(--color-text-muted)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
                lineHeight: 1.2,
              }}
            >
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
