'use client';
import { useRef, useEffect, useState } from 'react';
import GalleryVisitor from '@/components/GalleryVisitor';

// Real work images from public/work/ — cycling through 5 images across 12 slots
const WORK_IMAGES = [
  '/work/01.webp', '/work/02.webp', '/work/03.webp',
  '/work/04.webp', '/work/05.webp',
];

const WORKS = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return { num, img: WORK_IMAGES[i % WORK_IMAGES.length] };
});

// Same layout model as the Work section: a horizontal strip that translates on
// scroll. AREA_TOP/BOTTOM_VH bound the band the framed work centers within.
// START_VW centers the FIRST frame in the viewport at scroll start; the pan is
// then computed so the LAST frame lands dead-center at the end.
const DESKTOP = { FRAME_W_VW: 21, SLOT_VW: 27, START_VW: 50 - 21 / 2 };
const MOBILE  = { FRAME_W_VW: 56, SLOT_VW: 70, START_VW: 50 - 56 / 2 };
const IMAGE_ASPECT = 1; // square works

export default function Section2Gallery() {
  const secRef   = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fillRef  = useRef<HTMLDivElement>(null);
  const artRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const prevIdx  = useRef(-1);

  const [L, setL] = useState({ ...DESKTOP, FRAME_H_VH: 38 });

  useEffect(() => {
    const update = () => {
      const layout = window.innerWidth <= 768 ? MOBILE : DESKTOP;
      const widthPx = (layout.FRAME_W_VW / 100) * window.innerWidth;
      const heightPx = widthPx / IMAGE_ASPECT;
      const frameHVh = (heightPx / window.innerHeight) * 100;
      setL({ ...layout, FRAME_H_VH: frameHVh });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const TOP_VH   = (100 - L.FRAME_H_VH) / 2; // center each frame vertically in the viewport
  const STRIP_VW = L.START_VW * 2 + WORKS.length * L.SLOT_VW;

  useEffect(() => {
    const sec      = secRef.current;
    const strip    = stripRef.current;
    const scroller = document.querySelector('.snap-container') as HTMLElement;
    if (!sec || !strip || !scroller) return;

    artRefs.current[0]?.classList.add('sg-artwork--active');
    prevIdx.current = 0;

    function onScroll() {
      const rect     = sec!.getBoundingClientRect();
      const total    = sec!.offsetHeight - window.innerHeight;
      const gone     = Math.max(0, -rect.top);
      const t        = Math.min(1, gone / total);
      // Pan exactly from first-frame-centered to last-frame-centered.
      const slot     = (window.innerWidth <= 768 ? MOBILE : DESKTOP).SLOT_VW;
      const maxTrans = ((WORKS.length - 1) * slot / 100) * window.innerWidth;

      strip!.style.transform = `translateX(-${t * maxTrans}px)`;

      // Progress bar fill
      if (fillRef.current) {
        fillRef.current.style.width = `${t * 100}%`;
      }

      // Title fades out over the first stretch of the walk-through.
      if (titleRef.current) {
        const fade = Math.max(0, 1 - t / 0.15);
        titleRef.current.style.opacity = String(fade);
        titleRef.current.style.transform = `translateY(-${(1 - fade) * 24}px)`;
      }

      const idx = Math.min(WORKS.length - 1, Math.round(t * (WORKS.length - 1)));
      if (idx !== prevIdx.current) {
        prevIdx.current = idx;
        artRefs.current.forEach((el, i) =>
          el?.classList.toggle('sg-artwork--active', i === idx));
      }
    }

    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="section-2" ref={secRef}>
      <div className="sg-sticky">
        <div className="sg-ceiling" />

        <h2 ref={titleRef} className="sg-title">
          Create Studio
          <br />
          Gallery
        </h2>

        <div ref={stripRef} className="sg-strip" style={{ width: `${STRIP_VW}vw` }}>
          {WORKS.map((work, i) => {
            const leftVw = L.START_VW + i * L.SLOT_VW;
            return (
              <div
                key={i}
                ref={(el) => { artRefs.current[i] = el; }}
                className="sg-artwork"
                style={{ left: `${leftVw}vw`, top: `${TOP_VH}vh`, width: `${L.FRAME_W_VW}vw` }}
              >
                {/* Glow top pinned to the viewport top: the radial's bright
                    center sits at the div's top edge, so if that edge is
                    visible it reads as a hard cut across the wall */}
                <div
                  className="sg-glow"
                  style={{ top: `-${TOP_VH}vh`, height: `${TOP_VH + L.FRAME_H_VH * 1.5}vh` }}
                />
                <figure className="sg-frame" style={{ height: `${L.FRAME_H_VH}vh` }}>
                  <img src={work.img} alt={`Work ${work.num}`} loading="eager" />
                </figure>
                <div className="sg-info">
                  <span className="sg-info-num">{work.num}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sg-floor" />

        {/* Progress bar */}
        <div className="sg-progress">
          <div ref={fillRef} className="sg-progress-fill" />
        </div>

        <GalleryVisitor />

        <span className="sg-hint">— scroll to walk through the gallery —</span>
      </div>
    </section>
  );
}
