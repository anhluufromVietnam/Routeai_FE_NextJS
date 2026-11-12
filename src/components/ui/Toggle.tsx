import type { CSSProperties, MouseEventHandler } from "react";

export interface ToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export function Toggle({ checked, onChange, disabled = false, style }: ToggleProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!disabled) onChange?.(!checked);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      style={{
        width: 44,
        height: 24,
        flexShrink: 0,
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--color-primary)" : "var(--color-border)",
        border: "none",
        padding: 2,
        display: "inline-flex",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background .2s ease",
        ...style,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(15, 27, 56, 0.25)",
          transition: "transform .2s ease",
          transform: checked ? "translateX(20px)" : "translateX(0)",
        }}
      />
    </button>
  );
}
