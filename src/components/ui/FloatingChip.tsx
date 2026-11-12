import type { CSSProperties } from "react";

/** Floating chip nổi trên map: tiêu đề + progress bar + nhãn 5/25. */
export function FloatingChip({
  label,
  value,
  progress,
  progressLabel,
  color = "var(--color-primary)",
  style,
}: {
  label: string;
  value?: string;
  /** 0–100 */
  progress?: number;
  progressLabel?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        backgroundColor: "rgba(255,255,255,.94)",
        backdropFilter: "blur(6px)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-pop)",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "var(--radius-pill)", backgroundColor: color }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-main)" }}>{label}</span>
        {value && (
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-main)", fontVariantNumeric: "tabular-nums" }}>
            {value}
          </span>
        )}
      </div>
      {typeof progress === "number" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 72, height: 6, borderRadius: "var(--radius-pill)", backgroundColor: "var(--color-border-light)", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", borderRadius: "var(--radius-pill)", backgroundColor: color, transition: "width 300ms ease-out" }} />
          </div>
          {progressLabel && (
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", fontVariantNumeric: "tabular-nums" }}>
              {progressLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
