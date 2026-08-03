import { Suspense } from 'react';
import Link from 'next/link';
import { getBlogPosts, formatDateTime } from '@/lib/mongodb';
import { Layout } from '@/components/layout';
import { NewsletterLink } from '@/components/NewsletterSubscribe';

export default function BlogPage() {
  return (
    <Layout>
      <div className="flex flex-col w-full md:w-3/4 xl:w-1/2">
        <div className="mb-8 flex justify-between items-center">
          <Link
            href="/"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            &larr; Back to Home
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/rss.xml"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              RSS
            </Link>
            <NewsletterLink className="text-neutral-400 hover:text-white transition-colors cursor-pointer">
              Subscribe to updates
            </NewsletterLink>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-4 text-white">Blog</h1>
        <p className="text-neutral-400 mb-8">
          Thoughts on software development, entrepreneurship, and building
          products.
        </p>

        <Suspense fallback={<PostsLoading />}>
          <BlogPosts />
        </Suspense>
      </div>
    </Layout>
  );
}

async function BlogPosts() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return <p className="text-neutral-400">No posts yet. Check back soon!</p>;
  }

  return (
    <ul className="flex flex-col gap-6">
      {posts.map(function renderPost({
        _id,
        slug,
        subject,
        preHeader,
        publishedAt,
      }) {
        return (
          <li key={_id} className="flex flex-col items-start gap-1">
            <small className="text-neutral-500 text-sm">
              {formatDateTime(publishedAt)}
            </small>
            <Link
              className="text-lg text-white hover:text-neutral-400 transition-colors"
              href={`/blog/${slug}`}
            >
              {subject}
            </Link>
            {preHeader && (
              <p className="text-neutral-400 text-sm">{preHeader}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function PostsLoading() {
  return (
    <div className="space-y-6" aria-label="Loading blog posts">
      {[0, 1, 2].map((item) => (
        <div key={item} className="space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-900" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-neutral-800" />
        </div>
      ))}
    </div>
  );
}
