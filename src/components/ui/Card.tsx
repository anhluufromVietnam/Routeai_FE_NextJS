"use client";

import { useState } from "react";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export interface CardProps {
  padding?: number | string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  hoverable?: boolean;
}

export function Card({ padding = 16, children, style, onClick, hoverable = false }: CardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={hoverable ? () => setHovered(true) : undefined}
      onMouseLeave={hoverable ? () => setHovered(false) : undefined}
      style={{
        background: "var(--color-bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-light)",
        boxShadow: hovered ? "var(--shadow-pop)" : "var(--shadow-card)",
        padding,
        transition: "box-shadow .2s ease, border-color .2s ease",
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface SectionTitleProps {
  title: string;
  action?: ReactNode;
  style?: CSSProperties;
}

export function SectionTitle({ title, action, style }: SectionTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        ...style,
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 600, color: "var(--color-navy)" }}>{title}</span>
      {action}
    </div>
  );
}
