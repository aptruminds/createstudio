'use client';
// Adapted from 21st.dev — isaiahbjork/hover-image-gallery.
// Moving the cursor horizontally across the image scrubs through `images`;
// a glassmorphic chevron tooltip follows the cursor while hovering.
import { useState } from 'react';

interface HoverImageGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HoverImageGallery({ images, alt = '', className = '', style }: HoverImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });

    // Horizontal position picks which image to show
    const imageIndex = Math.floor((x / rect.width) * images.length);
    setCurrentImageIndex(Math.max(0, Math.min(images.length - 1, imageIndex)));
  };

  return (
    <div
      className={`relative overflow-hidden cursor-none ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setCurrentImageIndex(0); }}
    >
      <img
        src={images[currentImageIndex]}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-150 ease-out"
      />

      {/* Glassmorphic tooltip with both chevrons */}
      {isHovering && (
        <div
          className="absolute pointer-events-none z-20 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 w-12 h-12 flex items-center justify-center">
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
