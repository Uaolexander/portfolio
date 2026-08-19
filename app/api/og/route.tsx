import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0D0D1C',
          display: 'flex',
          flexDirection: 'row',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Left content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 80px',
            flex: 1,
          }}
        >
          {/* Logo + URL */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                background: '#13132A',
                border: '1px solid #252545',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DDE3EE',
                fontSize: '14px',
                letterSpacing: '1px',
              }}
            >
              AV
            </div>
            <div
              style={{
                color: '#3D4466',
                fontSize: '14px',
                letterSpacing: '0.1em',
                display: 'flex',
              }}
            >
              alexvdovych.com
            </div>
          </div>

          {/* Name block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                color: '#5b7fff',
                fontSize: '13px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              Web &amp; Bot Developer · Poznan, PL
            </div>
            <div
              style={{
                color: '#DDE3EE',
                fontSize: '80px',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex' }}>Alex</div>
              <div style={{ display: 'flex', color: '#7880A0' }}>Vdovychenko</div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Next.js', 'React', 'Telegram Bots', 'AI', 'Automation'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '7px 16px',
                  border: '1px solid #1E2040',
                  borderRadius: '100px',
                  color: '#5C6685',
                  fontSize: '13px',
                  background: 'rgba(30,32,64,0.5)',
                  display: 'flex',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Right: decorative monogram */}
        <div
          style={{
            width: '360px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px solid rgba(91,127,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '148px',
                height: '148px',
                borderRadius: '50%',
                border: '1px solid rgba(91,127,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(91,127,255,0.06)',
              }}
            >
              <div
                style={{
                  color: '#5b7fff',
                  fontSize: '44px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  display: 'flex',
                }}
              >
                AV
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
