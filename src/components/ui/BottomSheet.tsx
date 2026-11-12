"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";

/** Bottom sheet mobile: tay cầm, gập/mở bằng translateY (200ms), nội dung scroll. */
export function BottomSheet({
  handle = true,
  children,
  maxHeight = "70dvh",
  open,
  onOpenChange,
  style,
}: {
  handle?: boolean;
  children: React.ReactNode;
  maxHeight?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: CSSProperties;
}) {
  const [internalOpen, setInternalOpen] = useState(true);
  const isOpen = open ?? internalOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      setInternalOpen(v);
      onOpenChange?.(v);
    },
    [onOpenChange]
  );
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        maxHeight,
        transform: isOpen ? "translateY(0)" : "translateY(calc(100% - 48px))",
        transition: "transform 200ms ease-out",
        backgroundColor: "var(--color-bg-surface)",
        borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
        boxShadow: "var(--shadow-pop)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {handle && (
        <button
          aria-label={isOpen ? "Thu gọn" : "Mở rộng"}
          onClick={() => setOpen(!isOpen)}
          style={{ display: "block", width: "100%", padding: "10px 0 6px", flexShrink: 0 }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: "var(--radius-pill)",
              backgroundColor: "var(--color-border)",
              margin: "0 auto",
            }}
          />
        </button>
      )}
      <div style={{ overflowY: "auto", flex: 1, WebkitOverflowScrolling: "touch" }}>{children}</div>
    </div>
  );
}
