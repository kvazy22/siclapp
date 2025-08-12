'use client';

import { useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
}

interface TeamSectionProps {
  language: 'en' | 'ar';
}

const TeamSection = ({ language }: TeamSectionProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      subtitle: "Our Team",
      title: "Meet Our Professional Team",
      description: "Our dedicated team of experts is committed to delivering exceptional quality and service in every project we undertake."
    },
    ar: {
      subtitle: "فريق العمل",
      title: "تعرف على فريقنا المحترف",
      description: "فريقنا المتفاني من الخبراء ملتزم بتقديم جودة وخدمة استثنائية في كل مشروع نقوم به."
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    loadTeamMembers();
    
    // Refresh team members every 5 seconds to catch new additions
    const interval = setInterval(() => {
      loadTeamMembers();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      console.log('Team API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Team API data:', data);
        setTeamMembers(data);
      } else {
        // Fallback to default team members if API is not available
        setTeamMembers([
          {
            id: '1',
            name: 'ENG. Hassan Abdulsalam Shafie',
            designation: 'General Manager',
            photo: '/team/hassan.jpg'
          },
          {
            id: '2',
            name: 'ENG. Mustafa Khalid',
            designation: 'C.E.O',
            photo: '/team/mustafa.jpg'
          },
          {
            id: '3',
            name: 'ENG. Othman Ahmed',
            designation: 'Marketing Manager',
            photo: '/team/othman.jpg'
          },
          {
            id: '4',
            name: 'Nadeem Hussain',
            designation: 'IT Expert',
            photo: '/team/nadeem.jpg'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
      // Fallback to default team members
      setTeamMembers([
        {
          id: '1',
          name: 'ENG. Hassan Abdulsalam Shafie',
          designation: 'General Manager',
          photo: '/team/hassan.jpg'
        },
        {
          id: '2',
          name: 'ENG. Mustafa Khalid',
          designation: 'C.E.O',
          photo: '/team/mustafa.jpg'
        },
        {
          id: '3',
          name: 'ENG. Othman Ahmed',
          designation: 'Marketing Manager',
          photo: '/team/othman.jpg'
        },
        {
          id: '4',
          name: 'Nadeem Hussain',
          designation: 'IT Expert',
          photo: '/team/nadeem.jpg'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
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
          <p className={`text-gray-600 max-w-2xl mx-auto leading-relaxed ${
            language === 'ar' ? 'font-arabic text-right' : ''
          }`}>
            {currentContent.description}
          </p>
        </div>

        {/* Desktop marquee version */}
        <div className="relative overflow-hidden hidden lg:block">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* First set of team members */}
            {teamMembers.map((member) => (
              <div
                key={`first-${member.id}`}
                className="flex-shrink-0 w-80 mx-4 text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-orange-500 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/team/default-avatar.svg';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className={`text-xl font-semibold text-gray-800 mb-2 ${
                  language === 'ar' ? 'font-arabic' : ''
                }`}>
                  {member.name}
                </h3>
                
                <p className={`text-orange-500 font-medium ${
                  language === 'ar' ? 'font-arabic' : ''
                }`}>
                  {member.designation}
                </p>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {teamMembers.map((member) => (
              <div
                key={`second-${member.id}`}
                className="flex-shrink-0 w-80 mx-4 text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-orange-500 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/team/default-avatar.svg';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className={`text-xl font-semibold text-gray-800 mb-2 ${
                  language === 'ar' ? 'font-arabic' : ''
                }`}>
                  {member.name}
                </h3>
                
                <p className={`text-orange-500 font-medium ${
                  language === 'ar' ? 'font-arabic' : ''
                }`}>
                  {member.designation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile grid version */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-orange-500 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/team/default-avatar.svg';
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className={`text-xl font-semibold text-gray-800 mb-2 ${
                language === 'ar' ? 'font-arabic' : ''
              }`}>
                {member.name}
              </h3>
              
              <p className={`text-orange-500 font-medium ${
                language === 'ar' ? 'font-arabic' : ''
              }`}>
                {member.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 