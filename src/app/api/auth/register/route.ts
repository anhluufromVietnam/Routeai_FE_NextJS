import { NextResponse } from 'next/server';

// Mock database to store registered emails
const registeredEmails = new Set<string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Check if email already exists
    if (email && registeredEmails.has(email)) {
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
      registeredEmails.add(email);
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

