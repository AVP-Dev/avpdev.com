import React from 'react';

export const CreatorSignature = () => {
    return (
        <>
            <style>{`
                .sig-root {
                    --sig-primary: #FFFFFF;
                    --sig-secondary: #C0BDBF;
                    --sig-dim: #A09D9F;
                    --sig-accent: #FF8C00;
                }
                .light-theme .sig-root {
                    --sig-primary: #18181B;
                    --sig-secondary: #52525B;
                    --sig-dim: #3F3F46;
                }
            `}</style>
            <div
                className="sig-root"
                style={{
                    width: '100%',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    textAlign: 'center',
                    userSelect: 'none',
                    fontFamily: "'Plus Jakarta Sans Variable', sans-serif",
                    lineHeight: 1.4,
                }}
            >
                <div style={{ marginBottom: '6px' }}>
                    <a
                        href="https://avpdev.com/ru/"
                        style={{
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: 'var(--sig-primary)',
                            opacity: 0.95,
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sig-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sig-primary)'}
                    >
                        Aliaksei Patskevich (AVPDev)
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--sig-secondary)',
                    }}
                >
                    <span style={{ opacity: 0.9 }}>AI Solutions Architect</span>
                    <span style={{ color: 'var(--sig-secondary)', opacity: 0.4 }}>•</span>
                    <a
                        href="https://github.com/AVP-Dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: '0.7rem',
                            textTransform: 'none',
                            letterSpacing: '0',
                            color: 'var(--sig-dim)',
                            textDecoration: 'none',
                            fontWeight: 500,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sig-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sig-dim)'}
                    >
                        GitHub
                    </a>
                    <span style={{ color: 'var(--sig-secondary)', opacity: 0.4 }}>•</span>
                    <a
                        href="https://t.me/AVP_Dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: '0.7rem',
                            textTransform: 'none',
                            letterSpacing: '0',
                            color: 'var(--sig-dim)',
                            textDecoration: 'none',
                            fontWeight: 500,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sig-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sig-dim)'}
                    >
                        Telegram
                    </a>
                </div>
            </div>
        </>
    );
};
