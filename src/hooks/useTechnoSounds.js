import { useCallback, useRef, useEffect } from 'react';

export function useTechnoSounds() {
    const audioCtxRef = useRef(null);

    useEffect(() => {
        // Initialize Audio Context only when needed (on user interaction usually, but here we setup)
        // Browsers require a user gesture to resume audio context, we'll handle it during play
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                audioCtxRef.current.close().catch(console.error);
            }
        }
    }, []);

    const playSound = useCallback((type) => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        // Resume context if suspended
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'hover') {
            // High-tech subtle "tick"
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
            
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'click') {
            // Deep mechanical "thud/zoom"
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            osc.start(now);
            osc.stop(now + 0.2);
        }
    }, []);

    return {
        playHover: () => playSound('hover'),
        playClick: () => playSound('click')
    };
}
