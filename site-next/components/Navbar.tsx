'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import AIGradientBorder from '@/components/ui/AIGradientBorder';
import Image from 'next/image';
import scrollToId from '@/lib/scrollToId';

// Sections where the background is dark — nav gets white text + dark glass
const DARK_SECTIONS = new Set([
  'section-1', 'section-2', 'section-services-grid', 'section-4',
  'section-3', 'section-8', 'section-7', 'section-contact-form', 'section-footer',
]);

const MENU_LINKS = [
  ['section-2',             'Gallery'],
  ['section-about',         'About'],
  ['section-services-grid', 'Services'],
  ['section-4',             'Showreel'],
  ['section-3',             'Work'],
  ['section-7',             'Subscription'],
] as const;

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  // Lock the page scroll while the fullscreen menu is up
  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.snap-container');
    if (!container) return;
    container.style.overflowY = menuOpen ? 'hidden' : '';
    return () => { container.style.overflowY = ''; };
  }, [menuOpen]);

  // Close the menu, then hand off to the smooth-scroll handler
  const go = (id: string) => (e: MouseEvent) => {
    setMenuOpen(false);
    scrollToId(id)(e);
  };

  useEffect(() => {
    const nav = navRef.current;
    const container = document.querySelector<HTMLElement>('.snap-container');
    if (!nav || !container) return;

    // Collect all section anchors (both <section> and <div> with section IDs).
    // Detection works on viewport rects, not offsetTop: the section whose top
    // has passed the nav is the one the nav is actually sitting over.
    const NAV_H = 56;
    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[id^="section-"]'))
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    const update = () => {
      const sections = getSections();
      let active: HTMLElement | null = sections[0] ?? null;

      for (const s of sections) {
        if (s.getBoundingClientRect().top <= NAV_H) active = s;
        else break;
      }
      const activeId = active?.id ?? 'section-1';

      let dark = DARK_SECTIONS.has(activeId);

      // The About section starts white but its scroll animation ends on a
      // full-screen image fading into a dark gradient — flip the nav to dark
      // once the copy has faded out (~40% through the section).
      if (active && activeId === 'section-about') {
        const rect = active.getBoundingClientRect();
        const progress = -rect.top / (rect.height - window.innerHeight);
        dark = progress > 0.4;
      }

      nav.classList.toggle('nav--dark', dark);
    };

    update();
    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      {/* Start dark since section-1 loads first — prevents any flash */}
      <nav ref={navRef} className={`nav nav--dark${menuOpen ? ' nav--menu-open' : ''}`}>
        <a href="#section-1" className="nav-logo" onClick={go('section-1')}>
          <Image
            src="/logo.svg"
            alt="Create Studio"
            width={80} height={20}
            style={{ height: 20, width: 'auto' }}
            priority
          />
        </a>

        <div className="nav-links" onMouseLeave={() => setHoveredLink(null)}>
          {MENU_LINKS.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollToId(id)}
              onMouseEnter={() => setHoveredLink(i)}
              data-dimmed={hoveredLink !== null && hoveredLink !== i ? 'true' : undefined}
              data-hovered={hoveredLink === i ? 'true' : undefined}
            >
              {hoveredLink === i && <span className="nav-link-bar" aria-hidden="true" />}
              {label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <AIGradientBorder className="nav-contact-wrap">
            <button className="nav-contact" onClick={go('section-contact-form')}>
              Contact Us
            </button>
          </AIGradientBorder>

          <button
            className="nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-menu${menuOpen ? ' nav-menu--open' : ''}`}>
        {MENU_LINKS.map(([id, label], i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={go(id)}
            style={{ transitionDelay: menuOpen ? `${80 + i * 40}ms` : '0ms' }}
          >
            {label}
          </a>
        ))}
        <AIGradientBorder className="nav-menu-contact-wrap">
          <a
            href="#section-contact-form"
            className="nav-menu-contact"
            onClick={go('section-contact-form')}
            style={{ transitionDelay: menuOpen ? `${80 + MENU_LINKS.length * 40}ms` : '0ms' }}
          >
            Contact Us
          </a>
        </AIGradientBorder>
      </div>
    </>
  );
}
