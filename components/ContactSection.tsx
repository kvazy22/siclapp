'use client';

import { useState } from 'react';

interface ContactSectionProps {
  language: string;
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const content = {
    en: {
      title: 'Get Free Quote',
      subtitle: 'Contact our experts for professional insulation solutions',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      service: 'Service Required',
      message: 'Project Details',
      submit: 'Send Quote Request',
      address: 'Head Office Address',
      workingHours: 'Working Hours',
      services: [
        'Polyurethane Foam Insulation',
        'Cementitious Coating',
        'Epoxy Floor Systems',
        'PVC Waterproofing',
        'Thermal Insulation',
        'Consultation'
      ]
    },
    ar: {
      title: 'احصل على عرض سعر مجاني',
      subtitle: 'اتصل بخبرائنا للحصول على حلول عزل مهنية',
      name: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      service: 'الخدمة المطلوبة',
      message: 'تفاصيل المشروع',
      submit: 'إرسال طلب عرض السعر',
      address: 'عنوان المكتب الرئيسي',
      workingHours: 'ساعات العمل',
      services: [
        'عزل رغوة البولي يوريثان',
        'الطلاء الأسمنتي',
        'أنظمة أرضيات الإيبوكسي',
        'العزل المائي PVC',
        'العزل الحراري',
        'استشارة'
      ]
    }
  };

  const text = content[language as keyof typeof content];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitMessage(language === 'en' ? 'Thank you! Your quote request has been submitted.' : 'شكراً لك! تم إرسال طلب عرض السعر الخاص بك.');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitMessage(language === 'en' ? 'Error submitting form. Please try again.' : 'خطأ في إرسال النموذج. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      setSubmitMessage(language === 'en' ? 'Error submitting form. Please try again.' : 'خطأ في إرسال النموذج. يرجى المحاولة مرة أخرى.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {text.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className="ri-map-pin-line text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{text.address}</h4>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Holy Makkah, Al Rusaifah, Time Tower Building, 1st Floor, Office No (12)'
                      : 'مكة المكرمة، الرصيفة، برج تايم، الطابق الأول، مكتب رقم (12)'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className="ri-phone-line text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'en' ? 'Phone Numbers' : 'أرقام الهاتف'}
                  </h4>
                  <p className="text-gray-600">+966 11 234 5678</p>
                  <p className="text-gray-600">+966 50 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className="ri-mail-line text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </h4>
                  <p className="text-gray-600">info@sicl.sa</p>
                  <p className="text-gray-600">sales@sicl.sa</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className="ri-time-line text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{text.workingHours}</h4>
                  <p className="text-gray-600">
                    {language === 'en' ? 'Sunday - Thursday: 8:00 AM - 6:00 PM' : 'الأحد - الخميس: 8:00 ص - 6:00 م'}
                  </p>
                  <p className="text-gray-600">
                    {language === 'en' ? 'Saturday: 9:00 AM - 3:00 PM' : 'السبت: 9:00 ص - 3:00 م'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4!2d39.8579!3d21.4225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21a4d6e0e6e0f%3A0x6c1b9b9b9b9b9b9b!2sTime%20Tower%20Building%2C%20Al%20Rusaifah%2C%20Makkah%20Al%20Mukarramah%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="250"
                className="rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SICL Office Location"
              ></iframe>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {text.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-sm"
                  placeholder={text.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {text.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-sm"
                  placeholder={text.email}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {text.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-sm"
                  placeholder={text.phone}
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  {text.service}
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">{text.service}</option>
                    {text.services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {text.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-sm resize-none"
                  placeholder={text.message}
                ></textarea>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.message.length}/500
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-600 text-white py-4 px-6 rounded-lg hover:bg-yellow-700 transition-colors font-semibold text-lg whitespace-nowrap disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    {language === 'en' ? 'Sending...' : 'جارٍ الإرسال...'}
                  </span>
                ) : (
                  <>
                    <i className="ri-send-plane-line mr-2"></i>
                    {text.submit}
                  </>
                )}
              </button>

              {submitMessage && (
                <div className={`p-4 rounded-lg text-center ${
                  submitMessage.includes('Thank you') || submitMessage.includes('شكراً')
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;