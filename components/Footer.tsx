'use client';

import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      company: 'Sumou Isolation Contracting Company Limited',
      about: 'Leading Saudi Arabian company specializing in professional insulation solutions for residential, commercial, and industrial projects.',
      quickLinks: 'Quick Links',
      services: 'Services',
      projects: 'Projects',
      certificates: 'Certificates',
      contact: 'Contact Us',
      developedBy: 'Developed and Designed by Nadeem Hussain',
      servicesLinks: [
        'Polyurethane Foam',
        'Cementitious Coating',
        'Epoxy Floors',
        'PVC Waterproofing',
        'Thermal Insulation'
      ],
      contactInfo: 'Contact Information',
      address: 'Holy Makkah, Al Rusaifah, Time Tower Building, 1st Floor, Office No (12)',
      rights: 'All rights reserved.',
      designedBy: 'Designed with excellence for insulation solutions'
    },
    ar: {
      company: 'شركة سمو العزل للمقاولات المحدودة',
      about: 'الشركة الرائدة في المملكة العربية السعودية المتخصصة في حلول العزل المهنية للمشاريع السكنية والتجارية والصناعية.',
      quickLinks: 'روابط سريعة',
      services: 'الخدمات',
      projects: 'المشاريع',
      certificates: 'الشهادات',
      contact: 'تواصل معنا',
      developedBy: 'تم التطوير والتصميم بواسطة نديم حسين',
      servicesLinks: [
        'رغوة البولي يوريثان',
        'الطلاء الأسمنتي',
        'أرضيات الإيبوكسي',
        'العزل المائي PVC',
        'العزل الحراري'
      ],
      contactInfo: 'معلومات الاتصال',
      address: 'مكة المكرمة، الرصيفة، برج تايم، الطابق الأول، مكتب رقم (12)',
      rights: 'جميع الحقوق محفوظة.',
      designedBy: 'مصمم بتميز لحلول العزل'
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-2">
                          <div className="logo-container flex flex-col items-start space-y-3 mb-6" style={{ textAlign: 'left', alignSelf: 'flex-start' }}>
               <img 
                 src="/sicl-logo.png" 
                 alt="SICL - Sumou Isolation Contracting Company Limited" 
                 className="h-20 w-auto drop-shadow-md"
                 style={{ minWidth: '180px', maxWidth: '240px', alignSelf: 'flex-start' }}
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.style.display = 'none';
                   target.nextElementSibling?.classList.remove('hidden');
                 }}
               />
               <div className="hidden h-20 w-48 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                 SICL
               </div>
               <div className="text-sm text-gray-400" style={{ alignSelf: 'flex-start' }}>
                 {language === 'en' ? 'شركة سمو العزل للمقاولات المحدودة' : 'Sumou Isolation Contracting Company Limited'}
               </div>
             </div>
            <h3 className="text-xl font-semibold mb-4">{text.company}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {text.about}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{text.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                  {text.services}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                  {text.projects}
                </a>
              </li>
              <li>
                <a href="#certificates" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                  {text.certificates}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                  {text.contact}
                </a>
              </li>

            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{text.services}</h4>
            <ul className="space-y-3">
              {text.servicesLinks.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 SICL (سمو العزل). {text.rights}</p>
            </div>
            <div className="text-gray-400">
              <p>{text.developedBy}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 