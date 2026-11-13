'use client';

import React from 'react';
import { Send, Building2, CreditCard, Check } from 'lucide-react';

export type TransferType = 'interac' | 'eft' | 'card';

interface TransferMethodTabsProps {
  transferType: TransferType;
  onSelectTransferType: (type: TransferType) => void;
}

const METHODS: { type: TransferType; icon: React.ReactNode; label: string; sub: string }[] = [
  {
    type: 'interac',
    icon: <Send size={18} />,
    label: 'Interac e-Transfer',
    sub: 'Chuyển qua app ngân hàng Canada — tự động đối soát',
  },
  {
    type: 'eft',
    icon: <Building2 size={18} />,
    label: 'Direct EFT Deposit',
    sub: 'Chuyển trực tiếp đến tài khoản Airwallex',
  },
  {
    type: 'card',
    icon: <CreditCard size={18} />,
    label: 'Thẻ tín dụng / ghi nợ',
    sub: 'Visa · Mastercard · Amex qua Airwallex',
  },
];

export function TransferMethodTabs({ transferType, onSelectTransferType }: TransferMethodTabsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {METHODS.map((m) => {
        const active = transferType === m.type;
        return (
          <button
            key={m.type}
            type="button"
            onClick={() => onSelectTransferType(m.type)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textAlign: 'left',
              padding: 12,
              borderRadius: 'var(--radius-md)',
              background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
              border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'border-color 200ms ease-out, background 200ms ease-out',
            }}
          >
            <span style={{ color: active ? 'var(--color-primary)' : 'var(--color-text-muted)', flexShrink: 0 }}>
              {m.icon}
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>
                {m.label}
              </span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
                {m.sub}
              </span>
            </span>
            {active && <Check size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />}
          </button>
        );
      })}
    </div>
  );
}
