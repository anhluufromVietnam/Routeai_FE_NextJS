# R:t Brand & Logo

Logo R:t = Dynamic R + Smart Route Bar (thanh xanh trong chân R) + Destination Dot.
Chữ nghiêng đặc trưng, font không góc (geometric sans), đậm.

## 1. Bộ asset chuẩn `public/brand/`

| File | Nội dung | Khi nào dùng |
|---|---|---|
| `01_logo_primary.png` | Wordmark R:t (navy + bar xanh) | Nền sáng — hero, login, register, in ấn |
| `02_logo_primary_compact.png` | Wordmark nén | Header/toolbar hẹp, email |
| `03_logo_monogram.png` | Chữ R riêng (có bar xanh) | Icon nhỏ, header app, favicon fallback |
| `05_app_icon_navy_tile_512/192.png` | App icon tile navy | Favicon, PWA, OG |
| `07_app_icon_light_tile_512/192.png` | App icon tile sáng | Biến thể light mode, store |
| `apple-touch-icon-navy.png` | 180px iOS | iOS home screen |
| `og-image.png` | 1200×630 | Social share / openGraph |

## 2. Màu brand

| Màu | HEX | Ghi chú |
|---|---|---|
| Navy | `#001031` | Màu chữ trong **logo asset** (truy từ pack) |
| Route Blue | `#1B78FE` | Bar trong chân R |
| Navy UI | `#0F1B38` | Màu hệ thống UI — xem `tokens.md` |

⚠️ Logo dùng navy đậm hơn UI. **Không đổi màu chữ logo** thành token UI.

## 3. Component React `src/components/brand/Logo.tsx`

```tsx
import { LogoMark, LogoWordmark, LogoLockup } from "@/components/brand/Logo";

<LogoMark variant="light" className="" style={{ height: 28 }} />   // chữ R (132×108)
<LogoWordmark variant="dark" />                                    // R:t trắng trên nền tối
<LogoLockup variant="light" />                                     // mark + wordmark
```
- `variant="light"` = nền sáng (glyph navy) · `"dark"` = nền tối (glyph trắng).
- Bar xanh luôn giữ `#1B78FE` ở mọi variant.
- Vector được trace từ pack 01/02/03 — geometry chính là chuẩn.

## 4. Quy tắc sử dụng

- **Không** kéo giãn, xoay, đổi màu, thêm hiệu ứng đổ bóng cho logo.
- Khoảng thở tối thiểu: bằng ½ chiều cao chữ R quanh logo.
- Trên ảnh nền rối → dùng tile (`05`/`07`) hoặc wordmark trắng.
- Đừng ghép logo với element khác thành lockup tự chế; dùng `LogoLockup` sẵn có.
- Favicon/PWA metadata đã cấu hình trong `src/app/layout.tsx` — không thay trừ khi đổi brand.
