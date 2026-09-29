'use client';
import { useEffect, useRef } from 'react';

// Segment count and per-segment radii (head → tail, decreasing)
const RADII = [100, 90, 82, 74, 67, 60, 54, 48, 43, 38];
const SEGS = RADII.length;

export default function BlobCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const section = wrap?.parentElement;
    if (!wrap || !section) return;

    const mouse = { x: -600, y: -600 };
    const pos = RADII.map(() => ({ x: -600, y: -600 }));
    const els = Array.from(wrap.children) as HTMLElement[];

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -600;
      mouse.y = -600;
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    let raf: number;

    function tick() {
      // Head springs toward mouse (slow — creates lag)
      pos[0].x += (mouse.x - pos[0].x) * 0.1;
      pos[0].y += (mouse.y - pos[0].y) * 0.1;

      // Each tail segment springs toward the one ahead (faster — stays connected)
      for (let i = 1; i < SEGS; i++) {
        pos[i].x += (pos[i - 1].x - pos[i].x) * 0.28;
        pos[i].y += (pos[i - 1].y - pos[i].y) * 0.28;
      }

      els.forEach((el, i) => {
        const r = RADII[i];
        el.style.transform = `translate(${pos[i].x - r}px, ${pos[i].y - r}px)`;
      });

      raf = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 20,
        // The gooey trick: blur merges the circles, contrast snaps them to hard edges
        filter: 'blur(22px) contrast(20)',
        mixBlendMode: 'difference',
      }}
    >
      {RADII.map((r, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            background: 'white',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
