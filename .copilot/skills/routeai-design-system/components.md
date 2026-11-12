# R:t UI Components — thư viện `src/components/ui/`

Import: `import { Button, Card, StatusBadge, MetricCard, BarChart } from "@/components/ui";`

Quy tắc: **dùng lại trước khi viết mới**. Mở rộng thư viện theo đúng pattern này nếu thiếu.

## Controls

### `Button`
```tsx
<Button variant="primary|secondary|ghost|danger|success" size="sm|md|lg"
        fullWidth loading disabled icon={<Truck size={16}/>} onClick={fn}>
  Giao hàng
</Button>
```
- `primary`: nền `--color-primary`, chữ trắng, hover `--color-primary-hover`.
- `secondary`: nền trắng, border `--color-border`, chữ navy.
- `ghost`: trong suốt, chữ primary. `danger`: `--color-danger`. `success`: `--color-success`.
- `loading` thay icon bằng spinner; `disabled` opacity .5.

### `Input` / `SearchInput`
```tsx
<Input label="Địa chỉ" error="Bắt buộc nhập" leftIcon={<MapPin/>} placeholder="..."/>
<SearchInput placeholder="Tìm đơn hàng..."/>
```
Height 44px, radius `--radius-md`, focus ring `rgba(59,130,246,.15)` + border primary, error border `--color-danger` + text lỗi bên dưới.

### `SegmentedControl`
```tsx
<SegmentedControl options={[{value:"day",label:"Ngày"},...]} value={v} onChange={setV}/>
```
Thanh `#EEF2F7` radius `--radius-md`, option active nền trắng + `--shadow-card`.

### `Toggle` · `Chip`
```tsx
<Toggle checked={on} onChange={setOn}/>
<Chip label="Hôm nay" selected onClick={fn}/>
```
Chip selected: nền `--color-primary-light`, chữ primary, weight 600.

## Trạng thái & dữ liệu

### `StatusBadge`
```tsx
<StatusBadge status="in_transit"/>          // → "Đang giao"
<StatusBadge status="delivered" label="Hoàn tất"/>
```
`status`: `delivered` (xanh lá) · `in_transit` (xanh dương) · `pending` (vàng) · `failed` (đỏ) · `success|warning|error|info|neutral`. Pill + dot 6px, nền tinted-light tương ứng.

### `MetricCard`
```tsx
<MetricCard label="Đơn hôm nay" value={25} accent="blue" icon={<Package/>}
            delta={{value:"+12%", direction:"up", positive:true}}/>
```
Icon trong ô 36px tinted theo `accent` (`blue|green|amber|red`), value 22px bold, delta pill ▲/▼ (up+positive → success, còn lại → danger).

### `Card` · `SectionTitle`
```tsx
<Card padding={16} hoverable>...</Card>
<SectionTitle title="Tuyến hôm nay" action={<Button size="sm" variant="ghost">Chi tiết</Button>}/>
```
Card: nền trắng, radius `--radius-lg`, border `--color-border-light`, shadow `--shadow-card`.

### `ProgressBar`
```tsx
<ProgressBar value={72} showLabel color="var(--color-success)"/>
```
Track `--color-border-light`, radius pill, transition width 300ms.

### `DeliveryRow`
```tsx
<DeliveryRow index={3} done address="23 Nguyễn Huệ, Q.1"
             sub="GPKD · 2.4 km" right={<StatusBadge status="delivered"/>}/>
```
Số thứ tự trong vòng 24px (done: nền primary chữ trắng), hàng card radius `--radius-md`.

### `EmptyState`
```tsx
<EmptyState icon={<Inbox/>} title="Chưa có đơn nào" description="..."
            action={<Button size="sm">Tạo đơn</Button>}/>
```

## Charts (SVG thuần, không thư viện ngoài)

| Component | Dùng khi |
|---|---|
| `BarChart` | Số đơn theo khung giờ, so sánh danh mục. `data: {label,value}[]`, `highlightMax` làm nổi cột cao nhất, cột còn lại `rgba(59,130,246,.25)` |
| `LineChart` | Xu hướng theo thời gian. `fill` thêm gradient mờ dưới đường; gridline nét đứt + nhãn trục Y |
| `DonutChart` | Tỷ trọng (đơn theo trạng thái, xe theo loại). `segments: {label,value,color}[]`, legend kèm % |
| `Sparkline` | Mini trend trong MetricCard/list. `data: number[]` |

Màu chart: primary cho dải chính, `--color-sky` phụ, success/warning/danger cho dữ liệu trạng thái. Nhãn trục 11px `--color-text-muted`.

## Lưu ý triển khai

- Component dùng inline style + CSS var — **không** Tailwind.
- Chỉ `Input`/`SearchInput` và `Card` cần `"use client"` (có state).
- Icon: `lucide-react` (size 16–20, stroke 2, màu qua `currentColor`).
- Kiểm duyệt: `npx tsc --noEmit` + `npx eslint src/components/ui`.
