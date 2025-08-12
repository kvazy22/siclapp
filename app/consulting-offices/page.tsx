'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollIndicator from '../../components/ScrollIndicator';
import WhatsAppFloat from '../../components/WhatsAppFloat';

export default function ConsultingOfficesPage() {
  const { language, toggleLanguage } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const content = {
    en: {
      title: 'Engineering Consulting Offices',
      subtitle: 'Trusted Partners in Professional Engineering Excellence',
      description: 'The company has relied on consulting offices in several projects, collaborating with leading engineering firms to ensure the highest standards of quality and innovation in all our insulation projects.',
      offices: [
        'Office Of Solaiman A.E Kheriji Consulting Engineers.',
        'Office Of Dar Al-Handasah For Design and Technical services.',
        'Office Of Zuhair Fayez Partnership For Consulting Engineers.',
        'Office Of Abnia For Consulting Engineers.',
        'Office Of Alheyad Engineers Consulting.',
        'Office Of BEEAH Planners, Architects and Engineers.',
        'Al-Manabir Engineering Consultations Office.',
        'Saudi Consult.',
        'Design for Engineering Consultations.',
        'Al-Sharq Professional Consulting Company.',
        'Euro Consult for Engineering Consulatancy.',
        'Alsa Engineering Consulting Office.',
        'OTC Saudi Arabia Engineering Consulting Company.',
        'Cblock engineering consulting.',
        'Consulting in the Construction Field Dar Al Riyadh Engineering Consulting.'
      ]
    },
    ar: {
      title: 'مكاتب الاستشارات الهندسية',
      subtitle: 'شركاء موثوقون في التميز الهندسي المهني',
      description: 'اعتمدت الشركة على مكاتب استشارية في عدة مشاريع، بالتعاون مع شركات هندسية رائدة لضمان أعلى معايير الجودة والابتكار في جميع مشاريع العزل.',
      offices: [
        'مكتب سليمان أ.إ. الخريجي للاستشارات الهندسية.',
        'مكتب دار الهندسة للتصميم والخدمات التقنية.',
        'مكتب زهير فايز للشراكة في الاستشارات الهندسية.',
        'مكتب أبنياء للاستشارات الهندسية.',
        'مكتب الهياد للاستشارات الهندسية.',
        'مكتب بيئة للمخططين والمهندسين المعماريين.',
        'مكتب المنابر للاستشارات الهندسية.',
        'الاستشارات السعودية.',
        'التصميم للاستشارات الهندسية.',
        'شركة الشرق المهنية للاستشارات.',
        'يورو كونسلت للاستشارات الهندسية.',
        'مكتب السعد للاستشارات الهندسية.',
        'شركة أو تي سي السعودية للاستشارات الهندسية.',
        'سي بلوك للاستشارات الهندسية.',
        'الاستشارات في مجال البناء دار الرياض للاستشارات الهندسية.'
      ]
    }
  };

  const text = content[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'arabic' : 'english'}`}>
      <ScrollIndicator progress={0} />
      <Header />
      
      {/* Hero Section */}
      <section 
        id="hero"
        data-animate
        className={`pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 relative overflow-hidden transition-all duration-1000 ${
          visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {text.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {text.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section 
        id="description"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 delay-200 ${
          visibleSections.has('description') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              {text.description}
            </p>
          </div>
        </div>
      </section>

      {/* Consulting Offices Grid */}
      <section 
        id="offices"
        data-animate
        className={`py-20 bg-gray-50 transition-all duration-1000 delay-300 ${
          visibleSections.has('offices') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {text.offices.map((office, index) => (
              <div
                key={index}
                data-animate
                className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                  visibleSections.has(`office-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                id={`office-${index}`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-building-line text-white text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                  {office}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Highlight */}
      <section 
        id="partnership"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 delay-400 ${
          visibleSections.has('partnership') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-3xl p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <i className="ri-handshake-line text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Strategic Partnerships' : 'شراكات استراتيجية'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {language === 'en' 
                  ? 'Our collaboration with these esteemed consulting offices ensures that every project meets the highest engineering standards and regulatory requirements.'
                  : 'تعاوننا مع هذه المكاتب الاستشارية المرموقة يضمن أن كل مشروع يلبي أعلى المعايير الهندسية ومتطلبات التنظيم.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        data-animate
        className={`py-20 bg-gray-50 transition-all duration-1000 delay-500 ${
          visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Ready to Collaborate?' : 'جاهزون للتعاون؟'}
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              {language === 'en' 
                ? 'Contact us to discuss your project requirements and how we can work together with our consulting partners.'
                : 'تواصل معنا لمناقشة متطلبات مشروعك وكيف يمكننا العمل معاً مع شركائنا الاستشاريين.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:GM@sicl.sa"
                className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {language === 'en' ? 'Email Us' : 'راسلنا'}
              </a>
              <a 
                href="tel:0541501586"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                {language === 'en' ? 'Call Us' : 'اتصل بنا'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
} 