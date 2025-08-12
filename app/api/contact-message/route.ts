import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Log the contact message submission (for debugging)
    console.log('Contact message submission:', {
      name,
      email,
      phone,
      company,
      message,
      timestamp: new Date().toISOString()
    });

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        phone,
        company,
        message
      }, false); // false indicates this is a contact message

      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully and email notification delivered',
          data: { name, email, phone, company, message }
        },
        { status: 200 }
      );

    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message submitted but email notification failed',
          data: { name, email, phone, company, message }
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing contact message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 