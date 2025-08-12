
'use client';

import { useState, useEffect } from 'react';

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

interface CertificatesSectionProps {
  language: 'en' | 'ar';
}

const CertificatesSection = ({ language }: CertificatesSectionProps) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showModal, setShowModal] = useState(false);

  const content = {
    en: {
      title: 'Certifications & Standards',
      subtitle: 'Recognized quality and compliance certifications',
      viewCertificate: 'View Certificate',
      closeModal: 'Close',
      issuedBy: 'Issued by',
      certifiedSince: 'Certified since',
      downloadCert: 'Download Certificate',
      verifyOnline: 'Verify Online'
    },
    ar: {
      title: 'الشهادات والمعايير',
      subtitle: 'شهادات الجودة والامتثال المعترف بها',
      viewCertificate: 'عرض الشهادة',
      closeModal: 'إغلاق',
      issuedBy: 'صادرة من',
      certifiedSince: 'معتمد منذ',
      downloadCert: 'تحميل الشهادة',
      verifyOnline: 'التحقق عبر الإنترنت'
    }
  };

  const text = content[language as keyof typeof content];

  useEffect(() => {
    loadCertificates();
  }, [language]);

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
      <section id="certificates" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {text.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {text.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate, index) => (
              <div
                key={certificate.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <img
                    src={certificate.image}
                    alt={language === 'en' ? certificate.title_en : certificate.title_ar}
                    className="w-full h-48 object-cover object-top rounded-lg"
                  />
                  <div className="absolute -bottom-4 left-4 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <i className="ri-award-line text-xl"></i>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'en' ? certificate.title_en : certificate.title_ar}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {language === 'en' ? certificate.description_en : certificate.description_ar}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{language === 'en' ? certificate.issuer_en : certificate.issuer_ar}</span>
                  <span>{certificate.date}</span>
                </div>
                
                <button 
                  onClick={() => handleViewCertificate(certificate)}
                  className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-semibold whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-file-text-line mr-2"></i>
                  {text.viewCertificate}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  {language === 'en' ? 'Description' : 'الوصف'}
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
};

export default CertificatesSection;
