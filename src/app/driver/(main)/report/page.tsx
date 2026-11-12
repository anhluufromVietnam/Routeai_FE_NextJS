"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Package, CheckCircle2, Percent } from 'lucide-react';
import { Card, MetricCard, SegmentedControl, SectionTitle, BarChart, Button } from '@/components/ui';

const HOURLY = [
  { label: '06h', value: 3 },
  { label: '08h', value: 6 },
  { label: '10h', value: 4 },
  { label: '12h', value: 9 },
  { label: '14h', value: 5 },
  { label: '16h', value: 7 },
  { label: '18h', value: 4 },
  { label: '20h', value: 2 },
];

const SUMMARY = [
  { label: 'Doanh thu', value: '1.250.000 đ' },
  { label: 'Quãng đường', value: '120 km' },
  { label: 'Thời gian', value: '4h 30m' },
];

export default function DailyReportPage() {
  const router = useRouter();
  const [range, setRange] = useState('day');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-app)', paddingBottom: 96 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '16px',
        backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-light)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => router.back()} aria-label="Quay lại" style={{ padding: 8, marginLeft: -8, color: 'var(--color-text-main)', display: 'flex' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', textAlign: 'center', marginRight: 40 }}>Báo cáo</h1>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SegmentedControl
          options={[
            { value: 'day', label: 'Ngày' },
            { value: 'week', label: 'Tuần' },
            { value: 'month', label: 'Tháng' },
          ]}
          value={range}
          onChange={setRange}
        />

        {/* Date Selector */}
        <Card padding={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button aria-label="Ngày trước" style={{ padding: 4, color: 'var(--color-text-muted)', display: 'flex' }}>
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontWeight: 700, color: 'var(--color-text-main)', fontVariantNumeric: 'tabular-nums' }}>12/05/2024</span>
            <button aria-label="Ngày sau" style={{ padding: 4, color: 'var(--color-text-muted)', display: 'flex' }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </Card>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
          <MetricCard label="Tổng đơn" value={25} accent="blue" icon={<Package size={18} />} />
          <MetricCard label="Hoàn thành" value={23} accent="green" icon={<CheckCircle2 size={18} />} delta={{ value: '+8%', direction: 'up', positive: true }} />
          <MetricCard label="Tỷ lệ nhận" value="92%" accent="blue" icon={<Percent size={18} />} />
        </div>

        {/* Summary Metrics */}
        <Card padding={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {SUMMARY.map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && <div style={{ width: 1, height: 32, backgroundColor: 'var(--color-border-light)' }} />}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'center' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: 'var(--color-text-main)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{item.value}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Chart */}
        <Card padding={20}>
          <SectionTitle
            title="Số đơn theo khung giờ"
            action={<Button variant="ghost" size="sm" onClick={() => router.push('/driver/report/detailed')}>Chi tiết</Button>}
          />
          <div style={{ marginTop: 8 }}>
            <BarChart data={HOURLY} highlightMax />
          </div>
        </Card>
      </div>
    </div>
  );
}
