'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { Bell, MoreVertical } from 'lucide-react';
import { Card, StatusBadge, ProgressBar, Button, SectionTitle } from '@/components/ui';

export default function DriverHome() {
  const { user } = useAuth();
  const userName = user?.full_name || user?.email?.split('@')[0] || 'Nguyễn Văn A';

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24, backgroundColor: 'var(--color-bg-app)', paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Image src="/brand/03_logo_monogram.png" alt="R:t" width={34} height={28} preload />
          <div>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)', margin: 0, marginBottom: 4 }}>Xin chào,</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-navy)', margin: 0 }}>{userName}</h2>
          </div>
        </div>
        <button
          aria-label="Thông báo"
          style={{
            padding: 8, backgroundColor: 'var(--color-bg-surface)', borderRadius: '50%',
            border: '1px solid var(--color-border-light)', color: 'var(--color-navy)', display: 'flex',
            boxShadow: 'var(--shadow-card)', cursor: 'pointer',
          }}
        >
          <Bell size={24} />
        </button>
      </div>

      {/* Active Route Card */}
      <Card padding={20} style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ marginBottom: 8 }}>
              <StatusBadge status="in_transit" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-navy)', margin: 0 }}>Tuyến sáng 12/05</h3>
          </div>
          <button
            aria-label="Tùy chọn"
            style={{
              padding: 4, backgroundColor: 'transparent', border: 'none',
              color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex',
            }}
          >
            <MoreVertical size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-navy)', margin: 0, fontVariantNumeric: 'tabular-nums' }}>25</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>điểm giao</p>
          </div>
          <div>
            <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-navy)', margin: 0, fontVariantNumeric: 'tabular-nums' }}>
              120<span style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-muted)' }}>km</span>
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>quãng đường</p>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
            <span style={{ color: 'var(--color-navy)' }}>Tiến độ</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>72%</span>
          </div>
          <ProgressBar value={72} />
        </div>

        <Button fullWidth size="lg">
          Tiếp tục giao
        </Button>
      </Card>

      {/* Upcoming Routes */}
      <div>
        <div style={{ marginBottom: 16 }}>
          <SectionTitle title="Tuyến sắp tới" />
        </div>
        <Card padding={16} hoverable style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontWeight: 700, color: 'var(--color-navy)', margin: 0, marginBottom: 4 }}>Tuyến chiều 12/05</h4>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)', margin: 0, fontVariantNumeric: 'tabular-nums' }}>18 điểm giao • 85 km</p>
          </div>
          <Button variant="ghost" size="sm">
            Xem chi tiết
          </Button>
        </Card>
      </div>
    </div>
  );
}
