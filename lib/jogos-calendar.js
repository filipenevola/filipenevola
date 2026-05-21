/**
 * URL do Google Calendar (embed ou página pública).
 * Defina NEXT_PUBLIC_GOOGLE_CALENDAR_URL no ambiente.
 */
export function getGoogleCalendarUrl() {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL ||
    'https://calendar.google.com/calendar/embed?src=pt.brazilian%23holiday%40group.v.calendar.google.com&ctz=America%2FSao_Paulo'
  );
}

export function getGoogleCalendarAddUrl({ title, startAt, details, location }) {
  const start = new Date(startAt);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const fmt = (d) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: details || '',
    location: location || '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
