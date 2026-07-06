import { NextResponse } from 'next/server';
import { mockUsers } from '../mockDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, full_name } = body;

    // Check if email already exists
    if (email && mockUsers.find(u => u.email === email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: { code: 'EMAIL_EXISTS', message: 'Email đã được đăng ký' } 
        },
        { status: 400 }
      );
    }

    // Save email to mock database
    if (email) {
      mockUsers.push({
        id: `mock-user-${Date.now()}`,
        email,
        password: password || '123456',
        full_name: full_name || email.split('@')[0],
        role: 'driver',
        language_pref: 'vi'
      });
    }
    
    // Mock register logic
    return NextResponse.json({
      success: true,
      data: {
        message: 'Registration successful'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

