
'use client';

import { useState, useEffect } from 'react';

interface Certificate {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
  issuer_en: string;
  issuer_ar: string;
  date: string;
}

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    image: '',
    issuer_en: '',
    issuer_ar: '',
    date: new Date().getFullYear().toString()
  });

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = () => {
    try {
      const stored = localStorage.getItem('sicl_certificates');
      if (stored) {
        setCertificates(JSON.parse(stored));
      } else {
        // Default certificates
        const defaultCertificates = [
          {
            id: 1,
            title_en: 'ISO 9001:2015 Quality Management',
            title_ar: 'إدارة الجودة ISO 9001:2015',
            description_en: 'International standard for quality management systems ensuring consistent quality in our insulation services and commitment to customer satisfaction.',
            description_ar: 'معيار دولي لأنظمة إدارة الجودة يضمن جودة متسقة في خدمات العزل لدينا والالتزام برضا العملاء.',
            image: 'https://readdy.ai/api/search-image?query=ISO%209001%20certificate%20document%20professional%20quality%20management%20certification%20clean%20office%20environment%20official%20documentation%20gold%20seal%20modern%20design&width=500&height=400&seq=cert1&orientation=landscape',
            issuer_en: 'International Organization for Standardization',
            issuer_ar: 'المنظمة الدولية للمعايير',
            date: '2021'
          },
          {
            id: 2,
            title_en: 'Saudi Building Code Compliance',
            title_ar: 'الامتثال لكود البناء السعودي',
            description_en: 'Full compliance with Saudi Arabian building codes and construction standards for insulation work, ensuring safety and regulatory adherence.',
            description_ar: 'الامتثال الكامل لكود البناء السعودي ومعايير البناء لأعمال العزل، مما يضمن السلامة والالتزام التنظيمي.',
            image: 'https://readdy.ai/api/search-image?query=Saudi%20building%20code%20certificate%20official%20government%20certification%20construction%20standards%20compliance%20desert%20themed%20office%20setting%20professional%20documentation&width=500&height=400&seq=cert2&orientation=landscape',
            issuer_en: 'Saudi Building Code Committee',
            issuer_ar: 'لجنة كود البناء السعودي',
            date: '2022'
          }
        ];
        setCertificates(defaultCertificates);
        localStorage.setItem('sicl_certificates', JSON.stringify(defaultCertificates));
      }
    } catch (error) {
      console.error('Error loading certificates:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updatedCertificates;
      
      if (editingCertificate) {
        // Update existing certificate
        updatedCertificates = certificates.map(certificate =>
          certificate.id === editingCertificate.id
            ? { ...certificate, ...formData }
            : certificate
        );
      } else {
        // Add new certificate
        const newCertificate = {
          id: Date.now(),
          ...formData
        };
        updatedCertificates = [...certificates, newCertificate];
      }
      
      setCertificates(updatedCertificates);
      localStorage.setItem('sicl_certificates', JSON.stringify(updatedCertificates));
      resetForm();
      
      alert(editingCertificate ? 'Certificate updated successfully!' : 'Certificate added successfully!');
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate. Please try again.');
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setFormData({
      title_en: certificate.title_en,
      title_ar: certificate.title_ar,
      description_en: certificate.description_en,
      description_ar: certificate.description_ar,
      image: certificate.image,
      issuer_en: certificate.issuer_en,
      issuer_ar: certificate.issuer_ar,
      date: certificate.date
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        const updatedCertificates = certificates.filter(certificate => certificate.id !== id);
        setCertificates(updatedCertificates);
        localStorage.setItem('sicl_certificates', JSON.stringify(updatedCertificates));
        alert('Certificate deleted successfully!');
      } catch (error) {
        console.error('Error deleting certificate:', error);
        alert('Error deleting certificate. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_ar: '',
      description_en: '',
      description_ar: '',
      image: '',
      issuer_en: '',
      issuer_ar: '',
      date: new Date().getFullYear().toString()
    });
    setEditingCertificate(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Certificates Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          Add Certificate
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (English)
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title (Arabic)
                </label>
                <input
                  type="text"
                  name="title_ar"
                  value={formData.title_ar}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (English)
                </label>
                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.description_en.length}/500 characters
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Arabic)
                </label>
                <textarea
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.description_ar.length}/500 characters
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issuer (English)
                </label>
                <input
                  type="text"
                  name="issuer_en"
                  value={formData.issuer_en}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issuer (Arabic)
              </label>
              <input
                type="text"
                name="issuer_ar"
                value={formData.issuer_ar}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                {editingCertificate ? 'Update' : 'Add'} Certificate
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {certificates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-award-line text-4xl mb-4"></i>
            <p>No certificates found. Add your first certificate!</p>
          </div>
        ) : (
          certificates.map(certificate => (
            <div key={certificate.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <i className="ri-award-line text-yellow-600 text-xl"></i>
                    <h3 className="text-lg font-semibold">{certificate.title_en}</h3>
                    <span className="text-gray-500">({certificate.date})</span>
                  </div>
                  <p className="text-gray-600 mb-2">{certificate.description_en}</p>
                  <div className="text-sm text-gray-500">
                    <div>Arabic: {certificate.title_ar}</div>
                    <div>Issuer: {certificate.issuer_en}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(certificate.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CertificatesManager;
