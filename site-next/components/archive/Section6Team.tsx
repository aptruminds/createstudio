'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TEAM_PHOTOS = [
  '/team/team-1.png', '/team/team-2.png', '/team/team-3.png',
  '/team/team-4.png', '/team/team-5.png', '/team/team-6.png', '/team/team-7.png',
];

const VISIBLE  = 3;
const PANEL_GAP = 16;
const STEPS     = 5; // 5 ghost snap steps (team-sticky is 100vh before them)

export default function Section6Team() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const stripRef  = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip    = stripRef.current;
    const wrapper  = wrapperRef.current;
    const scroller = document.querySelector('.snap-container') as HTMLElement;
    if (!strip || !wrapper || !scroller) return;

    let targetX = 0, currentX = 0, rafId: number | null = null;

    function getTarget() {
      const rect  = wrapper!.getBoundingClientRect();
      // team-sticky occupies first 100vh of wrapper in normal flow,
      // so ghost steps start at 100vh into the wrapper.
      // gone = 0 at ghost-0 (rect.top = -100vh), max at ghost-4 (rect.top = -500vh)
      const gone  = Math.max(0, -rect.top - window.innerHeight);
      const total = (STEPS - 1) * window.innerHeight; // 4 × 100vh
      const t     = Math.min(1, gone / total);
      return t * (TEAM_PHOTOS.length - VISIBLE) * (window.innerWidth / VISIBLE + PANEL_GAP);
    }

    function tick() {
      currentX += (targetX - currentX) * 0.12;
      strip!.style.transform = `translateX(-${currentX}px)`;
      if (Math.abs(targetX - currentX) > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentX = targetX;
        strip!.style.transform = `translateX(-${currentX}px)`;
        rafId = null;
      }
    }

    function onScroll() {
      targetX = getTarget();
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Mobile layout: 2×2 photo grid, no scroll animation ──
  if (isMobile) {
    return (
      <section id="section-6" className="team-mobile-section">
        <div className="team-glow" />
        <div className="team-glow-r" />
        <div className="team-mobile-header">
          <span className="team-eyebrow">[ TEAM ]</span>
          <p className="team-line1 grad-text">TALENT BRINGS US HERE, BUT</p>
          <div className="team-line2">
            <span className="team-line2-a grad-text">TEAMWORK</span>
            <span className="team-line2-b">takes us further</span>
          </div>
        </div>
        <div className="team-mobile-grid">
          {TEAM_PHOTOS.map((src, i) => (
            <div key={i} className="team-mobile-card">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 48vw"
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div id="section-6" ref={wrapperRef}>
      {/* Sticky overlay — always visible while user scrolls through ghost steps */}
      <div className="team-sticky">
        <div className="team-glow" />
        <div className="team-glow-r" />

        <div className="team-header">
          <span className="team-eyebrow">[ TEAM ]</span>
          <p className="team-line1 grad-text">TALENT BRINGS US HERE, BUT</p>
          <div className="team-line2">
            <span className="team-line2-a grad-text">TEAMWORK</span>
            <span className="team-line2-b">takes us further</span>
          </div>
        </div>

        <div className="team-film">
          <div className="team-strip" ref={stripRef}>
            {TEAM_PHOTOS.map((src, i) => (
              <div key={i} className="team-panel">
                <Image
                  src={src}
                  alt={`Team member ${i + 1}`}
                  width={400}
                  height={500}
                  style={{ width: '80%', height: '80%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
            ))}
          </div>
          <div className="cinema-bot" />
          <div className="cinema-fade-l" />
          <div className="cinema-fade-r" />
        </div>

        <div className="cinema-top" />
      </div>

      {/* Ghost snap-stop divs — transparent, drive the film strip via scroll position */}
      {Array.from({ length: STEPS }, (_, i) => (
        <div key={i} className="team-snap-step" />
      ))}
    </div>
  );
}
