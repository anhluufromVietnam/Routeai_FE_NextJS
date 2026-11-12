import { NextResponse } from 'next/server';
import { requireAdmin } from '../adminAuth';

export async function GET(request: Request) {
  const auth = requireAdmin(request);
  if ('response' in auth) return auth.response;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...safe } = auth.admin;
  return NextResponse.json({ success: true, data: safe });
}
