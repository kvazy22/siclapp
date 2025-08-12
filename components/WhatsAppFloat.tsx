
'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const WhatsAppFloat = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  const content = {
    en: {
      title: 'WhatsApp Support',
      message: 'Need help? Chat with our team!',
      tooltip: 'Chat with us on WhatsApp'
    },
    ar: {
      title: 'دعم واتساب',
      message: 'تحتاج مساعدة؟ تحدث مع فريقنا!',
      tooltip: 'تحدث معنا على واتساب'
    }
  };

  const text = content[language];

  const handleWhatsAppClick = () => {
    const whatsappUrl = 'https://api.whatsapp.com/send/?phone=%2B96656999441&text&type=phone_number&app_absent=0';
    window.open(whatsappUrl, '_blank');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end space-x-4">
      {/* WhatsApp Button */}
      <div className="relative">
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 animate-pulse"
          title={text.tooltip}
        >
          <i className="ri-whatsapp-line text-2xl"></i>
        </button>
        
        {/* Floating Message */}
        <div className={`absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-200 animate-bounce ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <i className="ri-whatsapp-line text-sm"></i>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{text.title}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {text.message}
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFloat;
