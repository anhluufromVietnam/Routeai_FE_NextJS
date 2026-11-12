import type { CSSProperties } from "react";
import { ChevronLeft } from "lucide-react";

/** TopBar kiểu app mobile: back trái, tiêu đề giữa, action phải. Sticky mặc định. */
export function TopBar({
  title,
  onBack,
  action,
  sticky = true,
  style,
}: {
  title: string;
  onBack?: () => void;
  action?: React.ReactNode;
  sticky?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 16px",
        backgroundColor: "var(--color-bg-surface)",
        borderBottom: "1px solid var(--color-border-light)",
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : undefined,
        zIndex: 10,
        ...style,
      }}
    >
      {onBack ? (
        <button
          aria-label="Quay lại"
          onClick={onBack}
          style={{ display: "flex", padding: 8, marginLeft: -8, color: "var(--color-text-main)" }}
        >
          <ChevronLeft size={24} />
        </button>
      ) : (
        <div style={{ width: 24 }} />
      )}
      <h1 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: "var(--color-text-main)", textAlign: "center", margin: 0 }}>
        {title}
      </h1>
      <div style={{ minWidth: 24, display: "flex", justifyContent: "flex-end" }}>{action}</div>
    </div>
  );
}
