import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' } },
      { status: 401 }
    );
  }

  // Mock profile data
  return NextResponse.json({
    success: true,
    data: {
      id: 'mock-user-123',
      email: 'jane.doe+1@example.com',
      full_name: 'Jane Doe',
      role: 'driver',
      language_pref: 'en'
    }
  });
}
