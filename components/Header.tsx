'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const content = {
    en: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      certificates: 'Certificates',
      about: 'About',
      consultingOffices: 'Consulting Offices',
      contact: 'Contact'
    },
    ar: {
      home: 'الرئيسية',
      services: 'الخدمات',
      projects: 'المشاريع',
      certificates: 'الشهادات',
      about: 'من نحن',
      consultingOffices: 'مكاتب الاستشارات',
      contact: 'اتصل بنا'
    }
  };

  const text = content[language as keyof typeof content];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: text.home, href: '/' },
    { name: text.services, href: '/services' },
    { name: text.projects, href: '/projects' },
    { name: text.certificates, href: '/certificates' },
    { name: text.about, href: '/about' },
    { name: text.consultingOffices, href: '/consulting-offices' },
    { name: text.contact, href: '/contact' }
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="flex items-center space-x-6 cursor-pointer group">
            <div className="logo-container relative">
              <img 
                src="/sicl-logo.png" 
                alt="SICL - Sumou Isolation Contracting Company Limited" 
                className="h-24 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-lg"
                style={{ minWidth: '220px', maxWidth: '280px' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden h-24 w-64 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                SICL
              </div>
              <div className="absolute -bottom-6 left-0 text-xs text-gray-300 whitespace-nowrap">
                {language === 'en' ? 'شركة سمو العزل للمقاولات المحدودة' : 'Sumou Isolation Contracting Company Limited'}
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-yellow-600 whitespace-nowrap cursor-pointer ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 rounded-lg font-medium transition-colors hover:bg-yellow-600 hover:text-white whitespace-nowrap ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>

            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-lg transition-colors hover:bg-yellow-600 hover:text-white ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 mt-4">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-gray-900 hover:bg-yellow-600 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 