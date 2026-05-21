import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'palmeirasapp';
const POSTS_COLLECTION = 'posts';

const defaultPostProjection = {
  _id: 1,
  slug: 1,
  subject: 1,
  preHeader: 1,
  content: 1,
  publishedAt: 1,
};

let clientPromise;

function getClientPromise() {
  if (!MONGODB_URI) {
    return null;
  }

  if (!clientPromise) {
    const client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
  }

  return clientPromise;
}

async function findPosts({
  projection = defaultPostProjection,
  filter = {},
  sort = { publishedAt: -1 },
} = {}) {
  const promise = getClientPromise();
  if (!promise) {
    console.error('MONGODB_URI is not configured');
    return [];
  }

  try {
    const client = await promise;
    const collection = client.db(DB_NAME).collection(POSTS_COLLECTION);
    return collection
      .find({ ...filter, isDraft: false }, { projection })
      .sort(sort)
      .toArray();
  } catch (error) {
    console.error('Error fetching posts from MongoDB', error);
    return [];
  }
}

export async function getPost({ slug }) {
  const posts = await findPosts({
    filter: { slug },
  });
  return posts[0] || null;
}

export async function getBlogPosts() {
  return findPosts({
    filter: {
      isHiddenFromNewsList: { $ne: true },
    },
  });
}

export function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
