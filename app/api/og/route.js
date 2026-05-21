import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

export const runtime = 'edge';

const colors = {
  bgPrimary: '#006437',
  bgSecondary: '#004d2a',
  bgCard: '#003320',
  accent: '#ffffff',
  textPrimary: '#ffffff',
  textSecondary: '#e8f5ec',
  textMuted: '#c8e6d4',
};

const gradients = {
  background: `linear-gradient(135deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 100%)`,
  accent: `linear-gradient(90deg, ${colors.textMuted}, ${colors.textPrimary}, ${colors.accent})`,
};

const defaultSubtitles = {
  inicio: 'Torcida equilibrada: otimista, realista e sem drama.',
  noticias: 'Notícias com critério — sem alarmismo nem clickbait.',
  opinioes: 'Opiniões ponderadas, sem gritaria de torcida.',
  jogos: 'Próximos jogos, resultados e Google Calendar.',
  sobre: 'Site de torcedor: pé no chão, sem chiliquismo nem sensacionalismo.',
  default: 'Torça feliz. Pé no chão, sem drama.',
};

const defaultCtas = {
  inicio: 'Ver timeline →',
  noticias: 'Ler notícias →',
  opinioes: 'Ver opiniões →',
  jogos: 'Ver agenda →',
  sobre: 'Conhecer a proposta →',
  default: 'Acessar →',
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'default';
  const title = searchParams.get('title') || SITE_NAME;
  const badge = searchParams.get('badge') || type;
  const subtitle =
    searchParams.get('subtitle') ||
    defaultSubtitles[type] ||
    defaultSubtitles.default;
  const cta =
    searchParams.get('cta') || defaultCtas[type] || defaultCtas.default;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.bgPrimary,
          backgroundImage: gradients.background,
          padding: '50px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                background: colors.bgCard,
                border: `2px solid ${colors.accent}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              🌿
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: colors.accent,
                letterSpacing: '0.04em',
              }}
            >
              {SITE_NAME.toUpperCase()}
            </div>
          </div>
          {badge && (
            <div
              style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.12)',
                border: `1px solid ${colors.accent}`,
                borderRadius: 20,
                padding: '8px 18px',
                fontSize: 14,
                color: colors.accent,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {badge}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              background: gradients.accent,
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.15,
              marginBottom: 20,
              maxWidth: '95%',
            }}
          >
            {title.length > 80 ? `${title.slice(0, 77)}...` : title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 26,
                color: colors.textSecondary,
                lineHeight: 1.4,
                maxWidth: '88%',
              }}
            >
              {subtitle.length > 120
                ? `${subtitle.slice(0, 117)}...`
                : subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              background: gradients.accent,
              borderRadius: 8,
              padding: '14px 28px',
              fontSize: 18,
              color: colors.bgPrimary,
              fontWeight: 700,
            }}
          >
            {cta}
          </div>
          <div style={{ fontSize: 16, color: colors.textMuted }}>#006437</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
