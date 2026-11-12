import type { CSSProperties, MouseEventHandler } from "react";

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

export function SegmentedControl({ options, value, onChange, style }: SegmentedControlProps) {
  const handleSelect = (optionValue: string): MouseEventHandler<HTMLButtonElement> => (event) => {
    event.stopPropagation();
    onChange?.(optionValue);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "#EEF2F7",
        borderRadius: "var(--radius-md)",
        padding: 4,
        gap: 2,
        ...style,
      }}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={handleSelect(option.value)}
            style={{
              flex: 1,
              height: 32,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: "none",
              fontFamily: "inherit",
              fontSize: 13,
              padding: "0 10px",
              cursor: "pointer",
              background: isActive ? "var(--color-bg-surface)" : "transparent",
              boxShadow: isActive ? "var(--shadow-card)" : "none",
              color: isActive ? "var(--color-navy)" : "var(--color-text-muted)",
              fontWeight: isActive ? 600 : 400,
              transition: "background .15s ease, color .15s ease, box-shadow .15s ease",
              whiteSpace: "nowrap",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
