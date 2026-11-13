'use client';
import React from 'react';
import { Banknote, Package, Percent, Truck } from 'lucide-react';
import {
  Card,
  MetricCard,
  SectionTitle,
  SegmentedControl,
  StatusBadge,
} from '@/components/ui';
import { DonutChart, LineChart } from '@/components/ui';

const KPIS = [
  {
    label: 'Tổng đơn',
    value: '1.248',
    delta: { value: '+8.2%', direction: 'up' as const, positive: true },
    accent: 'blue' as const,
    icon: <Package size={18} />,
  },
  {
    label: 'Giao đúng giờ',
    value: '98.7%',
    delta: { value: '+1.1%', direction: 'up' as const, positive: true },
    accent: 'green' as const,
    icon: <Percent size={18} />,
  },
  {
    label: 'Doanh thu',
    value: '45.2M đ',
    delta: { value: '+6.8%', direction: 'up' as const, positive: true },
    accent: 'amber' as const,
    icon: <Banknote size={18} />,
  },
  {
    label: 'Tài xế đang chạy',
    value: '348',
    delta: { value: '-2.4%', direction: 'down' as const, positive: false },
    accent: 'red' as const,
    icon: <Truck size={18} />,
  },
];

const DELIVERY_RATE = [
  { label: 'T2', value: 92 },
  { label: 'T3', value: 94 },
  { label: 'T4', value: 90 },
  { label: 'T5', value: 96 },
  { label: 'T6', value: 93 },
  { label: 'T7', value: 97 },
  { label: 'CN', value: 95 },
];

const STATUS_SEGMENTS = [
  { label: 'Đã giao', value: 862, color: 'var(--color-success)' },
  { label: 'Đang giao', value: 214, color: 'var(--color-primary)' },
  { label: 'Chờ xử lý', value: 148, color: 'var(--color-warning)' },
  { label: 'Thất bại', value: 24, color: 'var(--color-danger)' },
];

const RECENT_ORDERS = [
  { code: 'RAI-89241', customer: 'Cửa hàng Bách Hoá Hoa Lư', driver: 'Nguyễn Văn A', address: '23 Nguyễn Huệ, Q.1', total: '180.000 đ', status: 'in_transit' as const },
  { code: 'RAI-89238', customer: 'Siêu thị Minh Phát', driver: 'Trần Thị B', address: '88 Lê Lợi, Q.3', total: '455.000 đ', status: 'delivered' as const },
  { code: 'RAI-89235', customer: 'Nhà hàng Kim Long', driver: 'Phạm Văn C', address: '12 Pasteur, Q.1', total: '320.000 đ', status: 'pending' as const },
  { code: 'RAI-89230', customer: 'Điện máy Anh Khuê', driver: 'Lê Thị D', address: '45 Võ Văn Tần, Q.3', total: '1.250.000 đ', status: 'delivered' as const },
  { code: 'RAI-89227', customer: 'Tạp hoá Cô Sáu', driver: 'Nguyễn Văn E', address: '7 Cách Mạng Tháng 8', total: '95.000 đ', status: 'failed' as const },
];

export default function AdminOverviewPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <SegmentedControl
          options={[
            { value: 'today', label: 'Hôm nay' },
            { value: 'week', label: 'Tuần' },
            { value: 'month', label: 'Tháng' },
          ]}
          value="today"
          onChange={() => undefined}
        />
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
        {KPIS.map((kpi) => (
          <MetricCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            accent={kpi.accent}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, alignItems: 'stretch' }}>
        <Card padding={20}>
          <SectionTitle title="Tỷ lệ giao hàng" />
          <div style={{ marginTop: 8 }}>
            <LineChart data={DELIVERY_RATE} fill height={190} />
          </div>
        </Card>
        <Card padding={20}>
          <SectionTitle title="Trạng thái đơn hàng" />
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
            <DonutChart
              segments={STATUS_SEGMENTS}
              centerLabel="Tổng đơn"
              centerValue="1.248"
            />
          </div>
        </Card>
      </div>

      {/* Recent orders */}
      <Card padding={0}>
        <div style={{ padding: '16px 16px 0' }}>
          <SectionTitle title="Đơn hàng gần đây" />
        </div>
        <div style={{ overflowX: 'auto', padding: '8px 16px 16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                {['Mã đơn', 'Khách hàng', 'Tài xế', 'Địa chỉ', 'Tổng tiền', 'Trạng thái'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '8px 12px',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      borderBottom: '1px solid var(--color-border-light)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o) => (
                <tr key={o.code}>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-main)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{o.code}</td>
                  <td style={{ padding: '12px', color: 'var(--color-text-main)' }}>{o.customer}</td>
                  <td style={{ padding: '12px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{o.driver}</td>
                  <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{o.address}</td>
                  <td style={{ padding: '12px', color: 'var(--color-text-main)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{o.total}</td>
                  <td style={{ padding: '12px' }}><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
