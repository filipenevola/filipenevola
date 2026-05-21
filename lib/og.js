import { SITE_NAME } from '@/lib/site';

export function buildOgImageUrl({
  title,
  subtitle = '',
  type = 'default',
  badge = '',
  cta = '',
} = {}) {
  const params = new URLSearchParams({ type, title });
  if (subtitle) params.set('subtitle', subtitle);
  if (badge) params.set('badge', badge);
  if (cta) params.set('cta', cta);
  return `/api/og?${params.toString()}`;
}

export function buildPageMetadata({
  title,
  description,
  path = '',
  ogType,
  badge,
  cta,
}) {
  const ogImageUrl = buildOgImageUrl({
    title,
    subtitle: description,
    type: ogType,
    badge: badge || title,
    cta,
  });

  const fullTitle = path === '/' ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return {
    title: path === '/' ? SITE_NAME : title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      locale: 'pt_BR',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
