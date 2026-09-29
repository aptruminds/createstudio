'use client';

import { useEffect } from 'react';

export default function StackAnimation() {
  useEffect(() => {
    const stacks = Array.from(document.querySelectorAll<HTMLElement>('.placeholder'));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const idx = stacks.indexOf(e.target as HTMLElement);
        if (e.isIntersecting) {
          e.target.classList.add('stack-active');
          e.target.classList.remove('stack-past');
          stacks.slice(0, idx).forEach(s => { s.classList.remove('stack-active'); s.classList.add('stack-past'); });
          stacks.slice(idx + 1).forEach(s => s.classList.remove('stack-active', 'stack-past'));
        }
      });
    }, { threshold: 0.45 });
    stacks.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return null;
}
