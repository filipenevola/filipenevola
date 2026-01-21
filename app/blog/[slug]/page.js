import { notFound } from 'next/navigation';
import PostPage from './PostPage';
import { getBlogPosts, getPost, getOriginal } from '@/lib/mongodb';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(function mapPostToParams(post) {
    return { slug: post.slug };
  });
}

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

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPost({ slug });

  if (!post) {
    notFound();
  }

  return <PostPage post={post} />;
}
