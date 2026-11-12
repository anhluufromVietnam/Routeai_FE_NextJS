import type { CSSProperties, MouseEventHandler } from "react";

export interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  style?: CSSProperties;
}

export function Chip({ label, selected = false, onClick, color, style }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: "var(--radius-pill)",
        padding: "6px 12px",
        fontSize: 13,
        fontFamily: "inherit",
        background: selected ? "var(--color-primary-light)" : "var(--color-bg-app)",
        border: selected ? "1px solid transparent" : "1px solid var(--color-border-light)",
        color: selected ? (color ?? "var(--color-primary)") : "var(--color-text-muted)",
        fontWeight: selected ? 600 : 400,
        cursor: "pointer",
        transition: "background .15s ease, color .15s ease, border-color .15s ease",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {label}
    </button>
  );
}
