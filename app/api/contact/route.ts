import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Log the contact form submission (for debugging)
    console.log('Quote request submission:', {
      name,
      email,
      phone,
      service,
      message,
      timestamp: new Date().toISOString()
    });

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        phone,
        service,
        message
      }, true); // true indicates this is a quote request

      return NextResponse.json(
        { 
          success: true, 
          message: 'Quote request submitted successfully and email sent',
          data: { name, email, phone, service, message }
        },
        { status: 200 }
      );

    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Form submitted but email notification failed',
          data: { name, email, phone, service, message }
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 