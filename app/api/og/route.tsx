import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0D0D10',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            color: '#5C564B',
            fontSize: '14px',
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          alexvdovych.vercel.app
        </div>
        <div
          style={{
            color: '#DDE3EE',
            fontSize: '72px',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Oleksandr
          <br />
          Vdovychenko
        </div>
        <div
          style={{
            color: '#878FA0',
            fontSize: '22px',
            fontWeight: 400,
          }}
        >
          Web &amp; Bot Developer, Poznan
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            color: '#21232C',
            fontSize: '11px',
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Websites · Bots · AI automations
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
