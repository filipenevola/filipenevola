import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PostPage from './PostPage';
import { getPost, getOriginal } from '@/lib/mongodb';
import { Layout } from '@/components/layout';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost({ slug });
  const original = await getOriginal();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = `${post.subject} | Blog`;
  const description = post.preHeader || original?.description || '';

  // Build OG image URL with URL-encoded parameters
  const ogImageParams = new URLSearchParams({
    type: 'blog',
    title: post.subject,
    badge: 'Blog Post',
    cta: 'Read Article →',
  });
  if (post.preHeader) {
    ogImageParams.set('subtitle', post.preHeader);
  } else if (description) {
    ogImageParams.set('subtitle', description);
  }
  const ogImageUrl = `/api/og?${ogImageParams.toString()}`;

  return {
    title,
    description,
    openGraph: {
      title: `${post.subject} | Blog | Filipe Névola`,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<PostLoading />}>
      <Post params={params} />
    </Suspense>
  );
}

async function Post({ params }) {
  const { slug } = await params;
  const post = await getPost({ slug });

  if (!post) {
    notFound();
  }

  return <PostPage post={post} />;
}

function PostLoading() {
  return (
    <Layout>
      <article
        className="flex w-full max-w-3xl flex-col"
        aria-label="Loading blog post"
      >
        <div className="mb-8 h-6 w-36 animate-pulse rounded bg-neutral-800" />
        <div className="mb-4 h-10 w-4/5 animate-pulse rounded bg-neutral-800" />
        <div className="mb-10 h-5 w-32 animate-pulse rounded bg-neutral-900" />
        <div className="space-y-4">
          <div className="h-5 w-full animate-pulse rounded bg-neutral-900" />
          <div className="h-5 w-11/12 animate-pulse rounded bg-neutral-900" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-900" />
        </div>
      </article>
    </Layout>
  );
}
