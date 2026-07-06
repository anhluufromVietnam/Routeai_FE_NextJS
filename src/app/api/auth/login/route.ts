import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock login logic
    if (email && password) {
      if (email === 'admin@routeai.com' && password === '123456') {
        return NextResponse.json({
          success: true,
          data: {
            access_token: 'mock_access_token',
            refresh_token: 'mock_refresh_token',
          }
        });
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        }
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
