import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import MobileSnapAssist from '@/components/MobileSnapAssist';
import './globals.css';

const SITE_URL = 'https://www.thecreate.studio';
const TITLE = 'Create Studio — Human-Centric Experience Studio';
const DESCRIPTION =
  'Create Studio is a human-centric experience studio crafting brand, creative, and motion work — creatives, motion graphics, and reels for growing businesses.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Create Studio',
  },
  description: DESCRIPTION,
  applicationName: 'Create Studio',
  keywords: [
    'Create Studio',
    'experience studio',
    'creative studio',
    'branding',
    'motion graphics',
    'reels',
    'design studio',
    'human-centric design',
  ],
  authors: [{ name: 'Create Studio' }],
  creator: 'Create Studio',
  publisher: 'Create Studio',
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon_96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Create Studio',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Create Studio — Human-Centric Experience Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-cover.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#141414',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="snap-container">
          {children}
          <MobileSnapAssist />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? 'G-GX3JCYCE76'} />
    </html>
  );
}
