'use client';

import React, { useEffect, useState } from 'react';
import { adminService, ManagedUser } from '@/services/admin.service';
import styles from '../layout.module.css';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = () => {
    adminService.listUsers()
      .then((res) => setUsers(res.data))
      .catch((e: { message?: string }) => setError(e?.message ?? 'Không tải được danh sách'));
  };

  useEffect(load, []);

  const changeRole = async (u: ManagedUser) => {
    setError('');
    setNotice('');
    const nextRole = u.role === 'admin' ? 'driver' : 'admin';
    try {
      await adminService.updateUser(u.id, { role: nextRole });
      setNotice(`Đã đổi ${u.email} thành ${nextRole}.`);
      load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : (e as { message?: string })?.message ?? 'Cập nhật thất bại';
      setError(msg.replace(/^\[.*?\]\s*/, ''));
    }
  };

  const toggleDisabled = async (u: ManagedUser) => {
    setError('');
    setNotice('');
    try {
      await adminService.updateUser(u.id, { disabled: !u.disabled });
      setNotice(`${u.email} đã ${u.disabled ? 'được bật lại' : 'bị vô hiệu hóa'}.`);
      load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : (e as { message?: string })?.message ?? 'Cập nhật thất bại';
      setError(msg.replace(/^\[.*?\]\s*/, ''));
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Người dùng</h1>
      <p className={styles.pageSub}>Xem danh sách, phân quyền driver/admin, bật/tắt tài khoản.</p>

      {error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}
      {notice && <div className={`${styles.alert} ${styles.alertOk}`}>{notice}</div>}

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Tên</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.full_name}</td>
                <td><span className={`${styles.badge} ${styles.badgeOn}`}>{u.role}</span></td>
                <td>
                  {u.disabled
                    ? <span className={`${styles.badge} ${styles.badgeOff}`}>vô hiệu</span>
                    : <span className={`${styles.badge} ${styles.badgeOn}`}>hoạt động</span>}
                </td>
                <td>
                  <button className={styles.rowBtn} onClick={() => changeRole(u)}>
                    {u.role === 'admin' ? '→ driver' : '→ admin'}
                  </button>
                  <button className={styles.rowBtn} onClick={() => toggleDisabled(u)}>
                    {u.disabled ? 'Bật lại' : 'Vô hiệu'}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={5}>Chưa có người dùng.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
