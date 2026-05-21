/**
 * Popula a coleção `posts` (notícias e opiniões) e `jogos`.
 * Uso: MONGODB_URI=... node scripts/seed-posts.js
 */

import { MongoClient } from 'mongodb';

const DB_NAME = 'verdaoracional';

const SEED_POSTS = [
  {
    type: 'noticia',
    slug: 'palmeiras-confirma-amistoso',
    title: 'Palmeiras confirma amistoso de pré-temporada',
    summary:
      'Clube anuncia jogo preparatório para testar elenco antes do estadual.',
    sourceName: 'Palmeiras Online',
    sourceUrl: '',
    content: '',
    publishedAt: '2026-05-20T14:00:00.000Z',
    status: "published",
  },
  {
    type: 'noticia',
    slug: 'reforco-meio-campo',
    title: 'Diretoria monitora reforço no meio-campo',
    summary: 'Empresários apresentam atleta com passagem pela Europa.',
    sourceName: 'Palmeiras Online',
    sourceUrl: '',
    content: '',
    publishedAt: '2026-05-19T10:30:00.000Z',
    status: "published",
  },
  {
    type: 'opiniao',
    slug: 'por-que-o-4-3-3-funciona',
    title: 'Por que o 4-3-3 encaixa neste elenco',
    summary: 'Análise tática sobre posicionamento e transições do time titular.',
    mediaType: 'text',
    content: '',
    publishedAt: '2026-05-20T09:00:00.000Z',
    status: "published",
  },
  {
    type: 'opiniao',
    slug: 'video-resumo-semana',
    title: 'Vídeo: a semana do Verdão em 5 minutos',
    summary: 'Resumo em vídeo dos melhores momentos dos treinos e coletivas.',
    mediaType: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: '',
    publishedAt: '2026-05-18T20:00:00.000Z',
    status: "published",
  },
];

const SEED_JOGOS = [
  {
    slug: 'palmeiras-x-santos-2026-05-25',
    opponent: 'Santos',
    competition: 'Campeonato Paulista',
    venue: 'Allianz Parque',
    isHome: true,
    kickoffAt: '2026-05-25T21:30:00.000Z',
    status: 'upcoming',
  },
  {
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
    slug: 'palmeiras-x-flamengo-2026-06-01',
    opponent: 'Flamengo',
    competition: 'Brasileirão',
    venue: 'Allianz Parque',
    isHome: true,
    kickoffAt: '2026-06-01T19:00:00.000Z',
    status: 'upcoming',
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Defina MONGODB_URI antes de rodar o seed.');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(DB_NAME);
  const posts = db.collection('posts');
  const jogos = db.collection('jogos');

  await posts.createIndex({ type: 1, slug: 1 }, { unique: true });
  await jogos.createIndex({ slug: 1 }, { unique: true });

  const now = new Date().toISOString();

  for (const post of SEED_POSTS) {
    const doc = {
      ...post,
      createdAt: now,
      updatedAt: now,
    };
    await posts.updateOne(
      { type: post.type, slug: post.slug },
      { $set: doc },
      { upsert: true }
    );
    console.log(`post [${post.type}] ${post.slug}`);
  }

  for (const jogo of SEED_JOGOS) {
    await jogos.updateOne({ slug: jogo.slug }, { $set: jogo }, { upsert: true });
    console.log(`jogo ${jogo.slug}`);
  }

  await client.close();
  console.log('Seed concluído.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
