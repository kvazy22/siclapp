'use client';

import { useState, useEffect, useRef } from 'react';

interface SimplePDFViewerProps {
  onClose: () => void;
}

const SimplePDFViewer = ({ onClose }: SimplePDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [watermarkUrl, setWatermarkUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);
  const pdfjsLibRef = useRef<any>(null);
  const isMountedRef = useRef(true);

  // Security setup - disable right-click, print, download
  const setupSecurity = () => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for print, save, etc.
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+P (print), Ctrl+S (save), Ctrl+Shift+S (save as), F12 (dev tools)
      if (
        (e.ctrlKey && (e.key === 'p' || e.key === 's')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'S') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners only to the document, not to specific elements
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
    };
  };

  // Handle close button click with enhanced debugging
  const handleClose = (e: React.MouseEvent) => {
    console.log('Close button clicked'); // Debug log
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log('Calling onClose function'); // Debug log
    try {
      onClose();
      // Also trigger timeout fallback as backup
      timeoutClose();
    } catch (error) {
      console.error('Error in onClose:', error);
      // Fallback: try to close by setting state
      window.location.reload();
    }
  };

  // Handle background click to close modal
  const handleBackgroundClick = (e: React.MouseEvent) => {
    console.log('Background clicked'); // Debug log
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (e.target === e.currentTarget) {
      console.log('Background target matches, closing'); // Debug log
      try {
        onClose();
      } catch (error) {
        console.error('Error in onClose from background:', error);
        // Fallback: try to close by setting state
        window.location.reload();
      }
    }
  };

  // Force close method as fallback
  const forceClose = () => {
    console.log('Force closing PDF viewer');
    try {
      onClose();
    } catch (error) {
      console.error('Error in force close:', error);
      window.location.reload();
    }
  };

  // Timeout-based fallback close
  const timeoutClose = () => {
    setTimeout(() => {
      console.log('Timeout fallback close triggered');
      forceClose();
    }, 100);
  };

  // Load PDF.js library
  const loadPDFJS = async () => {
    try {
      if (pdfjsLibRef.current) {
        return pdfjsLibRef.current;
      }

      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      pdfjsLibRef.current = pdfjsLib;
      return pdfjsLib;
    } catch (err: any) {
      // Check if it's a cancellation error
      if (err && err.name === 'RenderingCancelledException') {
        console.log('PDF.js loading was cancelled - component likely unmounted');
        return null;
      }
      console.error('Failed to load PDF.js library:', err);
      throw new Error('Failed to load PDF viewer library');
    }
  };

  // Load PDF and watermark
  const loadPDF = async () => {
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
      
      // Check if loading was cancelled
      if (!pdfjsLib) {
        console.log('PDF.js loading was cancelled, stopping PDF load');
        return;
      }

      // Get PDF URL with timestamp
      const timestamp = Date.now();
      const pdfResponse = await fetch(`/api/profile-pdf?t=${timestamp}`);
      
      if (!pdfResponse.ok) {
        throw new Error(`Failed to load PDF: ${pdfResponse.status}`);
      }

      const pdfBlob = await pdfResponse.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@5.4.54/cmaps/',
        cMapPacked: true,
      });

      const pdf = await loadingTask.promise;

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

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setLoading(false);
      }
    } catch (err: any) {
      // Check if it's a cancellation error
      if (err && err.name === 'RenderingCancelledException') {
        console.log('PDF loading was cancelled - component likely unmounted');
        return;
      }
      console.error('PDF loading error:', err);
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setError(err.message || 'Failed to load PDF');
        setLoading(false);
      }
    }
  };

  // Render PDF page with watermark
  const renderPage = async (pageNum: number) => {
    // Check if component is still mounted
    if (!isMountedRef.current) {
      console.log('Component unmounted, skipping render');
      return;
    }
    
    if (!pdfDocument || !canvasRef.current) {
      console.log('Cannot render: PDF document or canvas not available');
      return;
    }

    try {
      // Cancel any existing render task
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      const page = await pdfDocument.getPage(pageNum);
      const canvas = canvasRef.current;
      
      // Double-check canvas is still available
      if (!canvas) {
        console.log('Canvas is null, cannot render page');
        return;
      }
      
      const context = canvas.getContext('2d');

      if (!context) {
        console.log('Cannot get 2D context from canvas');
        return;
      }

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
      if (watermarkUrl && canvas) {
        const watermarkImg = new Image();
        watermarkImg.onload = () => {
          // Check if canvas is still available before drawing watermark
          if (!canvas || !canvasRef.current) {
            console.log('Canvas no longer available for watermark');
            return;
          }
          
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
    } catch (err: any) {
      // Only show error if it's not a cancellation
      if (err && err.name !== 'RenderingCancelled') {
        console.error('Page rendering error:', err);
        setError('Failed to render PDF page');
      }
    }
  };

  // Navigation functions
  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  // Initialize component
  useEffect(() => {
    isMountedRef.current = true;
    const cleanup = setupSecurity();
    loadPDF();

    return () => {
      isMountedRef.current = false;
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
  }, []);

  // Render page when currentPage or scale changes
  useEffect(() => {
    if (pdfDocument && currentPage > 0 && isMountedRef.current) {
      renderPage(currentPage);
    }
  }, [pdfDocument, currentPage, scale]);

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
          forceClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center" style={{ zIndex: 9999 }}>
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center" style={{ zIndex: 9999 }}>
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">PDF Loading Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={forceClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={handleBackgroundClick}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-800">Company Profile (Secure Viewer)</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
              Print & Download Disabled
            </span>
            <button
              onClick={handleClose}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer select-none"
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              ×
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto p-4" ref={containerRef}>
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

          {/* Security Notice */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            <span className="text-red-600 font-semibold">Security:</span> Print, download, and right-click are disabled • 
            Use arrow keys or Page Up/Down to navigate • Home/End for first/last page • Escape to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePDFViewer; 