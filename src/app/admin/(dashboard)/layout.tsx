'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import styles from './layout.module.css';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { admin, loading, logout } = useAdmin();
  const pathname = usePathname();

  if (loading) {
    return <div className={styles.loading}>Đang tải khu vực quản trị…</div>;
  }

  if (!admin) {
    return (
      <div className={styles.loading}>
        Chưa đăng nhập admin. <Link href="/admin/login" className={styles.navLinkActive}>Đăng nhập</Link>
      </div>
    );
  }

  const nav = [
    { href: '/admin/overview', label: 'Tổng quan vận hành', icon: <LayoutDashboard size={16} /> },
    { href: '/admin', label: 'Cấu hình hệ thống', icon: <Settings size={16} /> },
    { href: '/admin/users', label: 'Người dùng', icon: <Users size={16} /> },
  ];

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Image
            src="/brand/05_app_icon_navy_tile_192.png"
            alt="R:t"
            width={40}
            height={40}
            priority
            className={styles.brandLogo}
          />
          <span className={styles.brandName}>R:t · Admin</span>
        </div>
        <div className={styles.adminInfo}>
          <div className={styles.adminName}>{admin.full_name}</div>
          <div className={styles.adminMeta}>{admin.email} · {admin.role}</div>
        </div>
        <nav className={styles.nav}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? styles.navLinkActive : styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={16} aria-hidden /> Đăng xuất
        </button>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
