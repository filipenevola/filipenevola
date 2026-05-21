import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/SiteLayout';
import { getOpiniaoBySlug, getOpinioes, formatDateTime } from '@/lib/mongodb';
import { buildPageMetadata } from '@/lib/og';

export async function generateStaticParams() {
  const opinioes = await getOpinioes();
  return opinioes.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const opiniao = await getOpiniaoBySlug(slug);
  if (!opiniao) return { title: 'Opinião não encontrada' };

  return buildPageMetadata({
    title: opiniao.title,
    description: opiniao.summary,
    ogType: 'opinioes',
    badge: opiniao.mediaType === 'video' ? 'Vídeo' : 'Opinião',
    cta: 'Ler opinião →',
  });
}

export default async function OpiniaoPage({ params }) {
  const { slug } = await params;
  const opiniao = await getOpiniaoBySlug(slug);

  if (!opiniao) notFound();

  return (
    <SiteLayout>
      <Link
        href="/opinioes"
        className="mb-6 inline-flex text-sm text-palmeiras-muted hover:text-white transition-colors"
      >
        ← Voltar para Opiniões
      </Link>

      <article>
        <p className="text-xs font-medium uppercase tracking-wide text-palmeiras-muted">
          {opiniao.mediaType === 'video' ? 'Vídeo' : 'Texto'}
        </p>
        <time className="mt-2 block text-sm text-palmeiras-muted" dateTime={opiniao.publishedAt}>
          {formatDateTime(opiniao.publishedAt)}
        </time>
        <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
          {opiniao.title}
        </h1>
        <p className="mt-4 text-lg text-palmeiras-muted">{opiniao.summary}</p>

        {opiniao.mediaType === 'video' && opiniao.videoUrl ? (
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-palmeiras-light/40 bg-palmeiras-darker">
            <iframe
              title={opiniao.title}
              src={opiniao.videoUrl.replace('watch?v=', 'embed/')}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="blog-content mt-8">
            {opiniao.content ? (
              <div dangerouslySetInnerHTML={{ __html: opiniao.content }} />
            ) : (
              <p className="text-palmeiras-muted">
                Conteúdo completo do texto será exibido aqui.
              </p>
            )}
          </div>
        )}
      </article>
    </SiteLayout>
  );
}
