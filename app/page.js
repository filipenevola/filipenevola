import { SiteLayout } from '@/components/SiteLayout';
import { PageHeader } from '@/components/PageHeader';
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
      <PageHeader
        title="Início"
        description="Timeline unificada com notícias do crawler, opiniões próprias e jogos do Verdão."
      />

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
