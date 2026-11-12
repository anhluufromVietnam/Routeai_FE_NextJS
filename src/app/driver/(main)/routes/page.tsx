"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { DeliveryRow, StatusBadge, Chip, SearchInput, Button, type StatusBadgeStatus } from '@/components/ui';

const ROUTES: { id: number; name: string; points: number; distance: number; status: StatusBadgeStatus }[] = [
  { id: 1, name: 'Tuyến sáng 12/05', points: 25, distance: 120, status: 'in_transit' },
  { id: 2, name: 'Tuyến chiều 11/05', points: 18, distance: 85, status: 'pending' },
  { id: 3, name: 'Tuyến đi Gò Vấp', points: 15, distance: 68, status: 'delivered' },
  { id: 4, name: 'Tuyến Megacity', points: 30, distance: 150, status: 'delivered' },
];

const FILTERS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'in_transit', label: 'Đang giao' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'delivered', label: 'Đã giao' },
];

export default function SavedRoutesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const visibleRoutes = ROUTES.filter((route) => {
    const matchesFilter = filter === 'all' || route.status === filter;
    const matchesQuery = query === '' || route.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-app)', paddingBottom: 96 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: 16,
        backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-light)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => router.back()} aria-label="Quay lại" style={{ padding: 8, marginLeft: -8, color: 'var(--color-text-main)', display: 'flex' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', textAlign: 'center', marginRight: 40 }}>Tuyến đã lưu</h1>
      </div>

      <div style={{ padding: 16 }}>
        {/* Search Bar */}
        <div style={{ marginBottom: 24 }}>
          <SearchInput
            placeholder="Tìm kiếm tuyến..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 16 }}>
          {FILTERS.map((f) => (
            <Chip
              key={f.value}
              label={f.label}
              selected={filter === f.value}
              onClick={() => setFilter(f.value)}
            />
          ))}
        </div>

        {/* Routes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visibleRoutes.map((route) => (
            <Link
              key={route.id}
              href={`/driver/routes/${route.id}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <DeliveryRow
                index={route.id}
                address={route.name}
                sub={`${route.points} điểm giao • ${route.distance} km`}
                right={
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StatusBadge status={route.status} size="sm" />
                    <ChevronRight size={20} color="var(--color-text-muted)" />
                  </span>
                }
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div style={{ position: 'fixed', bottom: 96, left: 0, right: 0, maxWidth: 480, margin: '0 auto', padding: '0 16px', zIndex: 20, pointerEvents: 'none' }}>
        <Button fullWidth size="lg" icon={<Plus size={24} />} onClick={() => router.push('/driver/scan')} style={{ pointerEvents: 'auto', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)' }}>
          Tạo tuyến mới
        </Button>
      </div>
    </div>
  );
}
