'use client';

interface WhyChooseUsSectionProps {
  language: 'en' | 'ar';
}

const WhyChooseUsSection = ({ language }: WhyChooseUsSectionProps) => {
  const content = {
    en: {
      subtitle: "Why Choose Us",
      title: "Six Reasons For People Choosing Us",
      features: [
        {
          icon: "🏆",
          title: "Quality Material",
          description: "Ensuring quality material is essential for any project or product."
        },
        {
          icon: "✅",
          title: "Accredited",
          description: "Accredited by many entities and consulting offices across the kingdom"
        },
        {
          icon: "👷",
          title: "Trained Workers",
          description: "It is crucial to have a workforce that is properly trained to ensure productivity and efficiency"
        },
        {
          icon: "⏰",
          title: "Time Availability",
          description: "It is essential to prioritize tasks and manage our schedules effectively to ensure we have enough time to complete our work efficiently"
        },
        {
          icon: "📞",
          title: "Quick Response",
          description: "We understand that time is of the essence in many situations, which is why we make it a top priority to respond promptly to any inquiries or requests."
        },
        {
          icon: "🛡️",
          title: "10 Year Warranty",
          description: "This warranty is a testament to the quality and durability of our products. We are confident in the craftsmanship and materials used"
        }
      ]
    },
    ar: {
      subtitle: "لماذا تختارنا",
      title: "6 اسباب تجعلنا اختيارك الأفضل",
      features: [
        {
          icon: "🏆",
          title: "مواد عالية الجودة",
          description: "يعد ضمان جودة المواد أمرًا ضروريًا لأي مشروع أو منتج."
        },
        {
          icon: "✅",
          title: "شركة معتمدة",
          description: "معتمدة من قبل العديد من الهيئات والمكاتب الاستشارية في جميع أنحاء المملكة"
        },
        {
          icon: "👷",
          title: "موظفين مهنيين",
          description: "من الضروري أن يكون لديك قوة عاملة مدربة بشكل صحيح لضمان الإنتاجية والكفاءة"
        },
        {
          icon: "⏰",
          title: "التواجد",
          description: "من الضروري تحديد أولويات المهام وإدارة جداولنا بفعالية لضمان توفر الوقت الكافي لدينا لإكمال عملنا بكفاءة"
        },
        {
          icon: "📞",
          title: "إستجابة سريعة",
          description: "نحن نتفهم أن الوقت جوهري في العديد من المواقف ، ولهذا السبب نضع أولوية قصوى للرد الفوري على أي استفسارات أو طلبات."
        },
        {
          icon: "🛡️",
          title: "ضمان 10 سنوات",
          description: "هذا الضمان هو شهادة على جودة ومتانة منتجاتنا. نحن على ثقة من الحرفية والمواد المستخدمة"
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-semibold mb-2">
            {currentContent.subtitle}
          </p>
          <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {currentContent.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4 text-center">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold text-orange-500 mb-3 text-center ${
                language === 'ar' ? 'font-arabic' : ''
              }`}>
                {feature.title}
              </h3>
              <p className={`text-gray-700 text-center leading-relaxed ${
                language === 'ar' ? 'font-arabic text-right' : ''
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 