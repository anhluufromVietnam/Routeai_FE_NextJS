import Image from "next/image";
import Link from "next/link";
import { Truck, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* Illustrated background + dark overlay for contrast */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url(/brand/landing-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="brand-pattern-navy"
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(180deg, rgba(15,27,56,.92) 0%, rgba(15,27,56,.78) 55%, rgba(22,41,78,.86) 100%)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* App icon — brand mark thay wordmark */}
        <Image
          src="/brand/05_app_icon_navy_tile_512.png"
          alt="R:t — Smart Route. Better Delivery."
          width={76}
          height={76}
          style={{ width: 76, height: 76, borderRadius: 18, boxShadow: "0 8px 24px rgba(0,0,0,.45)", marginBottom: 12 }}
          priority
        />
        <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1, color: "#fff", marginBottom: 24 }}>
          R<span style={{ color: "var(--color-sky)" }}>:</span>t
        </p>

        {/* Robot mascot */}
        <Image
          src="/brand/robot-cube.png"
          alt="R:t Robot"
          width={190}
          height={168}
          style={{ width: 190, height: "auto", marginBottom: 20 }}
        />

        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px", maxWidth: 360 }}>
          Đúng tuyến. Đúng thời gian. Cùng R:t.
        </h1>
        <p style={{ fontSize: 14, color: "#cbd5e1", maxWidth: 340, margin: "0 0 32px" }}>
          Nền tảng tối ưu tuyến đường thông minh cho giao nhận — kết nối đơn hàng, tài xế, xe và dữ liệu vận hành.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
          <Link
            href="/login"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              height: 48, borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-primary)", color: "#fff",
              fontWeight: 600, fontSize: 16, textDecoration: "none",
              boxShadow: "0 8px 24px rgba(15,27,56,.35)",
            }}
          >
            <Truck size={20} /> Bắt đầu giao hàng
          </Link>
          <Link
            href="/admin/login"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              height: 48, borderRadius: "var(--radius-md)",
              backgroundColor: "rgba(255,255,255,.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,.28)",
              fontWeight: 600, fontSize: 16, textDecoration: "none",
              backdropFilter: "blur(4px)",
            }}
          >
            <ShieldCheck size={20} /> Khu vực quản trị
          </Link>
        </div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 32 }}>
          Every delivery has a direction. Every route has a purpose.
        </p>
      </div>
    </main>
  );
}
