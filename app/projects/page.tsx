
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';

interface Project {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  images: string[];
  category: string;
  location_en: string;
  location_ar: string;
  year: string;
  projectArea: string;
  servicesProvided_en: string;
  servicesProvided_ar: string;
  projectStatus: 'ongoing' | 'finished' | 'yet-to-start';
  startDate?: string;
  endDate?: string;
}

export default function ProjectsPage() {
  const { language, toggleLanguage } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const content = {
    en: {
      title: 'Our Projects',
      subtitle: 'Excellence in Every Project We Deliver',
      description: 'Explore our portfolio of successfully completed insulation projects across Saudi Arabia. From residential complexes to industrial facilities, we deliver quality solutions that stand the test of time.',
      cta: 'Start Your Project',
      contact: 'Contact Us',
      breadcrumb: 'Home',
      all: 'All Projects',
      residential: 'Residential',
      commercial: 'Commercial',
      industrial: 'Industrial',
      viewDetails: 'View Details',
      close: 'Close',
      location: 'Location',
      year: 'Year',
      category: 'Category',
      projectArea: 'Project Area',
      servicesProvided: 'Services Provided',
      projectStatus: 'Project Status',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: {
        ongoing: 'Ongoing',
        finished: 'Finished',
        yetToStart: 'Yet to Start'
      }
    },
    ar: {
      title: 'مشاريعنا',
      subtitle: 'التميز في كل مشروع نقوم بتسليمه',
      description: 'استكشف مجموعة أعمالنا من مشاريع العزل المنجزة بنجاح في جميع أنحاء المملكة العربية السعودية. من المجمعات السكنية إلى المرافق الصناعية، نقدم حلولاً عالية الجودة تصمد أمام اختبار الزمن.',
      cta: 'ابدأ مشروعك',
      contact: 'اتصل بنا',
      breadcrumb: 'الرئيسية',
      all: 'جميع المشاريع',
      residential: 'سكني',
      commercial: 'تجاري',
      industrial: 'صناعي',
      viewDetails: 'عرض التفاصيل',
      close: 'إغلاق',
      location: 'الموقع',
      year: 'السنة',
      category: 'الفئة',
      projectArea: 'مساحة المشروع',
      servicesProvided: 'الخدمات المقدمة',
      projectStatus: 'حالة المشروع',
      startDate: 'تاريخ البدء',
      endDate: 'تاريخ الانتهاء',
      status: {
        ongoing: 'قيد التنفيذ',
        finished: 'مكتمل',
        yetToStart: 'لم يبدأ بعد'
      }
    }
  };

  const text = content[language as keyof typeof content];

  useEffect(() => {
    loadProjects();
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

    const elements = document.querySelectorAll('.project-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]);

  const loadProjects = () => {
    try {
      const stored = localStorage.getItem('sicl_projects');
      if (stored) {
        const storedProjects = JSON.parse(stored);
        // Migrate old project structure to new structure
        const migratedProjects = storedProjects.map((project: any) => {
          // If project has old 'image' field, convert to new 'images' array
          if (project.image && !project.images) {
            return {
              ...project,
              images: [project.image],
              projectArea: project.projectArea || 'N/A',
              servicesProvided: project.servicesProvided || 'N/A',
              projectStatus: project.projectStatus || 'ongoing',
              startDate: project.startDate || '',
              endDate: project.endDate || ''
            };
          }
          // If project already has new structure, ensure all required fields exist
          return {
            ...project,
            images: project.images || (project.image ? [project.image] : []),
            projectArea: project.projectArea || 'N/A',
            servicesProvided: project.servicesProvided || 'N/A',
            projectStatus: project.projectStatus || 'ongoing',
            startDate: project.startDate || '',
            endDate: project.endDate || ''
          };
        });
        setProjects(migratedProjects);
        // Save migrated data back to localStorage
        localStorage.setItem('sicl_projects', JSON.stringify(migratedProjects));
      } else {
        // Default projects with new structure
        const defaultProjects = [
          {
            id: 1,
            title_en: 'Royal Villa Complex',
            title_ar: 'مجمع الفيلا الملكية',
            description_en: 'Complete insulation solution for luxury residential complex including foundation waterproofing, thermal insulation, and roof protection systems.',
            description_ar: 'حل عزل شامل لمجمع سكني فاخر يشمل العزل المائي للأساس والعزل الحراري وأنظمة حماية الأسطح.',
            category: 'residential',
            images: ['https://readdy.ai/api/search-image?query=Luxury%20Saudi%20Arabian%20villa%20with%20modern%20insulation%20work%2C%20desert%20landscape%2C%20professional%20construction%2C%20elegant%20architecture%2C%20beige%20and%20sand%20colors&width=600&height=400&seq=project1&orientation=landscape'],
            location_en: 'Riyadh, Saudi Arabia',
            location_ar: 'الرياض، المملكة العربية السعودية',
            year: '2023',
            projectArea: '15,000 sqm',
            servicesProvided_en: 'Foundation waterproofing, Thermal insulation, Roof protection',
            servicesProvided_ar: 'العزل المائي للأساس، العزل الحراري، حماية الأسطح',
            projectStatus: 'finished' as const,
            startDate: '2023-01-15',
            endDate: '2023-08-20'
          },
          {
            id: 2,
            title_en: 'Business Tower Insulation',
            title_ar: 'عزل برج الأعمال',
            description_en: 'Advanced thermal insulation system for 40-story commercial tower with energy-efficient solutions and advanced waterproofing systems.',
            description_ar: 'نظام عزل حراري متقدم لبرج تجاري من 40 طابق مع حلول موفرة للطاقة وأنظمة العزل المائي المتقدمة.',
            category: 'commercial',
            images: ['https://readdy.ai/api/search-image?query=Modern%20commercial%20tower%20in%20Saudi%20Arabia%20with%20insulation%20work%2C%20professional%20construction%2C%20desert%20environment%2C%20glass%20facade%2C%20contemporary%20architecture&width=600&height=400&seq=project2&orientation=landscape'],
            location_en: 'Jeddah, Saudi Arabia',
            location_ar: 'جدة، المملكة العربية السعودية',
            year: '2023',
            projectArea: '25,000 sqm',
            servicesProvided_en: 'Thermal insulation, Waterproofing systems, Energy efficiency',
            servicesProvided_ar: 'العزل الحراري، أنظمة العزل المائي، كفاءة الطاقة',
            projectStatus: 'ongoing' as const,
            startDate: '2023-03-10'
          },
          {
            id: 3,
            title_en: 'Manufacturing Facility',
            title_ar: 'منشأة التصنيع',
            description_en: 'Industrial-grade insulation for manufacturing plant including specialized flooring, wall systems, and acoustic insulation solutions.',
            description_ar: 'عزل صناعي لمصنع التصنيع يشمل أرضيات متخصصة وأنظمة جدران وحلول العزل الصوتي.',
            category: 'industrial',
            images: ['https://readdy.ai/api/search-image?query=Industrial%20manufacturing%20facility%20with%20insulation%20work%2C%20modern%20factory%20building%2C%20desert%20environment%2C%20technical%20construction%2C%20industrial%20architecture&width=600&height=400&seq=project3&orientation=landscape'],
            location_en: 'Dammam, Saudi Arabia',
            location_ar: 'الدمام، المملكة العربية السعودية',
            year: '2022',
            projectArea: '30,000 sqm',
            servicesProvided_en: 'Industrial flooring, Wall systems, Acoustic insulation',
            servicesProvided_ar: 'الأرضيات الصناعية، أنظمة الجدران، العزل الصوتي',
            projectStatus: 'finished' as const,
            startDate: '2022-06-01',
            endDate: '2022-12-15'
          },
          {
            id: 4,
            title_en: 'Shopping Mall Complex',
            title_ar: 'مجمع المول التجاري',
            description_en: 'Comprehensive insulation system for large shopping complex with advanced waterproofing, thermal control, and energy efficiency solutions.',
            description_ar: 'نظام عزل شامل لمجمع تسوق كبير مع العزل المائي المتقدم والتحكم الحراري وحلول كفاءة الطاقة.',
            category: 'commercial',
            images: ['https://readdy.ai/api/search-image?query=Large%20shopping%20mall%20in%20Saudi%20Arabia%20with%20insulation%20construction%2C%20modern%20commercial%20architecture%2C%20desert%20setting%2C%20professional%20building%20work&width=600&height=400&seq=project4&orientation=landscape'],
            location_en: 'Riyadh, Saudi Arabia',
            location_ar: 'الرياض، المملكة العربية السعودية',
            year: '2023',
            projectArea: '45,000 sqm',
            servicesProvided_en: 'Waterproofing, Thermal control, Energy efficiency',
            servicesProvided_ar: 'العزل المائي، التحكم الحراري، كفاءة الطاقة',
            projectStatus: 'ongoing' as const,
            startDate: '2023-05-20'
          },
          {
            id: 5,
            title_en: 'Residential Compound',
            title_ar: 'المجمع السكني',
            description_en: 'Modern residential compound with complete insulation package including roofing, foundation work, and thermal barrier systems.',
            description_ar: 'مجمع سكني حديث مع حزمة عزل شاملة تشمل أعمال الأسقف والأساسات وأنظمة الحواجز الحرارية.',
            category: 'residential',
            images: ['https://readdy.ai/api/search-image?query=Modern%20residential%20compound%20in%20Saudi%20Arabia%2C%20multiple%20villas%20with%20insulation%20work%2C%20desert%20landscape%2C%20contemporary%20housing%20development&width=600&height=400&seq=project5&orientation=landscape'],
            location_en: 'Mecca, Saudi Arabia',
            location_ar: 'مكة المكرمة، المملكة العربية السعودية',
            year: '2022',
            projectArea: '20,000 sqm',
            servicesProvided_en: 'Roofing, Foundation work, Thermal barriers',
            servicesProvided_ar: 'أعمال الأسقف، أعمال الأساسات، الحواجز الحرارية',
            projectStatus: 'finished' as const,
            startDate: '2022-03-15',
            endDate: '2022-10-30'
          },
          {
            id: 6,
            title_en: 'Warehouse Complex',
            title_ar: 'مجمع المستودعات',
            description_en: 'Large-scale warehouse insulation project with specialized industrial flooring, climate control systems, and moisture protection.',
            description_ar: 'مشروع عزل مستودعات واسع النطاق مع أرضيات صناعية متخصصة وأنظمة تحكم في المناخ وحماية الرطوبة.',
            category: 'industrial',
            images: ['https://readdy.ai/api/search-image?query=Large%20warehouse%20complex%20in%20Saudi%20Arabia%20with%20insulation%20work%2C%20industrial%20buildings%2C%20desert%20environment%2C%20modern%20logistics%20facility&width=600&height=400&seq=project6&orientation=landscape'],
            location_en: 'Jubail, Saudi Arabia',
            location_ar: 'الجبيل، المملكة العربية السعودية',
            year: '2023',
            projectArea: '35,000 sqm',
            servicesProvided_en: 'Industrial flooring, Climate control, Moisture protection',
            servicesProvided_ar: 'الأرضيات الصناعية، التحكم في المناخ، حماية الرطوبة',
            projectStatus: 'yet-to-start' as const
          }
        ];
        setProjects(defaultProjects);
        localStorage.setItem('sicl_projects', JSON.stringify(defaultProjects));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const categories = [
    { id: 'all', label: text.all },
    { id: 'residential', label: text.residential },
    { id: 'commercial', label: text.commercial },
    { id: 'industrial', label: text.industrial }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finished':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'yet-to-start':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'finished':
        return text.status.finished;
      case 'ongoing':
        return text.status.ongoing;
      case 'yet-to-start':
        return text.status.yetToStart;
      default:
        return status;
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
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20construction%20projects%20showcase%20multiple%20buildings%20with%20insulation%20work%20professional%20construction%20sites%20desert%20environment%20Saudi%20Arabian%20architecture%20beautiful%20skyline&width=1920&height=1080&seq=projectshero&orientation=landscape')`,
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
              href="#projects"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-down-line mr-2"></i>
              Explore Projects
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-2xl text-white"></i>
        </div>
      </section>

      {/* Projects Section with Parallax */}
      <section id="projects" className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Abstract%20architectural%20pattern%20with%20construction%20elements%20background%20texture%20modern%20geometric%20design%20sand%20and%20yellow%20colors%20clean%20minimal%20style&width=1920&height=1080&seq=projectsbg&orientation=landscape')`,
            transform: `translateY(${parallaxOffset * 0.3}px)`
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Our Portfolio' : 'مجموعة أعمالنا'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Discover our successful projects across different sectors, each showcasing our commitment to quality and innovation.'
                : 'اكتشف مشاريعنا الناجحة عبر قطاعات مختلفة، كل منها يُظهر التزامنا بالجودة والابتكار.'
              }
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className={`project-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 ${
                  visibleItems.has(`project-${project.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.images?.[0] && project.images[0].trim() !== '' ? project.images[0] : '/sicl-logo.png'}
                    alt={language === 'en' ? project.title_en : project.title_ar}
                    className="w-full h-64 object-cover object-top transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.year}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.projectStatus)}`}>
                      {getStatusText(project.projectStatus)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {language === 'en' ? project.category : 
                      project.category === 'residential' ? 'سكني' :
                      project.category === 'commercial' ? 'تجاري' : 'صناعي'
                    }
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'en' ? project.title_en : project.title_ar}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {language === 'en' ? project.description_en : project.description_ar}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <i className="ri-map-pin-line mr-2"></i>
                    {language === 'en' ? project.location_en : project.location_ar}
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewDetails(project)}
                      className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-all transform hover:scale-105 font-semibold whitespace-nowrap"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      {text.viewDetails}
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-lg">
                {language === 'en' ? 'Projects Completed' : 'مشروع مكتمل'}
              </div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg">
                {language === 'en' ? 'Client Satisfaction' : 'رضا العملاء'}
              </div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-lg">
                {language === 'en' ? 'Years Experience' : 'سنة خبرة'}
              </div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg">
                {language === 'en' ? 'Support Service' : 'خدمة الدعم'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Start Your Next Project' : 'ابدأ مشروعك التالي'}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Join our growing list of satisfied clients. Contact us today to discuss your insulation project requirements.'
              : 'انضم إلى قائمتنا المتزايدة من العملاء الراضين. اتصل بنا اليوم لمناقشة متطلبات مشروع العزل الخاص بك.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-phone-line mr-2"></i>
              {text.contact}
            </a>
            <a
              href="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition-all transform hover:scale-105 font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-tools-line mr-2"></i>
              {language === 'en' ? 'Our Services' : 'خدماتنا'}
            </a>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {showDetailModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {language === 'en' ? selectedProject.title_en : selectedProject.title_ar}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              {/* Project Images */}
              <div className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(selectedProject.images || []).filter(image => image && image.trim() !== '').map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${language === 'en' ? selectedProject.title_en : selectedProject.title_ar} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Project Information' : 'معلومات المشروع'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">{language === 'en' ? 'Description' : 'الوصف'}: </span>
                      <p className="text-gray-600">
                        {language === 'en' ? selectedProject.description_en : selectedProject.description_ar}
                      </p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">{text.projectArea}: </span>
                      <span className="text-gray-600">
                        {language === 'ar' 
                          ? selectedProject.projectArea.replace('sqm', 'متر مربع')
                          : selectedProject.projectArea
                        }
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">{text.servicesProvided}: </span>
                      <p className="text-gray-600">
                        {language === 'en' ? selectedProject.servicesProvided_en : selectedProject.servicesProvided_ar}
                      </p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">{text.location}: </span>
                      <span className="text-gray-600">
                        {language === 'en' ? selectedProject.location_en : selectedProject.location_ar}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Project Details' : 'تفاصيل المشروع'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">{text.projectStatus}: </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedProject.projectStatus)}`}>
                        {getStatusText(selectedProject.projectStatus)}
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">{text.year}: </span>
                      <span className="text-gray-600">{selectedProject.year}</span>
                    </div>
                    
                    {selectedProject.startDate && (
                      <div>
                        <span className="font-semibold text-gray-700">{text.startDate}: </span>
                        <span className="text-gray-600">
                          {new Date(selectedProject.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    
                    {selectedProject.endDate && (
                      <div>
                        <span className="font-semibold text-gray-700">{text.endDate}: </span>
                        <span className="text-gray-600">
                          {new Date(selectedProject.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {text.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
