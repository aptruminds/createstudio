'use client';

import { useEffect } from 'react';

// iOS Safari can't do gentle CSS snapping inside our scroll container:
// `proximity` never engages, and `mandatory` yanks to the next section the
// moment a tall section's bottom edge appears (the last services tile was
// unreachable, and scrolling back up teleported to a section's top). So on
// phones CSS snap is off (see globals.css) and this settles the scroll
// instead: when a swipe comes to rest near a section top, glide to it —
// anywhere else, leave the scroll exactly where the user stopped.
//
// The glide is a hand-rolled rAF tween rather than scrollTo({smooth}) so any
// new touch cancels it instantly — a native smooth scroll keeps animating
// under the user's finger and reads as the page fighting them.
export default function MobileSnapAssist() {
  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    const scroller = document.querySelector<HTMLElement>('.snap-container');
    if (!scroller) return;

    const SETTLE_MS = 160; // quiet time after the last scroll event
    // Snap when a section top is within half the viewport: whichever section
    // owns the majority of the screen wins, so a rest straddling a boundary
    // never sticks there. Interiors of tall sections stay out of reach (their
    // tops are several screens away), which is the point of this over CSS snap.
    const RANGE = 0.5;
    const GLIDE_MS = 350;

    let touching = false;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const cancelGlide = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const glideTo = (target: number) => {
      cancelGlide();
      const from = scroller.scrollTop;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / GLIDE_MS);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        scroller.scrollTop = from + (target - from) * eased;
        raf = t < 1 ? requestAnimationFrame(step) : 0;
      };
      raf = requestAnimationFrame(step);
    };

    const settle = () => {
      if (touching || raf) return;
      const cTop = scroller.getBoundingClientRect().top;
      const top = scroller.scrollTop;
      let best: number | null = null;
      let bestDist = Infinity;
      for (const s of scroller.querySelectorAll<HTMLElement>('section')) {
        const y = s.getBoundingClientRect().top - cTop + top;
        const d = Math.abs(y - top);
        if (d < bestDist) {
          bestDist = d;
          best = y;
        }
      }
      if (best === null || bestDist < 2 || bestDist > scroller.clientHeight * RANGE) return;
      glideTo(best);
    };

    const onScroll = () => {
      if (raf) return; // our own glide — don't schedule a settle against it
      if (timer) clearTimeout(timer);
      timer = setTimeout(settle, SETTLE_MS);
    };
    // Any new user input takes over immediately: kill the glide and the timer
    const onTouchStart = () => {
      touching = true;
      cancelGlide();
      if (timer) clearTimeout(timer);
    };
    const onTouchEnd = () => {
      touching = false;
      if (timer) clearTimeout(timer);
      timer = setTimeout(settle, SETTLE_MS);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    scroller.addEventListener('touchstart', onTouchStart, { passive: true });
    scroller.addEventListener('touchend', onTouchEnd, { passive: true });
    scroller.addEventListener('touchcancel', onTouchEnd, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      cancelGlide();
      scroller.removeEventListener('scroll', onScroll);
      scroller.removeEventListener('touchstart', onTouchStart);
      scroller.removeEventListener('touchend', onTouchEnd);
      scroller.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  return null;
}
