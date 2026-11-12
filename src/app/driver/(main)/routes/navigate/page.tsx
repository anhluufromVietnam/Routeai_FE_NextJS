"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Settings, CloudRain, ShieldAlert, PackageCheck, Phone, MessageSquare } from 'lucide-react';
import { BottomSheet, DriverCard, FloatingChip, MapCanvas } from '@/components/ui';

const STOPS = [
  { x: 20, y: 82, done: true },
  { x: 32, y: 64, done: true },
  { x: 38, y: 48, done: true },
  { x: 50, y: 42, done: true, current: true },
  { x: 62, y: 38 },
  { x: 74, y: 52 },
  { x: 82, y: 24, label: 6 },
];

const PROGRESS = 4; // 4/6 điểm đã giao hiện tại

export default function NavigatePage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-border-light)' }}>
      {/* Top Navigation Instruction Header */}
      <div style={{ backgroundColor: 'var(--color-navy)', color: 'white', padding: 16, display: 'flex', alignItems: 'center', zIndex: 20, boxShadow: 'var(--shadow-pop)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
          <ArrowUpRight size={32} strokeWidth={3} />
          <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1, marginTop: 4 }}>{'> '}1</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'var(--color-text-sidebar)', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Điểm đến tiếp theo</div>
          <div style={{ fontWeight: 700, fontSize: 20, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>72 Nguyễn Trãi, Q.1</div>
          <div style={{ color: 'rgba(255,255,255,.75)', fontWeight: 500 }}>2,5 km • 8 phút</div>
        </div>
        <button aria-label="Cài đặt chỉ dẫn" style={{ padding: 8, marginLeft: 8, color: 'white' }}>
          <Settings size={24} />
        </button>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <MapCanvas stops={STOPS} progress={PROGRESS / STOPS.length} style={{ position: 'absolute', inset: 0 }} />

        {/* Floating delivery status chip — top center */}
        <FloatingChip
          label="Đang giao"
          value={`5/25`}
          progress={20}
          progressLabel="20%"
          style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)' }}
        />

        {/* Floating Actions Right */}
        <div style={{ position: 'absolute', right: 16, top: 64, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 20 }}>
          <button onClick={() => router.push('/driver/routes/weather')} aria-label="Thời tiết" style={{ width: 48, height: 48, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-bg-surface)', boxShadow: 'var(--shadow-pop)', border: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
            <CloudRain size={24} />
          </button>
          <button onClick={() => router.push('/driver/routes/traffic')} aria-label="Giao thông" style={{ width: 48, height: 48, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-bg-surface)', boxShadow: 'var(--shadow-pop)', border: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-warning)' }}>
            <ShieldAlert size={24} />
          </button>
        </div>

        {/* Floating Action Delivery Status */}
        <div style={{ position: 'absolute', right: 16, bottom: 120, zIndex: 20 }}>
          <button onClick={() => router.push('/driver/routes/delivery')} aria-label="Giao tại điểm này" style={{ width: 64, height: 64, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-primary)', boxShadow: '0 10px 24px rgba(59, 130, 246, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative' }}>
            <PackageCheck size={32} />
            <span style={{ position: 'absolute', top: -8, right: -8, backgroundColor: 'var(--color-danger)', color: 'white', fontSize: 12, fontWeight: 700, width: 24, height: 24, borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>1</span>
          </button>
        </div>
      </div>

      {/* Bottom Sheet: ETA + tài xế + hành động */}
      <BottomSheet handle maxHeight="40dvh" style={{ zIndex: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--color-border-light)' }}>
          {[
            { label: 'ETA', value: '08:45' },
            { label: 'Còn lại', value: '18 điểm' },
            { label: 'Thời gian', value: '3h 25m' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && <div style={{ width: 1, height: 40, backgroundColor: 'var(--color-border-light)' }} />}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-text-main)', fontVariantNumeric: 'tabular-nums' }}>{item.value}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ padding: 12 }}>
          <DriverCard
            name="Nguyễn Văn A"
            sub="51-B1 892.43 · Xe tải 1.25 tấn"
            rating={4.8}
            status="in_transit"
            actions={
              <div style={{ display: 'flex', gap: 8 }}>
                <button aria-label="Gọi tài xế" style={{ width: 36, height: 36, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={16} />
                </button>
                <button aria-label="Nhắn tin" style={{ width: 36, height: 36, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={16} />
                </button>
              </div>
            }
          />
        </div>

        <div style={{ padding: '4px 16px 16px', display: 'flex', gap: 12 }}>
          <button onClick={() => router.push('/driver/home')} style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-danger)', color: 'var(--color-danger)', fontWeight: 700, backgroundColor: 'var(--color-bg-surface)' }}>
            Kết thúc tuyến
          </button>
          <button onClick={() => router.push('/driver/routes/delivery')} style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 700 }}>
            Giao tại điểm
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
