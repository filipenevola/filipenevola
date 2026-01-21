import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Personal brand colors - clean dark theme with accent
const colors = {
  // Backgrounds (deep dark blue/slate)
  bgPrimary: '#0f172a',
  bgSecondary: '#1e293b',
  bgCard: '#334155',
  bgCardBorder: '#475569',
  // Text colors
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textHeading: '#f8fafc',
  // Accent (teal/cyan for tech feel)
  accent: '#22d3d3',
  accentHover: '#5eead4',
  accentMuted: '#14b8a6',
};

// Gradients
const gradients = {
  background: `linear-gradient(135deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 100%)`,
  accent: `linear-gradient(90deg, ${colors.accentMuted}, ${colors.accent}, ${colors.accentHover})`,
};

/**
 * OG Image Generator for Filipe Névola's personal site
 *
 * Query Parameters:
 * - title: Main title text (default: 'Filipe Névola')
 * - subtitle: Subtitle text
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Filipe Névola';
  const subtitle =
    searchParams.get('subtitle') ||
    'CEO & Developer at Quave. Building Quave ONE (Cloud Platform), Quave Services (Dev Boutique), and Erva Token (Premium Yerba Mate).';

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
          padding: '60px',
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
    { width: 1200, height: 630 }
  );
}
