import React from 'react';

export const CreatorSignature = () => {
    return (
        <div className="w-full py-4 text-center select-none">
            <div className="font-sans leading-tight text-sm text-inherit">
                {/* Имена: Твой бренд и реальное имя */}
                <div className="flex items-center justify-center gap-3">
                    <a
                        href="https://avpdev.com/en/"
                        className="font-bold opacity-90 hover:opacity-100 transition-opacity no-underline text-inherit"
                    >
                        Alexios Odos
                    </a>
                    <span className="opacity-20 font-light">|</span>
                    <a
                        href="https://avpdev.com/ru/"
                        className="font-bold opacity-90 hover:opacity-100 transition-opacity no-underline text-inherit"
                    >
                        Aliaksei Patskevich
                    </a>
                </div>

                {/* Роль и основные точки входа */}
                <div className="mt-2 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.1em] font-medium opacity-40">
                    <span>Software Engineer</span>
                    <span className="opacity-30">•</span>
                    <a
                        href="https://github.com/AVP-Dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-100 hover:text-blue-500 transition-colors text-inherit decoration-current"
                    >
                        GitHub
                    </a>
                    <span className="opacity-30">•</span>
                    <a
                        href="https://t.me/AVP_Dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-100 hover:text-blue-500 transition-colors text-inherit decoration-current"
                    >
                        Telegram
                    </a>
                </div>
            </div>
        </div>
    );
};
