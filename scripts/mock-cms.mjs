import { createServer } from 'node:http';

const PORT = 4199;
const original = {
  _id: 'original-1',
  slug: 'filipe-nevola',
  name: 'Filipe Névola Blog',
  description: 'Test blog content',
  language: 'en-US',
};
const post = {
  _id: 'post-1',
  originalId: original._id,
  slug: 'migration-test-post',
  subject: 'Migration Test Post',
  preHeader: 'Content supplied by the local CMS fixture.',
  content:
    '<p>This deterministic test article verifies that dynamic CMS content streams into the blog and remains present in the RSS feed after a production build.</p>',
  publishedAt: '2026-08-03T12:00:00.000Z',
};

const server = createServer(async (request, response) => {
  if (request.method !== 'POST' || request.url !== '/api/mongodb') {
    response.writeHead(404).end();
    return;
  }

  let body = '';
  for await (const chunk of request) body += chunk;
  const query = JSON.parse(body);
  let documents = [];

  if (query.collection === 'originals') {
    documents = [original];
  } else if (
    query.collection === 'originalPosts' &&
    (!query.filter?.slug || query.filter.slug === post.slug)
  ) {
    documents = [post];
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ documents }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Mock CMS listening on http://127.0.0.1:${PORT}`);
});

process.on('SIGTERM', () => server.close());
