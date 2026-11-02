import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NewsletterAutoOpen } from '../components/NewsletterAutoOpen';
import './globals.css';

// Latin-subset WOFF2 of K2D-Regular.ttf (SIL OFL, see assets/fonts/OFL.txt),
// matching the former next/font/google K2D 400 latin download. The full TTFs
// stay for the OG image route. Regenerate with fonttools:
//   pyftsubset assets/fonts/K2D-Regular.ttf --flavor=woff2 --layout-features='*' \
//     --unicodes='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD' \
//     --output-file=assets/fonts/K2D-Regular-latin.woff2
const font = localFont({
  src: '../assets/fonts/K2D-Regular-latin.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
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
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
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
