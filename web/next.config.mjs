const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline'
              https://www.google.com
              https://www.gstatic.com
              https://www.google.com/recaptcha/;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data:
              https://www.google.com
              https://www.gstatic.com;
            connect-src 'self'
              https://www.google.com
              https://www.gstatic.com;
            frame-src https://www.google.com https://www.gstatic.com;
            font-src 'self' data:;
          `.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
}

export default nextConfig
