import type { CSSProperties, ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  style?: CSSProperties;
}

export function EmptyState({ icon, title, description, action, style }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 32,
        gap: 8,
        ...style,
      }}
    >
      {icon != null && (
        <span
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--color-bg-app)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-text-muted)",
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      )}
      <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-navy)" }}>{title}</span>
      {description != null && (
        <span style={{ fontSize: 13, color: "var(--color-text-muted)", maxWidth: 320 }}>
          {description}
        </span>
      )}
      {action != null && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
