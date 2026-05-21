export const SITE_NAME = 'Palmeiras App';

/** Headline principal — diferencial editorial do site */
export const SITE_HEADLINE = 'Torça feliz. Pé no chão, sem drama.';

export const SITE_TAGLINE =
  'Site de torcedor do Palmeiras: equilibrado, otimista e realista — sem chiliquismo nem sensacionalismo.';

export const NAV_ITEMS = [
  { href: '/', label: 'Início', key: 'inicio' },
  { href: '/noticias', label: 'Notícias', key: 'noticias' },
  { href: '/opinioes', label: 'Opiniões', key: 'opinioes' },
  { href: '/jogos', label: 'Jogos', key: 'jogos' },
  { href: '/sobre', label: 'Sobre', key: 'sobre' },
];

export const CONTENT_TYPES = {
  noticia: { label: 'Notícia', badge: 'Notícias', color: 'noticias' },
  opiniao: { label: 'Opinião', badge: 'Opiniões', color: 'opinioes' },
  jogo: { label: 'Jogo', badge: 'Jogos', color: 'jogos' },
};

export const PAGE_META = {
  inicio: {
    title: 'Início',
    description:
      'Timeline do Palmeiras com notícias, opiniões e jogos — torcida equilibrada, sem sensacionalismo.',
    ogType: 'inicio',
    badge: 'Início',
  },
  noticias: {
    title: 'Notícias',
    description:
      'Notícias sobre o Palmeiras reunidas com critério — sem alarmismo nem clickbait.',
    ogType: 'noticias',
    badge: 'Notícias',
  },
  opinioes: {
    title: 'Opiniões',
    description: 'Textos e vídeos próprios: análise ponderada, não gritaria de torcida.',
    ogType: 'opinioes',
    badge: 'Opiniões',
  },
  jogos: {
    title: 'Jogos',
    description:
      'Agenda de jogos do Palmeiras — próximos confrontos, resultados e calendário Google.',
    ogType: 'jogos',
    badge: 'Jogos',
  },
  sobre: {
    title: 'Sobre',
    description:
      'Por que este site existe: torcedor palmeirense que quer informação, alegria e realismo — longe do sofrimento e dos dramas.',
    ogType: 'sobre',
    badge: 'Nossa proposta',
    cta: 'Conhecer a proposta →',
  },
};

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://palmeirasapp-production-filipenevola.svc-us5.zcloud.ws'
  );
}
