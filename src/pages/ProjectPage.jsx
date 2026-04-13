import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gsap from 'gsap';
import { projectsData } from '../data/projects';
import TechnoBackground from '../components/TechnoBackground';
import ScrollProgress from '../components/ScrollProgress';

export default function ProjectPage() {
    const { id } = useParams();
    const project = projectsData[id];

    useEffect(() => {
        // Page transition animation
        gsap.fromTo('.project-detail-view', 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        gsap.fromTo('.project-header h1', 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "back.out(1.5)" }
        );
    }, []);

    if (!project) return <div className="container" style={{ padding: '10rem 2rem' }}>Проект не найден</div>;

    return (
        <div className="project-detail-view page-transition">
             <ScrollProgress />
             <TechnoBackground />
             <nav className="navbar project-navbar">
                <div className="container">
                    <Link to="/" className="back-link">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Назад на главную
                    </Link>
                </div>
            </nav>

            <header className="project-header">
                 <div className="hero-bg">
                    <img src={project.image} alt={project.title} />
                </div>
                <div className="container">
                    <h1 className="gradient-text">{project.title}</h1>
                </div>
            </header>

            <section className="project-content section-padding">
                <div className="container">
                    <div className="md-content">
                        <ReactMarkdown>{project.description}</ReactMarkdown>
                    </div>
                    {project.downloadUrl && (
                        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                            <a href={project.downloadUrl} className="btn btn-primary" download>
                                Скачать проект
                            </a>
                            <p style={{ marginTop: '15px', fontSize: '0.85rem', opacity: 0.7, maxWidth: '400px', margin: '15px auto 0' }}>
                                * Примечание: Google Диск не может проверить файлы более 100 МБ на вирусы, поэтому выдает стандартное предупреждение. Это нормально для файла размером 750 МБ.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Kudinov Artem. Все права защищены.</p>
            </footer>
        </div>
    );
}
