"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown, CheckCircle2, TrendingUp, Route } from 'lucide-react';
import { Card, MetricCard, SectionTitle, LineChart } from '@/components/ui';

const REVENUE = [
  { label: '1', value: 4 },
  { label: '5', value: 9 },
  { label: '10', value: 13 },
  { label: '15', value: 11 },
  { label: '20', value: 17 },
  { label: '25', value: 19 },
  { label: '30', value: 16 },
];

const TRANSACTIONS = [
  { name: 'Tuyến sáng 12/05', time: '12/05/2024 - 12:30', amount: '+ 250.000 đ' },
  { name: 'Tuyến chiều 11/05', time: '11/05/2024 - 18:00', amount: '+ 180.000 đ' },
  { name: 'Tuyến sáng 11/05', time: '11/05/2024 - 12:00', amount: '+ 320.000 đ' },
];

export default function DetailedReportPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-app)', paddingBottom: 96 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: 16,
        backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-light)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => router.back()} aria-label="Quay lại" style={{ padding: 8, marginLeft: -8, color: 'var(--color-text-main)', display: 'flex' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', textAlign: 'center', marginRight: 40, margin: 0 }}>Thống kê chi tiết</h1>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Month Filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-navy)', margin: 0 }}>Tháng 5/2024</h2>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 500, backgroundColor: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: 'none', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>
            Tháng này <ChevronDown size={16} />
          </button>
        </div>

        {/* Line Chart Area */}
        <Card padding={20}>
          <h3 style={{ color: 'var(--color-text-muted)', fontWeight: 500, fontSize: 14, margin: 0, marginBottom: 16 }}>Doanh thu (triệu đồng)</h3>
          <LineChart data={REVENUE} height={160} fill />
        </Card>

        {/* Overall Stats */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <SectionTitle title="Thống kê" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            <MetricCard label="Đơn hoàn thành" value={450} accent="green" icon={<CheckCircle2 size={18} />} />
            <MetricCard label="Tổng doanh thu" value="25.400.000 đ" accent="blue" icon={<TrendingUp size={18} />} />
            <MetricCard label="Tổng quãng đường" value="2,150 km" accent="amber" icon={<Route size={18} />} />
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <SectionTitle title="Lịch sử giao dịch" />
          </div>
          <Card padding={16}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {TRANSACTIONS.map((tx, i) => (
                <div
                  key={tx.name}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingBottom: i < TRANSACTIONS.length - 1 ? 16 : 0,
                    borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: 16 }}>{tx.name}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{tx.time}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</div>
                </div>
              ))}

            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
