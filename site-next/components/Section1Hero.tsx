'use client';
import { useEffect } from 'react';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';

function handleEnter() {
  const container = document.querySelector<HTMLElement>('.snap-container');
  const target = document.getElementById('section-2');
  if (container && target) {
    container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  } else {
    target?.scrollIntoView({ behavior: 'smooth' });
  }
}

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1741332966416-414d8a5b8887?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8', alt: 'Image 1' },
  { src: 'https://images.unsplash.com/photo-1754769440490-2eb64d715775?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2' },
  { src: 'https://images.unsplash.com/photo-1758640920659-0bb864175983?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3' },
  { src: 'https://plus.unsplash.com/premium_photo-1758367454070-731d3cc11774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 4' },
  { src: 'https://images.unsplash.com/photo-1746023841657-e5cd7cc90d2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 5' },
  { src: 'https://images.unsplash.com/photo-1741715661559-6149723ea89a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 6' },
  { src: 'https://images.unsplash.com/photo-1725878746053-407492aa4034?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 7' },
  { src: 'https://images.unsplash.com/photo-1752588975168-d2d7965a6d64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D', alt: 'Image 8' },
];

export default function Section1Hero() {
  // Gate the hero: user-initiated scrolling can't leave section 1. The only way
  // forward is the Enter button or a navbar link (both scroll programmatically,
  // which these listeners don't block).
  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.snap-container');
    if (!container) return;

    const onSection1 = () => container.scrollTop < window.innerHeight * 0.5;

    const DOWN_KEYS = new Set([
      'ArrowDown', 'PageDown', 'End', ' ', 'Spacebar',
    ]);

    const onWheel = (e: WheelEvent) => {
      if (onSection1() && e.deltaY > 0) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      if (onSection1() && DOWN_KEYS.has(e.key)) e.preventDefault();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (onSection1()) e.preventDefault();
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section id="section-1" style={{ background: '#0a0a0a', overflow: 'hidden' }}>
      <InfiniteGallery
        images={IMAGES}
        speed={1.2}
        visibleCount={12}
        style={{ position: 'absolute', inset: 0, height: '100vh', width: '100%' }}
      />

      {/* Title overlay — mix-blend-mode: exclusion inverts against gallery images */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 12px',
        mixBlendMode: 'exclusion',
        color: '#fff',
        zIndex: 10,
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(48px, 8vw, 112px)',
            fontStyle: 'italic',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            Create Studio
          </h1>
          <p className="s1-sub" style={{
            maxWidth: '880px',
            margin: '24px auto 0',
            fontFamily: "'Syne', sans-serif",
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '150%',
            letterSpacing: '0.4px',
            color: '#fff',
            textAlign: 'center',
          }}>
            {/* the space before the <br> matters: mobile hides the <br>, and
                JSX strips bare newlines, which would glue the words together */}
            We are a human-centric design studio obsessed with creating thoughtful{' '}
            <br />
            brands, intuitive products, and meaningful digital experiences.
          </p>
        </div>
      </div>

      {/* Enter button */}
      <div className="s1-bottom">
        <div className="hero-btn-wrap">
          <button className="hero-enter-btn" onClick={handleEnter}>
            Enter Create Studio
          </button>
        </div>
        <span className="hero-enter-arrow">↓</span>
      </div>
    </section>
  );
}
