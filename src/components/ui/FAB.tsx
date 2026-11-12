import type { CSSProperties } from "react";

/** FAB nổi kiểu app (map recenter/layers…). */
export function FAB({
  children,
  onClick,
  ariaLabel,
  size = 44,
  color = "var(--color-bg-surface)",
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        position: "fixed",
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        backgroundColor: color,
        color: "var(--color-text-main)",
        boxShadow: "var(--shadow-pop)",
        border: "1px solid var(--color-border-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
