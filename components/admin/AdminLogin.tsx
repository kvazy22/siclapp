'use client';

import { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: 'Admin Panel',
      subtitle: 'Sign in to manage your website',
      username: 'Username',
      password: 'Password',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      login: 'Sign In',
      error: 'Invalid username or password'
    },
    ar: {
      title: 'لوحة الإدارة',
      subtitle: 'سجل الدخول لإدارة موقعك',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordPlaceholder: 'أدخل كلمة المرور',
      login: 'تسجيل الدخول',
      error: 'اسم المستخدم أو كلمة المرور غير صحيحة'
    }
  };

  const text = content.en; // Admin interface is in English

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple authentication - in a real app, this would be server-side
    if (credentials.username === 'admin' && credentials.password === 'sicl2024') {
      onLogin();
    } else {
      setError(text.error);
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center space-y-3 mb-6">
              <img 
                src="/sicl-logo.png" 
                alt="SICL - Sumou Isolation Contracting Company Limited" 
                className="h-24 w-auto drop-shadow-lg"
                style={{ minWidth: '200px', maxWidth: '260px' }}
              />
              <div className="text-sm text-gray-500 text-center">
                شركة سمو العزل للمقاولات المحدودة
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{text.title}</h2>
            <p className="text-gray-600 mt-2">{text.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                {text.username}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder={text.usernamePlaceholder}
                />
                <i className="ri-user-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                {text.password}
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder={text.passwordPlaceholder}
                />
                <i className="ri-lock-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-semibold whitespace-nowrap disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Signing in...
                </span>
              ) : (
                <>
                  <i className="ri-login-circle-line mr-2"></i>
                  {text.login}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Demo credentials: admin / sicl2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 