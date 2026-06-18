import { K2D } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NewsletterAutoOpen } from '../components/NewsletterAutoOpen';
import './globals.css';

const font = K2D({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'Filipe Névola - CEO & Developer at Quave',
    template: '%s | Filipe Névola',
  },
  description:
    'CEO & Developer at Quave. Building Quave ONE (Cloud Platform), Quave Services (Dev Boutique), and Erva Token (Premium Yerba Mate). Instructor and entrepreneur focused on execution and sustainable growth.',
  metadataBase: new URL('https://filipenevola.com'),
  openGraph: {
    type: 'website',
    siteName: 'Filipe Névola',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Filipe Névola - CEO & Developer at Quave',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@FilipeNevola',
    images: ['/api/og'],
  },
  icons: {
    icon: '/static/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-black text-neutral-100`}>
        <main>
          {children}
        </main>
        <NewsletterAutoOpen />
      </body>
      <GoogleAnalytics gaId="G-8BJDVVE5YK" />
    </html>
  );
}
