import { K2D } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_TAGLINE, getSiteUrl } from '@/lib/site';
import { buildOgImageUrl } from '@/lib/og';

const font = K2D({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_NAME,
    images: [
      {
        url: buildOgImageUrl({
          title: SITE_NAME,
          subtitle: SITE_TAGLINE,
          type: 'inicio',
          badge: 'Início',
        }),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      buildOgImageUrl({
        title: SITE_NAME,
        subtitle: SITE_TAGLINE,
        type: 'inicio',
        badge: 'Início',
      }),
    ],
  },
  icons: {
    icon: '/static/palmeiras-escudo.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${font.className} bg-palmeiras text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
