'use client';
import { useRef, useEffect, useState } from 'react';
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas';

const WORKS = [
  {
    num: '01',
    title: 'The Marketplace',
    subtitle: 'An exploration of retail discovery',
    img: '/work/01.webp',
  },
  {
    num: '02',
    title: 'The Network',
    subtitle: 'Connecting people and possibilities',
    img: '/work/02.webp',
  },
  {
    num: '03',
    title: 'Origins — Tea',
    subtitle: 'Rooted in heritage and craft',
    img: '/work/03.webp',
  },
  {
    num: '04',
    title: 'Reflections — Jewellery',
    subtitle: 'Modern luxury reimagined',
    img: '/work/04.webp',
  },
  {
    num: '05',
    title: 'Restore — Woundcare',
    subtitle: 'The art of healing experiences',
    img: '/work/05.webp',
  },
];

// AREA_TOP/BOTTOM_VH bound the vertical band the artwork centers within,
// leaving room above for the header text and below for the info labels.
const DESKTOP = { FRAME_W_VW: 20, SLOT_VW: 34, START_VW: 15, AREA_TOP_VH: 32, AREA_BOTTOM_VH: 78 };
const MOBILE  = { FRAME_W_VW: 50, SLOT_VW: 64, START_VW: 12, AREA_TOP_VH: 44, AREA_BOTTOM_VH: 78 };

// Source photos are portrait ~1003×1568 — keep the frame at that ratio so
// PixelatedCanvas's `cover` fit shows the full image with no crop/stretch.
const IMAGE_ASPECT = 1003 / 1568;

export default function Section5Work() {
  const secRef   = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const artRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const prevIdx  = useRef(-1);

  const [L, setL] = useState({ ...DESKTOP, FRAME_H_VH: 47 });
  const [canvasPx, setCanvasPx] = useState({ w: 320, h: 500 });

  // Recompute layout on mount + orientation change
  useEffect(() => {
    const update = () => {
      const layout = window.innerWidth <= 768 ? MOBILE : DESKTOP;
      const widthPx  = (layout.FRAME_W_VW / 100) * window.innerWidth;
      const heightPx = widthPx / IMAGE_ASPECT;
      const frameHVh = (heightPx / window.innerHeight) * 100;

      setL({ ...layout, FRAME_H_VH: frameHVh });
      setCanvasPx({ w: Math.round(widthPx), h: Math.round(heightPx) });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const TOP_VH   = L.AREA_TOP_VH + (L.AREA_BOTTOM_VH - L.AREA_TOP_VH - L.FRAME_H_VH) / 2;
  const STRIP_VW = L.START_VW * 2 + WORKS.length * L.SLOT_VW;

  useEffect(() => {
    const sec      = secRef.current;
    const strip    = stripRef.current;
    const scroller = document.querySelector('.snap-container') as HTMLElement;
    if (!sec || !strip || !scroller) return;

    artRefs.current[0]?.classList.add('gallery-artwork--active');
    dotRefs.current[0]?.classList.add('gallery-dot--active');
    prevIdx.current = 0;

    function onScroll() {
      const rect     = sec!.getBoundingClientRect();
      const total    = sec!.offsetHeight - window.innerHeight;
      const gone     = Math.max(0, -rect.top);
      const t        = Math.min(1, gone / total);
      const maxTrans = Math.max(0, strip!.offsetWidth - window.innerWidth);

      strip!.style.transform = `translateX(-${t * maxTrans}px)`;

      const idx = Math.min(WORKS.length - 1, Math.round(t * (WORKS.length - 1)));
      if (idx !== prevIdx.current) {
        prevIdx.current = idx;
        artRefs.current.forEach((el, i) =>
          el?.classList.toggle('gallery-artwork--active', i === idx)
        );
        dotRefs.current.forEach((el, i) =>
          el?.classList.toggle('gallery-dot--active', i === idx)
        );
      }
    }

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="section-5" ref={secRef}>
      <div className="gallery-sticky">

        <div className="gallery-header">
          <p className="gallery-header-eyebrow">Our Work</p>
          <p className="gallery-header-title">
            With a team of talented designers and developers we tranform ideas into
            unique visual stories that connect and inspire.
          </p>
        </div>

        <div ref={stripRef} className="gallery-strip" style={{ width: `${STRIP_VW}vw` }}>
          {WORKS.map((work, i) => {
            const leftVw = L.START_VW + i * L.SLOT_VW;

            return (
              <div
                key={i}
                ref={(el) => { artRefs.current[i] = el; }}
                className="gallery-artwork"
                style={{ left: `${leftVw}vw`, top: `${TOP_VH}vh`, width: `${L.FRAME_W_VW}vw` }}
              >
                <div className="gallery-canvas-wrap" style={{ height: `${L.FRAME_H_VH}vh` }}>
                  <PixelatedCanvas
                    src={work.img}
                    width={canvasPx.w}
                    height={canvasPx.h}
                    cellSize={7}
                    dotScale={0.88}
                    shape="square"
                    backgroundColor="#F14773"
                    tintStrength={0}
                    interactive
                    distortionMode="swirl"
                    distortionStrength={3}
                    distortionRadius={90}
                    followSpeed={0.2}
                    maxFps={30}
                    className="gallery-pixel-canvas"
                  />
                </div>

                <div className="gallery-info">
                  <span className="gallery-info-num">{work.num}</span>
                  <span className="gallery-info-title">{work.title}</span>
                  <span className="gallery-info-meta">{work.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="gallery-ui">
          <span className="gallery-cursor-hint">— hover to explore —</span>
          <div className="gallery-dots">
            {WORKS.map((_, i) => (
              <div key={i} ref={(el) => { dotRefs.current[i] = el; }} className="gallery-dot" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
