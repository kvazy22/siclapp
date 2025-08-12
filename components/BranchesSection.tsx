'use client';

import { useState, useRef, useEffect } from 'react';

interface BranchesSectionProps {
  language: 'en' | 'ar';
}

const BranchesSection = ({ language }: BranchesSectionProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      title: 'Our Branches',
      subtitle: 'Where We Work Across Saudi Arabia',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      reset: 'Reset View'
    },
    ar: {
      title: 'فروعنا',
      subtitle: 'حيث نعمل في جميع أنحاء المملكة العربية السعودية',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
      reset: 'إعادة تعيين'
    }
  };

  const text = content[language as keyof typeof content];

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 4));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.5, Math.min(prev * delta, 4)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section id="branches" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {text.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="branches-map-container" ref={containerRef}>
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-lg shadow-lg transition-colors"
                title={text.zoomIn}
              >
                <i className="ri-zoom-in-line text-xl"></i>
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-lg shadow-lg transition-colors"
                title={text.zoomOut}
              >
                <i className="ri-zoom-out-line text-xl"></i>
              </button>
              <button
                onClick={handleReset}
                className="bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-lg shadow-lg transition-colors"
                title={text.reset}
              >
                <i className="ri-refresh-line text-xl"></i>
              </button>
            </div>

            {/* Interactive SVG Container */}
            <div 
              ref={svgRef}
              className="relative overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
              style={{ 
                width: '100%', 
                height: '600px',
                userSelect: 'none'
              }}
            >
              <div
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src="/saudiarabia.svg" 
                  alt="Saudi Arabia Branches Map"
                  className="max-w-none"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    pointerEvents: 'none'
                  }}
                  draggable={false}
                />
              </div>
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg text-sm text-gray-600">
              {Math.round(scale * 100)}%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSection; 