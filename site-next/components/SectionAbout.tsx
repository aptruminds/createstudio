'use client';
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

// About section — Figma node 909:348 content driven by the hover.dev
// smooth-scroll hero animation: the section is SECTION_HEIGHT taller than the
// viewport; the sticky collage image un-clips to full screen as you scroll,
// parallax work images drift past, then the services grid scrolls in over it.
const SECTION_HEIGHT = 2500;

// Static imports give the assets content-hashed URLs, so replacing a file
// busts the browser cache automatically.
import studioCollage from '@/public/about/studio-collage.jpg';
import work01 from '@/public/work/01.webp';
import work02 from '@/public/work/02.webp';
import work03 from '@/public/work/03.webp';
import work04 from '@/public/work/04.webp';
import work05 from '@/public/work/05.webp';

const CENTER_IMAGE = studioCollage.src;

const PARALLAX_IMAGES = [
  { src: work01.src, alt: 'Studio work 1', start: -200, end: 200, style: { width: '33%', marginBottom: '48px' } },
  { src: work03.src, alt: 'Studio work 2', start: 200, end: -250, style: { width: '66%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '48px' } },
  { src: work02.src, alt: 'Studio work 3', start: -200, end: 200, style: { width: '33%', marginLeft: 'auto', marginBottom: '48px' } },
  { src: work04.src, alt: 'Studio work 4', start: 0, end: -500, style: { width: '42%', marginLeft: '96px', marginBottom: '48px' } },
  { src: work05.src, alt: 'Studio work 5', start: 100, end: -300, style: { width: '50%', marginLeft: 'auto', marginRight: '48px' } },
] satisfies Array<{ src: string; alt: string; start: number; end: number; style: CSSProperties }>;

type ContainerRef = RefObject<HTMLElement | null>;

// Scrolling happens inside .snap-container, not the window, so every useScroll
// call needs it as the container.
function useSnapContainer(): ContainerRef {
  const ref = useRef<HTMLElement | null>(null);
  if (typeof document !== 'undefined' && !ref.current) {
    ref.current = document.querySelector<HTMLElement>('.snap-container');
  }
  return ref;
}

export default function SectionAbout() {
  const container = useSnapContainer();

  return (
    <section
      id="section-about"
      // overflow: clip (not hidden) — it clips the bleeding parallax images
      // without creating a scroll container, which would break position: sticky
      style={{ background: '#fff', height: `calc(${SECTION_HEIGHT}px + 100vh)`, overflow: 'clip' }}
    >
      <CenterStage container={container} />
      <ParallaxImages container={container} />
    </section>
  );
}

// Sticky viewport: clip-expanding collage image + the About copy from Figma.
function CenterStage({ container }: { container: ContainerRef }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress in px from the moment the section top hits the viewport top
  const { scrollYProgress } = useScroll({
    container,
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Spring-smooth the raw scroll so the animation glides instead of tracking
  // every wheel tick (stands in for the reference's Lenis smooth scrolling)
  const scrollPx = useSpring(
    useTransform(scrollYProgress, (v) => v * SECTION_HEIGHT),
    { mass: 0.2, stiffness: 90, damping: 24 },
  );

  const clip1 = useTransform(scrollPx, [0, SECTION_HEIGHT], [25, 0]);
  const clip2 = useTransform(scrollPx, [0, SECTION_HEIGHT], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  // Width-% sizing on the landscape collage leaves white bands above/below on
  // portrait phones (170% of a 390px screen is only ~440px tall) — cover keeps
  // the stage filled edge to edge there; the clip-path wipe still animates,
  // only the slow zoom is dropped. Decided in state after mount (not inline
  // from `window`) so the SSR markup and first client render match.
  const zoomSize = useTransform(scrollPx, [0, SECTION_HEIGHT + 500], ['170%', '100%']);
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsPhone(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const backgroundSize = isPhone ? 'cover' : zoomSize;

  // The About copy clears out early so the parallax images own the frame
  const copyOpacity = useTransform(scrollPx, [0, SECTION_HEIGHT * 0.4], [1, 0]);

  return (
    <div ref={sectionRef} style={{ position: 'absolute', inset: 0 }}>
      <div className="about-stage" style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
        <motion.div style={{
          position: 'absolute',
          inset: 0,
          clipPath,
          backgroundSize,
          backgroundImage: `url(${CENTER_IMAGE})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />

        <motion.h2 className="about-title" style={{
          position: 'absolute',
          top: 'clamp(72px, 9vh, 110px)',
          left: 'clamp(20px, 2.1vw, 40px)',
          maxWidth: '787px',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(24px, 2.1vw, 40px)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: '#000',
          opacity: copyOpacity,
        }}>
          This isn&rsquo;t just an ordinary studio.<br />
          It&rsquo;s where we blend Aesthetics<br />
          Beauty and Comfort.
        </motion.h2>

        <motion.p className="about-copy" style={{
          position: 'absolute',
          right: 'clamp(20px, 2.1vw, 40px)',
          bottom: 'clamp(40px, 7.5vh, 80px)',
          width: 'min(665px, 44vw)',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(16px, 1.46vw, 28px)',
          lineHeight: 1.7,
          letterSpacing: '-0.02em',
          color: '#000',
          opacity: copyOpacity,
        }}>
          <span style={{
            fontWeight: 700,
            background: 'var(--grad-2, linear-gradient(94deg, #44FF9A -139.72%, #44B0FF -81.52%, #8B44FF -18.16%, #F64 43.91%, #EBFF70 108.57%))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}>Create Studio</span>
          {' '}is built for teams who treat experience as a strategic asset.
          We design, build, and steward products and services that place people
          at the centre of every decision.
        </motion.p>
      </div>
    </div>
  );
}

// No dip-to-black here: any black overlay at the section end shows as a solid
// black screen when scrolling UP from the services grid (you enter the section
// at its fully-dipped bottom). The dark services grid scrolling in over the
// collage is transition enough.

function ParallaxImages({ container }: { container: ContainerRef }) {
  return (
    <div style={{
      position: 'absolute',
      top: '100vh',
      left: 0, right: 0,
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '200px 16px 0',
      zIndex: 5,
    }}>
      {PARALLAX_IMAGES.map((img) => (
        <ParallaxImg key={img.src} container={container} {...img} />
      ))}
    </div>
  );
}

function ParallaxImg({ container, src, alt, start, end, style }: {
  container: ContainerRef;
  src: string;
  alt: string;
  start: number;
  end: number;
  style: CSSProperties;
}) {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    container,
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: [`${start}px end`, `end ${end * -1}px`] as any,
  });
  const progress = useSpring(scrollYProgress, { mass: 0.2, stiffness: 90, damping: 24 });

  const opacity = useTransform(progress, [0.75, 1], [1, 0]);
  const scale = useTransform(progress, [0.75, 1], [1, 0.85]);
  const y = useTransform(progress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      // eager, not lazy: the page scrolls inside .snap-container (a nested
      // scroll element), so native lazy-load — which measures against the
      // document viewport that never scrolls — often never fires and the
      // images stay blank on fresh (uncached) sessions.
      loading="eager"
      style={{ ...style, display: 'block', transform, opacity }}
    />
  );
}
