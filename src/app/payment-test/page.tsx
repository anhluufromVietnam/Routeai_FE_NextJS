'use client';

import React, { useState, useEffect, Suspense } from 'react';
import styles from './page.module.css';
import { Button, TopBar, ProgressBar, Card, StatusBadge } from '@/components/ui';
import { SUBSCRIPTION_PLANS } from '@/services/airwallex/plans';
import { CANADIAN_BANKS } from '@/services/airwallex/canadianBanks';

import { PlanSelector } from './components/PlanSelector';
import { BankSelector } from './components/BankSelector';
import { TransferMethodTabs, TransferType } from './components/TransferMethodTabs';
import { CreditCardCheckout } from './components/CreditCardCheckout';
import { BankTransferVoucher } from './components/BankTransferVoucher';
import { PaymentSuccessView } from './components/PaymentSuccessBanner';

const STEP_TITLES = ['Chọn gói', 'Phương thức & ngân hàng', 'Xác nhận & thanh toán', 'Thanh toán thành công'];

function CanadaSubscriptionAppFlow() {
  const [step, setStep] = useState(1);

  // Step 1: Chọn gói (mặc định gói Starter 0.50 CAD rẻ nhất để test)
  const [selectedPlanId, setSelectedPlanId] = useState('starter');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Step 2: Phương thức (Interac / EFT / Card) + ngân hàng của khách (mặc định DCBank của công ty)
  const [transferType, setTransferType] = useState<TransferType>('interac');
  const [selectedBankId, setSelectedBankId] = useState('dcb');

  // Mã đối soát RAI-xxxxxx (sinh sau khi mount như cũ)
  const [referenceCode, setReferenceCode] = useState('RAI-892143');

  useEffect(() => {
    const timer = setTimeout(() => {
      setReferenceCode(`RAI-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[0];
  const selectedBank = CANADIAN_BANKS.find((b) => b.id === selectedBankId) || CANADIAN_BANKS[0];

  const discountMultiplier = billingCycle === 'yearly' ? 0.85 : 1.0;
  const totalAmountCad = Number(
    (selectedPlan.monthlyCad * discountMultiplier * (billingCycle === 'yearly' ? 12 : 1)).toFixed(2)
  );
  const totalAmountCadDisplay = totalAmountCad.toFixed(2);

  const goBack = () => setStep((s) => Math.max(1, s - 1));
  const goNext = () => setStep((s) => Math.min(4, s + 1));

  return (
    <div className={styles.container}>
      <div className={styles.wizardFrame}>
        <TopBar title={STEP_TITLES[step - 1]} onBack={step > 1 && step < 4 ? goBack : undefined} />

        {step < 4 && (
          <div className={styles.progressArea}>
            <ProgressBar value={Math.round((step / 3) * 100)} />
            <div className={styles.stepDots}>
              {[1, 2, 3].map((dot) => (
                <span
                  key={dot}
                  aria-hidden
                  className={[
                    styles.stepDot,
                    dot === step ? styles.stepDotActive : '',
                    dot < step ? styles.stepDotDone : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              ))}
            </div>
          </div>
        )}

        {step < 4 ? (
          <>
            <div key={step} className={styles.content}>
              <div className={styles.stepIn}>
                {step === 1 && (
                  <PlanSelector
                    selectedPlanId={selectedPlanId}
                    onSelectPlan={setSelectedPlanId}
                    billingCycle={billingCycle}
                    onBillingCycleChange={setBillingCycle}
                  />
                )}
                {step === 2 && (
                  <>
                    <TransferMethodTabs transferType={transferType} onSelectTransferType={setTransferType} />
                    {transferType !== 'card' && (
                      <BankSelector selectedBankId={selectedBankId} onSelectBankId={setSelectedBankId} />
                    )}
                  </>
                )}
                {step === 3 && (
                  <Card padding={16}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy)' }}>
                          {selectedPlan.name}
                        </span>
                        <StatusBadge
                          status="info"
                          size="sm"
                          label={billingCycle === 'yearly' ? 'Hàng năm −15%' : 'Hàng tháng'}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 13,
                          color: 'var(--color-text-muted)',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        <span>
                          C${selectedPlan.monthlyCad.toFixed(2)}
                          {billingCycle === 'yearly' && ' × 85%'} × {billingCycle === 'yearly' ? 12 : 1} tháng
                        </span>
                        <span>
                          C${(selectedPlan.monthlyCad * discountMultiplier * (billingCycle === 'yearly' ? 12 : 1)).toFixed(2)}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 13,
                            color: 'var(--color-success)',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          <span>Giảm giá hàng năm (15%)</span>
                          <span>
                            −C${(selectedPlan.monthlyCad * 0.15 * 12).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          borderTop: '1px solid var(--color-border-light)',
                          paddingTop: 10,
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>Tổng thanh toán</span>
                        <span
                          style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: 'var(--color-navy)',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          C${totalAmountCadDisplay}
                          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-muted)' }}> CAD</span>
                        </span>
                      </div>
                    </div>
                  </Card>
                )}
                {step === 3 && transferType === 'card' && (
                  <CreditCardCheckout
                    totalAmountCad={totalAmountCad}
                    planName={selectedPlan.name}
                    onPaymentSuccess={() => setStep(4)}
                  />
                )}
                {step === 3 && transferType !== 'card' && (
                  <BankTransferVoucher
                    selectedBank={selectedBank}
                    transferType={transferType}
                    totalAmountCad={totalAmountCad}
                    referenceCode={referenceCode}
                    onPaymentSuccess={() => setStep(4)}
                  />
                )}
              </div>
            </div>

            {step < 3 && (
              <div className={styles.footer}>
                {step === 2 && (
                  <Button variant="secondary" size="lg" onClick={goBack}>
                    Quay lại
                  </Button>
                )}
                <Button variant="primary" size="lg" fullWidth onClick={goNext}>
                  Tiếp tục
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.successWrap}>
            <div className={styles.stepIn}>
              <PaymentSuccessView bankName={selectedBank.name} referenceCode={referenceCode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentTestPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem' }}>Đang tải cổng thanh toán...</div>}>
      <CanadaSubscriptionAppFlow />
    </Suspense>
  );
}
