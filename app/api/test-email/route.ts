import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    // Test email configuration
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+966 50 123 4567',
      service: 'Test Service',
      message: 'This is a test email to verify the email configuration is working properly.'
    };

    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email configuration missing',
          message: 'Please set EMAIL_USER and EMAIL_PASS in your .env.local file'
        },
        { status: 400 }
      );
    }

    // Try to send a test email
    await sendContactEmail(testData, true);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Test email sent successfully! Check nadeemit@sicl.sa for the test email.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 