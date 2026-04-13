import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

import { useTechnoSounds } from '../hooks/useTechnoSounds';

export default function MagneticButton({ children, className, ...props }) {
    const magneticRef = useRef(null);
    const { playHover } = useTechnoSounds();

    useEffect(() => {
        const element = magneticRef.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 1,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        const handleMouseEnter = () => {
            playHover();
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [playHover]);

    return React.cloneElement(children, { ref: magneticRef, className: `${children.props.className || ''} ${className || ''}` });
}
