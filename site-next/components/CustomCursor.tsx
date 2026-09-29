'use client';

import { useEffect, useRef, useState } from 'react';

const DOT_COLOR = '#F14A73';

// Desktop-only pink-dot cursor. The native cursor is hidden globally
// (cursor: none in globals.css); this dot replaces it everywhere —
// every section, the nav, and the preloader — hiding only while the
// pointer is outside the window. Touch devices keep the native cursor.
export default function CustomCursor() {
  const [pos, setPos]         = useState({ x: -300, y: -300 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const hasMovedRef           = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }
    // Visible from mount at viewport center (covers the preloader before
    // the first mousemove), then it follows the pointer
    setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      hasMovedRef.current = true;
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      aria-hidden
      style={{
        position:      'fixed',
        left:          pos.x,
        top:           pos.y,
        transform:     'translate(-50%, -50%)',
        pointerEvents: 'none',
        // Above the preloader (z-index 99999) so the dot never disappears
        zIndex:        100000,
        opacity:       visible ? 1 : 0,
        transition:    'opacity 0.25s ease',
      }}
    >
      <div
        style={{
          width:        10,
          height:       10,
          borderRadius: '50%',
          background:   DOT_COLOR,
          flexShrink:   0,
        }}
      />
    </div>
  );
}
