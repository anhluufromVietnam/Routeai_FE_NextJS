// Separate admin credential + session store. Intentionally isolated from the
// normal user mockDb so admin auth is a distinct layer with its own tokens.
export interface AdminUser {
  id: string;
  email: string;
  password: string;
  full_name: string;
  role: 'admin' | 'superadmin';
}

interface AdminSession {
  adminId: string;
  createdAt: number;
}

// Dev mock credentials — local development only, never real secrets.
export const adminUsers: AdminUser[] = [
  {
    id: 'sys-admin-001',
    email: 'admin@routeai.com',
    password: 'Admin@123',
    full_name: 'RouteAI System Admin',
    role: 'superadmin',
  },
];

const adminSessions = new Map<string, AdminSession>();

export function createAdminToken(adminId: string): string {
  const token = `mock_admin_token_${adminId}_${Date.now()}`;
  adminSessions.set(token, { adminId, createdAt: Date.now() });
  return token;
}

export function getAdminByToken(token: string): AdminUser | null {
  const session = adminSessions.get(token);
  if (!session) return null;
  return adminUsers.find((a) => a.id === session.adminId) ?? null;
}

export function revokeAdminToken(token: string): void {
  adminSessions.delete(token);
}
