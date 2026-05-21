import Link from 'next/link';
import { getBlogPosts, formatDateTime } from '@/lib/mongodb';
import { Layout } from '@/components/layout';
import { NewsletterLink } from '@/components/NewsletterSubscribe';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Layout>
      <div className="flex flex-col w-full md:w-3/4 xl:w-1/2">
        <div className="mb-8 flex justify-between items-center">
          <Link
            href="/"
            className="text-white hover:text-palmeiras-muted transition-colors"
          >
            &larr; Back to Home
          </Link>
          <NewsletterLink className="text-sm text-palmeiras-muted hover:text-white transition-colors cursor-pointer">
            Subscribe to updates
          </NewsletterLink>
        </div>

        <h1 className="text-2xl font-semibold mb-4 text-white">Blog</h1>
        <p className="text-palmeiras-muted mb-8">
          Thoughts on software development, entrepreneurship, and building
          products.
        </p>

        {posts.length === 0 ? (
          <p className="text-palmeiras-muted">No posts yet. Check back soon!</p>
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
                  <small className="text-palmeiras-muted/80 text-sm">
                    {formatDateTime(publishedAt)}
                  </small>
                  <Link
                    className="text-lg text-white hover:text-palmeiras-muted transition-colors"
                    href={`/blog/${slug}`}
                  >
                    {subject}
                  </Link>
                  {preHeader && (
                    <p className="text-palmeiras-muted text-sm">{preHeader}</p>
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
