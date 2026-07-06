import { NextResponse } from 'next/server';
import { mockUsers } from '../mockDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Mock login logic
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      return NextResponse.json({
        success: true,
        data: {
          access_token: `mock_access_token_${user.id}`,
          refresh_token: 'mock_refresh_token',
        }
      });
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
