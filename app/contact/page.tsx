'use client';

import { useState } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollIndicator from '../../components/ScrollIndicator';
import WhatsAppFloat from '../../components/WhatsAppFloat';

export default function ContactPage() {
  const { language, toggleLanguage } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team for professional insulation solutions',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        company: 'Company Name',
        message: 'Your Message',
        submit: 'Send Message',
        namePlaceholder: 'Enter your full name',
        emailPlaceholder: 'Enter your email address',
        phonePlaceholder: 'Enter your phone number',
        companyPlaceholder: 'Enter your company name',
        messagePlaceholder: 'Tell us about your project or inquiry...'
      },
      contactInfo: {
        title: 'Contact Information',
        address: 'Address',
        addressValue: 'Holy Makkah, Al Rusaifah, Time Tower Building, 1st Floor, Office No (12)',
        phone: 'Phone',
        email: 'Email',
        workingHours: 'Working Hours',
        workingHoursValue: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
        friday: 'Friday: 9:00 AM - 1:00 PM'
      },
      success: 'Message sent successfully!',
      error: 'Error sending message. Please try again.'
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'تواصل مع فريقنا للحصول على حلول العزل المهنية',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        company: 'اسم الشركة',
        message: 'رسالتك',
        submit: 'إرسال الرسالة',
        namePlaceholder: 'أدخل اسمك الكامل',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        phonePlaceholder: 'أدخل رقم هاتفك',
        companyPlaceholder: 'أدخل اسم شركتك',
        messagePlaceholder: 'أخبرنا عن مشروعك أو استفسارك...'
      },
      contactInfo: {
        title: 'معلومات الاتصال',
        address: 'العنوان',
        addressValue: 'مكة المكرمة، الرصيفة، برج تايم، الطابق الأول، مكتب رقم (12)',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        workingHours: 'ساعات العمل',
        workingHoursValue: 'الأحد - الخميس: 8:00 ص - 6:00 م',
        friday: 'الجمعة: 9:00 ص - 1:00 م'
      },
      success: 'تم إرسال الرسالة بنجاح!',
      error: 'خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.'
    }
  };

  const text = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/api/contact-message', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert(text.success);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      } else {
        alert(text.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(text.error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'arabic' : 'english'}`}>
      <ScrollIndicator progress={scrollProgress} />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {text.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {text.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {text.form.submit}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={text.form.namePlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={text.form.emailPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={text.form.phonePlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text.form.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={text.form.companyPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.form.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={text.form.messagePlaceholder}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  {text.form.submit}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {text.contactInfo.title}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-map-pin-line text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {text.contactInfo.address}
                      </h3>
                      <p className="text-gray-600">
                        {text.contactInfo.addressValue}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-phone-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {text.contactInfo.phone}
                      </h3>
                      <p className="text-gray-600">
                        +966 11 123 4567
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-mail-line text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {text.contactInfo.email}
                      </h3>
                      <p className="text-gray-600">
                        info@sicl.com.sa
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-time-line text-orange-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {text.contactInfo.workingHours}
                      </h3>
                      <p className="text-gray-600">
                        {text.contactInfo.workingHoursValue}
                      </p>
                      <p className="text-gray-600">
                        {text.contactInfo.friday}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

                             {/* Interactive Map */}
               <div className="bg-white rounded-2xl shadow-xl p-8">
                 <h3 className="text-xl font-bold text-gray-900 mb-4">
                   {language === 'en' ? 'Our Location' : 'موقعنا'}
                 </h3>
                 <div className="rounded-lg overflow-hidden">
                   <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4!2d39.8579!3d21.4225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21a4d6e0e6e0f%3A0x6c1b9b9b9b9b9b9b!2sTime%20Tower%20Building%2C%20Al%20Rusaifah%2C%20Makkah%20Al%20Mukarramah%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1"
                     width="100%"
                     height="300"
                     className="border-0"
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                     title="SICL Office Location"
                   ></iframe>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
} 