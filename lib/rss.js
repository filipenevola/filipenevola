const XML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

export function escapeXml(value = '') {
  return String(value).replace(/[&<>"']/g, function replaceEntity(character) {
    return XML_ENTITIES[character];
  });
}

export function cdata(value = '') {
  return `<![CDATA[${String(value).replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

export function buildRssFeed({
  baseUrl,
  feedPath = '/rss.xml',
  title,
  description,
  language = 'en-US',
  posts,
}) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
  const feedUrl = `${normalizedBaseUrl}${feedPath}`;
  const blogUrl = `${normalizedBaseUrl}/blog`;
  const latestPost = posts?.[0];
  const lastBuildDate = latestPost?.publishedAt
    ? new Date(latestPost.publishedAt).toUTCString()
    : new Date().toUTCString();

  const items = (posts || [])
    .map(function renderPost(post) {
      const postUrl = `${normalizedBaseUrl}/blog/${post.slug}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : lastBuildDate;

      return `    <item>
      <title>${escapeXml(post.subject)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description>${escapeXml(post.preHeader || '')}</description>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <content:encoded>${cdata(post.content || post.preHeader || '')}</content:encoded>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>${escapeXml(language)}</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}
