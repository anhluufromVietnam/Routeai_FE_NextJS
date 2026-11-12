import { NextResponse } from 'next/server';
import { revokeAdminToken } from '../adminStore';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    revokeAdminToken(authHeader.replace('Bearer ', ''));
  }
  return NextResponse.json({ success: true, data: { message: 'Admin logged out' } });
}
