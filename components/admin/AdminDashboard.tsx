'use client';

import { useState } from 'react';
import ServicesManager from './ServicesManager';
import ProjectsManager from './ProjectsManager';
import CertificatesManager from './CertificatesManager';
import ContentManager from './ContentManager';
import TeamManager from './TeamManager';
import PartnersManager from './PartnersManager';
import ProfileManager from './ProfileManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');

  const tabs = [
    { id: 'services', label: 'Services', icon: 'ri-tools-line' },
    { id: 'projects', label: 'Projects', icon: 'ri-building-line' },
    { id: 'certificates', label: 'Certificates', icon: 'ri-award-line' },
    { id: 'content', label: 'Content', icon: 'ri-file-text-line' },
    { id: 'team', label: 'Team', icon: 'ri-team-line' },
    { id: 'partners', label: 'Partners', icon: 'ri-handshake-line' },
    { id: 'profile', label: 'Profile', icon: 'ri-book-open-line' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'certificates':
        return <CertificatesManager />;
      case 'content':
        return <ContentManager />;
      case 'team':
        return <TeamManager />;
      case 'partners':
        return <PartnersManager />;
      case 'profile':
        return <ProfileManager />;
      default:
        return <ServicesManager />;
    }
  };

  const handleLogout = () => {
    // Reset to login state
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <img 
                  src="/sicl-logo.png" 
                  alt="SICL - Sumou Isolation Contracting Company Limited" 
                  className="h-16 w-auto drop-shadow-md"
                  style={{ minWidth: '140px', maxWidth: '180px' }}
                />
                <div className="text-xs text-gray-400 mt-1">
                  شركة سمو العزل للمقاولات المحدودة
                </div>
              </div>
              <div className="text-gray-600 font-semibold">Admin Panel</div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <i className="ri-logout-circle-line"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left whitespace-nowrap cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-yellow-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <i className={tab.icon}></i>
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 