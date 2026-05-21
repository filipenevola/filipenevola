/** Dados de exemplo até o MongoDB e integrações estarem ativos. */

export const MOCK_NOTICIAS = [
  {
    _id: 'mock-noticia-1',
    slug: 'palmeiras-confirma-amistoso',
    title: 'Palmeiras confirma amistoso de pré-temporada',
    summary:
      'Clube anuncia jogo preparatório para testar elenco antes do estadual.',
    sourceName: 'Palmeiras Online',
    publishedAt: '2026-05-20T14:00:00.000Z',
  },
  {
    _id: 'mock-noticia-2',
    slug: 'reforco-meio-campo',
    title: 'Diretoria monitora reforço no meio-campo',
    summary: 'Empresários apresentam atleta com passagem pela Europa.',
    sourceName: 'Palmeiras Online',
    publishedAt: '2026-05-19T10:30:00.000Z',
  },
];

export const MOCK_OPINIOES = [
  {
    _id: 'mock-opiniao-1',
    slug: 'por-que-o-4-3-3-funciona',
    title: 'Por que o 4-3-3 encaixa neste elenco',
    summary: 'Análise tática sobre posicionamento e transições do time titular.',
    mediaType: 'text',
    publishedAt: '2026-05-20T09:00:00.000Z',
  },
  {
    _id: 'mock-opiniao-2',
    slug: 'video-resumo-semana',
    title: 'Vídeo: a semana do Verdão em 5 minutos',
    summary: 'Resumo em vídeo dos melhores momentos dos treinos e coletivas.',
    mediaType: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    publishedAt: '2026-05-18T20:00:00.000Z',
  },
];

export const MOCK_JOGOS = [
  {
    _id: 'mock-jogo-1',
    slug: 'palmeiras-x-santos-2026-05-25',
    opponent: 'Santos',
    competition: 'Campeonato Paulista',
    venue: 'Allianz Parque',
    isHome: true,
    kickoffAt: '2026-05-25T21:30:00.000Z',
    status: 'upcoming',
  },
  {
    _id: 'mock-jogo-2',
    slug: 'corinthians-x-palmeiras-2026-05-18',
    opponent: 'Corinthians',
    competition: 'Campeonato Paulista',
    venue: 'Neo Química Arena',
    isHome: false,
    kickoffAt: '2026-05-18T16:00:00.000Z',
    status: 'finished',
    result: '1 x 2',
  },
  {
    _id: 'mock-jogo-3',
    slug: 'palmeiras-x-flamengo-2026-06-01',
    opponent: 'Flamengo',
    competition: 'Brasileirão',
    venue: 'Allianz Parque',
    isHome: true,
    kickoffAt: '2026-06-01T19:00:00.000Z',
    status: 'upcoming',
  },
];
