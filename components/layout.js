'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NewsletterCTA } from './NewsletterSubscribe';

const LayoutComponent = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith('/blog');

  return (
    <div className="h-full my-16 mx-6 md:mx-12">
      <header>
        <div className="flex justify-center">
          <h1 className="text-xl font-semibold mb-2 text-white">
            {isHome && <Link href="/" className="hover:text-neutral-400 transition-colors">Filipe Névola</Link>}
            {isBlog && <Link href="/" className="hover:text-neutral-400 transition-colors">Filipe Névola</Link>}
          </h1>
        </div>
      </header>
      <div className="flex justify-center">{children}</div>
      <footer>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-neutral-300">
          <Link href="/blog" className="underline hover:text-neutral-400 transition-colors">
            Blog
          </Link>
          <a href="https://foroneperson.com" className="underline hover:text-neutral-400 transition-colors">
            Book
          </a>
          <NewsletterCTA />
          <a href="https://twitter.com/FilipeNevola" className="underline hover:text-neutral-400 transition-colors">
            Twitter
          </a>
          <a href="https://instagram.com/FilipeNevola" className="underline hover:text-neutral-400 transition-colors">
            Instagram
          </a>
          <a href="https://linkedin.com/in/FilipeNevola" className="underline hover:text-neutral-400 transition-colors">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export const Layout = LayoutComponent;
