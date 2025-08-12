import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(contentFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load content from file
const loadContent = () => {
  try {
    ensureDataDirectory();
    if (fs.existsSync(contentFilePath)) {
      const data = fs.readFileSync(contentFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading content:', error);
  }
  
  // Return default content if file doesn't exist
  return {
    hero_title_en: 'Professional Insulation Solutions',
    hero_title_ar: 'حلول العزل المهنية',
    hero_subtitle_en: 'Leading Saudi Arabian company specializing in advanced insulation technologies',
    hero_subtitle_ar: 'الشركة الرائدة في المملكة العربية السعودية المتخصصة في تقنيات العزل المتطورة',
    hero_description_en: 'From foundation to rooftop, we provide comprehensive insulation services including Polyurethane foam, Cementitious coating, Epoxy floors, and PVC waterproofing.',
    hero_description_ar: 'من الأساس إلى السطح، نقدم خدمات عزل شاملة تشمل رغوة البولي يوريثان، والطلاء الأسمنتي، وأرضيات الإيبوكسي، والعزل المائي PVC.',
    hero_image: '',
    company_phone: '+966 50 123 4567',
    company_email: 'info@sicl.com.sa',
    company_address_en: 'Riyadh, Saudi Arabia',
    company_address_ar: 'الرياض، المملكة العربية السعودية',
    // CTA Button Settings
    cta_enabled: true,
    cta_text_en: 'Get Quote',
    cta_text_ar: 'احصل على عرض سعر',
    cta_url: '#contact',
    cta_icon: 'ri-phone-line',
    cta_style: 'primary', // primary, secondary, outline
    cta_target: '_self', // _self, _blank
    // Profile Button Settings
    profile_enabled: true,
    profile_text_en: 'Our Profile',
    profile_text_ar: 'ملفنا التعريفي',
    profile_icon: 'ri-book-open-line',
    // Social Media Settings
    social_media: {
      linkedin: {
        enabled: true,
        url: 'https://linkedin.com/company/sicl',
        icon: 'ri-linkedin-line',
        label: 'LinkedIn'
      },
      snapchat: {
        enabled: true,
        url: 'https://snapchat.com/add/sicl',
        icon: 'ri-snapchat-line',
        label: 'Snapchat'
      },
      instagram: {
        enabled: false,
        url: '#',
        icon: 'ri-instagram-line',
        label: 'Instagram'
      },
      whatsapp: {
        enabled: false,
        url: '#',
        icon: 'ri-whatsapp-line',
        label: 'WhatsApp'
      }
    }
  };
};

// Save content to file
const saveContent = (content: any) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
};

export async function GET() {
  try {
    const content = loadContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const success = saveContent(body);
    
    if (success) {
      return NextResponse.json({ message: 'Content updated successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to save content' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
} 