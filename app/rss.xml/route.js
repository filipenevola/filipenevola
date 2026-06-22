import { getBlogPosts, getOriginal } from '@/lib/mongodb';
import { buildRssFeed } from '@/lib/rss';

export const revalidate = 600;

const BASE_URL = 'https://filipenevola.com';
const FEED_DESCRIPTION =
  'Thoughts on software development, entrepreneurship, and building products. By Filipe Névola.';

export async function GET() {
  const [posts, original] = await Promise.all([getBlogPosts(), getOriginal()]);
  const feed = buildRssFeed({
    baseUrl: BASE_URL,
    title: original?.name || 'Filipe Névola Blog',
    description: original?.description || FEED_DESCRIPTION,
    language: original?.language || 'en-US',
    posts,
  });

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    },
  });
}
