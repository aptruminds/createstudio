import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  async headers() {
    return [
      {
        // Long-lived browser cache for static assets in /public.
        // "immutable" stops the browser re-validating them on reload, so
        // repeat visits skip the network entirely. If you ever replace an
        // asset, give it a new filename or visitors keep the old one.
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|mp4|webm|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
