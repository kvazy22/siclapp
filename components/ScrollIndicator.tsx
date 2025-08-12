'use client';

interface ScrollIndicatorProps {
  progress: number;
}

const ScrollIndicator = ({ progress }: ScrollIndicatorProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-yellow-600 to-orange-600 transition-all duration-300"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;