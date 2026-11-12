import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "R:t — Smarter Routes. Faster Deliveries.",
    short_name: "R:t",
    description:
      "R:t (/ruːt/) — Nền tảng tối ưu tuyến đường thông minh cho giao nhận. Đúng tuyến. Đúng thời gian. Cùng R:t.",
    start_url: "/driver/home",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0F1B38",
    theme_color: "#0F1B38",
    lang: "vi",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
