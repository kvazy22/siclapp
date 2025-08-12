
'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  images: string[];
  category: string;
  location_en: string;
  location_ar: string;
  year: string;
  projectArea: string;
  servicesProvided: string;
  projectStatus: 'ongoing' | 'finished' | 'yet-to-start';
  startDate?: string;
  endDate?: string;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    images: [''],
    category: 'residential',
    location_en: '',
    location_ar: '',
    year: new Date().getFullYear().toString(),
    projectArea: '',
    servicesProvided: '',
    projectStatus: 'ongoing' as 'ongoing' | 'finished' | 'yet-to-start',
    startDate: '',
    endDate: ''
  });

  const categories = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' }
  ];

  const projectStatuses = [
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'finished', label: 'Finished' },
    { value: 'yet-to-start', label: 'Yet to Start' }
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const stored = localStorage.getItem('sicl_projects');
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        // Default projects with new fields
        const defaultProjects = [
          {
            id: 1,
            title_en: 'Royal Villa Complex',
            title_ar: 'مجمع الفيلا الملكية',
            description_en: 'Complete insulation solution for luxury residential complex including foundation waterproofing, thermal insulation, and roof protection systems.',
            description_ar: 'حل عزل شامل لمجمع سكني فاخر يشمل العزل المائي للأساس والعزل الحراري وأنظمة حماية الأسطح.',
            category: 'residential',
            images: ['https://readdy.ai/api/search-image?query=Luxury%20Saudi%20Arabian%20villa%20complex%20with%20modern%20insulation%20work%20professional%20construction%20desert%20landscape%20elegant%20architecture%20beige%20sand%20colors%20contemporary%20design&width=600&height=400&seq=project1&orientation=landscape'],
            location_en: 'Riyadh, Saudi Arabia',
            location_ar: 'الرياض، المملكة العربية السعودية',
            year: '2023',
            projectArea: '15,000 sqm',
            servicesProvided: 'Foundation waterproofing, Thermal insulation, Roof protection',
            projectStatus: 'finished' as const,
            startDate: '2023-01-15',
            endDate: '2023-08-20'
          },
          {
            id: 2,
            title_en: 'Business Tower Insulation',
            title_ar: 'عزل برج الأعمال',
            description_en: 'Advanced thermal insulation system for 40-story commercial tower with energy-efficient solutions and advanced waterproofing systems.',
            description_ar: 'نظام عزل حراري متقدم لبرج تجاري من 40 طابق مع حلول موفرة للطاقة وأنظمة العزل المائي المتقدمة.',
            category: 'commercial',
            images: ['https://readdy.ai/api/search-image?query=Modern%20commercial%20tower%20in%20Saudi%20Arabia%20with%20insulation%20construction%20professional%20building%20work%20desert%20environment%20glass%20facade%20contemporary%20architecture&width=600&height=400&seq=project2&orientation=landscape'],
            location_en: 'Jeddah, Saudi Arabia',
            location_ar: 'جدة، المملكة العربية السعودية',
            year: '2023',
            projectArea: '25,000 sqm',
            servicesProvided: 'Thermal insulation, Waterproofing systems, Energy efficiency',
            projectStatus: 'ongoing' as const,
            startDate: '2023-03-10'
          }
        ];
        setProjects(defaultProjects);
        localStorage.setItem('sicl_projects', JSON.stringify(defaultProjects));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updatedProjects;
      
      if (editingProject) {
        // Update existing project
        updatedProjects = projects.map(project =>
          project.id === editingProject.id
            ? { ...project, ...formData }
            : project
        );
      } else {
        // Add new project
        const newProject = {
          id: Date.now(),
          ...formData
        };
        updatedProjects = [...projects, newProject];
      }
      
      setProjects(updatedProjects);
      localStorage.setItem('sicl_projects', JSON.stringify(updatedProjects));
      resetForm();
      
      alert(editingProject ? 'Project updated successfully!' : 'Project added successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title_en: project.title_en,
      title_ar: project.title_ar,
      description_en: project.description_en,
      description_ar: project.description_ar,
      images: project.images,
      category: project.category,
      location_en: project.location_en,
      location_ar: project.location_ar,
      year: project.year,
      projectArea: project.projectArea,
      servicesProvided: project.servicesProvided,
      projectStatus: project.projectStatus,
      startDate: project.startDate || '',
      endDate: project.endDate || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const updatedProjects = projects.filter(project => project.id !== id);
        setProjects(updatedProjects);
        localStorage.setItem('sicl_projects', JSON.stringify(updatedProjects));
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_ar: '',
      description_en: '',
      description_ar: '',
      images: [''],
      category: 'residential',
      location_en: '',
      location_ar: '',
      year: new Date().getFullYear().toString(),
      projectArea: '',
      servicesProvided: '',
      projectStatus: 'ongoing' as 'ongoing' | 'finished' | 'yet-to-start',
      startDate: '',
      endDate: ''
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'projectStatus' ? value as 'ongoing' | 'finished' | 'yet-to-start' : value
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const addImageField = () => {
    if (formData.images.length < 4) {
      setFormData({
        ...formData,
        images: [...formData.images, '']
      });
    }
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        images: newImages
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
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

            {/* Project Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Images (up to 4)
              </label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`Image ${index + 1} URL`}
                    required={index === 0}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  )}
                </div>
              ))}
              {formData.images.length < 4 && (
                <button
                  type="button"
                  onClick={addImageField}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Image
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent pr-8"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Area
                </label>
                <input
                  type="text"
                  name="projectArea"
                  value={formData.projectArea}
                  onChange={handleInputChange}
                  placeholder="e.g., 15,000 sqm / 15,000 متر مربع"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="2000"
                  max="2030"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type of Services Provided
                </label>
                <textarea
                  name="servicesProvided"
                  value={formData.servicesProvided}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g., Foundation waterproofing, Thermal insulation, Roof protection"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Status
                </label>
                <select
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent pr-8"
                >
                  {projectStatuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conditional Date Fields */}
            {formData.projectStatus === 'finished' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {formData.projectStatus === 'ongoing' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location (English)
                </label>
                <input
                  type="text"
                  name="location_en"
                  value={formData.location_en}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location (Arabic)
                </label>
                <input
                  type="text"
                  name="location_ar"
                  value={formData.location_ar}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                {editingProject ? 'Update' : 'Add'} Project
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
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-building-line text-4xl mb-4"></i>
            <p>No projects found. Add your first project!</p>
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {project.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.projectStatus === 'finished' ? 'bg-green-100 text-green-800' :
                      project.projectStatus === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {projectStatuses.find(s => s.value === project.projectStatus)?.label}
                    </span>
                    <h3 className="text-lg font-semibold">{project.title_en}</h3>
                    <span className="text-gray-500">({project.year})</span>
                  </div>
                  <p className="text-gray-600 mb-2">{project.description_en}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>Arabic: {project.title_ar}</div>
                    <div>Location: {project.location_en}</div>
                    <div>Area: {project.projectArea}</div>
                    <div>Services: {project.servicesProvided}</div>
                    {project.startDate && (
                      <div>Start Date: {new Date(project.startDate).toLocaleDateString()}</div>
                    )}
                    {project.endDate && (
                      <div>End Date: {new Date(project.endDate).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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

export default ProjectsManager;
