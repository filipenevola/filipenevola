import BlogPage from './BlogPage';

export const metadata = {
  title: 'Blog',
  description:
    'Thoughts on software development, entrepreneurship, and building products. By Filipe Névola.',
  openGraph: {
    title: 'Blog | Filipe Névola',
    description:
      'Thoughts on software development, entrepreneurship, and building products. By Filipe Névola.',
    images: [
      {
        url: `/api/og?type=blog&title=Blog&subtitle=Thoughts%20on%20software%20development%2C%20entrepreneurship%2C%20and%20building%20products&badge=Blog&cta=Read%20Latest%20Posts%20→`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Page() {
  return <BlogPage />;
}
