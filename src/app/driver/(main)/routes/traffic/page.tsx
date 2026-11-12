"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui';

export default function TrafficPage() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: 'var(--color-bg-app)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', height: '100dvh', overflow: 'hidden' }}>
      {/* Header overlaid on map */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 16, zIndex: 20, display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-bg-surface)', boxShadow: 'var(--shadow-card)' }}>
        <button onClick={() => router.back()} aria-label="Quay lại" style={{ padding: 8, marginLeft: -8, color: 'var(--color-text-main)', display: 'flex' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', textAlign: 'center', marginRight: 40, margin: 0 }}>Tình trạng giao thông</h1>
      </div>

      {/* Map Background (Mockup) */}
      <div style={{ flex: 1, backgroundColor: 'var(--color-border-light)', position: 'relative', overflow: 'hidden', marginTop: 60 }}>
        {/* Simple map grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }} />

        {/* Mock Traffic Paths */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Main Route */}
          {/* Green section */}
          <path d="M50,400 L120,320 L150,250" fill="none" stroke="var(--color-success)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Yellow section */}
          <path d="M150,250 L200,180" fill="none" stroke="var(--color-warning)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Red section */}
          <path d="M200,180 L250,120 L300,150" fill="none" stroke="var(--color-danger)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Green section again */}
          <path d="M300,150 L350,200" fill="none" stroke="var(--color-success)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Alternative Route (Dashed) */}
          <path d="M150,250 L100,180 L180,100 L250,120" fill="none" stroke="var(--color-sky)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 10" />
        </svg>

        {/* Current Location */}
        <div style={{ position: 'absolute', left: 150, top: 250, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
          <div style={{ width: 20, height: 20, backgroundColor: 'var(--color-primary)', borderRadius: '50%', border: '2px solid #FFFFFF', boxShadow: 'var(--shadow-card)' }} />
          <div style={{ width: 64, height: 64, backgroundColor: 'var(--color-primary)', opacity: 0.2, borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', zIndex: -1 }} />
        </div>

        {/* Traffic Alert Icon on Map */}
        <div style={{ position: 'absolute', left: 225, top: 150, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <div style={{ width: 32, height: 32, backgroundColor: 'var(--color-bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-pop)', border: '1px solid var(--color-danger-light)', color: 'var(--color-danger)' }}>
            <AlertTriangle size={18} />
          </div>
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

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 24, height: 8, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-success)', marginRight: 8 }} />
            <span style={{ color: 'var(--color-text-main)', fontSize: 14, fontWeight: 500 }}>Nhanh</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 24, height: 8, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-warning)', marginRight: 8 }} />
            <span style={{ color: 'var(--color-text-main)', fontSize: 14, fontWeight: 500 }}>Trung bình</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 24, height: 8, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-danger)', marginRight: 8 }} />
            <span style={{ color: 'var(--color-text-main)', fontSize: 14, fontWeight: 500 }}>Chậm</span>
          </div>
        </div>

        {/* Alert Box */}
        <Card padding={16} style={{ backgroundColor: 'var(--color-danger-light)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ marginTop: 2, color: 'var(--color-danger)', flexShrink: 0 }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <p style={{ color: 'var(--color-danger)', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
              Đoạn đường phía trước kẹt xe, thời gian có thể lâu hơn 12 phút
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
