import { SiteLayout } from '@/components/SiteLayout';
import { SiteHero } from '@/components/SiteHero';
import { TimelineItem } from '@/components/TimelineItem';
import { EmptyState } from '@/components/EmptyState';
import { getTimeline } from '@/lib/data/timeline';
import { PAGE_META } from '@/lib/site';
import { buildPageMetadata } from '@/lib/og';

export const metadata = buildPageMetadata({
  ...PAGE_META.inicio,
  path: '/',
});

export default async function HomePage() {
  const timeline = await getTimeline({ limit: 24 });

  return (
    <SiteLayout>
      <SiteHero />

      <h2 className="mb-6 text-lg font-semibold text-white">Últimas do Verdão</h2>

      {timeline.length === 0 ? (
        <EmptyState message="Nenhum conteúdo publicado ainda. Em breve novidades aqui." />
      ) : (
        <section aria-label="Timeline" className="mt-2">
          {timeline.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </section>
      )}
    </SiteLayout>
  );
}
