import Link from 'next/link';
import { formatDateTime } from '@/lib/mongodb';
import { formatBlogContent } from '@/lib/blogContent';
import { Layout } from '@/components/layout';
import { NewsletterCTA } from '@/components/NewsletterSubscribe';

export default function PostPage({ post }) {
  const content = formatBlogContent({ content: post.content });

  return (
    <Layout>
      <article className="flex flex-col w-full md:w-3/4 xl:w-1/2">
        <Link
          className="flex items-center gap-2 text-white hover:text-neutral-400 transition-colors mb-8"
          href="/blog"
        >
          &larr; Back to Blog
        </Link>

        <small className="text-neutral-500 text-sm">
          {formatDateTime(post.publishedAt)}
        </small>
        <h1 className="text-2xl font-semibold mt-2 text-white">{post.subject}</h1>
        {post.preHeader && (
          <p className="text-lg text-neutral-400 font-light mt-4">
            {post.preHeader}
          </p>
        )}

        <div className="blog-content mt-8">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <NewsletterCTA variant="post-footer" />
      </article>
    </Layout>
  );
}
