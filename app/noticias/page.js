import { SiteLayout } from '@/components/SiteLayout';
import { PageHeader } from '@/components/PageHeader';
import { ContentCard } from '@/components/ContentCard';
import { EmptyState } from '@/components/EmptyState';
import { getNoticias } from '@/lib/mongodb';
import { PAGE_META } from '@/lib/site';
import { buildPageMetadata } from '@/lib/og';

export const metadata = buildPageMetadata(PAGE_META.noticias);

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <SiteLayout>
      <PageHeader
        title="Notícias"
        description="O que está sendo dito sobre o Palmeiras, reunido com critério editorial. Cada matéria indica a fonte original."
      />

      {noticias.length === 0 ? (
        <EmptyState message="Nenhuma notícia publicada no momento. Volte em breve." />
      ) : (
        <ul className="flex flex-col gap-4">
          {noticias.map((noticia) => (
            <li key={noticia._id}>
              <ContentCard
                href={`/noticias/${noticia.slug}`}
                title={noticia.title}
                summary={noticia.summary}
                publishedAt={noticia.publishedAt}
                badge={noticia.sourceName || 'Fonte externa'}
              />
            </li>
          ))}
        </ul>
      )}
    </SiteLayout>
  );
}
