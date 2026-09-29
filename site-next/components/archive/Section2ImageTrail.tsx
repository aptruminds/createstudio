'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const IMGS = [
  'https://picsum.photos/seed/s01/400/520', 'https://picsum.photos/seed/s02/400/520',
  'https://picsum.photos/seed/s03/400/520', 'https://picsum.photos/seed/s04/400/520',
  'https://picsum.photos/seed/s05/400/520', 'https://picsum.photos/seed/s06/400/520',
  'https://picsum.photos/seed/s07/400/520', 'https://picsum.photos/seed/s08/400/520',
  'https://picsum.photos/seed/s09/400/520', 'https://picsum.photos/seed/s10/400/520',
];

const W = 123, H = 162, THRESHOLD = 80;

export default function Section2ImageTrail() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgIdxRef = useRef(0);
  const lastXRef = useRef(-999);
  const lastYRef = useRef(-999);

  // Preload every trail image on mount so the first hover shows the picture,
  // not just the empty frame while the network request is still in flight.
  useEffect(() => {
    IMGS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    let gsap: typeof import('gsap').gsap;

    import('gsap').then((mod) => {
      gsap = mod.gsap;
    });

    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastXRef.current;
      const dy = e.clientY - lastYRef.current;
      if (dx * dx + dy * dy < THRESHOLD * THRESHOLD) return;
      lastXRef.current = e.clientX;
      lastYRef.current = e.clientY;

      if (!gsap) return;

      const el = document.createElement('div');
      el.className = 's2-trail-img';
      const img = document.createElement('img');
      img.src = IMGS[imgIdxRef.current++ % IMGS.length];
      img.alt = '';
      el.appendChild(img);
      document.body.appendChild(el);
      el.style.left = e.clientX - W / 2 + 'px';
      el.style.top  = e.clientY - H / 2 + 'px';

      gsap.fromTo(el,
        { scale: 0.7, opacity: 0, rotation: (Math.random() - 0.5) * 20 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' }
      );
      gsap.to(el, {
        y: -52, opacity: 0, scale: 0.9, duration: 0.45, delay: 0.7, ease: 'power2.in',
        onComplete() { el.remove(); },
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="section-2" ref={sectionRef}>
      <div className="s2-headline">
        <Image src="/CREATE STUDIO.svg" alt="Create Studio" width={874} height={120} style={{ width: '100%', height: 'auto', filter: 'invert(1)' }} />
      </div>
      <p className="s2-subtitle">
        We are a Human-Centric<br />Experience Studio
      </p>
    </section>
  );
}
