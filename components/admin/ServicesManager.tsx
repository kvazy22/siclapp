
'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
  icon: string;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    image: '',
    icon: 'ri-tools-line'
  });

  const content = {
    en: {
      title: 'Services Manager',
      addService: 'Add New Service',
      editService: 'Edit Service',
      titleEn: 'Title (English)',
      titleAr: 'Title (Arabic)',
      descriptionEn: 'Description (English)',
      descriptionAr: 'Description (Arabic)',
      image: 'Image URL',
      icon: 'Icon',
      save: 'Save Service',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      noServices: 'No services found. Add your first service!',
      serviceSaved: 'Service saved successfully!',
      serviceDeleted: 'Service deleted successfully!',
      error: 'Error occurred. Please try again.'
    },
    ar: {
      title: 'مدير الخدمات',
      addService: 'إضافة خدمة جديدة',
      editService: 'تعديل الخدمة',
      titleEn: 'العنوان (الإنجليزية)',
      titleAr: 'العنوان (العربية)',
      descriptionEn: 'الوصف (الإنجليزية)',
      descriptionAr: 'الوصف (العربية)',
      image: 'رابط الصورة',
      icon: 'الأيقونة',
      save: 'حفظ الخدمة',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      noServices: 'لم يتم العثور على خدمات. أضف خدمتك الأولى!',
      serviceSaved: 'تم حفظ الخدمة بنجاح!',
      serviceDeleted: 'تم حذف الخدمة بنجاح!',
      error: 'حدث خطأ. يرجى المحاولة مرة أخرى.'
    }
  };

  const text = content.en; // Admin interface is in English

  const iconOptions = [
    'ri-drop-line', 'ri-brush-line', 'ri-home-line', 'ri-shield-line',
    'ri-tools-line', 'ri-building-line', 'ri-fire-line', 'ri-water-line'
  ];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    try {
      const stored = localStorage.getItem('sicl_services');
      if (stored) {
        setServices(JSON.parse(stored));
      } else {
        // Default services
        const defaultServices = [
          {
            id: 1,
            title_en: 'Polyurethane Foam Insulation',
            title_ar: 'عزل رغوة البولي يوريثان',
            description_en: 'Advanced polyurethane foam insulation for superior thermal protection and energy efficiency.',
            description_ar: 'عزل رغوة البولي يوريثان المتقدم للحماية الحرارية الفائقة وكفاءة الطاقة.',
            image: 'https://readdy.ai/api/search-image?query=professional%20polyurethane%20foam%20insulation%20being%20applied%20to%20building%20walls%20construction%20site%20workers%20wearing%20safety%20gear%20modern%20industrial%20setting%20with%20clean%20white%20background%20highlighting%20the%20foam%20spray%20application%20process&width=400&height=300&seq=service1&orientation=landscape',
            icon: 'ri-drop-line'
          },
          {
            id: 2,
            title_en: 'Cementitious Waterproofing',
            title_ar: 'العزل الإسمنتي المائي',
            description_en: 'Durable cementitious coatings that provide excellent waterproofing and structural protection.',
            description_ar: 'طلاءات إسمنتية متينة توفر عزلاً مائياً ممتازاً وحماية هيكلية.',
            image: 'https://readdy.ai/api/search-image?query=cementitious%20waterproofing%20coating%20being%20applied%20to%20concrete%20surface%20construction%20worker%20with%20professional%20tools%20smooth%20gray%20coating%20application%20clean%20industrial%20background%20showcasing%20waterproofing%20process&width=400&height=300&seq=service2&orientation=landscape',
            icon: 'ri-brush-line'
          },
          {
            id: 3,
            title_en: 'Epoxy Floor Systems',
            title_ar: 'أنظمة الأرضيات الإيبوكسي',
            description_en: 'High-performance epoxy floor systems for industrial and commercial applications.',
            description_ar: 'أنظمة أرضيات إيبوكسي عالية الأداء للتطبيقات الصناعية والتجارية.',
            image: 'https://readdy.ai/api/search-image?query=glossy%20epoxy%20floor%20installation%20in%20modern%20industrial%20facility%20smooth%20reflective%20surface%20professional%20application%20clean%20environment%20workers%20applying%20epoxy%20coating%20with%20specialized%20equipment&width=400&height=300&seq=service3&orientation=landscape',
            icon: 'ri-home-line'
          },
          {
            id: 4,
            title_en: 'PVC Waterproofing',
            title_ar: 'العزل المائي بـ PVC',
            description_en: 'Flexible PVC membrane systems for comprehensive waterproofing solutions.',
            description_ar: 'أنظمة الأغشية المرنة من الـ PVC لحلول العزل المائي الشاملة.',
            image: 'https://readdy.ai/api/search-image?query=PVC%20waterproofing%20membrane%20installation%20on%20building%20roof%20professional%20roofers%20installing%20flexible%20membrane%20sheets%20construction%20site%20with%20clear%20blue%20sky%20background%20modern%20waterproofing%20technology&width=400&height=300&seq=service4&orientation=landscape',
            icon: 'ri-shield-line'
          }
        ];
        setServices(defaultServices);
        localStorage.setItem('sicl_services', JSON.stringify(defaultServices));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updatedServices;
      
      if (editingService) {
        // Update existing service
        updatedServices = services.map(service =>
          service.id === editingService.id
            ? { ...service, ...formData }
            : service
        );
      } else {
        // Add new service
        const newService = {
          id: Date.now(),
          ...formData
        };
        updatedServices = [...services, newService];
      }
      
      setServices(updatedServices);
      localStorage.setItem('sicl_services', JSON.stringify(updatedServices));
      resetForm();
      
      // Show success message
      alert(editingService ? 'Service updated successfully!' : 'Service added successfully!');
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service. Please try again.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title_en: service.title_en,
      title_ar: service.title_ar,
      description_en: service.description_en,
      description_ar: service.description_ar,
      image: service.image,
      icon: service.icon
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);
        localStorage.setItem('sicl_services', JSON.stringify(updatedServices));
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Error deleting service. Please try again.');
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
      icon: 'ri-tools-line'
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors whitespace-nowrap"
        >
          <i className="ri-add-line mr-2"></i>
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {text.titleEn}
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
                  {text.titleAr}
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
                  {text.descriptionEn}
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
                  {text.descriptionAr}
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {text.image}
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
                  {text.icon}
                </label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent pr-8"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors whitespace-nowrap"
              >
                {editingService ? text.editService : text.addService}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
              >
                {text.cancel}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-tools-line text-4xl mb-4"></i>
            <p>No services found. Add your first service!</p>
          </div>
        ) : (
          services.map(service => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <i className={`${service.icon} text-yellow-600 text-xl`}></i>
                    <h3 className="text-lg font-semibold">{service.title_en}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{service.description_en}</p>
                  <div className="text-sm text-gray-500">
                    Arabic: {service.title_ar}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors whitespace-nowrap"
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

export default ServicesManager;
