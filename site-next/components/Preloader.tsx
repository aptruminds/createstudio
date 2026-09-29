'use client';

import { useEffect, useRef, useState } from 'react';

const HOLD_AT_100_MS = 300;  // pause on 100 before sliding away
const SLIDE_MS = 600;        // must match the CSS slide-up transition
const MIN_SHOW_MS = 3000;    // keep the preloader up at least this long
const MAX_WAIT_MS = 4000;    // safety net: reveal even if an image hangs

const WELCOME = 'Welcome to the Studio, Creator.';
const CREATOR_START = WELCOME.indexOf('Creator');
const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/?';
const REVEAL_DELAY = 55; // ms between each real character locking in
const FLIP_DELAY = 45;   // ms between gibberish flips of unrevealed chars

function randChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function scramble(source: string) {
  return source
    .split('')
    .map((c) => (c === ' ' ? ' ' : randChar()))
    .join('');
}

export default function Preloader() {
  const [shown, setShown] = useState(0);   // eased number actually displayed
  const shownRef = useRef(0);
  const targetRef = useRef(0);             // real load progress (0–100)
  const startRef = useRef(0);              // mount time, for the minimum hold
  const loadDoneRef = useRef(false);       // every image settled (or safety hit)
  const exitScheduledRef = useRef(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  // Start empty so server and client markup match — the scramble is filled in
  // on the client only, which avoids a hydration mismatch on random characters.
  const [display, setDisplay] = useState('');

  const rafRef = useRef<number | null>(null);

  // Ease the big counter toward the real load target so it always visibly
  // counts up 0 → 100 instead of snapping when images are already cached.
  // The target is also capped by elapsed time so the preloader stays up for
  // at least MIN_SHOW_MS, counting smoothly instead of stalling at 100.
  // Once it lands on 100 (and loading is done), hold for a beat, then slide up.
  useEffect(() => {
    startRef.current = performance.now();
    let raf = 0;
    const loop = () => {
      const elapsed = performance.now() - startRef.current;
      const timeCap = Math.min(100, Math.floor((elapsed / MIN_SHOW_MS) * 100));
      const t = Math.min(targetRef.current, timeCap);
      let s = shownRef.current;
      if (s < t) s = Math.min(t, s + Math.max(1, Math.ceil((t - s) * 0.14)));
      shownRef.current = s;
      setShown(s);

      if (s >= 100 && loadDoneRef.current && !exitScheduledRef.current) {
        exitScheduledRef.current = true;
        window.setTimeout(() => {
          setLeaving(true);
          document.documentElement.classList.remove('is-preloading');
          window.setTimeout(() => setGone(true), SLIDE_MS + 50);
        }, HOLD_AT_100_MS);
        return; // counter is done; stop ticking
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Self-driven decrypt animation — runs unconditionally on mount so it never
  // depends on an IntersectionObserver firing inside the fixed overlay.
  useEffect(() => {
    const start = performance.now();
    let lastFlip = start;
    let chars = scramble(WELCOME).split('');
    setDisplay(chars.join(''));

    const tick = (now: number) => {
      const elapsed = now - start;
      const revealed = Math.min(
        WELCOME.length,
        Math.floor(elapsed / REVEAL_DELAY),
      );

      if (now - lastFlip >= FLIP_DELAY) {
        for (let i = revealed; i < WELCOME.length; i += 1) {
          chars[i] = WELCOME[i] === ' ' ? ' ' : randChar();
        }
        lastFlip = now;
      }
      for (let i = 0; i < revealed; i += 1) chars[i] = WELCOME[i];

      setDisplay(chars.join(''));

      if (revealed < WELCOME.length) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Track only the hero's images — the rest of the page loads in the
  // background after the reveal (below-fold imgs are lazy anyway).
  // Reaching 100 hands off to the counter loop, which holds then slides away.
  useEffect(() => {
    let done = false;

    document.documentElement.classList.add('is-preloading');

    const finish = () => {
      if (done) return;
      done = true;
      targetRef.current = 100;
      loadDoneRef.current = true;
    };

    const safety = setTimeout(finish, MAX_WAIT_MS);

    // Wait a frame so the hero's <img>s are in the DOM, then track them.
    requestAnimationFrame(() => {
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>('#section-1 img, .nav img'),
      );
      const total = images.length;
      if (total === 0) { finish(); return; }

      let loaded = 0;
      const onOne = () => {
        loaded += 1;
        targetRef.current = Math.round((loaded / total) * 100);
        if (loaded >= total) finish();
      };

      images.forEach((img) => {
        if (img.complete) { onOne(); return; }
        img.addEventListener('load', onOne, { once: true });
        img.addEventListener('error', onOne, { once: true });
      });
    });

    return () => {
      clearTimeout(safety);
      document.documentElement.classList.remove('is-preloading');
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader${leaving ? ' preloader--leaving' : ''}`}>
      <div className="preloader-welcome">
        <span>
          {display.slice(0, CREATOR_START)}
          <span className="preloader-creator">{display.slice(CREATOR_START)}</span>
        </span>
      </div>
      <div className="preloader-count">{shown}%</div>
    </div>
  );
}
