'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { SegmentedControl } from '@/components/ui';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/services/airwallex/plans';

interface PlanSelectorProps {
  selectedPlanId: string;
  onSelectPlan: (id: string) => void;
  billingCycle: 'monthly' | 'yearly';
  onBillingCycleChange: (cycle: 'monthly' | 'yearly') => void;
}

export function PlanSelector({
  selectedPlanId,
  onSelectPlan,
  billingCycle,
  onBillingCycleChange,
}: PlanSelectorProps) {
  const discountMultiplier = billingCycle === 'yearly' ? 0.85 : 1.0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SegmentedControl
        options={[
          { value: 'monthly', label: 'Hàng tháng' },
          { value: 'yearly', label: 'Hàng năm −15%' },
        ]}
        value={billingCycle}
        onChange={(v) => onBillingCycleChange(v as 'monthly' | 'yearly')}
        style={{ alignSelf: 'stretch' }}
      />

      {SUBSCRIPTION_PLANS.map((plan: SubscriptionPlan) => {
        const isSelected = selectedPlanId === plan.id;
        const perMonth = (plan.monthlyCad * discountMultiplier).toFixed(2);
        const total = (
          plan.monthlyCad * discountMultiplier * (billingCycle === 'yearly' ? 12 : 1)
        ).toFixed(2);

        return (
          <div
            key={plan.id}
            onClick={() => onSelectPlan(plan.id)}
            style={{
              background: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
              border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)',
              padding: 16,
              cursor: 'pointer',
              transition: 'border-color 200ms ease-out, background 200ms ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-navy)' }}>{plan.name}</div>
              {plan.recommended && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-primary)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '2px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Phổ biến nhất
                </span>
              )}
              {isSelected && !plan.recommended && (
                <Check size={20} color="var(--color-primary)" aria-label="Đã chọn" />
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                C${perMonth}
              </span>
              <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>/ tháng</span>
              {billingCycle === 'yearly' && (
                <span style={{ fontSize: 13, color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                  C${total} / năm
                </span>
              )}
            </div>

            <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 4 }}>{plan.description}</div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid var(--color-border-light)',
              }}
            >
              {plan.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--color-text-main)', lineHeight: 1.4 }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
