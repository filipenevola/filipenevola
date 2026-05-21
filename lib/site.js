export const SITE_NAME = 'Palmeiras App';
export const SITE_TAGLINE =
  'Notícias, opiniões e agenda de jogos do Palmeiras em um só lugar.';

export const NAV_ITEMS = [
  { href: '/', label: 'Início', key: 'inicio' },
  { href: '/noticias', label: 'Notícias', key: 'noticias' },
  { href: '/opinioes', label: 'Opiniões', key: 'opinioes' },
  { href: '/jogos', label: 'Jogos', key: 'jogos' },
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
      'Timeline com as últimas notícias, opiniões e jogos do Palmeiras.',
    ogType: 'inicio',
    badge: 'Início',
  },
  noticias: {
    title: 'Notícias',
    description:
      'Notícias sobre o Palmeiras reunidas por crawler com inteligência artificial.',
    ogType: 'noticias',
    badge: 'Notícias',
  },
  opinioes: {
    title: 'Opiniões',
    description: 'Textos e vídeos próprios sobre o Verdão.',
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
};

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://palmeirasapp-production-filipenevola.svc-us5.zcloud.ws'
  );
}
