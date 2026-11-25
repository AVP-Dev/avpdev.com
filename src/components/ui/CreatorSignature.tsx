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
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.78rem',
                        letterSpacing: '0.02em',
                        color: 'var(--sig-secondary)',
                    }}
                >
                    <span style={{ fontWeight: 700, color: 'var(--sig-primary)', opacity: 0.95 }}>
                        AVPdev
                    </span>
                    <span style={{ color: 'var(--sig-secondary)', opacity: 0.45 }}>·</span>
                    <span style={{ opacity: 0.9 }}>Software Development &amp; Automation</span>
                    <span style={{ color: 'var(--sig-secondary)', opacity: 0.45 }}>·</span>
                    <a
                        href="https://avpdev.com/"
                        style={{
                            color: 'var(--sig-dim)',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sig-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sig-dim)'}
                    >
                        avpdev.com
                    </a>
                </div>
            </div>
        </>
    );
};
