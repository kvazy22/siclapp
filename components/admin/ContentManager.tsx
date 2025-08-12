'use client';

import { useState, useEffect } from 'react';

interface ContentData {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  hero_description_en: string;
  hero_description_ar: string;
  hero_image: string;
  company_phone: string;
  company_email: string;
  company_address_en: string;
  company_address_ar: string;
  // CTA Button Settings
  cta_enabled: boolean;
  cta_text_en: string;
  cta_text_ar: string;
  cta_url: string;
  cta_icon: string;
  cta_style: string;
  cta_target: string;
  // Profile Button Settings
  profile_enabled: boolean;
  profile_text_en: string;
  profile_text_ar: string;
  profile_icon: string;
  // Social Media Settings
  social_media_enabled: boolean;
  social_media_title_en: string;
  social_media_title_ar: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
}

const ContentManager = () => {
  const [content, setContent] = useState<ContentData>({
    hero_title_en: '',
    hero_title_ar: '',
    hero_subtitle_en: '',
    hero_subtitle_ar: '',
    hero_description_en: '',
    hero_description_ar: '',
    hero_image: '',
    company_phone: '',
    company_email: '',
    company_address_en: '',
    company_address_ar: '',
    // CTA Button Settings
    cta_enabled: false,
    cta_text_en: '',
    cta_text_ar: '',
    cta_url: '',
    cta_icon: '',
    cta_style: '',
    cta_target: '',
    // Profile Button Settings
    profile_enabled: false,
    profile_text_en: '',
    profile_text_ar: '',
    profile_icon: '',
    // Social Media Settings
    social_media_enabled: false,
    social_media_title_en: '',
    social_media_title_ar: '',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: '',
    youtube_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });

      if (response.ok) {
        setMessage('Content updated successfully!');
      } else {
        setMessage('Error updating content. Please try again.');
      }
    } catch (error) {
      setMessage('Error updating content. Please try again.');
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <p className="text-gray-600 mt-2">Update homepage content and company information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Title (English)
                </label>
                <input
                  type="text"
                  name="hero_title_en"
                  value={content.hero_title_en}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Title (Arabic)
                </label>
                <input
                  type="text"
                  name="hero_title_ar"
                  value={content.hero_title_ar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Subtitle (English)
                </label>
                <input
                  type="text"
                  name="hero_subtitle_en"
                  value={content.hero_subtitle_en}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Subtitle (Arabic)
                </label>
                <input
                  type="text"
                  name="hero_subtitle_ar"
                  value={content.hero_subtitle_ar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Description (English)
                </label>
                <textarea
                  name="hero_description_en"
                  value={content.hero_description_en}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Description (Arabic)
                </label>
                <textarea
                  name="hero_description_ar"
                  value={content.hero_description_ar}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Background Image URL
              </label>
              <input
                type="url"
                name="hero_image"
                value={content.hero_image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="company_phone"
                  value={content.company_phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="company_email"
                  value={content.company_email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address (English)
                </label>
                <textarea
                  name="company_address_en"
                  value={content.company_address_en}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address (Arabic)
                </label>
                <textarea
                  name="company_address_ar"
                  value={content.company_address_ar}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Call to Action Button</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="cta_enabled"
                name="cta_enabled"
                checked={content.cta_enabled}
                onChange={(e) => setContent({
                  ...content,
                  cta_enabled: e.target.checked
                })}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-600"
              />
              <label htmlFor="cta_enabled" className="text-sm font-semibold text-gray-700">
                Enable CTA Button
              </label>
            </div>

            {content.cta_enabled && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Text (English)
                    </label>
                    <input
                      type="text"
                      name="cta_text_en"
                      value={content.cta_text_en}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="Get Quote"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Text (Arabic)
                    </label>
                    <input
                      type="text"
                      name="cta_text_ar"
                      value={content.cta_text_ar}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="احصل على عرض سعر"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button URL
                    </label>
                    <input
                      type="text"
                      name="cta_url"
                      value={content.cta_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="#contact or https://example.com"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Use #section for same-page links (e.g., #contact) or full URLs for external links
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Icon (Remix Icon Class)
                    </label>
                    <input
                      type="text"
                      name="cta_icon"
                      value={content.cta_icon}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="ri-phone-line"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Popular icons: ri-phone-line, ri-mail-line, ri-calendar-line, ri-arrow-right-line, ri-download-line
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Style
                    </label>
                    <select
                      name="cta_style"
                      value={content.cta_style}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    >
                      <option value="primary">Primary (Yellow Background)</option>
                      <option value="secondary">Secondary (Gray Background)</option>
                      <option value="outline">Outline (Border Only)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Open In
                    </label>
                    <select
                      name="cta_target"
                      value={content.cta_target}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    >
                      <option value="_self">Same Window</option>
                      <option value="_blank">New Window/Tab</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Button Preview</h4>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                        content.cta_style === 'primary'
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : content.cta_style === 'secondary'
                          ? 'bg-gray-600 text-white hover:bg-gray-700'
                          : 'border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white'
                      }`}
                    >
                      <i className={`${content.cta_icon} mr-2`}></i>
                      {content.cta_text_en || 'Get Quote'}
                    </button>
                    <button
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                        content.cta_style === 'primary'
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : content.cta_style === 'secondary'
                          ? 'bg-gray-600 text-white hover:bg-gray-700'
                          : 'border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white'
                      }`}
                    >
                      <i className={`${content.cta_icon} mr-2`}></i>
                      {content.cta_text_ar || 'احصل على عرض سعر'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Button</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="profile_enabled"
                name="profile_enabled"
                checked={content.profile_enabled}
                onChange={(e) => setContent({
                  ...content,
                  profile_enabled: e.target.checked
                })}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-600"
              />
              <label htmlFor="profile_enabled" className="text-sm font-semibold text-gray-700">
                Enable Profile Button
              </label>
            </div>

            {content.profile_enabled && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Text (English)
                    </label>
                    <input
                      type="text"
                      name="profile_text_en"
                      value={content.profile_text_en}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="Our Profile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Text (Arabic)
                    </label>
                    <input
                      type="text"
                      name="profile_text_ar"
                      value={content.profile_text_ar}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="ملفنا التعريفي"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Button Icon (Remix Icon Class)
                  </label>
                  <input
                    type="text"
                    name="profile_icon"
                    value={content.profile_icon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="ri-book-open-line"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Popular icons: ri-book-open-line, ri-file-text-line, ri-document-line, ri-profile-line, ri-user-line
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Button Preview</h4>
                  <div className="flex flex-wrap gap-4">
                    <button className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <i className={`${content.profile_icon} text-xl`}></i>
                      <span className="font-semibold">{content.profile_text_en || 'Our Profile'}</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                    <button className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <i className={`${content.profile_icon} text-xl`}></i>
                      <span className="font-semibold">{content.profile_text_ar || 'ملفنا التعريفي'}</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Social Media Section</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="social_media_enabled"
                name="social_media_enabled"
                checked={content.social_media_enabled}
                onChange={(e) => setContent({
                  ...content,
                  social_media_enabled: e.target.checked
                })}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-600"
              />
              <label htmlFor="social_media_enabled" className="text-sm font-semibold text-gray-700">
                Enable Social Media Section
              </label>
            </div>

            {content.social_media_enabled && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Section Title (English)
                    </label>
                    <input
                      type="text"
                      name="social_media_title_en"
                      value={content.social_media_title_en}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="Follow Us"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Section Title (Arabic)
                    </label>
                    <input
                      type="text"
                      name="social_media_title_ar"
                      value={content.social_media_title_ar}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="تابعنا"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      name="facebook_url"
                      value={content.facebook_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="https://facebook.com/yourcompany"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      name="twitter_url"
                      value={content.twitter_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="https://twitter.com/yourcompany"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      name="instagram_url"
                      value={content.instagram_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="https://instagram.com/yourcompany"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedin_url"
                      value={content.linkedin_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    name="youtube_url"
                    value={content.youtube_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="https://youtube.com/@yourcompany"
                  />
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Social Media Preview</h4>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {content.facebook_url && (
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <i className="ri-facebook-fill text-xl"></i>
                      </div>
                    )}
                    {content.twitter_url && (
                      <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white">
                        <i className="ri-twitter-fill text-xl"></i>
                      </div>
                    )}
                    {content.instagram_url && (
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                        <i className="ri-instagram-fill text-xl"></i>
                      </div>
                    )}
                    {content.linkedin_url && (
                      <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white">
                        <i className="ri-linkedin-fill text-xl"></i>
                      </div>
                    )}
                    {content.youtube_url && (
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <i className="ri-youtube-fill text-xl"></i>
                      </div>
                    )}
                    {!content.facebook_url && !content.twitter_url && !content.instagram_url && !content.linkedin_url && !content.youtube_url && (
                      <p className="text-gray-500 text-sm">No social media links configured</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-semibold whitespace-nowrap disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Updating...
              </span>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>
                Update Content
              </>
            )}
          </button>

          {message && (
            <div className={`px-4 py-2 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContentManager;