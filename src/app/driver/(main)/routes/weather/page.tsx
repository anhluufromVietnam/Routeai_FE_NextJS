"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Cloud, CloudRain, Droplets, Wind, Sun } from 'lucide-react';
import { Card, SectionTitle } from '@/components/ui';

const OVERVIEW = [
  { letter: 'A', tint: 'var(--color-primary-light)', color: 'var(--color-primary)', label: 'Tổng quãng đường', value: '120 km' },
  { letter: 'B', tint: 'var(--color-warning-light)', color: 'var(--color-warning)', label: 'Tổng thời gian', value: '4h 30m' },
  { letter: 'N', tint: 'var(--color-primary-light)', color: 'var(--color-sky)', label: 'Số điểm giao', value: '25' },
];

const HOURLY = [
  { label: '09h', icon: 'cloud', value: '28°' },
  { label: '10h', icon: 'cloud', value: '29°' },
  { label: '11h', icon: 'rain', value: '30°', active: true },
  { label: '12h', icon: 'sun', value: '31°' },
];

export default function WeatherInfoPage() {
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
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', textAlign: 'center', marginRight: 40, margin: 0 }}>Thông tin tuyến</h1>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Overview Stats */}
        <Card padding={16}>
          <h2 style={{ color: 'var(--color-text-muted)', fontWeight: 500, fontSize: 14, margin: 0, marginBottom: 16, textTransform: 'uppercase' }}>Tổng quan</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {OVERVIEW.map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-main)' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: row.tint, color: row.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>
                    {row.letter}
                  </span>
                  {row.label}
                </div>
                <span style={{ fontWeight: 700, color: 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--color-border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-main)' }}>
                Chi phí ước tính
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>150.000 đ</span>
            </div>
          </div>
        </Card>

        {/* Weather Forecast */}
        <Card padding={16}>
          <div style={{ marginBottom: 24 }}>
            <SectionTitle
              title="Dự báo thời tiết"
              action={
                <button aria-label="Mở rộng" style={{ color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}>
                  <ChevronLeft size={20} style={{ transform: 'rotate(-90deg)' }} />
                </button>
              }
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Cloud size={64} color="var(--color-text-muted)" style={{ marginRight: 16 }} />
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>28°</div>
                <div style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>Có mây</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Droplets size={20} color="var(--color-sky)" style={{ marginBottom: 4 }} />
                <span style={{ color: 'var(--color-text-main)', fontWeight: 700, fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>30%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Wind size={20} color="var(--color-sky)" style={{ marginBottom: 4 }} />
                <span style={{ color: 'var(--color-text-main)', fontWeight: 700, fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>30%</span>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {HOURLY.map((hour) => {
              const Icon = hour.icon === 'rain' ? CloudRain : hour.icon === 'sun' ? Sun : Cloud;
              const iconColor = hour.icon === 'rain' ? 'var(--color-sky)' : hour.icon === 'sun' ? 'var(--color-warning)' : 'var(--color-text-muted)';
              return (
                <div
                  key={hour.label}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    backgroundColor: hour.active ? 'var(--color-primary-light)' : 'transparent',
                    padding: '8px 12px', borderRadius: 'var(--radius-md)',
                  }}
                >
                  <span style={{ color: hour.active ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 700, fontSize: 14, marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{hour.label}</span>
                  <Icon size={24} color={iconColor} style={{ marginBottom: 8 }} />
                  <span style={{ fontWeight: 700, color: hour.active ? 'var(--color-primary)' : 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>{hour.value}</span>
                </div>
              );
            })}
          </div>
        </Card>

      </div>
    </div>
  );
}
