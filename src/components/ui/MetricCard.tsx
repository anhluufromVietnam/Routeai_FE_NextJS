import type { CSSProperties, ReactNode } from "react";

type Accent = "blue" | "green" | "amber" | "red";

const ACCENTS: Record<Accent, { main: string; tint: string }> = {
  blue: { main: "var(--color-primary)", tint: "var(--color-primary-light)" },
  green: { main: "var(--color-success)", tint: "var(--color-success-light)" },
  amber: { main: "var(--color-warning)", tint: "var(--color-warning-light)" },
  red: { main: "var(--color-danger)", tint: "var(--color-danger-light)" },
};

export interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; direction: "up" | "down"; positive?: boolean };
  icon?: ReactNode;
  accent?: Accent;
  style?: CSSProperties;
}

export function MetricCard({ label, value, delta, icon, accent = "blue", style }: MetricCardProps) {
  const a = ACCENTS[accent];
  const isPositive = delta ? delta.direction === "up" && delta.positive !== false : false;
  const deltaColor = isPositive ? "var(--color-success)" : "var(--color-danger)";
  const deltaBg = isPositive ? "var(--color-success-light)" : "var(--color-danger-light)";
  const arrow = delta?.direction === "up" ? "▲" : "▼";

  return (
    <div
      style={{
        background: "var(--color-bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-light)",
        boxShadow: "var(--shadow-card)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{label}</span>
        {icon != null && (
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              background: a.tint,
              color: a.main,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}
      </div>
      <span style={{ fontSize: 22, fontWeight: 700, color: "var(--color-navy)", lineHeight: 1.2 }}>
        {value}
      </span>
      {delta && (
        <span
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: deltaBg,
            color: deltaColor,
            borderRadius: "var(--radius-pill)",
            padding: "2px 8px",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          <span aria-hidden>{arrow}</span>
          {delta.value}
        </span>
      )}
    </div>
  );
}
