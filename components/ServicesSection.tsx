'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

interface ServicesSectionProps {
  language: 'en' | 'ar';
}

const ServicesSection = ({ language }: ServicesSectionProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const content = {
    en: {
      title: 'Our Insulation Services',
      subtitle: 'Comprehensive solutions for all your insulation needs',
      viewMore: 'View Details',
      closeModal: 'Close',
      getQuote: 'Get Quote',
      features: 'Key Features',
      benefits: 'Benefits'
    },
    ar: {
      title: 'خدمات العزل لدينا',
      subtitle: 'حلول شاملة لجميع احتياجات العزل الخاصة بك',
      viewMore: 'عرض التفاصيل',
      closeModal: 'إغلاق',
      getQuote: 'احصل على عرض سعر',
      features: 'الميزات الرئيسية',
      benefits: 'الفوائد'
    }
  };

  const text = content[language as keyof typeof content];

  const defaultServices = [
    {
      id: 1,
      title: language === 'en' ? 'Polyurethane Foam Insulation' : 'عزل رغوة البولي يوريثان',
      description: language === 'en' 
        ? 'Advanced spray foam insulation providing superior thermal protection and energy efficiency for residential and commercial buildings.'
        : 'عزل رغوة الرش المتقدم يوفر حماية حرارية فائقة وكفاءة في استخدام الطاقة للمباني السكنية والتجارية.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20polyurethane%20foam%20insulation%20application%20on%20building%20walls%2C%20modern%20construction%20techniques%2C%20desert%20themed%20background%2C%20technical%20precision%2C%20foam%20spray%20equipment&width=400&height=300&seq=service1&orientation=landscape',
      icon: 'ri-drop-line'
    },
    {
      id: 2,
      title: language === 'en' ? 'Cementitious Coating' : 'الطلاء الأسمنتي',
      description: language === 'en'
        ? 'Durable cement-based protective coatings that provide excellent waterproofing and thermal insulation for concrete structures.'
        : 'طلاءات واقية متينة أساسها الأسمنت توفر عزلاً مائياً وحرارياً ممتازاً للهياكل الخرسانية.',
      image: 'https://readdy.ai/api/search-image?query=Cementitious%20coating%20application%20on%20concrete%20surfaces%2C%20professional%20construction%20workers%2C%20modern%20building%20techniques%2C%20desert%20environment%2C%20protective%20coating%20process&width=400&height=300&seq=service2&orientation=landscape',
      icon: 'ri-brush-line'
    },
    {
      id: 3,
      title: language === 'en' ? 'Epoxy Floor Systems' : 'أنظمة أرضيات الإيبوكسي',
      description: language === 'en'
        ? 'High-performance epoxy flooring solutions offering chemical resistance, durability, and aesthetic appeal for industrial and commercial spaces.'
        : 'حلول أرضيات الإيبوكسي عالية الأداء تقدم مقاومة كيميائية ومتانة وجاذبية جمالية للمساحات الصناعية والتجارية.',
      image: 'https://readdy.ai/api/search-image?query=Epoxy%20floor%20installation%20in%20modern%20industrial%20facility%2C%20professional%20flooring%20application%2C%20smooth%20reflective%20surface%2C%20desert%20themed%20construction%20environment&width=400&height=300&seq=service3&orientation=landscape',
      icon: 'ri-home-line'
    },
    {
      id: 4,
      title: language === 'en' ? 'PVC Waterproofing' : 'العزل المائي PVC',
      description: language === 'en'
        ? 'Premium PVC membrane waterproofing systems providing long-lasting protection against water infiltration for roofs and foundations.'
        : 'أنظمة العزل المائي المتميزة من غشاء PVC توفر حماية طويلة الأمد ضد تسرب المياه للأسطح والأساسات.',
      image: 'https://readdy.ai/api/search-image?query=PVC%20waterproofing%20membrane%20installation%20on%20rooftop%2C%20professional%20waterproofing%20techniques%2C%20modern%20construction%20methods%2C%20desert%20landscape%20construction%20site&width=400&height=300&seq=service4&orientation=landscape',
      icon: 'ri-shield-line'
    }
  ];

  useEffect(() => {
    setServices(defaultServices);
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.service-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [services]);

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleNavigateToServices = () => {
    setShowModal(false);
    router.push('/services');
  };

  const handleGetQuote = () => {
    setShowModal(false);
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getServiceFeatures = (serviceId: number) => {
    const features = {
      1: language === 'en' ? ['Seamless Application', 'Energy Efficient', 'Durable Protection', 'Quick Installation'] : ['تطبيق سلس', 'موفر للطاقة', 'حماية متينة', 'تركيب سريع'],
      2: language === 'en' ? ['Waterproof Barrier', 'Long-lasting', 'Chemical Resistant', 'Easy Maintenance'] : ['حاجز مقاوم للماء', 'طويل الأمد', 'مقاوم كيميائياً', 'صيانة سهلة'],
      3: language === 'en' ? ['Chemical Resistant', 'Non-slip Surface', 'Easy to Clean', 'Aesthetic Appeal'] : ['مقاوم كيميائياً', 'سطح مقاوم للانزلاق', 'سهل التنظيف', 'جاذبية جمالية'],
      4: language === 'en' ? ['UV Resistant', 'Flexible System', 'Weather Proof', 'Long Warranty'] : ['مقاوم للأشعة فوق البنفسجية', 'نظام مرن', 'مقاوم للطقس', 'ضمان طويل']
    };
    return features[serviceId as keyof typeof features] || [];
  };

  return (
    <>
      <section id="services" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {text.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {text.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className={`service-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  visibleItems.has(`service-${service.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover object-top rounded-lg"
                  />
                  <div className="absolute -bottom-4 left-4 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <i className={`${service.icon} text-xl`}></i>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <button 
                  onClick={() => handleViewDetails(service)}
                  className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-semibold whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-arrow-right-line mr-2"></i>
                  {text.viewMore}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'en' ? '3D Insulation Layer Visualization' : 'تصور طبقات العزل ثلاثية الأبعاد'}
            </h3>
            <div className="relative h-96 bg-gradient-to-b from-blue-100 to-yellow-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="insulation-layer bg-blue-200 border-blue-400">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-800">
                      {language === 'en' ? 'Rooftop Waterproofing' : 'العزل المائي للسطح'}
                    </span>
                    <i className="ri-shield-line text-blue-600 text-xl"></i>
                  </div>
                </div>
                <div className="insulation-layer bg-green-200 border-green-400">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-800">
                      {language === 'en' ? 'Wall Insulation' : 'عزل الجدران'}
                    </span>
                    <i className="ri-drop-line text-green-600 text-xl"></i>
                  </div>
                </div>
                <div className="insulation-layer bg-purple-200 border-purple-400">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-800">
                      {language === 'en' ? 'Floor Protection' : 'حماية الأرضيات'}
                    </span>
                    <i className="ri-home-line text-purple-600 text-xl"></i>
                  </div>
                </div>
                <div className="insulation-layer bg-orange-200 border-orange-400">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-orange-800">
                      {language === 'en' ? 'Foundation Sealing' : 'إغلاق الأساس'}
                    </span>
                    <i className="ri-brush-line text-orange-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-gray-600 hover:bg-opacity-100 transition-all"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
              <div className="absolute -bottom-6 left-6 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <i className={`${selectedService.icon} text-2xl`}></i>
              </div>
            </div>
            
            <div className="p-6 pt-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedService.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedService.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <i className="ri-check-line text-yellow-600 mr-2"></i>
                  {text.features}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getServiceFeatures(selectedService.id).map((feature, idx) => (
                    <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetQuote}
                  className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
                >
                  <i className="ri-phone-line mr-2"></i>
                  {text.getQuote}
                </button>
                <button
                  onClick={handleNavigateToServices}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  <i className="ri-arrow-right-line mr-2"></i>
                  {language === 'en' ? 'View All Services' : 'عرض جميع الخدمات'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesSection;