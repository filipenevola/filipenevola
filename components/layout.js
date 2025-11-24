'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { initGA, logPageView } from '../utils/analytics';

const LayoutComponent = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <div className="h-full my-16 mx-6 md:mx-12">
      <header>
        <div className="flex justify-center">
          <h1 className="text-xl font-semibold mb-2">
            {pathname === '/' && <Link href="/">Filipe Névola</Link>}
          </h1>
        </div>
      </header>
      <div className="flex justify-center">{children}</div>
      <footer>
        <div className="justify-center flex gap-x-4 mt-16">
          <a href="https://twitter.com/FilipeNevola" className="underline">
            Twitter
          </a>
          <a href="https://instagram.com/FilipeNevola" className="underline">
            Instagram
          </a>
          <a href="https://linkedin.com/in/FilipeNevola" className="underline">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export const Layout = LayoutComponent;
