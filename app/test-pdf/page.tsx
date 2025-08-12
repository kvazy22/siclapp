'use client';

import { useState } from 'react';
import SimplePDFViewer from '../../components/SimplePDFViewer';

export default function TestPDFPage() {
  const [showSimpleViewer, setShowSimpleViewer] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">PDF Viewer Test</h1>
        <p className="text-gray-600 mb-6">
          Test the secure PDF viewer with watermark and print/download protection
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setShowSimpleViewer(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors block w-full"
          >
            Open Secure PDF Viewer
          </button>
        </div>

        {showSimpleViewer && (
          <SimplePDFViewer onClose={() => setShowSimpleViewer(false)} />
        )}
      </div>
    </div>
  );
} 