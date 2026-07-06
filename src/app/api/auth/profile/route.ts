import { NextResponse } from 'next/server';
import { mockUsers } from '../mockDb';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' } },
      { status: 401 }
    );
  }

  const token = authHeader.replace('Bearer ', '');
  const userId = token.replace('mock_access_token_', '');
  
  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } },
      { status: 401 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  // Mock profile data
  return NextResponse.json({
    success: true,
    data: userWithoutPassword
  });
}
