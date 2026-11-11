"use client";

import type { CSSProperties } from "react";

type LogoVariant = "light" | "dark";

interface LogoBaseProps {
  /** "light" = dùng trên nền sáng (glyph navy), "dark" = dùng trên nền tối (glyph trắng) */
  variant?: LogoVariant;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

const glyph = (variant: LogoVariant) => (variant === "dark" ? "#FFFFFF" : "#0B1F3B");
const ACCENT = "#2F80FF";

function LogoSvg({
  viewBox,
  className,
  style,
  title,
  children,
}: LogoBaseProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title ?? "R:t"}
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}

/** Icon mark: Dynamic R + Smart Route Bar + Destination Dot. Tỉ lệ gốc 120×150. */
export function LogoMark({ variant = "light", className, style, title }: LogoBaseProps) {
  const c = glyph(variant);
  return (
    <LogoSvg viewBox="0 0 120 150" variant={variant} className={className} style={style} title={title}>
      <g transform="skewX(-8)">
        <path d="M14 25 H36 V135 H14 Z" fill={c} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36 25 H57 C78.5 25 89 36.5 89 52.5 C89 68.5 78.5 80 57 80 H36 V59.5 H55.5 C61.5 59.5 65 56.8 65 52.5 C65 48.2 61.5 45.5 55.5 45.5 H36 Z"
          fill={c}
        />
        <path d="M36 80 H58 L88 135 H61 Z" fill={c} />
        <path d="M45.5 88 H57.5 L75 127 H63 Z" fill={ACCENT} />
      </g>
      <circle cx="97" cy="11" r="8.5" fill={ACCENT} />
    </LogoSvg>
  );
}

/** Wordmark đầy đủ: R_t với Destination Dot. Tỉ lệ gốc 250×150. */
export function LogoWordmark({ variant = "light", className, style, title }: LogoBaseProps) {
  const c = glyph(variant);
  return (
    <LogoSvg viewBox="0 0 250 150" variant={variant} className={className} style={style} title={title}>
      <g transform="skewX(-8)">
        <rect x="34" y="25" width="22" height="110" rx="6" fill={c} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56 25 H77 C98.5 25 109 36.5 109 52.5 C109 68.5 98.5 80 77 80 H56 V59.5 H75.5 C81.5 59.5 85 56.8 85 52.5 C85 48.2 81.5 45.5 75.5 45.5 H56 Z"
          fill={c}
        />
        <path d="M56 80 H78 L108 135 H81 Z" fill={c} />
        <path d="M65.5 88 H77.5 L95 127 H83 Z" fill={ACCENT} />
        <rect x="126" y="38" width="18" height="18" rx="9" fill={c} />
        <rect x="126" y="88" width="18" height="18" rx="9" fill={c} />
        <rect x="160" y="25" width="68" height="22" rx="6" fill={c} />
        <rect x="178" y="25" width="22" height="110" rx="6" fill={c} />
      </g>
      <circle cx="117" cy="11" r="8.5" fill={ACCENT} />
    </LogoSvg>
  );
}

/** Lockup: icon mark bên trái + wordmark bên phải. */
export function LogoLockup({ variant = "light", className, style, title }: LogoBaseProps) {
  const c = glyph(variant);
  return (
    <LogoSvg viewBox="0 0 400 150" variant={variant} className={className} style={style} title={title}>
      <g transform="translate(8 0)">
        <g transform="skewX(-8)">
          <path d="M14 25 H36 V135 H14 Z" fill={c} />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36 25 H57 C78.5 25 89 36.5 89 52.5 C89 68.5 78.5 80 57 80 H36 V59.5 H55.5 C61.5 59.5 65 56.8 65 52.5 C65 48.2 61.5 45.5 55.5 45.5 H36 Z"
            fill={c}
          />
          <path d="M36 80 H58 L88 135 H61 Z" fill={c} />
          <path d="M45.5 88 H57.5 L75 127 H63 Z" fill={ACCENT} />
        </g>
        <circle cx="97" cy="11" r="8.5" fill={ACCENT} />
      </g>
      <g transform="translate(146 0)">
        <g transform="skewX(-8)">
          <rect x="34" y="25" width="22" height="110" rx="6" fill={c} />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M56 25 H77 C98.5 25 109 36.5 109 52.5 C109 68.5 98.5 80 77 80 H56 V59.5 H75.5 C81.5 59.5 85 56.8 85 52.5 C85 48.2 81.5 45.5 75.5 45.5 H56 Z"
            fill={c}
          />
          <path d="M56 80 H78 L108 135 H81 Z" fill={c} />
          <path d="M65.5 88 H77.5 L95 127 H83 Z" fill={ACCENT} />
          <rect x="126" y="38" width="18" height="18" rx="9" fill={c} />
          <rect x="126" y="88" width="18" height="18" rx="9" fill={c} />
          <rect x="160" y="25" width="68" height="22" rx="6" fill={c} />
          <rect x="178" y="25" width="22" height="110" rx="6" fill={c} />
        </g>
        <circle cx="117" cy="11" r="8.5" fill={ACCENT} />
      </g>
    </LogoSvg>
  );
}

export default LogoLockup;
