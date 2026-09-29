import type React from 'react';

// Smooth-scroll click handler for section anchors. Scrolling happens inside
// .snap-container, not the window, so plain #hash jumps skip the animation.
export default function scrollToId(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const container = document.querySelector<HTMLElement>('.snap-container');
    if (container) {
      // Measure via rects — offsetTop can disagree with the container's
      // actual scroll geometry
      const top = container.scrollTop
        + el.getBoundingClientRect().top
        - container.getBoundingClientRect().top;
      container.scrollTo({ top, behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
