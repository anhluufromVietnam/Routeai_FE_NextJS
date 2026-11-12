import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_STYLES = `
.rt-btn { transition: filter .15s ease, opacity .15s ease, background-color .15s ease, border-color .15s ease; }
.rt-btn-primary { background-color: var(--color-primary); color: #ffffff; }
.rt-btn-primary:hover:not(:disabled) { background-color: var(--color-primary-hover); }
.rt-btn-secondary { background-color: var(--color-bg-surface); color: var(--color-navy); border: 1px solid var(--color-border); }
.rt-btn-secondary:hover:not(:disabled) { background-color: var(--color-primary-light); border-color: var(--color-primary); }
.rt-btn-ghost { background-color: transparent; color: var(--color-primary); }
.rt-btn-ghost:hover:not(:disabled) { background-color: var(--color-primary-light); }
.rt-btn-danger { background-color: var(--color-danger); color: #ffffff; }
.rt-btn-danger:hover:not(:disabled) { filter: brightness(0.92); }
.rt-btn-success { background-color: var(--color-success); color: #ffffff; }
.rt-btn-success:hover:not(:disabled) { filter: brightness(0.92); }
.rt-btn:disabled { opacity: 0.5; cursor: not-allowed; }
@keyframes rt-btn-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

const SIZE_STYLES: Record<ButtonSize, Pick<CSSProperties, "height" | "padding" | "fontSize">> = {
  sm: { height: 32, padding: "0 12px", fontSize: 13 },
  md: { height: 40, padding: "0 16px", fontSize: 14 },
  lg: { height: 48, padding: "0 20px", fontSize: 16 },
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
  type = "button",
  style,
}: ButtonProps) {
  return (
    <>
      <style>{BUTTON_STYLES}</style>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`rt-btn rt-btn-${variant}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          borderRadius: "var(--radius-md)",
          fontWeight: 600,
          fontFamily: "inherit",
          border: "none",
          cursor: disabled || loading ? "not-allowed" : "pointer",
          width: fullWidth ? "100%" : undefined,
          ...SIZE_STYLES[size],
          ...style,
        }}
      >
        {loading ? (
          <span
            aria-hidden
            style={{
              width: 14,
              height: 14,
              flexShrink: 0,
              borderRadius: "50%",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              animation: "rt-btn-spin 0.7s linear infinite",
            }}
          />
        ) : (
          icon
        )}
        {children != null ? <span>{children}</span> : null}
      </button>
    </>
  );
}
