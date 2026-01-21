import Link from 'next/link';
import { getBlogPosts, formatDateTime } from '@/lib/mongodb';
import { Layout } from '@/components/layout';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Layout>
      <div className="flex flex-col w-full md:w-3/4 xl:w-1/2">
        <div className="mb-8">
          <Link
            href="/"
            className="text-white hover:text-neutral-400 transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-2xl font-semibold mb-4 text-white">Blog</h1>
        <p className="text-neutral-400 mb-8">
          Thoughts on software development, entrepreneurship, and building
          products.
        </p>

        {posts.length === 0 ? (
          <p className="text-neutral-400">No posts yet. Check back soon!</p>
        ) : (
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
        )}
      </div>
    </Layout>
  );
}
