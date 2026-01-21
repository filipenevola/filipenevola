'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LayoutComponent = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith('/blog');

  return (
    <div className="h-full my-16 mx-6 md:mx-12">
      <header>
        <div className="flex justify-center">
          <h1 className="text-xl font-semibold mb-2">
            {isHome && <Link href="/">Filipe Névola</Link>}
            {isBlog && <Link href="/">Filipe Névola</Link>}
          </h1>
        </div>
      </header>
      <div className="flex justify-center">{children}</div>
      <footer>
        <div className="justify-center flex gap-x-4 mt-16">
          <Link href="/blog" className="underline">
            Blog
          </Link>
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
