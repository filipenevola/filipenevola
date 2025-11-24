import { K2D } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const font = K2D({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Filipe Névola',
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
      <body className={font.className}>
        <main>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}

