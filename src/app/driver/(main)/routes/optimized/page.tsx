"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui';

export default function OptimizedRoutePage() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: 'var(--color-bg-app)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', height: '100dvh', overflow: 'hidden' }}>
      {/* Header overlaid on map */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 16, zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => router.back()} aria-label="Quay lại" style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-navy)', boxShadow: 'var(--shadow-pop)', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} style={{ marginLeft: -4 }} />
        </button>
        <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '8px 16px', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-pop)', fontWeight: 700, color: 'var(--color-navy)', fontSize: 14 }}>
          Tuyến được tối ưu
        </div>
        <div style={{ width: 40 }} aria-hidden />
      </div>

      {/* Map Background (Mockup) */}
      <div style={{ flex: 1, backgroundColor: 'var(--color-border-light)', position: 'relative', overflow: 'hidden' }}>
        {/* Simple map grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />

        {/* Mock Route Path SVG */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M100,150 L200,100 L250,200 L150,300 L50,250 Z" fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinejoin="round" />
          <path d="M100,150 L200,100 L250,200 L150,300 L50,250 Z" fill="none" stroke="var(--color-success-light)" strokeWidth="2" strokeLinejoin="round" />
        </svg>

        {/* Map Pins */}
        {[
          { x: 100, y: 150, n: 1, bg: 'var(--color-primary)' },
          { x: 200, y: 100, n: 2, bg: 'var(--color-sky)' },
          { x: 250, y: 200, n: 3, bg: 'var(--color-warning)' },
          { x: 150, y: 300, n: 4, bg: 'var(--color-success)' },
          { x: 50, y: 250, n: 5, bg: 'var(--color-navy)' },
        ].map((pin) => (
          <div key={pin.n} style={{ position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%, -100%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: pin.bg, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, boxShadow: 'var(--shadow-pop)', fontSize: 14, border: '2px solid #FFFFFF' }}>
              {pin.n}
            </div>
            <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${pin.bg}`, marginTop: -2 }} />
          </div>
        ))}

        {/* Current Location */}
        <div style={{ position: 'absolute', left: 100, top: 150, transform: 'translate(-50%, -50%)' }}>
          <div style={{ width: 16, height: 16, backgroundColor: 'var(--color-primary)', borderRadius: '50%', border: '2px solid #FFFFFF', boxShadow: 'var(--shadow-card)', zIndex: 20, position: 'relative' }} />
          <div style={{ width: 48, height: 48, backgroundColor: 'var(--color-primary)', opacity: 0.2, borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ping {
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      ` }} />

      {/* Bottom Sheet */}
      <div style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        boxShadow: '0 -10px 40px rgba(15, 27, 56, 0.1)', zIndex: 30, padding: 24,
      }}>
        {/* Handle */}
        <div style={{ width: 48, height: 6, backgroundColor: 'var(--color-border-light)', borderRadius: 'var(--radius-pill)', margin: '0 auto 24px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 4 }}>
              <MapPin size={16} /> 25 điểm giao
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', fontSize: 14 }}>
              <Clock size={16} /> 4h 30m
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 4 }}>Chi phí ước tính</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>150.000 đ</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button size="lg" fullWidth onClick={() => router.push('/driver/routes/navigate')}>
            Bắt đầu giao hàng
          </Button>

          <button
            style={{
              width: '100%', padding: 16, borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-primary)', color: 'var(--color-primary)',
              fontWeight: 700, fontSize: 16, backgroundColor: 'var(--color-bg-surface)',
              fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            Lưu tuyến này
          </button>
        </div>
      </div>
    </div>
  );
}
