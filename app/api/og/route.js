import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Google Fonts returns woff2 to modern UAs; Satori only renders ttf/otf/woff,
// so we force a legacy UA to get woff/ttf.
const LEGACY_UA =
  'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0';

async function fetchGoogleFont(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: { 'User-Agent': LEGACY_UA },
    cache: 'force-cache',
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|woff)'\)/);
  if (!match) {
    throw new Error(`No usable font URL in Google Fonts CSS for ${family} ${weight}`);
  }
  const fontRes = await fetch(match[1], { cache: 'force-cache' });
  if (!fontRes.ok) throw new Error(`Font download failed: ${fontRes.status}`);
  return fontRes.arrayBuffer();
}

async function loadFonts() {
  const [regular, semibold, bold] = await Promise.all([
    fetchGoogleFont('K2D', 400),
    fetchGoogleFont('K2D', 600),
    fetchGoogleFont('K2D', 700),
  ]);
  return [
    { name: 'K2D', data: regular, weight: 400, style: 'normal' },
    { name: 'K2D', data: semibold, weight: 600, style: 'normal' },
    { name: 'K2D', data: bold, weight: 700, style: 'normal' },
  ];
}

// Personal brand colors - black/neutral/white theme
const colors = {
  // Backgrounds (pure black and neutral grays)
  bgPrimary: '#000000',
  bgSecondary: '#0a0a0a',
  bgCard: '#262626',
  bgCardBorder: '#404040',
  // Text colors (neutral palette)
  textPrimary: '#f5f5f5',
  textSecondary: '#d4d4d4',
  textMuted: '#737373',
  textHeading: '#ffffff',
  // Accent (white/light gray for monochrome look)
  accent: '#ffffff',
  accentHover: '#e5e5e5',
  accentMuted: '#a3a3a3',
};

// Gradients
const gradients = {
  background: `linear-gradient(135deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 100%)`,
  accent: `linear-gradient(90deg, ${colors.accentMuted}, ${colors.textPrimary}, ${colors.accent})`,
};

// X crops large-card previews horizontally on mobile, so keep text and badges
// inside a wider social-safe area instead of sitting near the 1200px edge.
const OG_SAFE_PADDING = '50px 140px';
const OG_DEFAULT_PADDING = '60px 140px';
const OG_FRAME_STYLE = {
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
};

// Default CTAs per type
const defaultCTAs = {
  default: 'Learn More →',
  blog: 'Read Article →',
};

/**
 * OG Image Generator for Filipe Névola's personal site
 *
 * Query Parameters:
 * - title: Main title text (default: 'Filipe Névola')
 * - subtitle: Subtitle text
 * - type: 'default' | 'blog' (default: 'default')
 * - badge: Badge text (for blog type)
 * - cta: Call-to-action text (optional, has contextual defaults per type)
 *
 * Blog specific parameters (when type=blog):
 * - subtitle: Blog post description or excerpt
 * - badge: Optional badge (e.g., 'Blog', 'Article', 'Newsletter')
 * - Default CTA: 'Read Article →'
 *
 * Example URLs:
 * /api/og?title=Filipe%20Névola (default)
 * /api/og?type=blog&title=Blog&subtitle=Thoughts%20on%20software%20development&badge=Blog&cta=Read%20Latest%20Posts%20→
 * /api/og?type=blog&title=My%20Post%20Title&subtitle=Post%20description&badge=Blog%20Post
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Filipe Névola';
  const type = searchParams.get('type') || 'default';
  const badge = searchParams.get('badge') || '';
  const cta = searchParams.get('cta') || defaultCTAs[type] || defaultCTAs.default;
  const subtitle =
    searchParams.get('subtitle') ||
    (type === 'default'
      ? 'CEO & Developer at Quave. Building Quave ONE (Cloud Platform), Quave Services (Dev Boutique), and Erva Token (Premium Yerba Mate).'
      : '');

  const isBlog = type === 'blog';

  let fonts;
  try {
    fonts = await loadFonts();
  } catch (err) {
    console.error('[og] font load failed, falling back to default:', err);
    fonts = undefined;
  }

  // Blog OG image
  if (isBlog) {
    return new ImageResponse(
      (
        <div
          style={{
            ...OG_FRAME_STYLE,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.bgPrimary,
            backgroundImage: gradients.background,
            padding: OG_SAFE_PADDING,
            fontFamily: 'K2D, sans-serif',
          }}
        >
          {/* Top bar with brand and badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 50,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: colors.accent,
                letterSpacing: '0.05em',
              }}
            >
              FILIPE NÉVOLA
            </div>
            {badge && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: `rgba(255, 255, 255, 0.1)`,
                  border: `1px solid ${colors.accent}`,
                  borderRadius: 20,
                  padding: '8px 16px',
                  fontSize: 14,
                  color: colors.accent,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {badge}
              </div>
            )}
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: 60,
                fontWeight: 700,
                background: gradients.accent,
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div
                style={{
                  fontSize: 28,
                  color: colors.textSecondary,
                  lineHeight: 1.4,
                  maxWidth: '85%',
                }}
              >
                {subtitle}
              </div>
            )}
          </div>

          {/* Bottom bar with CTA and domain */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* CTA Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: gradients.accent,
                borderRadius: 8,
                padding: '14px 28px',
                fontSize: 18,
                color: colors.bgPrimary,
                fontWeight: 600,
              }}
            >
              {cta}
            </div>
            <div
              style={{
                fontSize: 16,
                color: colors.textMuted,
              }}
            >
              filipenevola.com/blog
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630, fonts }
    );
  }

  // Default OG image
  return new ImageResponse(
    (
      <div
        style={{
          ...OG_FRAME_STYLE,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.bgPrimary,
          backgroundImage: gradients.background,
          padding: OG_DEFAULT_PADDING,
          fontFamily: 'K2D, sans-serif',
        }}
      >
        {/* Top bar with brand */}
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
              fontSize: 20,
              fontWeight: 600,
              color: colors.accent,
              letterSpacing: '0.05em',
            }}
          >
            filipenevola.com
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: `rgba(34, 211, 211, 0.1)`,
              border: `1px solid ${colors.accent}`,
              borderRadius: 20,
              padding: '8px 16px',
              fontSize: 14,
              color: colors.accent,
              fontWeight: 500,
            }}
          >
            Developer & Entrepreneur
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            gap: 50,
          }}
        >
          {/* Profile image placeholder - circle with initials */}
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
              backgroundColor: colors.bgCard,
              border: `3px solid ${colors.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 700,
              color: colors.accent,
              flexShrink: 0,
            }}
          >
            FN
          </div>

          {/* Text content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            {/* Title with gradient */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                background: gradients.accent,
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: 26,
                color: colors.textSecondary,
                lineHeight: 1.5,
                maxWidth: '95%',
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>

        {/* Bottom bar with products */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 40,
          }}
        >
          {/* Product tags */}
          <div
            style={{
              display: 'flex',
              gap: 12,
            }}
          >
            {['Quave ONE', 'Quave Services', 'Erva Token'].map((product) => (
              <div
                key={product}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: colors.bgCard,
                  borderRadius: 8,
                  padding: '10px 16px',
                  fontSize: 14,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.bgCardBorder}`,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: colors.accent,
                  }}
                />
                {product}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: gradients.accent,
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: 16,
              color: colors.bgPrimary,
              fontWeight: 600,
            }}
          >
            Learn More →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
