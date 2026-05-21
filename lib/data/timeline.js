import { getJogos, getNoticias, getOpinioes } from '@/lib/mongodb';

function toTimelineEntry(type, item) {
  const base = {
    id: `${type}-${item._id}`,
    type,
    slug: item.slug,
    title: item.title || `${item.isHome ? 'Palmeiras' : item.opponent} x ${item.isHome ? item.opponent : 'Palmeiras'}`,
    summary:
      item.summary ||
      [item.competition, item.venue, item.result].filter(Boolean).join(' · '),
    publishedAt: item.publishedAt || item.kickoffAt,
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
  }

  if (type === 'opiniao' && item.mediaType === 'video') {
    base.mediaType = 'video';
  }

  return base;
}

export async function getTimeline({ limit = 20 } = {}) {
  const [noticias, opinioes, jogos] = await Promise.all([
    getNoticias({ limit: 10 }),
    getOpinioes({ limit: 10 }),
    getJogos(),
  ]);

  const entries = [
    ...noticias.map((n) => toTimelineEntry('noticia', n)),
    ...opinioes.map((o) => toTimelineEntry('opiniao', o)),
    ...jogos.map((j) => toTimelineEntry('jogo', j)),
  ];

  entries.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return entries.slice(0, limit);
}
