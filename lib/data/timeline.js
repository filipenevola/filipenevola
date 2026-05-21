import { getPostsForTimeline, getJogos } from '@/lib/mongodb';

function toTimelineEntry(type, item) {
  const base = {
    id: `${type}-${item._id}`,
    type,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publishedAt: item.publishedAt,
    href:
      type === 'noticia'
        ? `/noticias/${item.slug}`
        : type === 'opiniao'
          ? `/opinioes/${item.slug}`
          : '/jogos',
  };

  if (type === 'jogo') {
    base.title =
      item.isHome !== false
        ? `Palmeiras x ${item.opponent}`
        : `${item.opponent} x Palmeiras`;
    base.summary = [item.competition, item.venue]
      .filter(Boolean)
      .join(' · ');
    base.status = item.status;
    base.publishedAt = item.kickoffAt;
  }

  if (type === 'opiniao' && item.mediaType === 'video') {
    base.mediaType = 'video';
  }

  return base;
}

export async function getTimeline({ limit = 20 } = {}) {
  const [posts, jogos] = await Promise.all([
    getPostsForTimeline({ limit: limit * 2 }),
    getJogos(),
  ]);

  const entries = [
    ...posts.map((p) => toTimelineEntry(p.type, p)),
    ...jogos.map((j) => toTimelineEntry('jogo', j)),
  ];

  entries.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return entries.slice(0, limit);
}
