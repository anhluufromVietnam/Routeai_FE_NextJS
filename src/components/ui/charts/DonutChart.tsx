import type { CSSProperties } from "react";

export interface DonutChartSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  segments: DonutChartSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
  style?: CSSProperties;
}

const GAP_DEG = 2;

export function DonutChart({
  segments,
  size = 140,
  thickness = 16,
  centerLabel,
  centerValue,
  style,
}: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const gapPx = (GAP_DEG / 360) * circumference;
  const capExtension = thickness;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, ...style }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {total <= 0 ? (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="var(--color-border-light)"
                strokeWidth={thickness}
              />
            ) : (
              segments.map((segment, i) => {
                const start =
                  segments.slice(0, i).reduce((sum, s) => sum + (s.value / total) * circumference, 0) +
                  gapPx / 2;
                const rawLen = (segment.value / total) * circumference - gapPx;
                const dashLen = Math.max(rawLen - capExtension, 1);
                return (
                  <circle
                    key={`${segment.label}-${i}`}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                    strokeDashoffset={-(start + capExtension / 2)}
                  />
                );
              })
            )}
          </g>
        </svg>
        {(centerValue != null || centerLabel != null) && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              textAlign: "center",
            }}
          >
            {centerValue != null && (
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--color-navy)", lineHeight: 1.2 }}>
                {centerValue}
              </span>
            )}
            {centerLabel != null && (
              <span style={{ fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.2 }}>
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
        {segments.map((segment, i) => {
          const pct = total > 0 ? Math.round((segment.value / total) * 100) : 0;
          return (
            <div key={`${segment.label}-${i}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                aria-hidden
                style={{ width: 8, height: 8, borderRadius: "50%", background: segment.color, flexShrink: 0 }}
              />
              <span style={{ flex: 1, fontSize: 12, color: "var(--color-text-muted)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {segment.label}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-navy)" }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
