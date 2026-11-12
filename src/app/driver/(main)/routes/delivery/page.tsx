"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, Phone, XCircle, MoreHorizontal } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';

export default function DeliveryStatusPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert("Cập nhật thành công!");
    router.back();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-app)', display: 'flex', flexDirection: 'column', paddingBottom: 96 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16,
        backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-light)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => router.back()} aria-label="Quay lại" style={{ padding: 8, marginLeft: -8, color: 'var(--color-text-main)', display: 'flex' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Giao hàng</h1>
        <button aria-label="Tùy chọn" style={{ padding: 8, marginRight: -8, color: 'var(--color-text-main)', display: 'flex', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

        {/* Progress */}
        <div style={{ width: '100%', maxWidth: 320, marginBottom: 48 }}>
          <Card padding={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: 14 }}>Điểm 5/25</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>20%</span>
            </div>
            <ProgressBar value={20} />
          </Card>
        </div>

        {/* Status Icon */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{ width: 96, height: 96, backgroundColor: 'var(--color-success-light)', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
          <div style={{ width: 80, height: 80, backgroundColor: 'var(--color-success)', borderRadius: '50%', border: '4px solid var(--color-bg-surface)', boxShadow: 'var(--shadow-pop)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, color: '#FFFFFF' }}>
            <Check size={40} strokeWidth={3} />
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes ping {
            75%, 100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
          }
        ` }} />

        {/* Text Content */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-navy)', margin: 0, marginBottom: 8 }}>Đã đến nơi</h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: 250, lineHeight: 1.5, margin: 0, marginBottom: 48 }}>
          72 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM
        </p>

        {/* Actions */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
          <Button size="lg" fullWidth onClick={handleSuccess}>
            Đã giao thành công
          </Button>

          <Button
            size="lg"
            fullWidth
            variant="secondary"
            icon={<XCircle size={20} color="var(--color-danger)" />}
          >
            Khách chưa nhận
          </Button>

          <Button
            size="lg"
            fullWidth
            variant="secondary"
            icon={<Phone size={20} color="var(--color-primary)" />}
          >
            Gọi khách hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
