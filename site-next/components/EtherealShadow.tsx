'use client';

import { useEffect, useRef, useId } from 'react';

interface EtherealShadowProps {
  color?: string;
  noiseOpacity?: number;
  noiseScale?: number;
  style?: React.CSSProperties;
  className?: string;
}

// Reverse-engineered from https://21st.dev/jatin-yadav05/etheral-shadow
// Animated SVG feTurbulence displacement + mask-image blob + noise overlay
export default function EtherealShadow({
  color = 'rgba(128, 128, 128, 1)',
  noiseOpacity = 0.5,
  noiseScale = 240,
  style,
  className,
}: EtherealShadowProps) {
  const rawId = useId().replace(/:/g, '');
  const filterId = `shadowoverlay-${rawId}`;
  const colorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  // Full hue rotation cycle in ~5.8 seconds (matches original speed=90 config)
  const CYCLE_SEC = 5.8;
  // Displacement scale — how much the blob shape warps
  const N = 100;

  useEffect(() => {
    // Phones drop the displacement filter entirely (globals.css swaps it
    // for a plain blur) — don't burn a rAF loop mutating an unused filter.
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const cm = colorMatrixRef.current;
    if (!cm) return;

    let alive = true;

    const tick = (ts: number) => {
      if (!alive) return;
      if (!startRef.current) startRef.current = ts;
      const angle = (((ts - startRef.current) / 1000 / CYCLE_SEC) * 360) % 360;
      cm.setAttribute('values', String(angle));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={className}
      style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%', ...style }}
    >
      {/* Displaced color blob */}
      <div className="es-blob" style={{ position: 'absolute', inset: -N, filter: `url(#${filterId}) blur(4px)` }}>
        {/* SVG filter definition — must be rendered in DOM for url(#id) to work */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id={filterId}>
              {/* Step 1: generate base turbulence noise */}
              <feTurbulence
                result="undulation"
                numOctaves={2}
                baseFrequency="0.0005,0.002"
                seed="0"
                type="turbulence"
              />
              {/* Step 2: animate hue of noise (drives organic motion) */}
              <feColorMatrix
                ref={colorMatrixRef}
                in="undulation"
                type="hueRotate"
                values="180"
              />
              {/* Step 3: amplify RGB channels for displacement input ("circulation") */}
              <feColorMatrix
                result="circulation"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
              />
              {/* Step 4: displace source by circulation */}
              <feDisplacementMap
                in="SourceGraphic"
                in2="circulation"
                scale={N}
                result="dist"
              />
              {/* Step 5: displace again by raw turbulence for extra warp */}
              <feDisplacementMap
                in="dist"
                in2="undulation"
                scale={N}
                result="output"
              />
            </filter>
          </defs>
        </svg>

        {/* The color fill, shaped by the mask PNG */}
        <div
          style={{
            backgroundColor: color,
            maskImage: "url('/footer/shadow-mask.png')",
            maskSize: 'cover',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Film-grain noise overlay */}
      {noiseOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/footer/noise.png')",
            backgroundSize: `${noiseScale}px`,
            backgroundRepeat: 'repeat',
            opacity: noiseOpacity,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
