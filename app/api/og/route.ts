import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') ?? 'Sweesh - Voice to Text';
    const description = searchParams.get('description') ?? 'Fast, intuitive voice-to-text idea capture tool';
    const theme = searchParams.get('theme') ?? 'dark';

    return new ImageResponse(
      (
        <div 
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
            position: 'relative',
            fontFamily: '"Syne", "Instrument Sans", "IBM Plex Mono", system-ui, sans-serif',
          }}
        >
          {/* Background texture effect */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            }}
          />

          {/* Gradient header strip */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 16,
              background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
              boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 4px 12px rgba(220, 38, 38, 0.15)',
            }}
          />

          {/* Main content */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            {/* Logo placeholder */}
            <div 
              style={{
                width: 120,
                height: 120,
                borderRadius: 24,
                backgroundColor: theme === 'dark' ? '#141414' : '#f4f4f5',
                border: `2px solid ${theme === 'dark' ? '#262626' : '#e4e4e7'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
                position: 'relative',
              }}
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={theme === 'dark' ? '#e5e5e5' : '#111111'}>
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
              
              {/* Subtle shimmer effect */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 24,
                  background: 'linear-gradient(45deg, transparent 40%, rgba(220, 38, 38, 0.1), transparent 60%)',
                  backgroundSize: '300% 300%',
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>

            <h1 
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: theme === 'dark' ? '#e5e5e5' : '#111111',
                marginBottom: 24,
                fontFamily: '"Syne", system-ui, sans-serif',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            
            <p 
              style={{
                fontSize: 28,
                fontWeight: 400,
                color: theme === 'dark' ? '#a1a1aa' : '#71717a',
                maxWidth: '80%',
                lineHeight: 1.4,
                fontFamily: '"Instrument Sans", system-ui, sans-serif',
              }}
            >
              {description}
            </p>

            {/* Decorative elements */}
            <div 
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 40,
              }}
            >
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#e4e4e7',
                    border: `1px solid ${theme === 'dark' ? '#262626' : '#d4d4d8'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div 
                    style={{
                      width: 24,
                      height: 4,
                      backgroundColor: theme === 'dark' ? '#404040' : '#a1a1aa',
                      borderRadius: 2,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'dark' ? '#71717a' : '#a1a1aa',
              fontSize: 24,
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 500,
            }}
          >
            sweesh.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Syne',
            data: await fetch('https://fonts.gstatic.com/s/syne/v12/8vIUdp84yTa_aQcNgkqfMP5qDg4.woff2').then((res) => res.arrayBuffer()),
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Instrument Sans',
            data: await fetch('https://fonts.gstatic.com/s/instrumentsans/v1/xn7mEkDdQBIuYz4FYhPI2lNSXKbQ.woff2').then((res) => res.arrayBuffer()),
            style: 'normal',
            weight: 400,
          },
          {
            name: 'IBM Plex Mono',
            data: await fetch('https://fonts.gstatic.com/s/ibmplexmono/v6/-F6sfjptAgt5VM-kVkqdyU8n1ioSflV1.woff2').then((res) => res.arrayBuffer()),
            style: 'normal',
            weight: 500,
          }
        ]
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response(`Failed to generate image: ${error}`, {
      status: 500,
    });
  }
}