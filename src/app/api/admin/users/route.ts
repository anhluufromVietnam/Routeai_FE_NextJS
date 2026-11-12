import { NextResponse } from 'next/server';
import { requireAdmin } from '../adminAuth';
import { mockUsers } from '../../auth/mockDb';

type Role = 'driver' | 'admin';
interface ManagedUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  language_pref: string;
  disabled?: boolean;
}

function toSafe(u: Record<string, unknown>): ManagedUser {
  return {
    id: String(u.id),
    email: String(u.email),
    full_name: String(u.full_name ?? ''),
    role: String(u.role ?? 'driver'),
    language_pref: String(u.language_pref ?? 'vi'),
    disabled: Boolean(u.disabled ?? false),
  };
}

export async function GET(request: Request) {
  const auth = requireAdmin(request);
  if ('response' in auth) return auth.response;
  return NextResponse.json({
    success: true,
    data: mockUsers.map((u) => toSafe(u as unknown as Record<string, unknown>)),
  });
}

export async function PATCH(request: Request) {
  const auth = requireAdmin(request);
  if ('response' in auth) return auth.response;
  try {
    const body = await request.json();
    const { id, role, disabled } = body as { id?: unknown; role?: unknown; disabled?: unknown };
    if (typeof id !== 'string' || !id) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'User id is required' } },
        { status: 400 }
      );
    }
    const user = mockUsers.find((u) => u.id === id) as unknown as Record<string, unknown> | undefined;
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      );
    }
    if (role !== undefined) {
      const allowed: Role[] = ['driver', 'admin'];
      if (typeof role !== 'string' || !allowed.includes(role as Role)) {
        return NextResponse.json(
          { success: false, error: { code: 'INVALID_ROLE', message: 'role must be driver or admin' } },
          { status: 400 }
        );
      }
      user.role = role;
    }
    if (disabled !== undefined) {
      if (typeof disabled !== 'boolean') {
        return NextResponse.json(
          { success: false, error: { code: 'INVALID_INPUT', message: 'disabled must be a boolean' } },
          { status: 400 }
        );
      }
      user.disabled = disabled;
    }
    return NextResponse.json({ success: true, data: toSafe(user) });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
