'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';
import { Copy, Smartphone, ExternalLink, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { CANADA_CONFIG } from '@/services/airwallex/countries';
import { CanadianBankApp } from '@/services/airwallex/canadianBanks';
import { TransferType } from './TransferMethodTabs';

interface BankTransferVoucherProps {
  selectedBank: CanadianBankApp;
  transferType: TransferType;
  totalAmountCad: number;
  referenceCode: string;
  onPaymentSuccess: () => void;
}

type VerifyState = 'idle' | 'checking' | 'succeeded' | 'failed';

export function BankTransferVoucher({
  selectedBank,
  transferType,
  totalAmountCad,
  referenceCode,
  onPaymentSuccess,
}: BankTransferVoucherProps) {
  const [copiedField, setCopiedField] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyState, setVerifyState] = useState<VerifyState>('idle');
  const [verifyMessage, setVerifyMessage] = useState('');

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleOpenBankApp = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isMobile) {
      const appUrl = isAndroid
        ? `intent://${selectedBank.appPackageAndroid}#Intent;scheme=package;end;`
        : (selectedBank.appSchemeIos || selectedBank.webLoginUrl);

      const storeUrl = isAndroid
        ? `https://play.google.com/store/apps/details?id=${selectedBank.appPackageAndroid}`
        : `https://apps.apple.com/ca/search?term=${encodeURIComponent(selectedBank.name)}`;

      const start = Date.now();
      window.location.href = appUrl;

      // Nếu sau 1.5s app không mở được -> Điều hướng tải App về máy
      setTimeout(() => {
        if (Date.now() - start < 2000) {
          window.location.href = storeUrl;
        }
      }, 1500);
    } else {
      // Nếu đang dùng máy tính Desktop -> Mở trang Online Banking
      window.open(selectedBank.webLoginUrl, '_blank');
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyState('checking');
    setVerifyMessage('');
    try {
      const res = await fetch(
        `/api/test-airwallex/verify-status?id=int_sim_${referenceCode}&ref=${encodeURIComponent(referenceCode)}`
      );
      const data = await res.json();
      setVerifying(false);

      if (data.status === 'SUCCEEDED' || data.verified) {
        setVerifyState('succeeded');
        onPaymentSuccess();
      } else {
        setVerifyState('failed');
        setVerifyMessage(`Trạng thái thanh toán: ${data.status}. ${data.message}`);
      }
    } catch {
      setVerifying(false);
      setVerifyState('failed');
      setVerifyMessage('Không kiểm tra được trạng thái với Airwallex API lúc này. Vui lòng thử lại.');
    }
  };

  const copyBtnStyle = (highlighted: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'inherit',
    padding: '5px 10px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    border: 'none',
    background: highlighted ? 'var(--color-primary)' : 'var(--color-primary-light)',
    color: highlighted ? '#ffffff' : 'var(--color-primary)',
    flexShrink: 0,
    transition: 'opacity 120ms ease-out',
  });

  const row = (
    label: string,
    value: React.ReactNode,
    copyText: string | null,
    copyField: string,
    highlighted: boolean = false,
    wide: boolean = false,
  ) => (
    <div
      className={wide ? 'voucherRowWide' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: highlighted ? 12 : '10px 0',
        margin: highlighted ? 0 : undefined,
        borderRadius: highlighted ? 'var(--radius-md)' : undefined,
        background: highlighted ? 'var(--color-primary-light)' : undefined,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</div>
        <div
          style={{
            fontSize: highlighted ? 16 : 14,
            fontWeight: highlighted ? 700 : 600,
            color: 'var(--color-navy)',
            marginTop: 2,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: highlighted ? '0.05em' : undefined,
            overflowWrap: 'anywhere',
          }}
        >
          {value}
        </div>
      </div>
      {copyText != null && (
        <button type="button" style={copyBtnStyle(highlighted)} onClick={() => handleCopy(copyText, copyField)}>
          <Copy size={12} />
          {copiedField === copyField ? 'Đã copy!' : 'Copy'}
        </button>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          background: 'var(--color-navy)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--color-border)', fontWeight: 500 }}>
            Copy & dán vào app {selectedBank.shortName}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>
            Thanh toán cho TAM VIET QUANG (Airwallex Canada)
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--color-border)' }}>Số tiền:</div>
          <div style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            C${totalAmountCad.toFixed(2)} <span style={{ fontSize: 13, fontWeight: 500 }}>CAD</span>
          </div>
        </div>
      </div>

      <Card padding={16}>
        <div className={styles.voucherRows}>
          {transferType === 'interac' ? (
            <>
              {row(
                'Email Autodeposit Interac',
                CANADA_CONFIG.bankDetails.autodepositEmail,
                CANADA_CONFIG.bankDetails.autodepositEmail,
                'email',
                false,
                true,
              )}
              {row('Số tiền cần chuyển (chính xác)', `C$${totalAmountCad.toFixed(2)} CAD`, String(totalAmountCad), 'amount')}
              {row('Mã đối soát / Reference', referenceCode, referenceCode, 'ref', true, true)}
            </>
          ) : (
            <>
              {row(
                'Tên người thụ hưởng',
                CANADA_CONFIG.bankDetails.accountName,
                CANADA_CONFIG.bankDetails.accountName,
                'name',
                false,
                true,
              )}
              {row('Số tài khoản', CANADA_CONFIG.bankDetails.accountNumber, CANADA_CONFIG.bankDetails.accountNumber, 'acc')}
              {row('Transit Number', CANADA_CONFIG.bankDetails.transitNumber, CANADA_CONFIG.bankDetails.transitNumber, 'transit')}
              {row('Institution Number', `${CANADA_CONFIG.bankDetails.institutionNumber} (Digital Commerce Bank)`, null, '')}
              {row('Transfer Memo / Reference', referenceCode, referenceCode, 'ref', true, true)}
            </>
          )}
        </div>
      </Card>

      <Button variant="secondary" size="lg" fullWidth icon={<Smartphone size={18} />} onClick={handleOpenBankApp}>
        Mở app {selectedBank.shortName} để chuyển khoản <ExternalLink size={14} />
      </Button>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: -8, lineHeight: 1.4 }}>
        Tự động mở app {selectedBank.shortName} trên iOS/Android; nếu chưa cài, bạn sẽ được dẫn tới App Store / Google
        Play. Trên máy tính sẽ mở trang online banking.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--color-border-light)', paddingTop: 12 }}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={verifying}
          icon={<RefreshCw size={18} />}
          onClick={handleVerify}
        >
          {verifying ? 'Đang kiểm tra Airwallex API...' : 'Tôi đã chuyển khoản — Kiểm tra & kích hoạt'}
        </Button>

        {verifyState === 'failed' && verifyMessage && (
          <div
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              background: 'var(--color-danger-light)',
              border: '1px solid var(--color-danger)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              fontSize: 13,
              color: 'var(--color-danger)',
              lineHeight: 1.5,
            }}
          >
            <XCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{verifyMessage}</span>
          </div>
        )}
        {verifyState === 'succeeded' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--color-success-light)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              fontSize: 13,
              color: 'var(--color-success)',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={16} /> Đã xác nhận thanh toán — đang kích hoạt gói...
          </div>
        )}
      </div>
    </div>
  );
}
