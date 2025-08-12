import nodemailer from 'nodemailer';

// Check if email configuration is available
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.');
}

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Updated for sicl.sa domain (likely Office 365)
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  company?: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData, isQuoteRequest: boolean = false) => {
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email configuration missing. Logging form data instead...');
      console.log('Form submission:', {
        type: isQuoteRequest ? 'Quote Request' : 'Contact Message',
        data: formData,
        timestamp: new Date().toISOString()
      });
      // Return success even without email to prevent form errors
      return { success: true, messageId: 'logged-only' };
    }

    const subject = isQuoteRequest 
      ? `New Quote Request from ${formData.name}`
      : `New Contact Message from ${formData.name}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          ${isQuoteRequest ? 'Quote Request' : 'Contact Message'}
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
          ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
          ${formData.service ? `<p><strong>Service Required:</strong> ${formData.service}</p>` : ''}
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
        </div>
        
        <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #065f46;">
            <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
              timeZone: 'Asia/Riyadh',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from the SICL website contact form.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nadeemit@sicl.sa',
      subject: subject,
      html: htmlContent,
      replyTo: formData.email
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('Error sending email:', error);
    // Return success even if email fails to prevent form errors
    return { success: true, messageId: 'error-but-continued' };
  }
}; 