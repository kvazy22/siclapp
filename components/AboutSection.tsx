'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AboutSectionProps {
  language: string;
}

const AboutSection = ({ language }: AboutSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const content = {
    en: {
      title: 'About Company',
      subtitle: 'Professional Insulation Systems Services',
      paragraph1: 'Insulation of buildings is one of the basic operations accompanying the construction operations, as it is a preventive project of great importance in preserving the life of the concrete structure for the longest possible period.',
      paragraph2: 'For its specular significant role at far term, All buildings under construction have been officially obligated to implement it. In addition to applying control over it to all governmental and private projects to ensure that it is carried out in the required manner.',
      certified: 'Certified Company'
    },
    ar: {
      title: 'عن الشركة',
      subtitle: 'خدمات أنظمة العزل الإحترافية',
      paragraph1: 'نحن شركة سمو العزل المميزة بالعلامة التجارية "SICL" رواد في مجال العزل المائي و الحراري ، وتقديم خدمات المعالجة الخاصة بالخرسانة وكشف التسريبات المائيه و التطبيقات الإيبوكسية ، على أعلى مستوى من الجودة وقد تفردت الشركة بطموح يتنامى بشكل كبير لتحقيق الإنجازات وتحقيق الريادة الشاملة في مجال العزل.',
      paragraph2: 'وهو مايقود لضرورة الحفاظ على البصمة المميزة للشركة وتأتي مكانتنا الاستثنائية في السوق نتيجة التخطيط المتقدم من أجل التنفيذ الدقيق والأداء المبتكر. وهي أيضا انعكاس لحجم المشاريع التي تم إنجازها خلال السنوات الماضية.',
      certified: 'شركة معتمدة'
    }
  };

  const text = content[language as keyof typeof content];

  // Project images for the about section
  const images = [
    {
      src: '/about-image-1.jpg',
      alt: 'Waterproofing Project',
      title: 'Waterproofing Project'
    },
    {
      src: '/about-image-2.jpg', 
      alt: 'Thermal Insulation',
      title: 'Thermal Insulation'
    },
    {
      src: '/about-image-3.jpg',
      alt: 'Epoxy Applications', 
      title: 'Epoxy Applications'
    },
    {
      src: '/about-image-4.jpg',
      alt: 'Leak Detection',
      title: 'Leak Detection'
    },
    {
      src: '/about-image-5.jpg',
      alt: 'Concrete Treatment',
      title: 'Concrete Treatment'
    },
    {
      src: '/about-image-6.jpg',
      alt: 'Professional Services',
      title: 'Professional Services'
    }
  ];

     return (
     <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
       {/* Background decorative elements */}
       <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-600/5 rounded-full blur-3xl"></div>
       <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
                     {/* Content Section */}
           <div 
             className={`space-y-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}
             data-aos="fade-right"
             data-aos-delay="200"
             data-aos-duration="1000"
           >
             <div className="space-y-6">
               <div className="inline-block bg-yellow-600/10 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                 {language === 'en' ? 'About Us' : 'من نحن'}
               </div>
               <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                 {text.title}
               </h2>
               <h3 className="text-2xl font-semibold text-yellow-600 mb-8 border-l-4 border-yellow-600 pl-4">
                 {text.subtitle}
               </h3>
             </div>
             
             <div className="space-y-6 text-lg leading-relaxed text-gray-700">
               <p className="text-gray-600">{text.paragraph1}</p>
               <p className="text-gray-600">{text.paragraph2}</p>
             </div>

             <div className="inline-flex items-center space-x-3 bg-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
               <span>✓</span>
               <span>{text.certified}</span>
             </div>
           </div>

                     {/* Stacked Images Section */}
           <div className="relative h-96 lg:h-[600px] flex justify-center lg:justify-end">
                         {images.slice(0, 4).map((image, index) => (
               <div
                 key={index}
                 className={`absolute w-72 h-56 lg:w-96 lg:h-72 rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 hover:scale-110 hover:shadow-3xl cursor-pointer group ${
                   hoveredIndex === index ? 'ring-4 ring-yellow-400/50' : ''
                 } ${
                   index === 0 ? 'top-0 right-0 lg:right-0' : ''
                 } ${
                   index === 1 ? 'top-10 right-10 lg:right-10' : ''
                 } ${
                   index === 2 ? 'top-20 right-20 lg:right-20' : ''
                 } ${
                   index === 3 ? 'top-30 right-30 lg:right-30' : ''
                 }`}
                 data-aos="fade-left"
                 data-aos-delay={400 + (index * 300)}
                 data-aos-duration="1200"
                 onMouseEnter={() => setHoveredIndex(index)}
                 onMouseLeave={() => setHoveredIndex(null)}
                                   style={{
                    transform: `translateX(${index * 30}px) rotate(${index * 2}deg) translateY(${hoveredIndex === index ? '-10px' : '0px'})`,
                    zIndex: hoveredIndex === index ? 50 : 40 - index,
                  }}
               >
                                 <img
                   src={image.src}
                   alt={image.alt}
                   className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                   onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.style.display = 'none';
                     target.parentElement!.innerHTML = `
                       <div class="w-full h-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                         ${image.title}
                       </div>
                     `;
                   }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                   <div className="w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <h4 className="font-bold text-xl mb-2">{image.title}</h4>
                     <p className="text-sm opacity-90">Professional Insulation Services</p>
                   </div>
                 </div>
                 <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                   SICL
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 