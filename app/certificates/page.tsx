
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';

interface Certificate {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
  issuer_en: string;
  issuer_ar: string;
  date: string;
}

export default function CertificatesPage() {
  const { language, toggleLanguage } = useLanguage();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showModal, setShowModal] = useState(false);

  const content = {
    en: {
      title: 'Certifications & Standards',
      subtitle: 'Recognized Quality and Compliance Certifications',
      description: 'Our certifications demonstrate our commitment to maintaining the highest standards in quality, safety, and environmental responsibility. We are proud to hold industry-leading certifications that validate our expertise.',
      cta: 'Contact Our Team',
      contact: 'Get Certified Services',
      breadcrumb: 'Home',
      viewCertificate: 'View Certificate',
      issuedBy: 'Issued by',
      certifiedSince: 'Certified since',
      downloadCert: 'Download Certificate',
      verifyOnline: 'Verify Online',
      closeModal: 'Close',
      descriptionLabel: 'Description'
    },
    ar: {
      title: 'الشهادات والمعايير',
      subtitle: 'شهادات الجودة والامتثال المعترف بها',
      description: 'تُظهر شهاداتنا التزامنا بالحفاظ على أعلى معايير الجودة والسلامة والمسؤولية البيئية. نحن فخورون بحصولنا على شهادات رائدة في الصناعة تؤكد خبرتنا.',
      cta: 'اتصل بفريقنا',
      contact: 'احصل على خدمات معتمدة',
      breadcrumb: 'الرئيسية',
      viewCertificate: 'عرض الشهادة',
      issuedBy: 'صادرة من',
      certifiedSince: 'معتمد منذ',
      downloadCert: 'تحميل الشهادة',
      verifyOnline: 'التحقق عبر الإنترنت',
      closeModal: 'إغلاق',
      descriptionLabel: 'الوصف'
    }
  };

  const text = content[language as keyof typeof content];

  useEffect(() => {
    loadCertificates();
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
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.certificate-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [certificates]);

  const loadCertificates = () => {
    try {
      const stored = localStorage.getItem('sicl_certificates');
      if (stored) {
        const storedCertificates = JSON.parse(stored);
        setCertificates(storedCertificates);
      } else {
        const defaultCertificates = [
          {
            id: 1,
            title_en: 'ISO 9001:2015 Quality Management',
            title_ar: 'إدارة الجودة ISO 9001:2015',
            description_en: 'International standard for quality management systems ensuring consistent quality in our insulation services and commitment to customer satisfaction.',
            description_ar: 'معيار دولي لأنظمة إدارة الجودة يضمن جودة متسقة في خدمات العزل لدينا والالتزام برضا العملاء.',
            image: 'https://readdy.ai/api/search-image?query=ISO%209001%20certificate%20document%2C%20professional%20quality%20management%20certification%2C%20clean%20office%20environment%2C%20desert%20themed%20background%2C%20official%20documentation&width=500&height=400&seq=cert1&orientation=landscape',
            issuer_en: 'International Organization for Standardization',
            issuer_ar: 'المنظمة الدولية للمعايير',
            date: '2021'
          },
          {
            id: 2,
            title_en: 'ISO 14001:2015 Environmental Management',
            title_ar: 'إدارة البيئة ISO 14001:2015',
            description_en: 'Environmental management system certification demonstrating our commitment to sustainable practices and environmental responsibility.',
            description_ar: 'شهادة نظام إدارة البيئة التي تظهر التزامنا بالممارسات المستدامة والمسؤولية البيئية.',
            image: 'https://readdy.ai/api/search-image?query=ISO%2014001%20environmental%20certificate%2C%20sustainability%20certification%2C%20green%20building%20standards%2C%20environmental%20management%20system%20documentation&width=400&height=300&seq=cert2&orientation=landscape',
            issuer_en: 'International Organization for Standardization',
            issuer_ar: 'المنظمة الدولية للمعايير',
            date: '2022'
          },
          {
            id: 3,
            title_en: 'SASO Quality Mark',
            title_ar: 'علامة الجودة السعودية',
            description_en: 'Saudi Arabian Standards Organization quality mark ensuring our products meet national quality standards and regulatory requirements.',
            description_ar: 'علامة الجودة السعودية للمواصفات والمقاييس التي تضمن أن منتجاتنا تلبي معايير الجودة الوطنية والمتطلبات التنظيمية.',
            image: 'https://readdy.ai/api/search-image?query=SASO%20quality%20mark%20certificate%2C%20Saudi%20Arabian%20Standards%20Organization%2C%20national%20quality%20certification%2C%20official%20Saudi%20documentation&width=400&height=300&seq=cert3&orientation=landscape',
            issuer_en: 'Saudi Arabian Standards Organization',
            issuer_ar: 'الهيئة السعودية للمواصفات والمقاييس',
            date: '2022'
          },
          {
            id: 4,
            title_en: 'Occupational Health & Safety OHSAS 18001',
            title_ar: 'الصحة والسلامة المهنية OHSAS 18001',
            description_en: 'Workplace safety management system ensuring the highest safety standards in our operations and protecting our workers and clients.',
            description_ar: 'نظام إدارة السلامة في مكان العمل يضمن أعلى معايير السلامة في عملياتنا وحماية العمال والعملاء.',
            image: 'https://readdy.ai/api/search-image?query=OHSAS%2018001%20safety%20certificate%2C%20workplace%20safety%20certification%2C%20construction%20safety%20standards%2C%20professional%20safety%20documentation&width=400&height=300&seq=cert4&orientation=landscape',
            issuer_en: 'Occupational Health & Safety Authority',
            issuer_ar: 'هيئة السلامة والصحة المهنية',
            date: '2023'
          },
          {
            id: 5,
            title_en: 'Energy Efficiency Certification',
            title_ar: 'شهادة كفاءة الطاقة',
            description_en: 'Certification for energy-efficient insulation solutions contributing to green building standards and reduced environmental impact.',
            description_ar: 'شهادة لحلول العزل الموفرة للطاقة التي تساهم في معايير البناء الأخضر وتقليل التأثير البيئي.',
            image: 'https://readdy.ai/api/search-image?query=Energy%20efficiency%20certificate%2C%20green%20building%20certification%2C%20sustainable%20insulation%20technology%2C%20professional%20energy%20standards%20documentation&width=400&height=300&seq=cert5&orientation=landscape',
            issuer_en: 'Saudi Energy Efficiency Center',
            issuer_ar: 'مركز كفاءة الطاقة السعودي',
            date: '2023'
          },
          {
            id: 6,
            title_en: 'Technical Excellence Award',
            title_ar: 'جائزة التميز التقني',
            description_en: 'Recognition for outstanding technical innovation in insulation technology and application methods, awarded by industry professionals.',
            description_ar: 'تقدير للابتكار التقني المتميز في تقنية العزل وطرق التطبيق، الممنوح من قبل المهنيين في الصناعة.',
            image: 'https://readdy.ai/api/search-image?query=Technical%20excellence%20award%20certificate%2C%20construction%20industry%20recognition%2C%20innovation%20in%20insulation%20technology%2C%20professional%20achievement%20award&width=400&height=300&seq=cert6&orientation=landscape',
            issuer_en: 'Saudi Construction Industry Association',
            issuer_ar: 'جمعية صناعة البناء السعودية',
            date: '2022'
          }
        ];
        setCertificates(defaultCertificates);
        localStorage.setItem('sicl_certificates', JSON.stringify(defaultCertificates));
      }
    } catch (error) {
      console.error('Error loading certificates:', error);
    }
  };

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: 'url("https://readdy.ai/api/search-image?query=professional%20certification%20ceremony%2C%20award%20presentation%2C%20quality%20management%20certificate%2C%20business%20excellence%2C%20desert%20themed%20office%20background&width=1920&height=1080&seq=hero&orientation=landscape")',
              transform: `translateY(${parallaxOffset}px)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/60"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
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
                href="#certificates"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
              >
                <i className="ri-arrow-down-line mr-2"></i>
                View Certificates
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <i className="ri-arrow-down-line text-2xl text-white"></i>
          </div>
        </section>

        {/* Certificates Section with Parallax */}
        <section id="certificates" className="relative py-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
            style={{
              backgroundImage: 'url("https://readdy.ai/api/search-image?query=certificate%20wall%2C%20awards%20display%2C%20professional%20achievements%2C%20quality%20standards%2C%20modern%20office%20interior&width=1920&height=1080&seq=bg&orientation=landscape")',
              transform: `translateY(${parallaxOffset * 0.3}px)`
            }}
          ></div>

          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {language === 'en' ? 'Our Certifications' : 'شهاداتنا'}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {language === 'en'
                  ? 'We maintain the highest industry standards through rigorous certification processes and continuous quality improvement.'
                  : 'نحافظ على أعلى المعايير الصناعية من خلال عمليات الشهادات الصارمة والتحسين المستمر للجودة.'}
              </p>
            </div>

            {/* Certificates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {certificates.map((certificate, index) => (
                <div
                  key={certificate.id}
                  id={`certificate-${certificate.id}`}
                  className={`certificate-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 ${
                    visibleItems.has(`certificate-${certificate.id}`)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={certificate.image}
                      alt={language === 'en' ? certificate.title_en : certificate.title_ar}
                      className="w-full h-48 object-cover object-top transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute -bottom-6 left-6 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <i className="ri-award-line text-xl"></i>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {certificate.date}
                    </div>
                  </div>

                  <div className="p-6 pt-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {language === 'en' ? certificate.title_en : certificate.title_ar}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {language === 'en' ? certificate.description_en : certificate.description_ar}
                    </p>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">{text.issuedBy}</div>
                      <div className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {language === 'en' ? certificate.issuer_en : certificate.issuer_ar}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewCertificate(certificate)}
                        className="w-full bg-yellow-600 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-all transform hover:scale-105 font-semibold text-sm whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-eye-line mr-1"></i>
                        {text.viewCertificate}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Why Choose Our Certified Services' : 'لماذا تختار خدماتنا المعتمدة'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <i className="ri-shield-check-line text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'en' ? 'Quality Assurance' : 'ضمان الجودة'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'en'
                    ? 'Our certifications ensure consistent quality and adherence to international standards in all our projects.'
                    : 'شهاداتنا تضمن جودة متسقة والالتزام بالمعايير الدولية في جميع مشاريعنا.'}
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <i className="ri-user-star-line text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'en' ? 'Professional Expertise' : 'خبرة مهنية'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'en'
                    ? 'Our team of certified professionals brings years of experience and specialized knowledge to every project.'
                    : 'فريقنا من المهنيين المعتمدين يجلب سنوات من الخبرة والمعرفة المتخصصة لكل مشروع.'}
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <i className="ri-award-line text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'en' ? 'Industry Recognition' : 'الاعتراف بالصناعة'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'en'
                    ? 'Our certifications are recognized by leading industry organizations and regulatory bodies worldwide.'
                    : 'شهاداتنا معترف بها من قبل المنظمات الرائدة في الصناعة والهيئات التنظيمية في جميع أنحاء العالم.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {language === 'en' ? 'Get Certified Services' : 'احصل على خدمات معتمدة'}
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {language === 'en'
                  ? 'Contact us to learn more about our certified services and how we can help with your insulation needs.'
                  : 'اتصل بنا لمعرفة المزيد عن خدماتنا المعتمدة وكيف يمكننا المساعدة في احتياجات العزل الخاصة بك.'}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <i className="ri-phone-line text-yellow-600 text-xl mr-4"></i>
                      <div>
                        <div className="font-semibold text-gray-900">Phone</div>
                        <div className="text-gray-600">+966 50 123 4567</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-mail-line text-yellow-600 text-xl mr-4"></i>
                      <div>
                        <div className="font-semibold text-gray-900">Email</div>
                        <div className="text-gray-600">info@sicl.com</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-map-pin-line text-yellow-600 text-xl mr-4"></i>
                      <div>
                        <div className="font-semibold text-gray-900">Address</div>
                        <div className="text-gray-600">Riyadh, Saudi Arabia</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === 'en' ? 'Quick Contact' : 'اتصال سريع'}
                  </h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Your Name' : 'اسمك'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                    />
                    <input
                      type="email"
                      placeholder={language === 'en' ? 'Your Email' : 'بريدك الإلكتروني'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                    />
                    <textarea
                      rows={4}
                      placeholder={language === 'en' ? 'Your Message' : 'رسالتك'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
                    >
                      {language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppFloat />
      </div>

      {/* Certificate Detail Modal */}
      {showModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'en' ? selectedCertificate.title_en : selectedCertificate.title_ar}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">{text.issuedBy}:</span> {language === 'en' ? selectedCertificate.issuer_en : selectedCertificate.issuer_ar}
                    </div>
                    <div>
                      <span className="font-semibold">{text.certifiedSince}:</span> {selectedCertificate.date}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedCertificate.image}
                  alt={language === 'en' ? selectedCertificate.title_en : selectedCertificate.title_ar}
                  className="w-full h-96 object-contain rounded-lg border border-gray-200"
                />
              </div>

                             <div className="mb-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
                   {text.descriptionLabel}
                 </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'en' ? selectedCertificate.description_en : selectedCertificate.description_ar}
                </p>
              </div>


            </div>
          </div>
        </div>
      )}
    </>
  );
}
