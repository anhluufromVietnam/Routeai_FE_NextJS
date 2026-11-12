'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import styles from '@/app/login/page.module.css';
import Image from 'next/image';

export default function AdminLoginPage() {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      const msg = err instanceof Error ? err.message : (err as { message?: string })?.message || 'Đăng nhập thất bại';
      setError(msg.replace(/^\[.*?\]\s*/, ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <Image
            src="/brand/01_logo_primary.png"
            alt="R:t — Smarter Routes. Faster Deliveries."
            width={148}
            height={72}
            priority
            className={styles.logo}
          />
        </div>
        <h1 className={styles.title}>Quản trị hệ thống</h1>
        <p className={styles.subtitle}>Đăng nhập khu vực admin — tách biệt tài khoản tài xế</p>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="admin-email" className={styles.label}>Email quản trị</label>
            <input
              id="admin-email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@routeai.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="admin-password" className={styles.label}>Mật khẩu</label>
            <input
              id="admin-password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập admin'}
          </button>
        </form>

        <div className={styles.footer}>Dev mock: admin@routeai.com / Admin@123</div>
        <div className={styles.tagline}>Đúng tuyến. Đúng thời gian. Cùng R:t.</div>
      </div>
    </div>
  );
}
