'use client';

import { useLanguage } from '../lib/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: '404',
      subtitle: 'This page has not been generated',
      description: 'Tell me what you would like on this page'
    },
    ar: {
      title: '404',
      subtitle: 'هذه الصفحة لم يتم إنشاؤها',
      description: 'أخبرني ماذا تريد في هذه الصفحة'
    }
  };

  const text = content[language];

  return (
    <div className={`flex flex-col items-center justify-center h-screen text-center px-4 ${language === 'ar' ? 'arabic' : 'english'}`}>
      <h1 className="text-5xl md:text-5xl font-semibold text-gray-100">{text.title}</h1>
      <h1 className={`text-2xl md:text-3xl font-semibold mt-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
        {text.subtitle}
      </h1>
      <p className={`mt-4 text-xl md:text-2xl text-gray-500 ${language === 'ar' ? 'font-arabic' : ''}`}>
        {text.description}
      </p>
    </div>
  );
}