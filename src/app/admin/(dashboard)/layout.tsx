'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, Search, Settings, Users } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { Avatar, SearchInput } from '@/components/ui';
import { adminService, type ManagedUser } from '@/services/admin.service';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import styles from './layout.module.css';

const PAGE_TITLES: Record<string, string> = {
  '/admin/overview': 'Tổng quan vận hành',
  '/admin': 'Cấu hình hệ thống',
  '/admin/users': 'Người dùng',
};

function AdminShell({ children }: { children: React.ReactNode }) {
  const { admin, loading, logout } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (admin) adminService.listUsers().then((r) => setUsers(r.data)).catch(() => undefined);
  }, [admin]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const results = query.trim()
    ? users.filter((u) => [u.email, u.full_name, u.role].join(' ').toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

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
    { href: '/admin/overview', label: 'Tổng quan vận hành', icon: LayoutDashboard },
    { href: '/admin', label: 'Cấu hình hệ thống', icon: Settings },
    { href: '/admin/users', label: 'Người dùng', icon: Users },
  ];

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandTile}>
            <LogoMark variant="dark" style={{ height: 22, width: 'auto', display: 'block' }} />
          </span>
          <span className={styles.brandName}>R:t · Admin</span>
        </div>
        <div className={styles.adminInfo}>
          <div className={styles.adminName}>{admin.full_name}</div>
          <div className={styles.adminMeta}>{admin.email} · {admin.role}</div>
        </div>
        <nav className={styles.nav}>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? styles.navLinkActive : styles.navLink}
              >
                <Icon size={16} strokeWidth={2} color="currentColor" aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={16} aria-hidden /> Đăng xuất
        </button>
      </aside>
      <main className={styles.main}>
        <div className={styles.topbar}>
          <div className={styles.topbarTitle}>
            <h1 className={styles.topbarHeading}>{PAGE_TITLES[pathname] ?? 'Quản trị R:t'}</h1>
            <p className={styles.topbarSub}>RouteAI System Admin · {admin.email}</p>
          </div>
          <div className={styles.search}>
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => window.setTimeout(() => setFocused(false), 120)}
              placeholder="Tìm người dùng theo email, tên hoặc vai trò…"
              aria-label="Tìm người dùng"
            />
            {focused && query.trim() ? (
              <div className={styles.searchResults}>
                {results.length > 0 ? results.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    className={styles.searchItem}
                    onMouseDown={() => { setQuery(''); router.push('/admin/users'); }}
                  >
                    <Avatar name={user.full_name} size={32} />
                    <span>
                      <span style={{ display: 'block', fontWeight: 600 }}>{user.full_name}</span>
                      <span style={{ display: 'block', fontSize: 12, color: 'var(--color-text-muted)' }}>{user.email} · {user.role}</span>
                    </span>
                  </button>
                )) : <div className={styles.searchEmpty}><Search size={16} aria-hidden /> Không tìm thấy người dùng phù hợp.</div>}
              </div>
            ) : null}
          </div>
          <div className={styles.avatarWrap} ref={menuRef}>
            <button type="button" className={styles.avatarBtn} onClick={() => setMenuOpen((value) => !value)} aria-label="Tài khoản quản trị" aria-expanded={menuOpen}>
              <Avatar name={admin.full_name} size={40} />
            </button>
            {menuOpen ? (
              <div className={styles.avatarMenu}>
                <div className={styles.avatarMenuHeader}>
                  <strong>{admin.full_name}</strong>
                  <span>{admin.email}</span>
                  <span>{admin.role}</span>
                </div>
                <button type="button" className={`${styles.avatarMenuItem} ${styles.avatarMenuDanger}`} onClick={() => { setMenuOpen(false); void logout(); }}>
                  <LogOut size={16} aria-hidden /> Đăng xuất
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
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
