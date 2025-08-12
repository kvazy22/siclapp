'use client';

import { useEffect } from 'react';
import AOS from 'aos';

interface StatsSectionProps {
  language: string;
}

const StatsSection = ({ language }: StatsSectionProps) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const stats = [
    {
      number: '+25',
      label: {
        en: 'Ongoing Projects',
        ar: 'مشاريع قائمة'
      },
      color: 'bg-yellow-500'
    },
    {
      number: '+250',
      label: {
        en: 'Completed Projects',
        ar: 'مشاريع مكتملة'
      },
      color: 'bg-gray-700'
    },
    {
      number: '+9',
      label: {
        en: 'Years of Experience',
        ar: 'سنوات الخبرة'
      },
      color: 'bg-orange-600'
    },
    {
      number: '+250',
      label: {
        en: 'Warranty Certificates',
        ar: 'إصدار شهادات ضمان'
      },
      color: 'bg-red-500'
    }
  ];

  return (
    <section className="relative py-16 bg-white">
      {/* Blue background bottom section */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-600"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-lg p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
            >
              <div className={`text-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base font-medium opacity-90">
                  {stat.label[language as keyof typeof stat.label]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 