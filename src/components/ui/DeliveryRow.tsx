import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export interface DeliveryRowProps {
  index: number;
  address: string;
  sub?: string;
  right?: ReactNode;
  done?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

export function DeliveryRow({ index, address, sub, right, done = false, onClick, style }: DeliveryRowProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "var(--color-bg-surface)",
        padding: "12px 14px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border-light)",
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 600,
          background: done ? "var(--color-primary)" : "var(--color-bg-surface)",
          border: done ? "1px solid var(--color-primary)" : "1.5px solid var(--color-navy)",
          color: done ? "#FFFFFF" : "var(--color-navy)",
        }}
      >
        {index}
      </span>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-navy)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {address}
        </span>
        {sub != null && (
          <span
            style={{
              fontSize: 12,
              color: "var(--color-text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sub}
          </span>
        )}
      </div>
      {right != null && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}
