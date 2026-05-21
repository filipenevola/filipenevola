import { SiteLayout } from '@/components/SiteLayout';
import { PageHeader } from '@/components/PageHeader';
import { ContentCard } from '@/components/ContentCard';
import { EmptyState } from '@/components/EmptyState';
import { getOpinioes } from '@/lib/mongodb';
import { PAGE_META } from '@/lib/site';
import { buildPageMetadata } from '@/lib/og';

export const metadata = buildPageMetadata(PAGE_META.opinioes);

export default async function OpinioesPage() {
  const opinioes = await getOpinioes();

  return (
    <SiteLayout>
      <PageHeader
        title="Opiniões"
        description="Textos e vídeos produzidos por nós — análises, editoriais e conteúdo em vídeo sobre o Palmeiras."
      />

      {opinioes.length === 0 ? (
        <EmptyState message="Nenhuma opinião publicada ainda." />
      ) : (
        <ul className="flex flex-col gap-4">
          {opinioes.map((opiniao) => (
            <li key={opiniao._id}>
              <ContentCard
                href={`/opinioes/${opiniao.slug}`}
                title={opiniao.title}
                summary={opiniao.summary}
                publishedAt={opiniao.publishedAt}
                badge={opiniao.mediaType === 'video' ? 'Vídeo' : 'Texto'}
              />
            </li>
          ))}
        </ul>
      )}
    </SiteLayout>
  );
}
