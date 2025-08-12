'use client';

import { useState } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollIndicator from '../../components/ScrollIndicator';
import PartnersSection from '../../components/PartnersSection';
import WhatsAppFloat from '../../components/WhatsAppFloat';

export default function AboutPage() {
  const { language, toggleLanguage } = useLanguage();

  const content = {
    en: {
      title: 'About SICL',
      subtitle: 'Leading the way in professional insulation solutions across Saudi Arabia',
      aboutCompany: {
        title: 'About Company',
        subtitle: 'Professional and Expert Insulation Services',
        description: 'Insulation of buildings is one of the basic operations accompanying the construction operations, as it is a preventive project of great importance in preserving the life of the concrete structure for longest possible period. For its specular significant role at far term, All buildings under construction have been officially obligated to implement it. In addition to applying control over it to all governmental and private projects to ensure that it is carried out in the required manner. Because of the importance of this work, the idea of forming a specialized institution working in the field of waterproofing and thermal insulation and the rest of the various types of insulation fields arose In addition to some work to treat concrete and Epoxy Paints.',
        values: 'As a leading insulation services company, we take great pride in our commitment to certain core values that guide our operations and decision-making processes. These values include safety, excellent customer service, innovation, sustainability, and teamwork. The company places a high priority on safety, provides excellent customer service, seeks new and improved ways to deliver services, and values collaboration and communication to achieve their goals. We believes that these values are critical to our success and we are committed to upholding them in all aspects of our operations.',
        founder: {
          name: 'Eng.Hassan AbdulSalam Al Shafie',
          title: 'FOUNDER'
        },
        contact: {
          title: 'Need help? Contact us',
          email: 'GM@sicl.sa',
          phone: '054 1501 586'
        }
      },
      hero: {
        title: 'Your Trusted Partner in Insulation Excellence',
        description: 'SICL (Sumou Isolation Contracting Company Limited) is a premier Saudi Arabian company specializing in comprehensive insulation solutions for residential, commercial, and industrial projects. With years of experience and a commitment to quality, we deliver innovative insulation systems that enhance energy efficiency and comfort.',
        stats: {
          projects: '500+',
          projectsLabel: 'Projects Completed',
          experience: '15+',
          experienceLabel: 'Years Experience',
          clients: '200+',
          clientsLabel: 'Happy Clients',
          team: '50+',
          teamLabel: 'Expert Team'
        }
      },
      mission: {
        title: 'Our Mission',
        description: 'To provide innovative, sustainable, and high-quality insulation solutions that enhance energy efficiency, reduce environmental impact, and create comfortable living and working environments for our clients across Saudi Arabia.'
      },
      vision: {
        title: 'Our Vision',
        description: 'To be the leading insulation contractor in Saudi Arabia, recognized for excellence, innovation, and commitment to sustainable building practices while contributing to the Kingdom\'s Vision 2030 goals.'
      },
      values: {
        title: 'Our Core Values',
        items: [
          {
            title: 'Quality Excellence',
            description: 'We maintain the highest standards of quality in every project we undertake.',
            icon: 'ri-award-line'
          },
          {
            title: 'Innovation',
            description: 'We continuously explore new technologies and methods to deliver better solutions.',
            icon: 'ri-lightbulb-line'
          },
          {
            title: 'Sustainability',
            description: 'We prioritize environmentally friendly materials and practices in all our projects.',
            icon: 'ri-leaf-line'
          },
          {
            title: 'Customer Focus',
            description: 'Our clients\' satisfaction is our top priority in every decision we make.',
            icon: 'ri-customer-service-line'
          },
          {
            title: 'Integrity',
            description: 'We conduct business with honesty, transparency, and ethical practices.',
            icon: 'ri-shield-check-line'
          },
          {
            title: 'Teamwork',
            description: 'We believe in the power of collaboration and mutual respect among our team.',
            icon: 'ri-team-line'
          }
        ]
      },
      story: {
        title: 'Our Story',
        description: 'Founded with a vision to revolutionize the insulation industry in Saudi Arabia, SICL has grown from a small local contractor to a leading company serving clients across the Kingdom. Our journey has been marked by continuous innovation, unwavering commitment to quality, and deep understanding of local market needs.',
        milestones: [
          {
            year: '2008',
            title: 'Company Founded',
            description: 'SICL was established with a focus on residential insulation projects.'
          },
          {
            year: '2012',
            title: 'Commercial Expansion',
            description: 'Expanded services to include commercial and industrial insulation solutions.'
          },
          {
            year: '2016',
            title: 'Technology Integration',
            description: 'Adopted advanced insulation technologies and sustainable practices.'
          },
          {
            year: '2020',
            title: 'National Recognition',
            description: 'Recognized as one of the leading insulation contractors in Saudi Arabia.'
          },
          {
            year: '2023',
            title: 'Future Ready',
            description: 'Positioned for growth with innovative solutions and expanded service portfolio.'
          },
          {
            year: '2024',
            title: 'Digital Transformation',
            description: 'Embracing digital technologies and smart building solutions to enhance our service delivery and client experience.'
          }
                 ]
       }
    },
    ar: {
      title: 'عن سيكل',
      subtitle: 'نقود الطريق في حلول العزل المهنية عبر المملكة العربية السعودية',
      aboutCompany: {
        title: 'عن الشركة',
        subtitle: 'خدمات عزل احترافية ومتخصصة',
        description: 'نحن شركة سمو رواد في مجال العزل الحراري والمائي، وتقديم خدمات المعالجة الخاصة بالخرسانة ودهانات الإيبوكسيات، على أعلى مستوى من الجودة وقد تفردت الشركة بطموح يتنامى بشكل كبير لتحقيق الإنجازات وتحقيق الريادة الشاملة في مجال العزل. وهو مايقود لضرورة الحفاظ على البصمة المميزة للشركة وتأتي مكانتنا الاستثنائية في السوق نتيجة التخطيط المطول من أجل التنفيذ الدقيق والأداء المبتكر. وهي أيضا انعكاس لحجم المشاريع التي تم إنجازها خلال السنوات الماضية. بسبب أهمية هذا العمل ، نشأت فكرة تشكيل مؤسسة متخصصة تعمل في مجال العزل المائي والعزل الحراري وباقي أنواع العزل المختلفة، بالإضافة إلى بعض الأعمال لمعالجة الخرسانة ودهانات الإيبوكسي.',
        values: 'بصفتنا شركة رائدة في خدمات العزل، نفخر بالتزامنا بمجموعة من القيم الأساسية التي توجه عملياتنا وقراراتنا. تشمل هذه القيم السلامة، خدمة العملاء الممتازة، الابتكار، الاستدامة، والعمل الجماعي. تضع الشركة أولوية عالية على السلامة، وتقدم خدمة عملاء ممتازة، وتسعى إلى إيجاد طرق جديدة ومحسّنة لتقديم الخدمات، وتقدر التعاون والتواصل لتحقيق أهدافها. نؤمن بأن هذه القيم ضرورية لنجاحنا ونحن ملتزمون بالتمسك بها في جميع جوانب عملياتنا.',
        founder: {
          name: 'م.حسن شافعي عبدالسلام الشافعي',
          title: 'المؤسس'
        },
        contact: {
          title: 'هل تحتاج مساعدة؟ تواصل معنا',
          email: 'GM@sicl.sa',
          phone: '054 1501 586'
        }
      },
      hero: {
        title: 'شريكك الموثوق في التميز في العزل',
        description: 'سيكل (شركة سمو العزل للمقاولات المحدودة) هي شركة سعودية رائدة متخصصة في حلول العزل الشاملة للمشاريع السكنية والتجارية والصناعية. مع سنوات من الخبرة والتزام بالجودة، نقدم أنظمة عزل مبتكرة تعزز كفاءة الطاقة والراحة.',
        stats: {
          projects: '+500',
          projectsLabel: 'مشروع مكتمل',
          experience: '+15',
          experienceLabel: 'سنة خبرة',
          clients: '+200',
          clientsLabel: 'عميل سعيد',
          team: '+50',
          teamLabel: 'فريق خبير'
        }
      },
      mission: {
        title: 'مهمتنا',
        description: 'تقديم حلول عزل مبتكرة ومستدامة وعالية الجودة تعزز كفاءة الطاقة وتقلل التأثير البيئي وتخلق بيئات معيشية وعمل مريحة لعملائنا في جميع أنحاء المملكة العربية السعودية.'
      },
      vision: {
        title: 'رؤيتنا',
        description: 'أن نكون المقاول الرائد في العزل في المملكة العربية السعودية، معروفين بالتميز والابتكار والالتزام بممارسات البناء المستدامة مع المساهمة في أهداف رؤية المملكة 2030.'
      },
      values: {
        title: 'قيمنا الأساسية',
        items: [
          {
            title: 'تميز الجودة',
            description: 'نحافظ على أعلى معايير الجودة في كل مشروع نقوم به.',
            icon: 'ri-award-line'
          },
          {
            title: 'الابتكار',
            description: 'نستكشف باستمرار التقنيات والطرق الجديدة لتقديم حلول أفضل.',
            icon: 'ri-lightbulb-line'
          },
          {
            title: 'الاستدامة',
            description: 'نعطي الأولوية للمواد والممارسات الصديقة للبيئة في جميع مشاريعنا.',
            icon: 'ri-leaf-line'
          },
          {
            title: 'التركيز على العملاء',
            description: 'رضا عملائنا هو أولويتنا القصوى في كل قرار نتخذه.',
            icon: 'ri-customer-service-line'
          },
          {
            title: 'النزاهة',
            description: 'نمارس الأعمال بأمانة وشفافية وممارسات أخلاقية.',
            icon: 'ri-shield-check-line'
          },
          {
            title: 'العمل الجماعي',
            description: 'نؤمن بقوة التعاون والاحترام المتبادل بين فريقنا.',
            icon: 'ri-team-line'
          }
        ]
      },
      story: {
        title: 'قصتنا',
        description: 'تأسست برؤية لثورة صناعة العزل في المملكة العربية السعودية، نمت سيكل من مقاول محلي صغير إلى شركة رائدة تخدم العملاء في جميع أنحاء المملكة. تميزت رحلتنا بالابتكار المستمر والالتزام الثابت بالجودة والفهم العميق لاحتياجات السوق المحلي.',
        milestones: [
          {
            year: '2008',
            title: 'تأسيس الشركة',
            description: 'تم تأسيس سيكل مع التركيز على مشاريع العزل السكنية.'
          },
          {
            year: '2012',
            title: 'التوسع التجاري',
            description: 'توسعت الخدمات لتشمل حلول العزل التجارية والصناعية.'
          },
          {
            year: '2016',
            title: 'تكامل التكنولوجيا',
            description: 'اعتماد تقنيات العزل المتقدمة والممارسات المستدامة.'
          },
          {
            year: '2020',
            title: 'الاعتراف الوطني',
            description: 'تم الاعتراف بها كواحدة من المقاولين الرائدين في العزل في المملكة العربية السعودية.'
          },
                    {
            year: '2023',
            title: 'جاهز للمستقبل',
            description: 'موقعة للنمو مع حلول مبتكرة ومحفظة خدمات موسعة.'
          },
          {
            year: '2024',
            title: 'التحول الرقمي',
            description: 'تبني التقنيات الرقمية وحلول المباني الذكية لتعزيز تقديم خدماتنا وتجربة العملاء.'
          }
                 ]
        }
    }
  };

  const text = content[language];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'arabic' : 'english'}`}>
      <ScrollIndicator progress={0} />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 relative overflow-hidden">
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

      {/* About Company Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {text.aboutCompany.title}
              </h2>
              <h3 className="text-2xl font-semibold text-blue-600 mb-6">
                {text.aboutCompany.subtitle}
              </h3>
            </div>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-700 leading-relaxed mb-8">
                {text.aboutCompany.description}
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-8">
                {text.aboutCompany.values}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {text.aboutCompany.founder.name}
                </h4>
                <p className="text-blue-600 font-semibold">
                  {text.aboutCompany.founder.title}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {text.aboutCompany.contact.title}
              </h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={`mailto:${text.aboutCompany.contact.email}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {text.aboutCompany.contact.email}
                </a>
                <span className="text-gray-400">|</span>
                <a 
                  href={`tel:${text.aboutCompany.contact.phone}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {text.aboutCompany.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {text.hero.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {text.hero.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(text.hero.stats).map(([key, value]) => (
                <div key={key} className="text-center p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {text.hero.stats[`${key}Label` as keyof typeof text.hero.stats]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-target-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {text.mission.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {text.mission.description}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-eye-line text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {text.vision.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {text.vision.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {text.values.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {text.values.items.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className={`${value.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {text.story.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {text.story.description}
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-orange-500 h-full"></div>
            <div className="space-y-12">
              {text.story.milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className={`bg-white rounded-2xl shadow-xl p-6 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection language={language} />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
} 