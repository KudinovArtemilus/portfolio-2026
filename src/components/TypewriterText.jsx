import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function TypewriterText({ text, className }) {
    const textRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({});
        
        tl.to(textRef.current, {
            duration: Math.max(2, text.length * 0.05),
            text: text,
            ease: "none",
            delay: 0.5
        });

        gsap.to(cursorRef.current, {
            opacity: 0,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            duration: 0.4
        });

        return () => {
            tl.kill();
        };
    }, [text]);

    return (
        <p className={className}>
            <span ref={textRef}></span>
            <span ref={cursorRef} style={{ display: 'inline-block', width: '8px', height: '1.2em', backgroundColor: 'var(--accent)', verticalAlign: 'middle', marginLeft: '5px' }}></span>
        </p>
    );
}
