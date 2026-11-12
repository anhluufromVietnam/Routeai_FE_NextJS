import type { CSSProperties } from "react";

export type StatusBadgeStatus =
  | "delivered"
  | "in_transit"
  | "pending"
  | "failed"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

const STATUS_STYLES: Record<StatusBadgeStatus, { color: string; bg: string; label: string }> = {
  delivered: { color: "var(--color-success)", bg: "var(--color-success-light)", label: "Đã giao" },
  in_transit: { color: "var(--color-primary)", bg: "var(--color-primary-light)", label: "Đang giao" },
  pending: { color: "var(--color-warning)", bg: "var(--color-warning-light)", label: "Chờ xử lý" },
  failed: { color: "var(--color-danger)", bg: "var(--color-danger-light)", label: "Thất bại" },
  success: { color: "var(--color-success)", bg: "var(--color-success-light)", label: "Thành công" },
  warning: { color: "var(--color-warning)", bg: "var(--color-warning-light)", label: "Cảnh báo" },
  error: { color: "var(--color-danger)", bg: "var(--color-danger-light)", label: "Lỗi" },
  info: { color: "var(--color-primary)", bg: "var(--color-primary-light)", label: "Thông tin" },
  neutral: { color: "var(--color-text-muted)", bg: "var(--color-bg-app)", label: "Trung tính" },
};

export interface StatusBadgeProps {
  status: StatusBadgeStatus;
  label?: string;
  size?: "sm" | "md";
  style?: CSSProperties;
}

export function StatusBadge({ status, label, size = "md", style }: StatusBadgeProps) {
  const s = STATUS_STYLES[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: s.bg,
        color: s.color,
        borderRadius: "var(--radius-pill)",
        fontSize: size === "sm" ? 12 : 13,
        fontWeight: 600,
        padding: "4px 10px",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }}
      />
      {label ?? s.label}
    </span>
  );
}
