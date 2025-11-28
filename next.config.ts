import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  reloadOnOnline: true,
  register: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // ...
  },
};

export default withSerwist(nextConfig);
