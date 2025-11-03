import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const APP_NAME = 'Widgets App';
const APP_DEFAULT_TITLE = 'Widgets App';
const APP_TITLE_TEMPLATE = '%s - Widgets App';
const APP_DESCRIPTION = 'Widgets app built with Next.js';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <footer>
          <p className="text-center">
            This app is purely for educational purposes. Data is stored on your
            browser&lsquo;s IndexedDB. See the{' '}
            <a
              className="text-blue-500 hover:underline"
              href="https://github.com/danielh-official/next-js-widgets"
              target="_blank"
            >
              GitHub repository
            </a>{' '}
            for more details.
          </p>
          <p className="text-center p-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Widgets App. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
