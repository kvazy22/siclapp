
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';

interface Service {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
  icon: string;
}

export default function ServicesPage() {
  const { language, toggleLanguage } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const content = {
    en: {
      title: 'Our Services',
      subtitle: 'Professional Insulation Solutions for Every Need',
      description: 'We provide comprehensive insulation services using the latest technology and highest quality materials. Our expert team delivers solutions that meet international standards and exceed customer expectations.',
      cta: 'Get Free Quote',
      contact: 'Contact Us',
      features: 'Key Features',
      benefits: 'Benefits',
      pricing: 'Get Pricing',
      breadcrumb: 'Home',
      closeModal: 'Close',
      getQuote: 'Get Quote',
      contactUs: 'Contact Us',
      modalTitle: 'Get Pricing for',
      modalDescription: 'Fill out the form below and our team will get back to you with a personalized quote.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Project Details',
      submit: 'Send Request'
    },
    ar: {
      title: 'خدماتنا',
      subtitle: 'حلول العزل المهنية لكل احتياج',
      description: 'نقدم خدمات عزل شاملة باستخدام أحدث التقنيات وأعلى جودة من المواد. فريقنا المتخصص يقدم حلولاً تلبي المعايير الدولية وتتجاوز توقعات العملاء.',
      cta: 'احصل على عرض سعر مجاني',
      contact: 'اتصل بنا',
      features: 'الميزات الرئيسية',
      benefits: 'الفوائد',
      pricing: 'الحصول على الأسعار',
      breadcrumb: 'الرئيسية',
      closeModal: 'إغلاق',
      getQuote: 'احصل على عرض سعر',
      contactUs: 'اتصل بنا',
      modalTitle: 'احصل على الأسعار لـ',
      modalDescription: 'املأ النموذج أدناه وسيتواصل معك فريقنا بعرض سعر مخصص.',
      name: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      message: 'تفاصيل المشروع',
      submit: 'إرسال الطلب'
    }
  };

  const text = content[language as keyof typeof content];

  useEffect(() => {
    loadServices();
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.service-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [services]);

  const loadServices = () => {
    try {
      const stored = localStorage.getItem('sicl_services');
      if (stored) {
        setServices(JSON.parse(stored));
      } else {
        const defaultServices = [
          {
            id: 1,
            title_en: 'Polyurethane Foam Insulation',
            title_ar: 'عزل رغوة البولي يوريثان',
            description_en: 'Advanced spray foam insulation providing superior thermal protection and energy efficiency for residential and commercial buildings. Our polyurethane foam creates a seamless barrier that eliminates thermal bridging.',
            description_ar: 'عزل رغوة الرش المتقدم يوفر حماية حرارية فائقة وكفاءة في استخدام الطاقة للمباني السكنية والتجارية. رغوة البولي يوريثان تخلق حاجزاً سلساً يقضي على الجسور الحرارية.',
            image: 'https://readdy.ai/api/search-image?query=Professional%20polyurethane%20foam%20insulation%20application%20workers%20in%20safety%20gear%20spraying%20foam%20on%20building%20walls%20modern%20construction%20site%20desert%20environment%20technical%20precision%20foam%20spray%20equipment&width=600&height=400&seq=service1&orientation=landscape',
            icon: 'ri-drop-line'
          },
          {
            id: 2,
            title_en: 'Cementitious Waterproofing',
            title_ar: 'العزل الإسمنتي المائي',
            description_en: 'Durable cement-based protective coatings that provide excellent waterproofing and thermal insulation for concrete structures. Our cementitious systems offer long-lasting protection against moisture infiltration.',
            description_ar: 'طلاءات واقية متينة أساسها الأسمنت توفر عزلاً مائياً وحرارياً ممتازاً للهياكل الخرسانية. أنظمة الأسمنت لدينا تقدم حماية طويلة الأمد ضد تسرب الرطوبة.',
            image: 'https://readdy.ai/api/search-image?query=Cementitious%20waterproofing%20coating%20application%20on%20concrete%20surface%20professional%20construction%20worker%20applying%20smooth%20coating%20industrial%20construction%20site%20desert%20themed%20background&width=600&height=400&seq=service2&orientation=landscape',
            icon: 'ri-brush-line'
          },
          {
            id: 3,
            title_en: 'Epoxy Floor Systems',
            title_ar: 'أنظمة الأرضيات الإيبوكسي',
            description_en: 'High-performance epoxy flooring solutions offering chemical resistance, durability, and aesthetic appeal for industrial and commercial spaces. Our epoxy systems provide seamless, easy-to-clean surfaces.',
            description_ar: 'حلول أرضيات الإيبوكسي عالية الأداء تقدم مقاومة كيميائية ومتانة وجاذبية جمالية للمساحات الصناعية والتجارية. أنظمة الإيبوكسي لدينا توفر أسطحاً سلسة وسهلة التنظيف.',
            image: 'https://readdy.ai/api/search-image?query=Epoxy%20floor%20installation%20in%20modern%20industrial%20facility%20glossy%20reflective%20surface%20professional%20application%20workers%20with%20specialized%20equipment%20clean%20environment%20desert%20construction%20setting&width=600&height=400&seq=service3&orientation=landscape',
            icon: 'ri-home-line'
          },
          {
            id: 4,
            title_en: 'PVC Waterproofing',
            title_ar: 'العزل المائي بـ PVC',
            description_en: 'Premium PVC membrane waterproofing systems providing long-lasting protection against water infiltration for roofs and foundations. Our PVC systems offer flexibility and UV resistance.',
            description_ar: 'أنظمة العزل المائي المتميزة من غشاء PVC توفر حماية طويلة الأمد ضد تسرب المياه للأسطح والأساسات. أنظمة PVC لدينا تقدم مرونة ومقاومة للأشعة فوق البنفسجية.',
            image: 'https://readdy.ai/api/search-image?query=PVC%20waterproofing%20membrane%20installation%20on%20building%20roof%20professional%20roofers%20installing%20flexible%20membrane%20sheets%20construction%20site%20desert%20landscape%20modern%20waterproofing%20technology&width=600&height=400&seq=service4&orientation=landscape',
            icon: 'ri-shield-line'
          },
          {
            id: 5,
            title_en: 'Thermal Insulation',
            title_ar: 'العزل الحراري',
            description_en: 'Comprehensive thermal insulation solutions to reduce energy consumption and improve indoor comfort. Our thermal barriers help maintain consistent temperatures year-round.',
            description_ar: 'حلول العزل الحراري الشاملة لتقليل استهلاك الطاقة وتحسين الراحة الداخلية. الحواجز الحرارية لدينا تساعد في الحفاظ على درجات حرارة ثابتة طوال العام.',
            image: 'https://readdy.ai/api/search-image?query=Thermal%20insulation%20installation%20on%20building%20walls%20professional%20workers%20installing%20insulation%20materials%20construction%20site%20desert%20environment%20energy%20efficiency%20modern%20building%20techniques&width=600&height=400&seq=service5&orientation=landscape',
            icon: 'ri-fire-line'
          },
          {
            id: 6,
            title_en: 'Acoustic Insulation',
            title_ar: 'العزل الصوتي',
            description_en: 'Advanced acoustic insulation systems to reduce noise transmission and improve sound quality in buildings. Our solutions create quieter, more comfortable environments.',
            description_ar: 'أنظمة العزل الصوتي المتقدمة لتقليل انتقال الضوضاء وتحسين جودة الصوت في المباني. حلولنا تخلق بيئات أكثر هدوءاً وراحة.',
            image: 'https://readdy.ai/api/search-image?query=Acoustic%20insulation%20installation%20in%20modern%20building%20interior%20professional%20workers%20installing%20sound%20barrier%20materials%20construction%20site%20desert%20setting%20noise%20reduction%20technology&width=600&height=400&seq=service6&orientation=landscape',
            icon: 'ri-volume-mute-line'
          }
        ];
        setServices(defaultServices);
        localStorage.setItem('sicl_services', JSON.stringify(defaultServices));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const getServiceFeatures = (serviceId: number) => {
    const features = {
      1: language === 'en' ? ['Seamless Application', 'Energy Efficient', 'Durable Protection', 'Quick Installation'] : ['تطبيق سلس', 'موفر للطاقة', 'حماية متينة', 'تركيب سريع'],
      2: language === 'en' ? ['Waterproof Barrier', 'Long-lasting', 'Chemical Resistant', 'Easy Maintenance'] : ['حاجز مقاوم للماء', 'طويل الأمد', 'مقاوم كيميائياً', 'صيانة سهلة'],
      3: language === 'en' ? ['Chemical Resistant', 'Non-slip Surface', 'Easy to Clean', 'Aesthetic Appeal'] : ['مقاوم كيميائياً', 'سطح مقاوم للانزلاق', 'سهل التنظيف', 'جاذبية جمالية'],
      4: language === 'en' ? ['UV Resistant', 'Flexible System', 'Weather Proof', 'Long Warranty'] : ['مقاوم للأشعة فوق البنفسجية', 'نظام مرن', 'مقاوم للطقس', 'ضمان طويل'],
      5: language === 'en' ? ['Energy Savings', 'Temperature Control', 'Moisture Resistant', 'Cost Effective'] : ['توفير الطاقة', 'تحكم في درجة الحرارة', 'مقاوم للرطوبة', 'فعال من حيث التكلفة'],
      6: language === 'en' ? ['Noise Reduction', 'Sound Quality', 'Fire Resistant', 'Eco-friendly'] : ['تقليل الضوضاء', 'جودة الصوت', 'مقاوم للحريق', 'صديق للبيئة']
    };
    return features[serviceId as keyof typeof features] || [];
  };

  const handleGetPricing = (service: Service) => {
    setSelectedService(service);
    setShowContactModal(true);
  };

  const handleScrollToContact = () => {
    setShowContactModal(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: `Service Inquiry: ${selectedService ? (language === 'en' ? selectedService.title_en : selectedService.title_ar) : 'General Inquiry'}\n\n${formData.get('message')}`,
          service: selectedService ? (language === 'en' ? selectedService.title_en : selectedService.title_ar) : 'General'
        }),
      });

      if (response.ok) {
        alert(language === 'en' ? 'Thank you! We will contact you soon.' : 'شكراً لك! سنتواصل معك قريباً.');
        setShowContactModal(false);
        setSelectedService(null);
      } else {
        alert(language === 'en' ? 'Error sending message. Please try again.' : 'خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(language === 'en' ? 'Error sending message. Please try again.' : 'خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'arabic' : 'english'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20construction%20site%20with%20insulation%20work%20professional%20workers%20applying%20various%20insulation%20materials%20desert%20environment%20Saudi%20Arabian%20construction%20beautiful%20architectural%20details%20clean%20minimalist%20style&width=1920&height=1080&seq=servicehero&orientation=landscape')`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <nav className="mb-8">
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <Link href="/" className="hover:text-yellow-400 transition-colors cursor-pointer">
                {text.breadcrumb}
              </Link>
              <i className="ri-arrow-right-line"></i>
              <span className="text-yellow-400">{text.title}</span>
            </div>
          </nav>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {text.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl mx-auto">
            {text.subtitle}
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            {text.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-phone-line mr-2"></i>
              {text.cta}
            </a>
            <a
              href="#services"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-down-line mr-2"></i>
              Explore Services
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-2xl text-white"></i>
        </div>
      </section>

      {/* Services Section with Parallax */}
      <section id="services" className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Abstract%20construction%20pattern%20with%20insulation%20materials%20background%20texture%20modern%20geometric%20design%20sand%20and%20yellow%20colors%20clean%20minimal%20style&width=1920&height=1080&seq=servicesbg&orientation=landscape')`,
            transform: `translateY(${parallaxOffset * 0.3}px)`
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Our Professional Services' : 'خدماتنا المهنية'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Discover our comprehensive range of insulation services designed to meet your specific needs and exceed your expectations.'
                : 'اكتشف مجموعتنا الشاملة من خدمات العزل المصممة لتلبية احتياجاتك المحددة وتجاوز توقعاتك.'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className={`service-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 ${
                  visibleItems.has(`service-${service.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={language === 'en' ? service.title_en : service.title_ar}
                    className="w-full h-64 object-cover object-top transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute -bottom-6 left-6 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <i className={`${service.icon} text-xl`}></i>
                  </div>
                </div>
                
                <div className="p-6 pt-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'en' ? service.title_en : service.title_ar}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {language === 'en' ? service.description_en : service.description_ar}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <i className="ri-check-line text-yellow-600 mr-2"></i>
                      {text.features}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getServiceFeatures(service.id).map((feature, idx) => (
                        <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleGetPricing(service)}
                      className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-phone-line mr-2"></i>
                      {text.pricing}
                    </button>
                    <button className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                      <i className="ri-share-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Ready to Get Started?' : 'مستعد للبدء؟'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Contact our expert team today for a free consultation and personalized quote for your insulation needs.'
              : 'اتصل بفريقنا المتخصص اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجات العزل الخاصة بك.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-yellow-600 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-phone-line mr-2"></i>
              {text.contact}
            </a>
            <a
              href="/projects"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-yellow-600 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-eye-line mr-2"></i>
              {language === 'en' ? 'View Projects' : 'عرض المشاريع'}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {text.modalTitle} {language === 'en' ? selectedService.title_en : selectedService.title_ar}
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                {text.modalDescription}
              </p>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={text.name}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={text.email}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={text.phone}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={text.message}
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
                  >
                    <i className="ri-send-plane-line mr-2"></i>
                    {text.submit}
                  </button>
                  <button
                    type="button"
                    onClick={handleScrollToContact}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    <i className="ri-phone-line mr-2"></i>
                    {text.contactUs}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
