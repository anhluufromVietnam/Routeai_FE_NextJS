'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface PaymentSuccessBannerProps {
  bankName: string;
  referenceCode: string;
}

export function PaymentSuccessBanner({
  bankName,
  referenceCode,
}: PaymentSuccessBannerProps) {
  return (
    <div
      style={{
        background: 'var(--color-success-light)',
        border: '1px solid var(--color-success-light)',
        borderRadius: 10,
        padding: '1.25rem',
        marginTop: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <CheckCircle2 size={32} color="var(--color-success)" />
      <div>
        <div style={{ fontWeight: 800, color: 'var(--color-success)', fontSize: '1.1rem' }}>
          Subscription Activated Successfully!
        </div>
        <div style={{ color: 'var(--color-success)', fontSize: '0.88rem' }}>
          Airwallex has verified payment from {bankName} (Ref: {referenceCode}). Your R:t enterprise fleet license is now active!
        </div>
      </div>
    </div>
  );
}

