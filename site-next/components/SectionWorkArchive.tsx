'use client';

// Our Work, rebuilt in the style of nudot.com.tw's "Archive of Selected Works":
// a sticky full-viewport title (over a constantly-moving ethereal background)
// that the project cards scroll over one by one, each wiping in via clip-path
// and drifting at its own parallax speed (GSAP ScrollTrigger). Cards keep the
// site's 3D tilt-on-hover with the project name beneath the image.
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeDCard } from '@/components/ui/three-d-card';
import EtherealShadow from '@/components/EtherealShadow';

import wsCreative from '@/public/work-showcase/ws-creative.webp';
import wsBranding from '@/public/work-showcase/ws-branding.webp';
import wsStrategy from '@/public/work-showcase/ws-strategy.webp';
import wsAppdesign from '@/public/work-showcase/ws-appdesign.webp';
import wsWebdev from '@/public/work-showcase/ws-webdev.webp';
import wsConsult from '@/public/work-showcase/ws-consult.webp';
import wsVideo from '@/public/work-showcase/ws-video.webp';
import wsInfluencer from '@/public/work-showcase/ws-influencer.webp';

import type { StaticImageData } from 'next/image';

// Cards keep each image's natural aspect ratio (from the static import
// metadata) so nothing gets cropped.
const PROJECTS: { img: StaticImageData; label: string }[] = [
  { img: wsCreative,   label: 'Creative Strategy and Growth' },
  { img: wsBranding,   label: 'Branding and Social Media Management' },
  { img: wsStrategy,   label: 'Strategy and Social Media Management' },
  { img: wsAppdesign,  label: 'App Design and App Development' },
  { img: wsWebdev,     label: 'Web Design and Web Development' },
  { img: wsConsult,    label: 'Design Consultation - UI/UX' },
  { img: wsVideo,      label: 'AI Video Production' },
  { img: wsInfluencer, label: 'Creative Strategy and Influencer Marketing' },
];

// Drift speeds per item (yPercent amplitude). The whole card drifts — not a
// zoomed-in copy of the image — so the image is never cropped by the parallax.
const SPEEDS = [4, 6, 3, 5, 4, 6];

