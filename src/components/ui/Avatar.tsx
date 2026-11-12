import type { CSSProperties } from "react";

/** Avatar tròn: ảnh hoặc chữ cái đầu. Size mặc định 40. */
export function Avatar({
  src,
  name,
  size = 40,
  style,
}: {
  src?: string;
  name?: string;
  size?: number;
  style?: CSSProperties;
}) {
  const initials = (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        backgroundColor: "var(--color-primary-light)",
        color: "var(--color-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size * 0.36,
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name ?? "Avatar"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || "?"
      )}
    </div>
  );
}
