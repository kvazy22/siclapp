
'use client';

import { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';
import CTAButton from './CTAButton';

interface HeroProps {
  language: string;
}

interface ContentData {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  hero_description_en: string;
  hero_description_ar: string;
  hero_image: string;
}

const Hero = ({ language }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [content, setContent] = useState<ContentData>({
    hero_title_en: 'Professional Insulation Solutions',
    hero_title_ar: 'حلول العزل المهنية',
    hero_subtitle_en: 'Leading Saudi Arabian company specializing in advanced insulation technologies',
    hero_subtitle_ar: 'الشركة الرائدة في المملكة العربية السعودية المتخصصة في تقنيات العزل المتطورة',
    hero_description_en: 'From foundation to rooftop, we provide comprehensive insulation services including Polyurethane foam, Cementitious coating, Epoxy floors, and PVC waterproofing.',
    hero_description_ar: 'من الأساس إلى السطح، نقدم خدمات عزل شاملة تشمل رغوة البولي يوريثان، والطلاء الأسمنتي، وأرضيات الإيبوكسي، والعزل المائي PVC.',
    hero_image: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load content from API
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent({
          hero_title_en: data.hero_title_en || 'Professional Insulation Solutions',
          hero_title_ar: data.hero_title_ar || 'حلول العزل المهنية',
          hero_subtitle_en: data.hero_subtitle_en || 'Leading Saudi Arabian company specializing in advanced insulation technologies',
          hero_subtitle_ar: data.hero_subtitle_ar || 'الشركة الرائدة في المملكة العربية السعودية المتخصصة في تقنيات العزل المتطورة',
          hero_description_en: data.hero_description_en || 'From foundation to rooftop, we provide comprehensive insulation services including Polyurethane foam, Cementitious coating, Epoxy floors, and PVC waterproofing.',
          hero_description_ar: data.hero_description_ar || 'من الأساس إلى السطح، نقدم خدمات عزل شاملة تشمل رغوة البولي يوريثان، والطلاء الأسمنتي، وأرضيات الإيبوكسي، والعزل المائي PVC.',
          hero_image: data.hero_image || ''
        });
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const text = {
    title: language === 'en' ? content.hero_title_en : content.hero_title_ar,
    subtitle: language === 'en' ? content.hero_subtitle_en : content.hero_subtitle_ar,
    description: language === 'en' ? content.hero_description_en : content.hero_description_ar,
    viewProjects: language === 'en' ? 'View Projects' : 'عرض المشاريع',
    animationSteps: language === 'en' ? [
      'Surface Preparation',
      'Foam Spray Application',
      'Base Layer Formation',
      'Waterproof Membrane',
      'Reflective Coating',
      'Final Protection'
    ] : [
      'تحضير السطح',
      'تطبيق رغوة الرش',
      'تكوين الطبقة الأساسية',
      'الغشاء المقاوم للماء',
      'الطلاء العاكس',
      'الحماية النهائية'
    ]
  };

  const slides = [
    {
      image: 'https://readdy.ai/api/search-image?query=Modern%20villa%20construction%20with%20insulation%20layers%20being%20applied%2C%20desert%20environment%2C%20professional%20workers%2C%20construction%20site%20in%20Saudi%20Arabia%2C%20sand%20colored%20background%2C%20clean%20minimalist%20style&width=1200&height=600&seq=hero1&orientation=landscape',
      title: language === 'en' ? 'Foundation Insulation' : 'عزل الأساس'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=Professional%20insulation%20foam%20application%20on%20building%20walls%2C%20modern%20construction%20techniques%2C%20desert%20themed%20background%2C%20technical%20precision%2C%20Saudi%20Arabian%20construction&width=1200&height=600&seq=hero2&orientation=landscape',
      title: language === 'en' ? 'Wall Insulation' : 'عزل الجدران'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=Rooftop%20waterproofing%20and%20insulation%20installation%2C%20professional%20construction%20workers%2C%20modern%20building%20techniques%2C%20desert%20landscape%2C%20technical%20excellence&width=1200&height=600&seq=hero3&orientation=landscape',
      title: language === 'en' ? 'Rooftop Protection' : 'حماية السطح'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const animationTimer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % text.animationSteps.length);
    }, 3000);
    return () => clearInterval(animationTimer);
  }, [text.animationSteps.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-100">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {text.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
              {text.subtitle}
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
              {text.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton language={language} />
              <a
                href="#projects"
                className="inline-flex items-center px-8 py-4 border-2 border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors font-semibold whitespace-nowrap cursor-pointer"
              >
                <i className="ri-eye-line mr-2"></i>
                {text.viewProjects}
              </a>
              <ProfileButton language={language} />
            </div>
          </div>

          {/* 3D Animation Section */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {language === 'en' ? 'Insulation Process Animation' : 'رسوم متحركة لعملية العزل'}
              </h3>
              
              {/* 3D Villa Model Container */}
              <div className="relative w-full h-96 bg-gradient-to-b from-blue-200 to-yellow-200 rounded-lg overflow-hidden shadow-inner">
                {/* Desert Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/30 to-orange-300/30"></div>
                
                {/* Sun */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full shadow-lg animate-pulse">
                  <div className="absolute inset-2 bg-yellow-300 rounded-full animate-spin">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>

                {/* Villa Structure */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-60">
                  {/* Villa Base */}
                  <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-amber-100 to-amber-50 rounded-t-lg border-2 border-amber-200">
                    {/* Windows */}
                    <div className="absolute top-8 left-8 w-12 h-12 bg-blue-200 rounded border-2 border-blue-300"></div>
                    <div className="absolute top-8 right-8 w-12 h-12 bg-blue-200 rounded border-2 border-blue-300"></div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-amber-200 rounded-t-lg border-2 border-amber-300"></div>
                  </div>

                  {/* Roof Base */}
                  <div className="absolute top-0 left-4 right-4 h-20 bg-gradient-to-b from-gray-400 to-gray-500 transform -skew-y-1 rounded-t-lg border-2 border-gray-600">
                    {/* Metal Roof Texture */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </div>

                  {/* Animated Insulation Layers */}
                  <div className="absolute top-0 left-4 right-4 h-20 overflow-hidden rounded-t-lg">
                    {/* Step 1: Surface Preparation */}
                    <div className={`absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400 transition-opacity duration-1000 ${animationStep >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>

                    {/* Step 2: Foam Spray Application */}
                    <div className={`absolute inset-0 transition-all duration-1000 ${animationStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 rounded-t-lg">
                        {/* Foam Texture */}
                        <div className="absolute inset-0 opacity-80">
                          <div className="w-full h-full bg-white rounded-t-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
                            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-200 rounded-full animate-bounce"></div>
                            <div className="absolute top-4 right-4 w-1 h-1 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Base Layer Formation */}
                    <div className={`absolute inset-0 transition-all duration-1000 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-200 rounded-t-lg border-t-2 border-gray-300"></div>
                    </div>

                    {/* Step 4: Waterproof Membrane */}
                    <div className={`absolute inset-0 transition-all duration-1000 ${animationStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200 rounded-t-lg border-t-2 border-blue-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>

                    {/* Step 5: Reflective Coating */}
                    <div className={`absolute inset-0 transition-all duration-1000 ${animationStep >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-silver-200 to-silver-300 rounded-t-lg border-t-2 border-silver-400">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
                      </div>
                    </div>

                    {/* Step 6: Final Protection */}
                    <div className={`absolute inset-0 transition-all duration-1000 ${animationStep >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-green-200 rounded-t-lg border-t-2 border-green-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Worker */}
                  <div className={`absolute -top-8 right-8 w-8 h-12 transition-all duration-1000 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full h-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full relative">
                      {/* Helmet */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-yellow-400 rounded-full"></div>
                      {/* Spray Equipment */}
                      <div className="absolute -right-2 top-2 w-3 h-1 bg-gray-600 rounded animate-pulse"></div>
                      {/* Spray Effect */}
                      <div className="absolute -left-4 top-4 w-2 h-2 bg-white rounded-full animate-bounce opacity-60"></div>
                      <div className="absolute -left-6 top-2 w-1 h-1 bg-white rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>

                {/* Heat Waves Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-20 left-1/4 w-1 h-8 bg-gradient-to-t from-transparent to-yellow-400/30 animate-pulse"></div>
                  <div className="absolute top-16 right-1/3 w-1 h-6 bg-gradient-to-t from-transparent to-orange-400/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-24 left-1/2 w-1 h-4 bg-gradient-to-t from-transparent to-yellow-400/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Animation Step Indicator */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                  <span>{language === 'en' ? 'Current Step:' : 'الخطوة الحالية:'}</span>
                  <span className="font-semibold">{animationStep + 1} / {text.animationSteps.length}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((animationStep + 1) / text.animationSteps.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center">
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {text.animationSteps[animationStep]}
                  </span>
                </div>
              </div>

              {/* Process Benefits */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                  <div className="flex items-center mb-2">
                    <i className="ri-shield-line text-yellow-600 mr-2"></i>
                    <span className="font-semibold text-gray-800">
                      {language === 'en' ? 'Heat Protection' : 'حماية من الحرارة'}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {language === 'en' ? 'Blocks extreme desert heat' : 'يحجب الحرارة الصحراوية الشديدة'}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                  <div className="flex items-center mb-2">
                    <i className="ri-drop-line text-blue-600 mr-2"></i>
                    <span className="font-semibold text-gray-800">
                      {language === 'en' ? 'Water Resistance' : 'مقاومة الماء'}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {language === 'en' ? 'Complete waterproofing' : 'عزل مائي كامل'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              index === currentSlide ? 'bg-yellow-600' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-2xl text-yellow-600"></i>
      </div>
    </section>
  );
};

export default Hero;
