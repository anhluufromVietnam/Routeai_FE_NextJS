'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, LoginPayload, RegisterPayload } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  language_pref?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data) {
        setUser(res.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
    }
  };

  // 1. Fetch profile on initial load
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
        await fetchProfile();
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // 2. Route protection logic
  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      const hasToken = !!localStorage.getItem('access_token');
      if (!hasToken && pathname?.startsWith('/driver')) {
        router.push('/login');
      }
    }
  }, [pathname, loading, router]);

  const login = async (payload: LoginPayload) => {
    await authService.login(payload);
    await fetchProfile();
    // Redirect if they were on login page
    if (pathname === '/login' || pathname === '/register') {
      router.push('/driver/home');
    }
  };

  const register = async (payload: RegisterPayload) => {
    await authService.register(payload);
    // Redirect to login after successful register
    router.push('/login');
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push('/login');
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
