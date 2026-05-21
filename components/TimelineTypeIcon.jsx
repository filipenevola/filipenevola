const ICONS = {
  noticia: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 5h12a1 1 0 011 1v14l-4-2.5L11 20V6a1 1 0 00-1-1H6z"
      />
      <path strokeLinecap="round" d="M9 9h6M9 12h4" />
    </svg>
  ),
  opiniao: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h6M5 6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 3v-3V6z"
      />
    </svg>
  ),
  jogo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 3v18M3 12h18" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.5 7.5c2 2 11 2 13 0M5.5 16.5c2-2 11-2 13 0"
      />
    </svg>
  ),
};

const ICON_STYLES = {
  noticia: 'bg-emerald-900/60 text-emerald-100 ring-emerald-500/40',
  opiniao: 'bg-white/10 text-white ring-palmeiras-light/50',
  jogo: 'bg-palmeiras-darker text-palmeiras-muted ring-palmeiras-light/40',
};

export function TimelineTypeIcon({ type }) {
  const icon = ICONS[type] || ICONS.noticia;
  const style = ICON_STYLES[type] || ICON_STYLES.noticia;

  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-2 [&>svg]:h-4 [&>svg]:w-4 ${style}`}
      title={type}
    >
      {icon}
    </span>
  );
}
