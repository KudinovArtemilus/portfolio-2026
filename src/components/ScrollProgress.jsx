import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function ScrollProgress() {
    useEffect(() => {
        gsap.to('.scroll-progress-bar', {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.2
            }
        });
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'var(--accent-gradient)',
            zIndex: 9999,
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
            boxShadow: '0 0 10px var(--accent-glow)'
        }} className="scroll-progress-bar" />
    );
}
