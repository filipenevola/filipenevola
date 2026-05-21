import Link from 'next/link';
import { MainNav } from './MainNav';

export function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {children}
      </div>
      <footer className="border-t border-palmeiras-light/30 py-8 text-center text-sm text-palmeiras-muted">
        <p>
          Palmeiras App — conteúdo não oficial do clube.{' '}
          <Link href="/sobre" className="text-white underline hover:text-palmeiras-muted">
            Nossa proposta
          </Link>
        </p>
      </footer>
    </div>
  );
}
