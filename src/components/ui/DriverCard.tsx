import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import { Avatar } from "./Avatar";
import { StatusBadge, type StatusBadgeStatus } from "./StatusBadge";

/** Thẻ tài xế: avatar + tên + xe/biển + rating + trạng thái. */
export function DriverCard({
  name,
  sub,
  src,
  rating,
  status,
  actions,
  style,
}: {
  name: string;
  /** Xe / biển số / ghi chú phụ. */
  sub?: string;
  src?: string;
  rating?: number;
  status?: StatusBadgeStatus;
  actions?: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 14,
        backgroundColor: "var(--color-bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-light)",
        boxShadow: "var(--shadow-card)",
        ...style,
      }}
    >
      <Avatar src={src} name={name} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </span>
          {typeof rating === "number" && (
            <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 12, color: "var(--color-warning)", fontWeight: 600 }}>
              <Star size={12} fill="currentColor" /> {rating.toFixed(1)}
            </span>
          )}
        </div>
        {sub && <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{sub}</div>}
        {status && (
          <div style={{ marginTop: 6 }}>
            <StatusBadge status={status} size="sm" />
          </div>
        )}
      </div>
      {actions}
    </div>
  );
}
