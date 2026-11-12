'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminService, AdminProfile } from '@/services/admin.service';
import { useRouter, usePathname } from 'next/navigation';

interface AdminContextType {
  admin: AdminProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (typeof window !== 'undefined' && localStorage.getItem('admin_access_token')) {
        try {
          const res = await adminService.getProfile();
          if (res?.data) setAdmin(res.data);
        } catch {
          setAdmin(null);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!loading && typeof window !== 'undefined' && pathname?.startsWith('/admin')) {
      if (pathname === '/admin/login') return;
      if (!localStorage.getItem('admin_access_token')) {
        router.push('/admin/login');
      }
    }
  }, [pathname, loading, router]);

  const login = async (email: string, password: string) => {
    await adminService.login({ email, password });
    const res = await adminService.getProfile();
    if (res?.data) setAdmin(res.data);
    router.push('/admin');
  };

  const logout = async () => {
    await adminService.logout();
    setAdmin(null);
    router.push('/admin/login');
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
