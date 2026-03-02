import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinkedInPosts - AI LinkedIn Content Generator',
  description: 'Generate viral LinkedIn posts in seconds. 3 hook styles, optimized for engagement. Free to start.',
  keywords: ['linkedin posts', 'AI content', 'linkedin generator', 'social media', 'content creator'],
  openGraph: {
    title: 'LinkedInPosts - AI LinkedIn Content Generator',
    description: 'Generate viral LinkedIn posts in seconds. Free to start.',
    url: 'https://linkedin.revolutionai.io',
    siteName: 'LinkedInPosts',
    type: 'website',
    images: [{ url: 'https://linkedin.revolutionai.io/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedInPosts - AI LinkedIn Content Generator',
    description: 'Generate viral LinkedIn posts in seconds. Free to start.',
    images: ['https://linkedin.revolutionai.io/og'],
    creator: '@MyBossisAI',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body>{children}</body>
    </html>
  );
}
