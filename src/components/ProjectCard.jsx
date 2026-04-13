import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function ProjectCard({ project }) {
    const cardRef = useRef(null);
    const contentRef = useRef(null);

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
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                ease: "power2.out",
                duration: 0.5
            });
            
            gsap.to(content, {
                x: (x - centerX) * 0.05,
                y: (y - centerY) * 0.05,
                ease: "power2.out",
                duration: 0.5
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: "power3.out",
                duration: 0.8
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
        <div className="project-card reveal-item" ref={cardRef}>
            <div className="project-image" ref={contentRef}>
                <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description.slice(0, 100)}...</p>
                <div className="project-actions">
                    <Link to={`/project/${project.id}`} className="btn btn-secondary">Подробнее</Link>
                </div>
            </div>
        </div>
    );
}
