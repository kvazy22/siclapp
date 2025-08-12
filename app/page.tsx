'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import TeamSection from '../components/TeamSection';
import ProjectsSection from '../components/ProjectsSection';
import CertificatesSection from '../components/CertificatesSection';
import BranchesSection from '../components/BranchesSection';
import ContactSection from '../components/ContactSection';
import SocialMediaSection from '../components/SocialMediaSection';
import Footer from '../components/Footer';
import ScrollIndicator from '../components/ScrollIndicator';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'arabic' : 'english'}`}>
      <ScrollIndicator progress={scrollProgress} />
      <Header />
      <Hero language={language} />
      <AboutSection language={language} />
      <StatsSection language={language} />
      <ServicesSection language={language} />
      <WhyChooseUsSection language={language} />
      <TeamSection language={language} />
      <ProjectsSection language={language} />
      <CertificatesSection language={language} />
      <BranchesSection language={language} />
      <SocialMediaSection language={language} />
      <ContactSection language={language} />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}