import { NextResponse } from 'next/server';
import { getAdminByToken, AdminUser } from './adminStore';

export type AdminAuthResult =
  | { admin: AdminUser }
  | { response: NextResponse };

// Server-side gate for every /api/admin/* route (except login).
// Never rely on client-only checks: each handler must call this first.
export function requireAdmin(request: Request): AdminAuthResult {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      response: NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Missing admin token' } },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token.startsWith('mock_admin_token_')) {
    return {
      response: NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Not an admin session' } },
        { status: 403 }
      ),
    };
  }

  const admin = getAdminByToken(token);
  if (!admin) {
    return {
      response: NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or expired admin session' } },
        { status: 401 }
      ),
    };
  }

  return { admin };
}
