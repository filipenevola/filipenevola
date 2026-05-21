'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_ITEMS, SITE_NAME } from '@/lib/site';

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MainNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-palmeiras-light/40 bg-palmeiras-dark/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 md:h-18 md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-white hover:opacity-90 transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/static/palmeiras-escudo.svg"
            alt="Escudo do Palmeiras"
            width={40}
            height={40}
            className="h-9 w-9 md:h-10 md:w-10"
            priority
          />
          <span className="hidden font-semibold tracking-tight sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {NAV_ITEMS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-white text-palmeiras'
                    : 'text-palmeiras-muted hover:bg-palmeiras-light/30 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-palmeiras-light/30 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-palmeiras-light/30 bg-palmeiras-darker px-4 py-3 md:hidden"
          aria-label="Principal mobile"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      active
                        ? 'bg-white text-palmeiras'
                        : 'text-palmeiras-muted hover:bg-palmeiras-light/20 hover:text-white'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
