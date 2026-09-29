'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import wsCreative  from '@/public/work-showcase/ws-creative.webp';
import wsBranding  from '@/public/work-showcase/ws-branding.webp';
import wsStrategy  from '@/public/work-showcase/ws-strategy.webp';
import wsAppdesign from '@/public/work-showcase/ws-appdesign.webp';
import wsWebdev    from '@/public/work-showcase/ws-webdev.webp';
import wsConsult   from '@/public/work-showcase/ws-consult.webp';
import wsVideo     from '@/public/work-showcase/ws-video.webp';
import wsInfluencer from '@/public/work-showcase/ws-influencer.webp';

const CARDS = [
  { src: wsCreative,   title: 'Creative Strategy', sub: '& Growth' },
  { src: wsBranding,   title: 'Branding & Social', sub: 'Media Management' },
  { src: wsStrategy,   title: 'Strategy & Social', sub: 'Media Management' },
  { src: wsAppdesign,  title: 'App Design',         sub: '& App Development' },
  { src: wsWebdev,     title: 'Web Design',          sub: '& Web Development' },
  { src: wsConsult,    title: 'Design Consultation', sub: 'UI/UX' },
  { src: wsVideo,      title: 'AI Video',            sub: 'Production' },
  { src: wsInfluencer, title: 'Creative Strategy &', sub: 'Influencer Marketing' },
];

const CARD_W   = 342;
const CARD_GAP = 56;
const STEP     = CARD_W + CARD_GAP;
const PADDING  = 72;
const SECTION_W = 1440;
const TRACK    = PADDING * 2 + CARDS.length * CARD_W + (CARDS.length - 1) * CARD_GAP;
const MAX_OFFSET = TRACK - SECTION_W;
const MAX_INDEX  = Math.ceil(MAX_OFFSET / STEP);

// Generate a fixed star field
const STARS = Array.from({ length: 60 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const seed2 = (seed * 9301 + 49297) % 233280;
  const seed3 = (seed2 * 9301 + 49297) % 233280;
  return {
    x: (seed / 233280) * 1440,
    y: (seed2 / 233280) * 900,
    s: seed3 / 233280 > 0.85 ? 3 : 2,
    d: 2 + (seed / 233280) * 3,
    delay: (seed2 / 233280) * 3,
  };
});

export default function Section3Work() {
  const [index,   setIndex]   = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [spark,   setSpark]   = useState({ x: 0, y: 0, visible: false });
  const stageRef = useRef<HTMLElement>(null);

  const trackRef   = useRef<HTMLDivElement>(null);

  const offset = Math.min(MAX_OFFSET, index * STEP);
  const progress = ((index + 1) / (MAX_INDEX + 1) * 100).toFixed(1) + '%';

  // Horizontal scroll via mouse wheel
  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta > 30)       setIndex(i => Math.min(MAX_INDEX, i + 1));
    else if (delta < -30) setIndex(i => Math.max(0, i - 1));
  }

  const onMove = useCallback((e: React.MouseEvent) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const k = SECTION_W / r.width;
    setSpark({ x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k, visible: true });
  }, []);

  const onLeave = useCallback(() => {
    setSpark(s => ({ ...s, visible: false }));
    setHovered(null);
  }, []);

  return (
    <section
      id="section-3"
      ref={stageRef}
      className="s3-work"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onWheel={onWheel}
      style={{ cursor: 'grab' }}
    >
      {/* Star field */}
      <div className="s3-stars" aria-hidden="true">
        {STARS.map((st, i) => (
          <span key={i} className="s3-star" style={{
            left: st.x, top: st.y,
            width: st.s, height: st.s,
            animationDuration: `${st.d}s`,
            animationDelay: `${st.delay}s`,
          }} />
        ))}
      </div>

      {/* Header */}
      <div className="s3-header">
        <div className="s3-header-left">
          <span className="s3-eyebrow">( Selected Works )</span>
          <h2 className="s3-headline">
            We transform ideas into unique<br />
            visual stories that connect and inspire.
          </h2>
        </div>
        <div className="s3-progress-wrap">
          <div className="s3-progress-track">
            <div className="s3-progress-fill" style={{ width: progress }} />
          </div>
        </div>
      </div>

      {/* Card carousel */}
      <div className="s3-carousel-mask">
        <div
          className="s3-track"
          style={{ transform: `translateX(${-offset}px)` }}
        >
          {CARDS.map((c, i) => {
            const on = hovered === i;
            return (
              <article
                key={i}
                className={`s3-card${on ? ' s3-card--on' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image
                  src={c.src}
                  alt={c.title}
                  fill
                  sizes="342px"
                  className={`s3-card-img${on ? ' s3-card-img--on' : ''}`}
                />
                {/* Dot overlay on hover */}
                <div className="s3-card-dots" style={{ opacity: on ? 1 : 0 }} />
                {/* Gradient fade at bottom */}
                <div className="s3-card-fade" />
                {/* Label */}
                <div className={`s3-card-label${on ? ' s3-card-label--on' : ''}`}>
                  <span className="s3-card-title" style={{ color: on ? 'rgba(255,255,255,.72)' : '#fff' }}>{c.title}</span>
                  <span className="s3-card-sub"   style={{ color: on ? 'rgba(255,255,255,.6)'  : 'rgba(255,255,255,.92)' }}>{c.sub}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Spark cursor */}
      <div
        className="s3-spark"
        aria-hidden="true"
        style={{
          transform: `translate(${spark.x}px, ${spark.y}px)`,
          opacity: spark.visible && hovered !== null ? 1 : 0,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24">
          <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" fill="#F14A73"/>
        </svg>
      </div>
    </section>
  );
}
