'use client';

import { useState, useEffect } from 'react';
import SimplePDFViewer from './SimplePDFViewer';

interface ProfileButtonProps {
  language?: string;
}

interface ProfileSettings {
  profile_enabled: boolean;
  profile_text_en: string;
  profile_text_ar: string;
  profile_icon: string;
}

const ProfileButton = ({ language = 'en' }: ProfileButtonProps) => {
  const [showViewer, setShowViewer] = useState(false);
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    profile_enabled: true,
    profile_text_en: 'Our Profile',
    profile_text_ar: 'ملفنا التعريفي',
    profile_icon: 'ri-book-open-line'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfileSettings();
  }, []);

  const loadProfileSettings = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setProfileSettings({
          profile_enabled: data.profile_enabled ?? true,
          profile_text_en: data.profile_text_en ?? 'Our Profile',
          profile_text_ar: data.profile_text_ar ?? 'ملفنا التعريفي',
          profile_icon: data.profile_icon ?? 'ri-book-open-line'
        });
      }
    } catch (error) {
      console.error('Error loading profile settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenProfile = () => {
    setShowViewer(true);
  };

  if (isLoading) {
    return null; // Don't show anything while loading
  }

  if (!profileSettings.profile_enabled) {
    return null; // Don't render if disabled
  }

  const buttonText = language === 'ar' ? profileSettings.profile_text_ar : profileSettings.profile_text_en;

  return (
    <>
      <button
        onClick={handleOpenProfile}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <i className={`${profileSettings.profile_icon} text-xl`}></i>
        <span className="font-semibold">{buttonText}</span>
        <i className="ri-arrow-right-line"></i>
      </button>

      {showViewer && (
        <SimplePDFViewer onClose={() => setShowViewer(false)} />
      )}
    </>
  );
};

export default ProfileButton;