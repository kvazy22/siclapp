'use client';

import { useState, useEffect } from 'react';

interface SocialMediaSectionProps {
  language: string;
}

interface SocialMediaPlatform {
  enabled: boolean;
  url: string;
  icon: string;
  label: string;
}

interface SocialMediaSettings {
  social_media: {
    linkedin: SocialMediaPlatform;
    snapchat: SocialMediaPlatform;
    instagram: SocialMediaPlatform;
    whatsapp: SocialMediaPlatform;
  };
}

const SocialMediaSection = ({ language }: SocialMediaSectionProps) => {
  const [socialSettings, setSocialSettings] = useState<SocialMediaSettings>({
    social_media: {
      linkedin: { enabled: false, url: '', icon: 'ri-linkedin-line', label: 'LinkedIn' },
      snapchat: { enabled: false, url: '', icon: 'ri-snapchat-line', label: 'Snapchat' },
      instagram: { enabled: false, url: '', icon: 'ri-instagram-line', label: 'Instagram' },
      whatsapp: { enabled: false, url: '', icon: 'ri-whatsapp-line', label: 'WhatsApp' }
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSocialSettings();
  }, []);

  const loadSocialSettings = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        if (data.social_media) {
          setSocialSettings({
            social_media: data.social_media
          });
        }
      }
    } catch (error) {
      console.error('Error loading social media settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if any social media platform is enabled
  const hasEnabledPlatforms = Object.values(socialSettings.social_media).some(platform => platform.enabled);
  
  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Loading social media section...</p>
          </div>
        </div>
      </section>
    );
  }
  
  if (!hasEnabledPlatforms) {
    return null;
  }

  const title = language === 'en' ? 'Follow Us' : 'تابعنا';

  const socialLinks = [
    {
      name: 'LinkedIn',
      platform: socialSettings.social_media.linkedin,
      icon: 'ri-linkedin-fill',
      color: 'bg-blue-700 hover:bg-blue-800',
      brandColor: '#0A66C2'
    },
    {
      name: 'Snapchat',
      platform: socialSettings.social_media.snapchat,
      icon: 'ri-snapchat-fill',
      color: 'bg-yellow-400 hover:bg-yellow-500',
      brandColor: '#FFFC00'
    },
    {
      name: 'Instagram',
      platform: socialSettings.social_media.instagram,
      icon: 'ri-instagram-fill',
      color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
      brandColor: '#E4405F'
    },
    {
      name: 'WhatsApp',
      platform: socialSettings.social_media.whatsapp,
      icon: 'ri-whatsapp-fill',
      color: 'bg-green-500 hover:bg-green-600',
      brandColor: '#25D366'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Stay connected with us on social media for the latest updates and insights'
              : 'ابق على تواصل معنا عبر وسائل التواصل الاجتماعي للحصول على أحدث التحديثات والرؤى'
            }
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {socialLinks.map((social, index) => (
              social.platform.enabled && social.platform.url && (
                <a
                  key={index}
                  href={social.platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${social.color}
                    w-14 h-14 md:w-16 md:h-16
                    rounded-full
                    flex items-center justify-center
                    text-white
                    transition-all duration-300
                    transform hover:scale-110
                    shadow-lg hover:shadow-xl
                    group
                  `}
                  title={social.platform.label}
                  style={{
                    background: social.name === 'Instagram' 
                      ? 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
                      : undefined
                  }}
                >
                  <i className={`${social.icon} text-xl md:text-2xl group-hover:scale-110 transition-transform duration-200`}></i>
                </a>
              )
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            {language === 'en' 
              ? 'Follow us for project updates, industry insights, and company news'
              : 'تابعنا للحصول على تحديثات المشاريع ورؤى الصناعة وأخبار الشركة'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
