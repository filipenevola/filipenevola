import { getCollection } from '@/lib/db';
import { COLLECTION_POSTS } from '@/lib/posts/constants';
import { listPosts, getPostBySlug } from '@/lib/posts/repository';

const COLLECTION_JOGOS = 'jogos';

const PUBLISHED_FILTER = { isDraft: { $ne: true } };

async function findJogos({ filter = {}, sort = {}, limit } = {}) {
  const collection = await getCollection(COLLECTION_JOGOS);
  if (!collection) return [];

  try {
    let cursor = collection.find(filter);
    if (sort && Object.keys(sort).length) cursor = cursor.sort(sort);
    if (limit) cursor = cursor.limit(limit);
    return cursor.toArray();
  } catch (error) {
    console.error('Erro ao buscar jogos no MongoDB', error);
    return [];
  }
}

export async function getNoticias({ limit } = {}) {
  return listPosts({ type: 'noticia', limit: limit ?? 100 });
}

export async function getNoticiaBySlug(slug) {
  return getPostBySlug(slug, 'noticia');
}

export async function getOpinioes({ limit } = {}) {
  return listPosts({ type: 'opiniao', limit: limit ?? 100 });
}

export async function getOpiniaoBySlug(slug) {
  return getPostBySlug(slug, 'opiniao');
}

export async function getPostsForTimeline({ limit = 20 } = {}) {
  const collection = await getCollection(COLLECTION_POSTS);
  if (!collection) return [];

  return collection
    .find(PUBLISHED_FILTER)
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getJogos() {
  return findJogos({
    filter: {},
    sort: { kickoffAt: -1 },
  });
}

export function splitJogos(jogos) {
  const now = Date.now();
  const upcoming = [];
  const past = [];

  for (const jogo of jogos) {
    const kickoff = new Date(jogo.kickoffAt).getTime();
    if (jogo.status === 'upcoming' || kickoff >= now) {
      upcoming.push(jogo);
    } else {
      past.push(jogo);
    }
  }

  upcoming.sort((a, b) => new Date(a.kickoffAt) - new Date(b.kickoffAt));
  past.sort((a, b) => new Date(b.kickoffAt) - new Date(a.kickoffAt));

  return { upcoming, past };
}

export function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function formatGameDate(dateString) {
  return new Date(dateString).toLocaleString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}