export default function SectionWorkArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  // Touch devices have no hover — tapping the header reveals the subline.
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    // The site scrolls inside .snap-container, not the window.
    const scroller = document.querySelector('.snap-container') ?? undefined;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.wa-item');

      const mm = gsap.matchMedia();

      // Clip-wipe reveal is desktop-only: on phones the snap scrolling makes
      // the 90%-trigger fire late, so cards read as popping in from nothing —
      // there they're simply visible from the start.
      mm.add('(min-width: 769px)', () => {
        items.forEach((item, i) => {
          const img = item.querySelector<HTMLElement>('img');
          if (!img) return;

          gsap.set(item, { clipPath: 'inset(100% 0% 0% 0%)' });
          gsap.set(img, { scale: 1.15 });

          gsap.timeline({
            scrollTrigger: {
              scroller,
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            // Drop the clip once revealed so the 3D tilt hover (shadow,
            // translateZ pop) isn't cropped at the card's edges.
            onComplete: () => gsap.set(item, { clearProps: 'clipPath' }),
          })
            .to(item, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.out' }, 0)
            // Settle at scale 1 so the image shows fully, uncropped.
            .to(img, { scale: 1, duration: 1.0, ease: 'power3.out' }, 0);
        });
      });
      mm.add('(min-width: 1281px)', () => {
        items.forEach((item, i) => {
          const speed = SPEEDS[i % SPEEDS.length];
          gsap.fromTo(
            item,
            { yPercent: -speed },
            {
              yPercent: speed,
              ease: 'none',
              scrollTrigger: {
                scroller,
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          );
        });
      });

      // Title intro: lines rise in once the section arrives. Initial offset is
      // set here (not in CSS transform) so the yPercent tween fully clears it.
      gsap.set('.wa-title-line', { yPercent: 110, autoAlpha: 0 });
      gsap.timeline({
        scrollTrigger: {
          scroller,
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })
        .to('.wa-label', { autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, 0.2)
        .to('.wa-title-line', {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
        }, 0);

      // Title exit: scrubbed out as the tail of the gallery passes.
      const lastItem = items[items.length - 2] ?? items[items.length - 1];
      if (lastItem) {
        gsap.timeline({
          scrollTrigger: {
            scroller,
            trigger: lastItem,
            start: 'bottom 65%',
            end: 'bottom 5%',
            scrub: 1.2,
          },
        })
          .to('.wa-title-line', { yPercent: -70, autoAlpha: 0, stagger: 0.06, ease: 'none' }, 0)
          .to('.wa-label', { autoAlpha: 0, ease: 'none' }, 0);
      }

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section-work-archive" ref={sectionRef} className="wa-section">
      <div
        className={`wa-header${subOpen ? ' wa-sub-open' : ''}`}
        onClick={() => setSubOpen((o) => !o)}
      >
        {/* Constantly-moving ethereal background, like the footer's */}
        <EtherealShadow
          color="rgba(128, 128, 128, 0.65)"
          noiseOpacity={0.3}
          noiseScale={200}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        <span className="wa-label">( SELECTED WORKS )</span>
        <h2 className="wa-title">
          <span className="wa-title-mask"><span className="wa-title-line">Archive of</span></span>
          <span className="wa-title-mask"><span className="wa-title-line">the selected works</span></span>
          <span className="wa-title-mask"><span className="wa-title-line">by Create Studio</span></span>
        </h2>
        <p className="wa-sub">
          Not measured by how it looked in review — but by what it changed
          for the person on the other end.
        </p>
      </div>

      <div className="wa-gallery">
        {PROJECTS.map((p, i) => (
          <div
            key={p.label}
            className={`wa-item wa-item-${(i % 3) + 1}`}
            style={{ gridRow: i + 1 }}
          >
            <ThreeDCard
              image={p.img.src}
              alt={p.label}
              label={p.label}
              style={{
                // Natural aspect ratio, but never taller than 80% of the
                // viewport: cap the width at 80vh × ratio so tall portrait
                // images shrink instead of overflowing the section.
                width: `min(100%, calc(80vh * ${(p.img.width / p.img.height).toFixed(4)}))`,
                aspectRatio: `${p.img.width} / ${p.img.height}`,
              }}
              labelStyle={{
                marginTop: '16px',
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(14px, 1.05vw, 20px)',
                lineHeight: 1,
                color: '#fff',
              }}
            />
          </div>
        ))}
      </div>

      <div className="wa-veil wa-veil-top" aria-hidden="true" />
      <div className="wa-veil wa-veil-bottom" aria-hidden="true" />

      <style>{`
        .wa-section {
          position: relative;
          height: auto;
          min-height: 100vh;
          background: #0a0a0a;
          isolation: isolate;
        }

        .wa-veil {
          position: absolute;
          left: 0;
          width: 100%;
          height: clamp(96px, 18vh, 220px);
          pointer-events: none;
          z-index: 4;
        }
        .wa-veil-top {
          top: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.72) 38%, rgba(10,10,10,0) 100%);
        }
        .wa-veil-bottom {
          bottom: 0;
          background: linear-gradient(0deg, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.78) 36%, rgba(10,10,10,0) 100%);
        }

        .wa-header {
          position: sticky;
          top: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 0 4vw;
          background: #0a0a0a;
          overflow: hidden;
        }
        .wa-label, .wa-title, .wa-sub {
          position: relative;
          z-index: 2;
        }

        .wa-label {
          font-family: 'Syne', sans-serif;
          font-size: clamp(10px, 1vw, 13px);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          margin-bottom: 3vh;
          opacity: 0;
        }

        .wa-title {
          margin: 0 0 1.5rem;
          font-family: 'Anton', sans-serif;
          font-weight: 400;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.02;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #fff;
        }
        .wa-title-mask {
          display: block;
          overflow: hidden;
        }
        .wa-title-line {
          display: block;
          opacity: 0; /* pre-JS fallback; GSAP takes over on mount */
        }

        /* Hidden until the header area is hovered (GSAP leaves this one alone) */
        .wa-sub {
          font-family: 'Syne', sans-serif;
          font-size: clamp(12px, 1.05vw, 16px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
          max-width: 34rem;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .wa-header:hover .wa-sub {
          opacity: 1;
        }

        .wa-gallery {
          position: relative;
          z-index: 2;
          width: 100%;
          margin: 0 auto;
          padding: 0 4vw 22vh;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 2vw;
          row-gap: 12vw;
          /* Let hovers in the gaps reach the sticky header underneath,
             so the caption reveal works all the way down the section. */
          pointer-events: none;
        }

        .wa-item {
          position: relative;
          pointer-events: auto;
        }
        .wa-item-1 { grid-column: 1 / 6; }
        .wa-item-2 { grid-column: 7 / 13; }
        .wa-item-3 { grid-column: 4 / 10; }

        @media (max-width: 768px) {
          .wa-header { height: 100dvh; padding: 0 24px; }
          .wa-label { margin-bottom: 14px; }
          .wa-title { font-size: clamp(1.75rem, 8.5vw, 2.6rem); margin-bottom: 14px; }
          /* no hover on phones — a tap on the header reveals the subline */
          .wa-sub { font-size: 13px; max-width: 30rem; }
          .wa-header.wa-sub-open .wa-sub { opacity: 1; }
          .wa-gallery {
            row-gap: 16vw;
          }
          .wa-item-1, .wa-item-2, .wa-item-3 {
            grid-column: 1 / 13;
          }
        }
      `}</style>
    </section>
  );
}
