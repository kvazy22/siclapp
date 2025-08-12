'use client';

import { useState, useEffect } from 'react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
}

interface PartnersSectionProps {
  language: 'en' | 'ar';
}

export default function PartnersSection({ language }: PartnersSectionProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners');
        if (response.ok) {
          const data = await response.json();
          setPartners(data);
        } else {
          setError('Failed to load partners');
        }
      } catch (error) {
        setError('Failed to load partners');
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نحن فخورون بالعمل مع شركاء موثوقين ومحترمين' 
                : 'We are proud to work with trusted and respected partners'
              }
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نحن فخورون بالعمل مع شركاء موثوقين ومحترمين' 
                : 'We are proud to work with trusted and respected partners'
              }
            </p>
          </div>
          <div className="text-center text-gray-500">
            <p>{language === 'ar' ? 'عذراً، لا يمكن تحميل الشركاء حالياً' : 'Sorry, partners cannot be loaded at the moment'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نحن فخورون بالعمل مع شركاء موثوقين ومحترمين' 
              : 'We are proud to work with trusted and respected partners'
            }
          </p>
        </div>

        {partners.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>{language === 'ar' ? 'لا توجد شركاء متاحين حالياً' : 'No partners available at the moment'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 group"
              >
                <div className="aspect-square flex items-center justify-center mb-3">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/partners/placeholder-logo.svg';
                    }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-600 text-center mt-1 line-clamp-2">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 