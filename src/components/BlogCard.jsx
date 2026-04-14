import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useTechnoSounds } from '../hooks/useTechnoSounds';

export default function BlogCard({ post }) {
    const cardRef = useRef(null);
    const contentRef = useRef(null);
    const { playClick } = useTechnoSounds();

    useEffect(() => {
        const card = cardRef.current;
        const content = contentRef.current;
        if (!card || !content) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Наклон карточки
            const rotateX = ((y - centerY) / centerY) * -12; // Инвертируем Y для наклона
            const rotateY = ((x - centerX) / centerX) * 12;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                ease: "power2.out",
                duration: 0.5,
                borderColor: 'var(--accent)',
                boxShadow: '0 20px 40px rgba(84, 160, 255, 0.2)'
            });
            
            // Эффект параллакса для содержимого
            gsap.to(content, {
                x: (x - centerX) * 0.1,
                y: (y - centerY) * 0.1,
                ease: "power2.out",
                duration: 0.5
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: "power3.out",
                duration: 0.8,
                borderColor: 'var(--glass-border)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)'
            });
            
            gsap.to(content, {
                x: 0,
                y: 0,
                ease: "power3.out",
                duration: 0.8
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="blog-item" ref={cardRef} style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(20px)',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
            height: '100%'
        }}>
            <div ref={contentRef} style={{ transformStyle: 'preserve-3d', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                    color: 'var(--accent)', 
                    fontSize: '0.8rem', 
                    fontWeight: '600',
                    transform: 'translateZ(20px)' 
                }}>{post.date}</span>
                
                <h3 style={{ 
                    margin: '1.2rem 0', 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    transform: 'translateZ(40px)',
                    textShadow: '0 5px 15px rgba(0,0,0,0.3)'
                }}>{post.title}</h3>
                
                <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.95rem', 
                    marginBottom: '2.5rem', 
                    flex: 1,
                    lineHeight: '1.6',
                    transform: 'translateZ(30px)' 
                }}>{post.excerpt}</p>
                
                <Link 
                    to={`/blog/${post.id}`} 
                    className="btn btn-secondary" 
                    style={{ 
                        alignSelf: 'flex-start',
                        transform: 'translateZ(50px)' 
                    }}
                    onClick={() => playClick()}
                >
                    Читать далее
                </Link>
            </div>
        </div>
    );
}
