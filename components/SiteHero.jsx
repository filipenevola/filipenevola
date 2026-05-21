import Link from 'next/link';
import { SITE_HEADLINE, SITE_MISSION, SITE_TAGLINE } from '@/lib/site';

export function SiteHero({ showAboutLink = true }) {
  return (
    <section className="mb-10 rounded-2xl border border-palmeiras-light/40 bg-palmeiras-dark/50 px-6 py-8 md:px-10 md:py-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-palmeiras-muted">
        Torcer com equilíbrio
      </p>
      <h1 className="mt-3 text-2xl font-bold leading-tight text-white md:text-4xl">
        {SITE_HEADLINE}
      </h1>
      <p className="mt-4 max-w-2xl text-lg font-medium leading-snug text-white md:text-xl">
        {SITE_MISSION}
      </p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-palmeiras-muted md:text-lg">
        {SITE_TAGLINE}
      </p>
      {showAboutLink && (
        <Link
          href="/sobre"
          className="mt-6 inline-flex text-sm font-medium text-white underline decoration-palmeiras-light underline-offset-4 hover:text-palmeiras-muted transition-colors"
        >
          Entenda nossa proposta editorial →
        </Link>
      )}
    </section>
  );
}
