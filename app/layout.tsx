import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LinkedInPosts - AI LinkedIn Content Generator',
    template: '%s | LinkedInPosts'
  },
  description: 'Generate viral LinkedIn posts in seconds. 3 hook styles, optimized for engagement. Used by 1000+ professionals. Free to start.',
  keywords: ['linkedin posts', 'AI content', 'linkedin generator', 'social media', 'content creator', 'linkedin marketing', 'viral posts', 'professional content'],
  authors: [{ name: 'RevolutionAI', url: 'https://revolutionai.io' }],
  creator: 'RevolutionAI',
  publisher: 'RevolutionAI',
  metadataBase: new URL('https://linkedin.revolutionai.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LinkedInPosts - AI LinkedIn Content Generator',
    description: 'Generate viral LinkedIn posts in seconds. 3 hook styles, optimized for engagement. Free to start.',
    url: 'https://linkedin.revolutionai.io',
    siteName: 'LinkedInPosts',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'LinkedInPosts - Generate viral LinkedIn content' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedInPosts - AI LinkedIn Content Generator',
    description: 'Generate viral LinkedIn posts in seconds. Free to start.',
    images: ['/og'],
    creator: '@MyBossisAI',
    site: '@MyBossisAI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'pending', // Add Google Search Console verification
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
