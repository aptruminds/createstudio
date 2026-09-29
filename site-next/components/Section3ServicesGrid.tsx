'use client';

import { DynamicFrameLayout } from '@/components/ui/dynamic-frame-layout';

// The 9 services from Section 3, laid out as a 3×3 interactive video grid.
// Poster jpgs (frames pulled from the videos) keep idle tiles visual on
// touch devices, where the video src stays detached until a tap.
const SERVICE_NAMES: { label: string; slug: string }[] = [
  { label: 'Branding',                     slug: 'branding' },
  { label: 'Creative Strategy And Growth', slug: 'creative-strategy-and-growth' },
  { label: 'Digital Marketing',            slug: 'digital-marketing' },
  { label: 'App Development',              slug: 'app-development' },
  { label: 'Website Development',          slug: 'website-development' },
  { label: 'Social Media Management',      slug: 'social-media-management' },
  { label: 'Design Consultation',          slug: 'design-consultation' },
  { label: 'AI Video Production',          slug: 'ai-video-production' },
  { label: 'Influencer Marketing',         slug: 'influencer-marketing' },
];

const FRAMES = SERVICE_NAMES.map((s, i) => ({
  id: i + 1,
  video: `/services/videos/${s.slug}.mp4`,
  poster: `/services/posters/${s.slug}.jpg`,
  label: s.label,
  defaultPos: { x: (i % 3) * 4, y: Math.floor(i / 3) * 4, w: 4, h: 4 },
  mediaSize: 1,
  isHovered: false,
}));

export default function Section3ServicesGrid() {
  return (
    <section
      id="section-services-grid"
      style={{ background: '#0a0a0a', padding: '72px 40px 40px' }}
    >
      <DynamicFrameLayout
        frames={FRAMES}
        className="w-full h-full"
        hoverSize={6}
        gapSize={8}
      />
    </section>
  );
}
