import { getBlogPosts, getOriginal } from '@/lib/mongodb';
import { buildRssFeed } from '@/lib/rss';
import { cacheLife } from 'next/cache';
import { connection } from 'next/server';

const BASE_URL = 'https://filipenevola.com';
const FEED_DESCRIPTION =
  'Thoughts on software development, entrepreneurship, and building products. By Filipe Névola.';

async function getFeed() {
  'use cache';
  cacheLife({ stale: 600, revalidate: 600, expire: 86400 });

  const [posts, original] = await Promise.all([getBlogPosts(), getOriginal()]);
  return buildRssFeed({
    baseUrl: BASE_URL,
    title: original?.name || 'Filipe Névola Blog',
    description: original?.description || FEED_DESCRIPTION,
    language: original?.language || 'en-US',
    posts,
  });
}

export async function GET() {
  await connection();
  const feed = await getFeed();

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    },
  });
}
