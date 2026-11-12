"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, GripVertical, Sparkles, MapPinOff } from 'lucide-react';
import { DeliveryRow, StatusBadge, EmptyState, Button } from '@/components/ui';

export default function ScanListPage() {
  const router = useRouter();

  const items = [
    { id: 1, name: 'Nguyễn Thị Lan', address: '72 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM' },
    { id: 2, name: 'Trần Văn An', address: '15 Phan Đăng Lưu, P.3, Q. Phú Nhuận, TP.HCM' },
    { id: 3, name: 'Lê Hoàng Nam', address: '88 Cách Mạng Tháng 8, P.6, Q.3, TP.HCM' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-app)', display: 'flex', flexDirection: 'column', paddingBottom: 160 }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16,
        backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-light)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => router.back()} aria-label="Quay lại" style={{ padding: 8, marginLeft: -8, color: 'var(--color-text-main)', display: 'flex' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Danh sách điểm giao (3)</h1>
        <button style={{ padding: 8, marginRight: -8, color: 'var(--color-primary)', fontWeight: 500, fontSize: 14, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          Sửa
        </button>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
            Sắp xếp theo: <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>Mặc định ▾</span>
          </div>
        </div>

        {/* Address List */}
        {items.length === 0 ? (
          <EmptyState
            icon={<MapPinOff size={24} />}
            title="Chưa có điểm giao"
            description="Quét mã để thêm điểm giao vào danh sách."
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
            {/* Vertical connection line */}
            <div style={{ position: 'absolute', left: 25, top: 32, bottom: 32, width: 2, backgroundColor: 'var(--color-border-light)', zIndex: 0 }} />
            {items.map((item, index) => (
              <div key={item.id} style={{ position: 'relative', zIndex: 10 }}>
                <DeliveryRow
                  index={index + 1}
                  address={item.name}
                  sub={item.address}
                  right={
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <StatusBadge status="pending" size="sm" />
                      <button aria-label="Di chuyển" style={{ color: 'var(--color-text-muted)', padding: 8, background: 'transparent', border: 'none', cursor: 'grab', display: 'flex' }}>
                        <GripVertical size={20} />
                      </button>
                    </span>
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Optimization Box */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 480, margin: '0 auto',
        backgroundColor: 'var(--color-bg-surface)', padding: 16,
        borderTop: '1px solid var(--color-border-light)',
        boxShadow: '0 -10px 20px rgba(15, 27, 56, 0.03)', zIndex: 20,
      }}>
        <div style={{
          backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-lg)', padding: 16,
          marginBottom: 16, border: '1px solid var(--color-primary-light)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 700, marginBottom: 4 }}>
            <Sparkles size={18} style={{ flexShrink: 0 }} />
            Tối ưu tuyến
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14, margin: 0 }}>
            Tìm thứ tự giao hàng tối ưu nhất, tiết kiệm thời gian và nhiên liệu.
          </p>
        </div>

        <Button fullWidth size="lg" onClick={() => router.push('/driver/scan/optimizing')}>
          Tối ưu ngay
        </Button>
      </div>
    </div>
  );
}
