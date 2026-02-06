import React from 'react';

export const CreatorSignature = () => {
    return (
        <div className="w-full py-3 text-center">
            <p className="font-sans leading-tight text-sm text-inherit antialiased">
                <b className="font-bold opacity-60 hover:opacity-100 transition-opacity">
                    <a href="https://avpdev.com/en/" className="no-underline text-inherit italic">Alexios Odos</a>
                </b>
                <span className="mx-2 opacity-20 select-none">|</span>
                <b className="font-bold opacity-60 hover:opacity-100 transition-opacity">
                    <a href="https://avpdev.com/ru/" className="no-underline text-inherit italic">Aliaksei Patskevich</a>
                </b>
                <br />
                <sub className="block mt-1 opacity-40 tracking-wide text-[10px] uppercase">
                    <span className="text-inherit">Senior Full-stack Engineer</span>
                    <span className="mx-2 opacity-20 select-none">•</span>
                    <a href="https://github.com/AVP-Dev" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline decoration-current opacity-80 hover:opacity-100 transition-all text-inherit">GitHub</a>
                    <span className="mx-2 opacity-20 select-none">•</span>
                    <a href="https://t.me/AVP_Dev" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline decoration-current opacity-80 hover:opacity-100 transition-all text-inherit">Telegram</a>
                </sub>
            </p>
        </div>
    );
};
