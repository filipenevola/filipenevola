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
        description="Conteúdo agregado automaticamente por crawler com IA. Fontes externas serão creditadas em cada matéria."
      />

      {noticias.length === 0 ? (
        <EmptyState message="O crawler ainda não publicou notícias. Configure a integração em breve." />
      ) : (
        <ul className="flex flex-col gap-4">
          {noticias.map((noticia) => (
            <li key={noticia._id}>
              <ContentCard
                href={`/noticias/${noticia.slug}`}
                title={noticia.title}
                summary={noticia.summary}
                publishedAt={noticia.publishedAt}
                badge={noticia.sourceName || 'Crawler IA'}
              />
            </li>
          ))}
        </ul>
      )}
    </SiteLayout>
  );
}
