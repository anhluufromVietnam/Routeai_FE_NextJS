import { NextResponse } from 'next/server';
import { adminUsers, createAdminToken } from '../adminStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    const admin = adminUsers.find((a) => a.email === email);
    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email hoặc mật khẩu quản trị không đúng' } },
        { status: 401 }
      );
    }

    const token = createAdminToken(admin.id);
    return NextResponse.json({
      success: true,
      data: {
        access_token: token,
        admin: { id: admin.id, email: admin.email, full_name: admin.full_name, role: admin.role },
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
