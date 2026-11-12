# R:t Design Tokens

Nguồn chân lý: `src/app/globals.css` (`:root`). Code UI **chỉ** dùng `var(--...)`, không hardcode hex.

## 1. Màu sắc (Brand palette — spec chính thức)

| Token | HEX | Dùng cho |
|---|---|---|
| `--color-navy` | `#0F1B38` | Brand chính, chữ, sidebar, heading |
| `--color-navy-hover` | `#1A2A52` | Hover trên nền navy |
| `--color-primary` | `#3B82F6` | Action chính, link, chart, route line |
| `--color-primary-hover` | `#2563EB` | Hover nút primary |
| `--color-primary-light` | `#EFF6FF` | Nền tinted primary (chip, icon bg, selected) |
| `--color-sky` | `#60A5FA` | Highlight phụ, phần tử map, chart phụ |
| `--color-success` | `#16B86A` | Trạng thái thành công / giao xong |
| `--color-success-light` | `#E7F8F0` | Nền tinted success |
| `--color-warning` | `#F59E0B` | Chờ xử lý / cần chú ý |
| `--color-warning-light` | `#FEF6E7` | Nền tinted warning |
| `--color-danger` | `#EF4444` | Lỗi / giao thất bại / huỷ |
| `--color-danger-light` | `#FDECEC` | Nền tinted danger |
| `--color-bg-app` | `#F8FAFC` | Nền app |
| `--color-bg-surface` | `#FFFFFF` | Card, panel |
| `--color-bg-sidebar` | `#0F1B38` | Nền sidebar |
| `--color-text-main` | `#0F1B38` | Chữ chính |
| `--color-text-muted` | `#64748B` | Chữ phụ, label, meta |
| `--color-border` | `#CBD5E1` | Border input, divider đậm |
| `--color-border-light` | `#E2E8F0` | Border card, divider thường |

Quy tắc đôi màu: **mọi màu "đậm" phải có cặp "light"** để làm nền tinted (icon square, chip, banner).

## 2. Typography — Inter

| Cấp | Size | Weight | Line-height | Token áp dụng |
|---|---|---|---|---|
| Display | 28px | 700 | 1.2 | Số liệu hero, giá |
| H1 | 22px | 700 | 1.3 | Tiêu đề page |
| H2 | 18px | 700 | 1.4 | Tiêu đề section |
| H3 | 16px | 600 | 1.4 | Tiêu đề card |
| Body | 14px | 400–500 | 1.5 | Nội dung chính |
| Caption | 13px | 500 | 1.4 | Label, sub-text |
| Small | 12px | 500 | 1.4 | Meta, timestamp, badge |
| Tiny | 11px | 500 | 1.3 | Nhãn trục chart |

- Số liệu (KPI, tiền, giờ): dùng `font-variant-numeric: tabular-nums`.
- Chữ trong nút: 600, không dùng 700 để tránh "gồng".

## 3. Radius

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--radius-sm` | 8px | Bar chart, input nhỏ, tag |
| `--radius-md` | 12px | Nút, input, row, segmented control |
| `--radius-lg` | 16px | Card, bottom sheet, panel map |
| `--radius-pill` | 999px | Badge, chip, avatar, progress track |

## 4. Shadow & Elevation

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(15,27,56,.05), 0 1px 3px rgba(15,27,56,.06)` | Card, list row |
| `--shadow-pop` | `0 8px 24px rgba(15,27,56,.12)` | Popover, card nổi trên map, dropdown |

Không dùng shadow đậm hơn; ưu tiên border + shadow mỏng.

## 5. Spacing — bội số của 4

`4 · 8 · 12 · 16 · 20 · 24 · 32`

- Padding card: 16px (card nhỏ 12px).
- Gap giữa card trong grid: 12px (mobile) / 16px (desktop).
- Gap section: 24px.
- Padding màn hình mobile: 16px.

## 6. Motion

- Duration: `120ms` (hover/press) · `200ms` (toggle, chip) · `300ms` (progress, chart, sheet).
- Easing: `ease-out`.
- Chỉ animate: opacity, transform, width/height của progress & bar. Không animate layout khác.
