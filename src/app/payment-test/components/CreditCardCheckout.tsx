'use client';

import React, { useState } from 'react';
import { Lock, CreditCard } from 'lucide-react';
import { Button, Input, StatusBadge } from '@/components/ui';

interface CreditCardCheckoutProps {
  totalAmountCad: number;
  planName: string;
  onPaymentSuccess: () => void;
}

export function CreditCardCheckout({ totalAmountCad, planName, onPaymentSuccess }: CreditCardCheckoutProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardProcessing, setCardProcessing] = useState(false);
  const [cardError, setCardError] = useState('');

  const handlePayCard = async () => {
    setCardProcessing(true);
    setCardError('');

    try {
      const res = await fetch('/api/test-airwallex/process-card-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmountCad,
          currency: 'CAD',
          cardNumber,
          expiry,
          cvc,
          cardHolder,
          planName,
        }),
      });

      const data = await res.json();
      setCardProcessing(false);

      if (data.success) {
        onPaymentSuccess();
      } else {
        setCardError(
          `[Airwallex Live API Response]: ${data.airwallexMessage ?? data.error ?? 'Unknown error'}\n\nNotice: ${data.explanation ?? ''}`
        );
      }
    } catch {
      setCardProcessing(false);
      setCardError('Không kết nối được cổng thanh toán Airwallex.');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!cardProcessing) handlePayCard();
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>
          <CreditCard size={18} color="var(--color-primary)" /> Thanh toán bằng thẻ
        </div>
        <StatusBadge status="success" label="Airwallex Live" size="sm" />
      </div>

      {cardError && (
        <div
          role="alert"
          style={{
            background: 'var(--color-danger-light)',
            border: '1px solid var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            fontSize: 13,
            color: 'var(--color-danger)',
            whiteSpace: 'pre-line',
            lineHeight: 1.5,
          }}
        >
          {cardError}
        </div>
      )}

      <Input
        label="Số thẻ"
        type="text"
        name="custom-card-number-field"
        autoComplete="new-password"
        data-form-type="other"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="4111 2222 3333 4444"
        maxLength={19}
        leftIcon={<CreditCard size={16} />}
        required
      />

      <div style={{ display: 'flex', gap: 12 }}>
        <Input
          label="Ngày hết hạn (MM/YY)"
          type="text"
          name="custom-card-expiry-field"
          autoComplete="new-password"
          data-form-type="other"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="MM/YY"
          maxLength={5}
          style={{ flex: 1 }}
          required
        />
        <Input
          label="Mã CVC"
          type="password"
          name="custom-card-cvc-field"
          autoComplete="new-password"
          data-form-type="other"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="123"
          maxLength={4}
          style={{ flex: 1 }}
          required
        />
      </div>

      <Input
        label="Tên chủ thẻ"
        type="text"
        name="custom-card-holder-field"
        autoComplete="new-password"
        data-form-type="other"
        value={cardHolder}
        onChange={(e) => setCardHolder(e.target.value)}
        placeholder="VD: JOHN DOE"
        required
      />

      <Button type="submit" variant="primary" size="lg" fullWidth loading={cardProcessing} icon={<Lock size={18} />}>
        Thanh toán C${totalAmountCad.toFixed(2)} CAD
      </Button>
    </form>
  );
}
