export function toYoutubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const id =
      parsed.searchParams.get('v') ||
      parsed.pathname.split('/').filter(Boolean).pop();
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}
