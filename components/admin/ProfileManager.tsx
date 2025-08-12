'use client';

import { useState, useEffect } from 'react';

interface FileStatus {
  exists: boolean;
  size?: number;
  lastModified?: Date;
  sizeInMB?: string;
  sizeInKB?: string;
  isValid?: boolean;
  error?: string;
  isDefault?: boolean;
  path?: string;
}

interface SystemStatus {
  status: 'healthy' | 'warning' | 'error';
  healthy: boolean;
  warnings: string[];
  errors: string[];
}

interface StatusResponse {
  timestamp: string;
  responseTime: string;
  system: SystemStatus;
  pdf: FileStatus;
  watermark: FileStatus;
  storage: {
    totalFiles: number;
    totalSize: number;
    totalSizeInMB: string;
  };
  capabilities: {
    supportsRangeRequests: boolean;
    supportsCaching: boolean;
    supportsValidation: boolean;
    maxPdfSize: string;
    maxWatermarkSize: string;
    supportedImageFormats: string[];
  };
}

interface UploadResult {
  success: boolean;
  results: {
    pdf: { success: boolean; message: string };
    watermark: { success: boolean; message: string };
  };
  message: string;
}

const ProfileManager = () => {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [selectedWatermark, setSelectedWatermark] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/profile-pdf/status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error fetching status:', error);
      setMessage('Failed to fetch status. Please refresh the page.');
      setMessageType('error');
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const validateFile = (file: File, type: 'pdf' | 'image'): string | null => {
    if (type === 'pdf') {
      if (file.type !== 'application/pdf') {
        return 'Please select a valid PDF file';
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB
        return 'PDF file size must be less than 50MB';
      }
    } else {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return 'Please select a valid image file (PNG, JPG, SVG, WebP)';
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        return 'Image file size must be less than 5MB';
      }
    }
    return null;
  };

  const handleFileUpload = async () => {
    if (!selectedPdf && !selectedWatermark) {
      showMessage('Please select at least one file to upload', 'warning');
      return;
    }

    // Validate files
    if (selectedPdf) {
      const pdfError = validateFile(selectedPdf, 'pdf');
      if (pdfError) {
        showMessage(pdfError, 'error');
        return;
      }
    }

    if (selectedWatermark) {
      const imageError = validateFile(selectedWatermark, 'image');
      if (imageError) {
        showMessage(imageError, 'error');
        return;
      }
    }

    setLoading(true);
    setUploadProgress(0);
    setMessage('');

    try {
      const formData = new FormData();
      if (selectedPdf) {
        formData.append('pdf', selectedPdf);
      }
      if (selectedWatermark) {
        formData.append('watermark', selectedWatermark);
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/profile-pdf', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data: UploadResult = await response.json();

      if (response.ok && data.success) {
        const successMessages = [];
        if (data.results.pdf.success) successMessages.push('PDF uploaded successfully');
        if (data.results.watermark.success) successMessages.push('Watermark uploaded successfully');
        
        showMessage(successMessages.join(' and '), 'success');
        setSelectedPdf(null);
        setSelectedWatermark(null);
        await fetchStatus();
      } else {
        const errorMessages = [];
        if (!data.results.pdf.success) errorMessages.push(data.results.pdf.message);
        if (!data.results.watermark.success) errorMessages.push(data.results.watermark.message);
        
        showMessage(errorMessages.join('. ') || data.message || 'Upload failed', 'error');
      }
    } catch (error) {
      showMessage('Upload failed. Please try again.', 'error');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDeletePdf = async () => {
    if (!confirm('Are you sure you want to delete the PDF? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/profile-pdf', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage(`Successfully deleted ${data.deletedFiles} file(s)`, 'success');
        await fetchStatus();
      } else {
        showMessage(data.message || 'Delete failed', 'error');
      }
    } catch (error) {
      showMessage('Delete failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageColor = () => {
    switch (messageType) {
      case 'success': return 'bg-green-50 text-green-800 border border-green-200';
      case 'error': return 'bg-red-50 text-red-800 border border-red-200';
      case 'warning': return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
      default: return 'bg-blue-50 text-blue-800 border border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Profile Management</h2>
        <p className="text-gray-600">
          Upload and manage your company profile PDF and watermark for the secure flipbook viewer.
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${getMessageColor()}`}>
          <div className="flex items-center">
            {messageType === 'success' && <i className="ri-check-line mr-2"></i>}
            {messageType === 'error' && <i className="ri-error-warning-line mr-2"></i>}
            {messageType === 'warning' && <i className="ri-alert-line mr-2"></i>}
            {messageType === 'info' && <i className="ri-information-line mr-2"></i>}
            {message}
          </div>
        </div>
      )}

      {/* System Status */}
      {status && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Overall Status</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.system.status)}`}>
                  {status.system.status.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Response Time: {status.responseTime}</p>
                <p>Total Files: {status.storage.totalFiles}</p>
                <p>Total Size: {status.storage.totalSizeInMB} MB</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Company Profile PDF</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  status.pdf.exists && status.pdf.isValid !== false
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.pdf.exists ? (status.pdf.isValid !== false ? 'Valid' : 'Invalid') : 'Not Uploaded'}
                </span>
              </div>
              {status.pdf.exists && (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Size: {status.pdf.sizeInMB} MB</p>
                  <p>Last Modified: {formatDate(status.pdf.lastModified!.toString())}</p>
                  {status.pdf.isValid === false && (
                    <p className="text-red-600">Error: {status.pdf.error}</p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Watermark</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  status.watermark.exists && status.watermark.isValid !== false
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.watermark.exists ? (status.watermark.isValid !== false ? 'Valid' : 'Invalid') : 'Not Uploaded'}
                </span>
              </div>
              {status.watermark.exists && (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Size: {status.watermark.sizeInKB} KB</p>
                  <p>Type: {status.watermark.isDefault ? 'Default' : 'Custom'}</p>
                  <p>Last Modified: {formatDate(status.watermark.lastModified!.toString())}</p>
                  {status.watermark.isValid === false && (
                    <p className="text-red-600">Error: {status.watermark.error}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* System Warnings/Errors */}
          {(status.system.warnings.length > 0 || status.system.errors.length > 0) && (
            <div className="mt-4 space-y-2">
              {status.system.errors.map((error, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <i className="ri-error-warning-line text-red-500 mr-2"></i>
                    <span className="text-red-800 text-sm">{error}</span>
                  </div>
                </div>
              ))}
              {status.system.warnings.map((warning, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <i className="ri-alert-line text-yellow-500 mr-2"></i>
                    <span className="text-yellow-800 text-sm">{warning}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Files</h3>
        
        <div className="space-y-6">
          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Profile PDF
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedPdf(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {selectedPdf && (
                <div className="text-sm text-gray-600">
                  <p>Name: {selectedPdf.name}</p>
                  <p>Size: {formatFileSize(selectedPdf.size)}</p>
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Maximum file size: 50MB. Supported format: PDF only.
            </p>
          </div>

          {/* Watermark Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Watermark Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedWatermark(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
              {selectedWatermark && (
                <div className="text-sm text-gray-600">
                  <p>Name: {selectedWatermark.name}</p>
                  <p>Size: {formatFileSize(selectedWatermark.size)}</p>
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Maximum file size: 5MB. Supported formats: PNG, JPG, SVG, WebP.
            </p>
          </div>

          {/* Upload Progress */}
          {loading && uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Upload Button */}
          <div className="flex space-x-4">
            <button
              onClick={handleFileUpload}
              disabled={loading || (!selectedPdf && !selectedWatermark)}
              className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <i className="ri-upload-line"></i>
                  <span>Upload Files</span>
                </>
              )}
            </button>

            {status?.pdf.exists && (
              <button
                onClick={handleDeletePdf}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i className="ri-delete-bin-line"></i>
                <span>Delete PDF</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Capabilities */}
      {status && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Capabilities</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Performance Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Range requests for efficient loading</li>
                <li>• Intelligent caching system</li>
                <li>• File validation and security checks</li>
                <li>• Progressive loading with page caching</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Security Features</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• PDF content protection from downloading</li>
                <li>• Watermark overlay prevents screenshots</li>
                <li>• No print functionality in viewer</li>
                <li>• Real-time security monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Usage Instructions</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Upload a PDF file (max 50MB) for your company profile</li>
          <li>• Optionally upload a watermark image (max 5MB) for security</li>
          <li>• The system will automatically validate all uploaded files</li>
          <li>• Files are cached for optimal performance</li>
          <li>• The secure viewer includes zoom, fullscreen, and navigation features</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileManager;