import { NextResponse } from 'next/server';
import { requireAdmin } from '../adminAuth';
import { getSystemConfig, validateConfigPatch, applyConfigPatch } from '../configStore';

export async function GET(request: Request) {
  const auth = requireAdmin(request);
  if ('response' in auth) return auth.response;
  return NextResponse.json({ success: true, data: getSystemConfig() });
}

export async function PATCH(request: Request) {
  const auth = requireAdmin(request);
  if ('response' in auth) return auth.response;
  try {
    const patch = await request.json();
    const validated = validateConfigPatch(patch);
    if (!validated.ok) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CONFIG', message: validated.message } },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, data: applyConfigPatch(validated.value) });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
