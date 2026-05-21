import { MongoClient } from 'mongodb';
import {
  MOCK_JOGOS,
  MOCK_NOTICIAS,
  MOCK_OPINIOES,
} from '@/lib/data/mock';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'palmeirasapp';

const COLLECTIONS = {
  noticias: 'noticias',
  opinioes: 'opinioes',
  jogos: 'jogos',
  posts: 'posts',
};

let clientPromise;

function getClientPromise() {
  if (!MONGODB_URI) return null;
  if (!clientPromise) {
    clientPromise = new MongoClient(MONGODB_URI).connect();
  }
  return clientPromise;
}

async function findDocuments(collection, { filter = {}, sort = {}, limit } = {}) {
  const promise = getClientPromise();
  if (!promise) return null;

  try {
    const client = await promise;
    let cursor = client.db(DB_NAME).collection(collection).find(filter);
    if (sort && Object.keys(sort).length) cursor = cursor.sort(sort);
    if (limit) cursor = cursor.limit(limit);
    return cursor.toArray();
  } catch (error) {
    console.error(`Erro ao buscar ${collection} no MongoDB`, error);
    return null;
  }
}

export async function getNoticias({ limit } = {}) {
  const docs = await findDocuments(COLLECTIONS.noticias, {
    filter: { isDraft: { $ne: true } },
    sort: { publishedAt: -1 },
    limit,
  });
  return docs?.length ? docs : MOCK_NOTICIAS;
}

export async function getNoticiaBySlug(slug) {
  const docs = await findDocuments(COLLECTIONS.noticias, {
    filter: { slug, isDraft: { $ne: true } },
    limit: 1,
  });
  if (docs?.[0]) return docs[0];
  return MOCK_NOTICIAS.find((n) => n.slug === slug) || null;
}

export async function getOpinioes({ limit } = {}) {
  const docs = await findDocuments(COLLECTIONS.opinioes, {
    filter: { isDraft: { $ne: true } },
    sort: { publishedAt: -1 },
    limit,
  });
  return docs?.length ? docs : MOCK_OPINIOES;
}

export async function getOpiniaoBySlug(slug) {
  const docs = await findDocuments(COLLECTIONS.opinioes, {
    filter: { slug, isDraft: { $ne: true } },
    limit: 1,
  });
  if (docs?.[0]) return docs[0];
  return MOCK_OPINIOES.find((o) => o.slug === slug) || null;
}

export async function getJogos() {
  const docs = await findDocuments(COLLECTIONS.jogos, {
    filter: {},
    sort: { kickoffAt: -1 },
  });
  return docs?.length ? docs : MOCK_JOGOS;
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
