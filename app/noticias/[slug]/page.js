import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import { getNoticiaBySlug, getNoticias, formatDateTime } from '@/lib/mongodb';
import { buildOgImageUrl, buildPageMetadata } from '@/lib/og';

export async function generateStaticParams() {
  const noticias = await getNoticias();
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) return { title: 'Notícia não encontrada' };

  return {
    ...buildPageMetadata({
      title: noticia.title,
      description: noticia.summary,
      ogType: 'noticias',
      badge: 'Notícia',
      cta: 'Ler notícia →',
    }),
    openGraph: {
      ...buildPageMetadata({
        title: noticia.title,
        description: noticia.summary,
        ogType: 'noticias',
        badge: 'Notícia',
      }).openGraph,
      type: 'article',
      publishedTime: noticia.publishedAt,
    },
  };
}

export default async function NoticiaPage({ params }) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) notFound();

  return (
    <SiteLayout>
      <Link
        href="/noticias"
        className="mb-6 inline-flex text-sm text-palmeiras-muted hover:text-white transition-colors"
      >
        ← Voltar para Notícias
      </Link>

      <article>
        <p className="text-xs font-medium uppercase tracking-wide text-palmeiras-muted">
          {noticia.sourceName || 'Crawler IA'}
        </p>
        <time className="mt-2 block text-sm text-palmeiras-muted" dateTime={noticia.publishedAt}>
          {formatDateTime(noticia.publishedAt)}
        </time>
        <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
          {noticia.title}
        </h1>
        <p className="mt-4 text-lg text-palmeiras-muted">{noticia.summary}</p>

        <div className="mt-8 rounded-xl border border-dashed border-palmeiras-light/50 bg-palmeiras-darker/40 p-6 text-sm text-palmeiras-muted">
          <p>
            Corpo completo da notícia virá do crawler. Este é um esqueleto da página de
            detalhe.
          </p>
          {noticia.sourceUrl && (
            <a
              href={noticia.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-white underline hover:text-palmeiras-muted"
            >
              Ver fonte original
            </a>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
