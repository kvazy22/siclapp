'use client';

import { useState, useEffect } from 'react';

interface CTAButtonProps {
  language: string;
}

interface CTASettings {
  cta_enabled: boolean;
  cta_text_en: string;
  cta_text_ar: string;
  cta_url: string;
  cta_icon: string;
  cta_style: string;
  cta_target: string;
}

const CTAButton = ({ language }: CTAButtonProps) => {
  const [ctaSettings, setCtaSettings] = useState<CTASettings>({
    cta_enabled: true,
    cta_text_en: 'Get Quote',
    cta_text_ar: 'احصل على عرض سعر',
    cta_url: '#contact',
    cta_icon: 'ri-phone-line',
    cta_style: 'primary',
    cta_target: '_self'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCTASettings();
  }, []);

  const loadCTASettings = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setCtaSettings({
          cta_enabled: data.cta_enabled ?? true,
          cta_text_en: data.cta_text_en ?? 'Get Quote',
          cta_text_ar: data.cta_text_ar ?? 'احصل على عرض سعر',
          cta_url: data.cta_url ?? '#contact',
          cta_icon: data.cta_icon ?? 'ri-phone-line',
          cta_style: data.cta_style ?? 'primary',
          cta_target: data.cta_target ?? '_self'
        });
      }
    } catch (error) {
      console.error('Error loading CTA settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Don't show anything while loading
  }

  if (!ctaSettings.cta_enabled) {
    return null; // Don't render if disabled
  }

  const getButtonStyles = () => {
    switch (ctaSettings.cta_style) {
      case 'primary':
        return 'bg-yellow-600 text-white hover:bg-yellow-700';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700';
      case 'outline':
        return 'border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white';
      default:
        return 'bg-yellow-600 text-white hover:bg-yellow-700';
    }
  };

  const buttonText = language === 'ar' ? ctaSettings.cta_text_ar : ctaSettings.cta_text_en;

  return (
    <a
      href={ctaSettings.cta_url}
      target={ctaSettings.cta_target}
      rel={ctaSettings.cta_target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center px-8 py-4 rounded-lg transition-colors font-semibold whitespace-nowrap cursor-pointer ${getButtonStyles()}`}
    >
      <i className={`${ctaSettings.cta_icon} mr-2`}></i>
      {buttonText}
    </a>
  );
};

export default CTAButton; 