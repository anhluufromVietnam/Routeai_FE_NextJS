import type { CSSProperties } from "react";

export interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  style?: CSSProperties;
}

export function ProgressBar({ value, color, height = 8, showLabel = false, style }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, ...style }}>
      {showLabel && (
        <span
          style={{
            alignSelf: "flex-end",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--color-text-muted)",
          }}
        >
          {Math.round(clamped)}%
        </span>
      )}
      <div
        style={{
          width: "100%",
          height,
          background: "var(--color-border-light)",
          borderRadius: "var(--radius-pill)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: "100%",
            background: color ?? "var(--color-primary)",
            borderRadius: "var(--radius-pill)",
            transition: "width .3s ease",
          }}
        />
      </div>
    </div>
  );
}
