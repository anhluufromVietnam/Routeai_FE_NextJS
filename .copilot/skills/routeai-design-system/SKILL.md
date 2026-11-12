---
name: routeai-design-system
description: Thiết kế & code UI cho dự án R:t — tokens, components, chart, pattern màn hình. Dùng khi viết/sửa bất kỳ UI nào (page, component, style) trong repo này.
---

# R:t Design System — Smart Route. Better Delivery.

Hệ thống thiết kế chuẩn cho toàn bộ giao diện R:t (web + mobile driver app).
Mọi thay đổi UI **bắt buộc** bám theo tài liệu này.

## Bố cục skill

| File | Nội dung |
|---|---|
| `tokens.md` | Màu sắc, typography, radius, shadow, spacing, motion |
| `components.md` | Thư viện `src/components/ui/` — props, cách dùng, ví dụ |
| `patterns.md` | Công thức màn hình: dashboard, danh sách, bản đồ, form, empty state |
| `brand-logo.md` | Logo R:t, cách dùng asset `public/brand/` |

## Nguyên tắc bất di bất dịch

1. **Chỉ dùng token** — không viết màu hex lạ trong code UI. Lấy giá trị từ CSS variables trong `src/app/globals.css` (`var(--color-primary)`…). Hex gốc chỉ tồn tại trong `tokens.md`.
2. **Không dùng Tailwind** — dự án không cài Tailwind. Style bằng inline `style={{}}` + CSS variables, hoặc component trong `src/components/ui/`. Class như `bg-white rounded-xl` không có hiệu lực.
3. **Inter là font duy nhất** (đã load qua `next/font` trong `src/app/layout.tsx`).
4. **Minimal & purposeful** — shadow mỏng, border 1px, không gradient trang trí (trừ `brand-gradient` cho hero/thẻ Pro).
5. **Trạng thái rõ ràng** — mọi trạng thái nghiệp vụ dùng `StatusBadge` (Đã giao / Đang giao / Chờ xử lý / Thất bại), màu = ý nghĩa, không dùng màu theo sở thích.
6. **Map-first** — bản đồ là phần tử trung tâm của các màn hình vận hành; card nổi trên map dùng `--shadow-pop` + radius `--radius-lg`.
7. **Mobile-first cho driver app** — chiều dọc, bottom sheet, nút thumb-zone; desktop dashboard dùng grid + sidebar.
8. **Tiếng Việt cho nội dung người dùng**, tiếng Anh cho thuật ngữ kỹ thuật.

## Quy trình khi làm UI

1. Đọc `tokens.md` → chọn token.
2. Kiểm tra `components.md` → đã có component sẵn thì **dùng lại**, không viết mới.
3. Thiếu component → mở rộng `src/components/ui/` theo đúng spec trước, rồi dùng ở page.
4. Chạy `npx tsc --noEmit` && `npx eslint src/components/ui` trước khi hoàn tất.
