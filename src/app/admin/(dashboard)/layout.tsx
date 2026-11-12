'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    { href: '/admin', label: 'Cấu hình hệ thống' },
    { href: '/admin/users', label: 'Người dùng' },
  ];

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>R:t · Admin</div>
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
        <button className={styles.logoutBtn} onClick={logout}>Đăng xuất</button>
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
