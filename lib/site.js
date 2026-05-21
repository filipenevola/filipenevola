export const SITE_NAME = 'Palmeiras App';

/** Headline principal — diferencial editorial do site */
export const SITE_HEADLINE = 'Torça feliz. Pé no chão, sem drama.';

export const SITE_TAGLINE =
  'Site de torcedor do Palmeiras: equilibrado, otimista e realista — sem chiliquismo nem sensacionalismo.';

/** Texto central da página Sobre — por que o site existe */
export const SITE_WHY_EXISTS = {
  title: 'Por que este site existe',
  paragraphs: [
    'Acompanhar o Palmeiras hoje costuma significar abrir o celular e mergulhar em ondas de pânico, bastidor “urgente”, clickbait e briga de torcida. Não precisa ser assim.',
    'Criamos o Palmeiras App para quem ama o Verdão e quer se informar, opinar e marcar os jogos sem virar refém de humor de internet ou de comentarista que só vende emoção.',
    'Aqui reunimos notícias selecionadas com critério, opiniões e vídeos no nosso tom, e uma agenda de jogos útil — sempre com pé no chão: otimista quando faz sentido, realista quando precisa, longe do sensacionalismo.',
    'Não somos o clube. Somos torcedores que preferem torcer para ser feliz, não para sofrer em todo rodada.',
  ],
};

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
      'Notícias sobre o Palmeiras selecionadas com critério — sem alarmismo nem sensacionalismo.',
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
      'Por que o Palmeiras App existe: torcida equilibrada, sem drama, chiliquismo ou sensacionalismo.',
    ogType: 'sobre',
    badge: 'Sobre',
    cta: 'Conhecer a proposta →',
  },
};

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://palmeirasapp-production-filipenevola.svc-us5.zcloud.ws'
  );
}
