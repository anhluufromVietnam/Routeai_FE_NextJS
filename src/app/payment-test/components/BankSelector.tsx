'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';
import { Check, ChevronRight } from 'lucide-react';
import { SearchInput, Chip, EmptyState } from '@/components/ui';
import { CANADIAN_BANKS, CanadianBankApp } from '@/services/airwallex/canadianBanks';

type BankCategory = 'featured' | 'big6' | 'digital' | 'fintech' | 'credit_union' | 'all';

const CATEGORY_FILTERS: { value: BankCategory; label: string }[] = [
  { value: 'featured', label: 'Nổi bật' },
  { value: 'big6', label: 'Big Six' },
  { value: 'digital', label: 'Ngân hàng số' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'credit_union', label: 'Credit Union' },
  { value: 'all', label: `Tất cả (${CANADIAN_BANKS.length})` },
];

interface BankSelectorProps {
  selectedBankId: string;
  onSelectBankId: (id: string) => void;
}

export function BankSelector({ selectedBankId, onSelectBankId }: BankSelectorProps) {
  const [bankSearch, setBankSearch] = useState('');
  const [bankCategoryFilter, setBankCategoryFilter] = useState<BankCategory>('featured');

  const filteredBanks = CANADIAN_BANKS.filter((b: CanadianBankApp) => {
    const matchesSearch =
      bankSearch.trim() === '' ||
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.shortName.toLowerCase().includes(bankSearch.toLowerCase()) ||
      (b.institutionNumber && b.institutionNumber.includes(bankSearch));

    if (!matchesSearch) return false;

    if (bankCategoryFilter === 'all') return true;
    if (bankCategoryFilter === 'featured') return b.featured || b.category === 'company';
    return b.category === bankCategoryFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-navy)' }}>Ngân hàng của bạn</div>

      <SearchInput
        value={bankSearch}
        onChange={(e) => setBankSearch(e.target.value)}
        placeholder="Tìm theo tên hoặc mã ngân hàng (RBC, TD, Desjardins...)"
      />

      <div className={styles.filterChips}>
        {CATEGORY_FILTERS.map((f) => (
          <Chip
            key={f.value}
            label={f.label}
            selected={bankCategoryFilter === f.value}
            onClick={() => setBankCategoryFilter(f.value)}
            style={{ flexShrink: 0 }}
          />
        ))}
      </div>

      <div className={styles.bankList}>
        {filteredBanks.map((b) => {
          const active = selectedBankId === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelectBankId(b.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'border-color 200ms ease-out, background 200ms ease-out',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-pill)',
                  background: b.logoColor,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {b.shortName.length <= 4 ? b.shortName : b.shortName.slice(0, 3)}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--color-navy)',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name}</span>
                  {b.category === 'company' && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: 'var(--color-success)',
                        background: 'var(--color-success-light)',
                        borderRadius: 'var(--radius-pill)',
                        padding: '2px 6px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Ngân hàng công ty
                    </span>
                  )}
                </span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {b.institutionNumber ? `Inst: ${b.institutionNumber}` : 'Interac Network'}
                </span>
              </span>
              {active ? (
                <Check size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
              ) : (
                <ChevronRight size={16} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
              )}
            </button>
          );
        })}

        {filteredBanks.length === 0 && (
          <EmptyState
            title="Không tìm thấy ngân hàng"
            description={`Không khớp "${bankSearch}". Bạn vẫn có thể dùng email Autodeposit Interac từ bất kỳ ngân hàng Canada nào.`}
          />
        )}
      </div>
    </div>
  );
}
