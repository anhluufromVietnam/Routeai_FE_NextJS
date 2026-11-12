"use client";
import React, { useState } from 'react';
import { User, Crown, Bell, HelpCircle, LogOut, ChevronRight, CheckCircle2, Map } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, SectionTitle, Toggle, Button } from '@/components/ui';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const userName = user?.full_name || user?.email?.split('@')[0] || 'Nguyễn Văn A';
  const [navigationEnabled, setNavigationEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-app)', paddingBottom: 96 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-light)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>Cài đặt</h1>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Profile Card */}
        <Card
          padding={20}
          hoverable
          onClick={() => router.push('/driver/profile')}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div style={{
            width: 64, height: 64, backgroundColor: 'var(--color-bg-app)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            marginRight: 16, border: '2px solid var(--color-primary-light)', flexShrink: 0,
          }}>
            <User size={32} color="var(--color-text-muted)" style={{ marginTop: 8 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-navy)', margin: 0, marginBottom: 4 }}>{userName}</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)',
                fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-sm)',
              }}>
                <Crown size={12} />
                Tài khoản Pro
              </span>
            </div>
          </div>
          <ChevronRight size={20} color="var(--color-text-muted)" />
        </Card>

        {/* Current Plan */}
        <div>
          <div style={{ marginBottom: 12, marginLeft: 4 }}>
            <SectionTitle title="Gói cước hiện tại" />
          </div>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-navy))',
            borderRadius: 'var(--radius-lg)', padding: 20,
            boxShadow: 'var(--shadow-pop)', color: '#FFFFFF',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                  <Crown size={16} />
                  Gói Cao Cấp
                </div>
                <h4 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>R:t Pro</h4>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 'var(--radius-pill)', fontSize: 14, fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                Đang hoạt động
              </div>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>
                <CheckCircle2 size={16} color="var(--color-success-light)" style={{ flexShrink: 0 }} />
                Tối ưu lên đến 100 điểm giao
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>
                <CheckCircle2 size={16} color="var(--color-success-light)" style={{ flexShrink: 0 }} />
                Báo cáo & Thống kê chi tiết
              </li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Gia hạn: 12/06/2024</span>
              <Button
                variant="secondary"
                size="sm"
                style={{ backgroundColor: '#FFFFFF', color: 'var(--color-primary)' }}
              >
                Nâng cấp gói
              </Button>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div>
          <div style={{ marginBottom: 12, marginLeft: 4 }}>
            <SectionTitle title="Hệ thống" />
          </div>
          <Card padding={0} style={{ overflow: 'hidden' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--color-border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, flexShrink: 0 }}>
                  <Map size={18} />
                </div>
                <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>Cài đặt dẫn đường</span>
              </div>
              <Toggle checked={navigationEnabled} onChange={setNavigationEnabled} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--color-border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-warning-light)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, flexShrink: 0 }}>
                  <Bell size={18} />
                </div>
                <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>Thông báo</span>
              </div>
              <Toggle checked={notificationsEnabled} onChange={setNotificationsEnabled} />
            </div>

            <button
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 16, backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-bg-app)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, flexShrink: 0 }}>
                  <HelpCircle size={18} />
                </div>
                <span style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>Hỗ trợ & Góp ý</span>
              </div>
              <ChevronRight size={20} color="var(--color-text-muted)" />
            </button>

          </Card>
        </div>

        <Button variant="danger" size="lg" fullWidth icon={<LogOut size={20} />} onClick={() => logout()}>
          Đăng xuất
        </Button>

      </div>
    </div>
  );
}
