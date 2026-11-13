'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, StatusBadge } from '@/components/ui';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

interface PaymentSuccessViewProps {
  bankName: string;
  referenceCode: string;
}

export function PaymentSuccessView({ bankName, referenceCode }: PaymentSuccessViewProps) {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>
      <div className={styles.successIcon}>
        <CheckCircle2 size={40} color="var(--color-success)" />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-navy)', margin: 0, lineHeight: 1.3 }}>
        Đăng ký thành công!
      </h2>
      <StatusBadge status="success" label="Gói đã được kích hoạt" />

      <p
        style={{
          fontSize: 14,
          color: 'var(--color-text-muted)',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: 320,
        }}
      >
        Airwallex đã xác nhận thanh toán từ <strong style={{ color: 'var(--color-navy)' }}>{bankName}</strong>.
        Quyền sử dụng đội xe R:t của bạn hiện đã hoạt động.
      </p>

      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 6 }}>Mã đối soát</div>
        <div className={styles.refPill}>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-navy)' }}>{referenceCode}</span>
        </div>
      </div>

      <div style={{ marginTop: 24, width: '100%', maxWidth: 320 }}>
        <Button variant="primary" size="lg" fullWidth onClick={() => router.push('/login')}>
          Về trang đăng nhập
        </Button>
      </div>
    </div>
  );
}
