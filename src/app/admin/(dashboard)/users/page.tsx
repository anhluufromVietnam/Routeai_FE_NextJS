'use client';

import React, { useEffect, useState } from 'react';
import { adminService, ManagedUser } from '@/services/admin.service';
import { Button, Card, StatusBadge } from '@/components/ui';
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

      <Card padding={0}>
        <div style={{ overflowX: 'auto' }}>
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
                  <td style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>{u.email}</td>
                  <td style={{ color: 'var(--color-text-main)' }}>{u.full_name}</td>
                  <td>
                    <StatusBadge
                      status={u.role === 'admin' ? 'delivered' : 'in_transit'}
                      label={u.role === 'admin' ? 'Admin' : 'Driver'}
                    />
                  </td>
                  <td>
                    {u.disabled
                      ? <StatusBadge status="failed" label="Vô hiệu" />
                      : <StatusBadge status="success" label="Hoạt động" />}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Button size="sm" variant="secondary" onClick={() => changeRole(u)}>
                      {u.role === 'admin' ? '→ driver' : '→ admin'}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      style={{ marginLeft: 8 }}
                      onClick={() => toggleDisabled(u)}
                    >
                      {u.disabled ? 'Bật lại' : 'Vô hiệu'}
                    </Button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 24, color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    Chưa có người dùng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
