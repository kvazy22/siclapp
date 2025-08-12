'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SecureFlipbookViewerProps {
  onClose: () => void;
}

const SecureFlipbookViewer = ({ onClose }: SecureFlipbookViewerProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [watermarkUrl, setWatermarkUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const renderTaskRef = useRef<any>(null);
  const pdfjsLibRef = useRef<any>(null);

  // Enhanced security setup
  const setupSecurity = useCallback(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow only specific keys for navigation
      const allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];
      if (!allowedKeys.includes(e.key) && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  // Load PDF.js library safely
  const loadPDFJS = useCallback(async () => {
    try {
      if (pdfjsLibRef.current) {
        return pdfjsLibRef.current;
      }

      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      pdfjsLibRef.current = pdfjsLib;
      return pdfjsLib;
    } catch (err) {
      console.error('Failed to load PDF.js library:', err);
      throw new Error('Failed to load PDF viewer library');
    }
  }, []);

  // Load PDF with better error handling
  const loadPDF = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Check if PDF is available
      const statusResponse = await fetch('/api/profile-pdf/status?simple=true');
      if (!statusResponse.ok) {
        throw new Error('PDF status check failed');
      }

      const statusData = await statusResponse.json();
      if (!statusData.available) {
        throw new Error(statusData.error || 'PDF file is not available');
      }

      // Load PDF.js library
      const pdfjsLib = await loadPDFJS();

      // Get PDF URL with timestamp to avoid caching issues
      const timestamp = Date.now();
      const pdfResponse = await fetch(`/api/profile-pdf?t=${timestamp}`);
      
      if (!pdfResponse.ok) {
        throw new Error(`Failed to load PDF: ${pdfResponse.status}`);
      }

      const pdfBlob = await pdfResponse.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Load the PDF document with timeout
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@5.4.54/cmaps/',
        cMapPacked: true,
      });

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('PDF loading timeout')), 30000); // 30 seconds
      });

      const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);

      setPdfDocument(pdf);
      setTotalPages(pdf.numPages);
      setPdfUrl(pdfUrl);
      setCurrentPage(1);

      // Load watermark if available
      try {
        const watermarkResponse = await fetch('/api/profile-pdf/watermark');
        if (watermarkResponse.ok) {
          const watermarkBlob = await watermarkResponse.blob();
          setWatermarkUrl(URL.createObjectURL(watermarkBlob));
        }
      } catch (watermarkError) {
        console.warn('Watermark not available:', watermarkError);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('PDF loading error:', err);
      setError(err.message || 'Failed to load PDF');
      setLoading(false);
    }
  }, [loadPDFJS]);

  // Render PDF page with proper task management
  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDocument || !canvasRef.current) return;

    try {
      // Cancel any existing render task
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      const page = await pdfDocument.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      // Store the render task reference
      renderTaskRef.current = page.render(renderContext);
      
      // Wait for the render to complete
      await renderTaskRef.current.promise;
      
      // Clear the task reference after completion
      renderTaskRef.current = null;

      // Add watermark if available
      if (watermarkUrl) {
        const watermarkImg = new Image();
        watermarkImg.onload = () => {
          const watermarkScale = 0.15; // Smaller scale for repeating
          const watermarkWidth = watermarkImg.width * watermarkScale;
          const watermarkHeight = watermarkImg.height * watermarkScale;
          
          // Calculate spacing for repeating pattern
          const spacingX = watermarkWidth * 1.5; // 1.5x width for spacing
          const spacingY = watermarkHeight * 1.5; // 1.5x height for spacing
          
          // Calculate how many watermarks we need
          const cols = Math.ceil(canvas.width / spacingX) + 1;
          const rows = Math.ceil(canvas.height / spacingY) + 1;
          
          context.globalAlpha = 0.2; // Slightly more transparent for repeating
          
          // Draw repeating watermark pattern
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * spacingX - (watermarkWidth / 2);
              const y = row * spacingY - (watermarkHeight / 2);
              
              // Add some randomness to make it look more natural
              const offsetX = (Math.random() - 0.5) * 20;
              const offsetY = (Math.random() - 0.5) * 20;
              
              context.drawImage(
                watermarkImg, 
                x + offsetX, 
                y + offsetY, 
                watermarkWidth, 
                watermarkHeight
              );
            }
          }
          
          context.globalAlpha = 1.0;
        };
        watermarkImg.src = watermarkUrl;
      }
    } catch (err) {
      // Only show error if it's not a cancellation
      if (err && err.name !== 'RenderingCancelled') {
        console.error('Page rendering error:', err);
        setError('Failed to render PDF page');
      }
    }
  }, [pdfDocument, scale, watermarkUrl]);

  // Navigation functions
  const goToPage = useCallback((pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  // Initialize component
  useEffect(() => {
    const cleanup = setupSecurity();
    loadPDF();

    return () => {
      cleanup();
      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      if (watermarkUrl) {
        URL.revokeObjectURL(watermarkUrl);
      }
    };
  }, [setupSecurity, loadPDF]);

  // Render page when currentPage or scale changes
  useEffect(() => {
    if (pdfDocument && currentPage > 0) {
      renderPage(currentPage);
    }
  }, [pdfDocument, currentPage, scale, renderPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevPage();
          break;
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          nextPage();
          break;
        case 'Home':
          e.preventDefault();
          goToPage(1);
          break;
        case 'End':
          e.preventDefault();
          goToPage(totalPages);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [prevPage, nextPage, goToPage, totalPages, onClose]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">PDF Loading Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={loadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-800">Company Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage <= 1}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                Next
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Zoom Out
              </button>
              <span className="text-sm text-gray-600">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Zoom In
              </button>
            </div>

            {/* Page Jump */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Go to:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
              />
            </div>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            Use arrow keys or Page Up/Down to navigate • Home/End for first/last page • Escape to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureFlipbookViewer;