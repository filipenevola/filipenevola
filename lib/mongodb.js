const LEMENO_APP_URL = process.env.LEMENO_APP_URL;
const MONGODB_ATLAS_API_KEY = process.env.MONGODB_ATLAS_API_KEY;
const ORIGINAL_SLUG = 'filipenevola';

async function mongoDBFind(options) {
  const url = `${LEMENO_APP_URL}/api/mongodb`;

  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': MONGODB_ATLAS_API_KEY,
      },
      body: JSON.stringify({
        database: 'lemeno',
        dataSource: 'howtocreateanapp',
        ...options,
      }),
      next: { revalidate: 10 },
    });

    const data = await response.json();
    const { documents } = data;
    return documents;
  } catch (error) {
    console.error('Error fetching data from MongoDB', error);
    return [];
  }
}

export async function getOriginal() {
  const originals = await mongoDBFind({
    collection: 'originals',
    projection: {
      _id: 1,
      slug: 1,
      name: 1,
      description: 1,
      bannerUrl: 1,
      logoUrl: 1,
      lastPostPublishedAt: 1,
      language: 1,
    },
    filter: { slug: ORIGINAL_SLUG },
  });
  return originals?.[0] || null;
}

export async function getOriginalPosts({
  projection = {
    _id: 1,
    slug: 1,
    originalId: 1,
    subject: 1,
    preHeader: 1,
    content: 1,
    publishedAt: 1,
  },
  filter = {},
  sort = { publishedAt: -1 },
} = {}) {
  return mongoDBFind({
    collection: 'originalPosts',
    projection,
    filter: { ...filter, isDraft: false },
    sort,
  });
}

export async function getPost({ slug }) {
  const original = await getOriginal();
  if (!original) {
    return null;
  }

  const posts = await getOriginalPosts({
    filter: { originalId: original._id, slug },
  });
  return posts?.[0] || null;
}

export async function getBlogPosts() {
  const original = await getOriginal();
  if (!original) {
    return [];
  }

  return getOriginalPosts({
    filter: {
      originalId: original._id,
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
