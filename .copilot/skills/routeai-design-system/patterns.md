# R:t Screen Patterns

Công thức dựng màn hình. Kết hợp tokens + components, không tự chế layout ngoài vùng này.

## 1. Dashboard (web admin)

```
┌ Sidebar (navy #0F1B38, 240px, logo trên, nav dưới) ┐
│  Topbar: tiêu đề trang + search + avatar           │
│  Row 1: 3–4 MetricCard (accent xen kẽ blue/green)  │
│  Row 2: LineChart (tỷ lệ giao 2/3 width)           │
│         + DonutChart (trạng thái 1/3 width)        │
│  Row 3: Bảng đơn gần đây (Card + DeliveryRow)      │
└────────────────────────────────────────────────────┘
```
- Nền `--color-bg-app`, card trắng, gap 16px.
- Tiêu đề: H1 22px; filter thời gian = `SegmentedControl` ngay dưới tiêu đề.
- Không đặt quá 4 MetricCard trên một hàng.

## 2. Màn hình Driver (mobile)

- Nền map full-screen (màn home/navigate), card nổi dưới: `--shadow-pop`, radius `--radius-lg`, padding 16px, bottom 16px.
- Thanh action chính: `Button` `lg` + `fullWidth` đặt trong bottom card (thumb-zone).
- Danh sách điểm giao: `DeliveryRow` xếp dọc trong `Card`, gap 8px; điểm hiện tại `done=false` + badge `in_transit`.
- Chụp ảnh/scan: khung 4:3, nút chụp tròn 64px nền primary, viền trắng 4px.
- Bottom sheet chi tiết: tay cầm 36×4px `--color-border`, kéo lên tối đa 80% màn hình.

## 3. Danh sách & tìm kiếm

- Search: `SearchInput` pill, sticky trên đầu section, nền app.
- Bộ lọc: hàng `Chip` cuộn ngang (`overflow-x: auto`, ẩn scrollbar).
- Trạng thái trống: `EmptyState` — luôn có 1 hành động khôi phục.
- Loading skeleton: khối `--color-bg-app` radius `--radius-md`, animation pulse opacity .5→1.

## 4. Form

- Nhãn trên input (`Input` tự render), gap dọc 16px giữa trường.
- Validate realtime khi blur + submit; lỗi = text `--color-danger` 12px dưới input.
- Nút submit: `primary lg fullWidth` (mobile) / `md` (web), đặt cuối form.
- Form hủy/nguy hiểm: nút `ghost` bên trái, `danger` chỉ khi tác động không hoàn tác.

## 5. Bản đồ (map-first)

- Route: stroke 5px `--color-primary`, nền shadow trắng mờ bên dưới (dùng 2 lớp polyline).
- Điểm giao: pin tròn 28px nền primary + viền trắng 2px; số thứ tự bên trong; đã giao → nền success.
- Vị trí xe: icon tròn 32px navy + viền trắng.
- Legend card nhỏ (trái dưới): nền trắng `--shadow-pop`, font 12px.
- Khoảng cách ETA trên điểm: chip trắng `--shadow-card`, số tabular-nums.

## 6. Data-viz

- Một ý nghĩa = một màu, dùng lại giữa các chart (trạng thái "đang giao" luôn primary, "đã giao" luôn success...).
- Luôn hiển thị đơn vị (đơn, km, %) ở nhãn hoặc tooltip.
- Gridline: 3 dòng nét đứt `--color-border-light`; nhãn trục 11px muted.
- Tránh > 6 segment trong Donut; nhóm phần còn lại thành "Khác" (muted).

## 7. Trạng thái hệ thống

| Tình huống | Thành phần |
|---|---|
| Thành công / xác nhận | toast xanh success, icon Check |
| Lỗi mạng | banner `--color-danger-light`, chữ danger, nút "Thử lại" |
| Đồng bộ chờ | badge vàng `pending` + progress mảnh |
| Offline | chip "Chế độ offline" trên topbar |

## 8. Accessibility

- Đối tượng chạm ≥ 44×44px.
- Contrast: chữ muted `#64748B` chỉ trên nền trắng/light; không dùng muted trên navy (dùng `#cbd5e1`).
- Tập trung bàn phím: focus ring `rgba(59,130,246,.15)` 3px.
- Icon đơn lẻ luôn kèm `aria-label` hoặc title.
