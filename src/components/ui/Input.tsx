"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Search } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Input({ label, error, id, leftIcon, rightIcon, style, onFocus, onBlur, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id ?? (label ? `rt-input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  const borderColor = error
    ? "var(--color-danger)"
    : focused
      ? "var(--color-primary)"
      : "var(--color-border)";
  const boxShadow = focused ? "0 0 0 3px rgba(59, 130, 246, 0.15)" : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label != null && (
        <label
          htmlFor={inputId}
          style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-main)", fontFamily: "inherit" }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--color-bg-surface)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          height: 44,
          padding: "0 14px",
          transition: "border-color .15s ease, box-shadow .15s ease",
          boxShadow,
        }}
      >
        {leftIcon != null && (
          <span style={{ display: "inline-flex", color: "var(--color-text-muted)", flexShrink: 0 }}>
            {leftIcon}
          </span>
        )}
        <input
          {...rest}
          id={inputId}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "inherit",
            fontSize: 14,
            color: "var(--color-text-main)",
          }}
        />
        {rightIcon != null && (
          <span style={{ display: "inline-flex", color: "var(--color-text-muted)", flexShrink: 0 }}>
            {rightIcon}
          </span>
        )}
      </div>
      {error != null && (
        <span style={{ fontSize: 12, color: "var(--color-danger)" }}>{error}</span>
      )}
    </div>
  );
}

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
}

export function SearchInput({ leftIcon, style, ...rest }: SearchInputProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-pill)",
        height: 40,
        padding: "0 14px",
        ...style,
      }}
    >
      <span style={{ display: "inline-flex", color: "var(--color-text-muted)", flexShrink: 0 }}>
        {leftIcon ?? <Search size={16} />}
      </span>
      <input
        {...rest}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "inherit",
          fontSize: 14,
          color: "var(--color-text-main)",
        }}
      />
    </div>
  );
}
