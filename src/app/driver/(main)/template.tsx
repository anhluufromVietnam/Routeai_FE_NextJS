/**
 * Mobile-app style page transition: remounts on navigation (Next template),
 * slides in gently — matches R:t motion tokens (200ms ease-out).
 */
export default function DriverTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        animation: "rt-page-in 200ms ease-out",
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}
