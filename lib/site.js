export const SITE_NAME = 'verdaoracional';

export const SITE_URL = 'https://verdaoracional.com';

/** Headline principal — diferencial editorial do site */
export const SITE_HEADLINE = 'Torça feliz. Pé no chão, sem drama.';

/** Proposta central — experiência emocional saudável com o Verdão */
export const SITE_MISSION =
  'Uma forma mais saudável de viver o Palmeiras no emocional.';

export const SITE_TAGLINE =
  'Notícias, opiniões e jogos com equilíbrio: otimista quando faz sentido, realista quando precisa — longe do chiliquismo e do sensacionalismo.';

/** Texto central da página Sobre — por que o site existe */
export const SITE_WHY_EXISTS = {
  title: 'Por que este site existe',
  paragraphs: [
    'Torcer não precisa ser um roloerco diário. Queremos uma forma mais saudável de viver o Palmeiras no emocional: informado, engajado e sem aquele nó no estômago depois de cada notificação.',
    'Acompanhar o Verdão hoje costuma significar abrir o celular e mergulhar em ondas de pânico, bastidor “urgente”, clickbait e briga de torcida. Não precisa ser assim.',
    'Criamos o verdaoracional para quem ama o clube e quer se informar, opinar e marcar os jogos sem virar refém de humor de internet ou de comentarista que só vende emoção.',
    'Aqui reunimos notícias selecionadas com critério, opiniões e vídeos no nosso tom, e uma agenda de jogos útil — sempre com pé no chão.',
    'Não somos o Palmeiras. Somos torcedores que preferem torcer para ser feliz, não para sofrer em toda rodada.',
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
      'verdaoracional — uma forma mais saudável de viver o Palmeiras no emocional.',
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
      'verdaoracional — nossa proposta de torcida equilibrada e emocionalmente saudável.',
    ogType: 'sobre',
    badge: 'Sobre',
    cta: 'Conhecer a proposta →',
  },
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
}
