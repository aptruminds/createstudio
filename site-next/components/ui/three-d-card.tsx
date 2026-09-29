'use client';
// Adapted from Aceternity UI — 3D Card Effect.
// The card tilts toward the cursor (perspective + rotateX/rotateY) and its
// layers lift on the z-axis while hovered.
import { useRef, useState } from 'react';

interface ThreeDCardProps {
  image: string;
  alt?: string;
  label: string;
  labelStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

export function ThreeDCard({ image, alt = '', label, labelStyle, style }: ThreeDCardProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const body = bodyRef.current;
    if (!body) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rotY = (e.clientX - rect.left - rect.width / 2) / 25;
    const rotX = -(e.clientY - rect.top - rect.height / 2) / 25;
    body.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave = () => {
    const body = bodyRef.current;
    if (body) body.style.transform = 'rotateX(0deg) rotateY(0deg)';
    setHovered(false);
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={bodyRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform .2s linear',
        }}
      >
        <div
          style={{
            ...style,
            overflow: 'hidden',
            transform: hovered ? 'translateZ(60px)' : 'translateZ(0px)',
            transition: 'transform .2s linear, box-shadow .2s linear',
            boxShadow: hovered
              ? '0 30px 60px rgba(0,0,0,.22), 0 10px 24px rgba(0,0,0,.14)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* Eager + low priority: lazy loading made the cards pop in blank
              mid-scroll; this fetches them in the background right after the
              critical assets without competing with the hero/preloader. */}
          <img
            src={image}
            alt={alt}
            loading="eager"
            fetchPriority="low"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <p
          style={{
            ...labelStyle,
            transform: hovered ? 'translateZ(35px)' : 'translateZ(0px)',
            transition: 'transform .2s linear',
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
