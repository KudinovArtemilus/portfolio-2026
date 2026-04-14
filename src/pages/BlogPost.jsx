import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gsap from 'gsap';
import { blogPosts } from '../data/blogPosts';
import TechnoBackground from '../components/TechnoBackground';
import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../components/Navbar';

export default function BlogPost() {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);
    const [content, setContent] = useState('Загрузка контента...');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!post) return;

        // Page transition animation
        gsap.fromTo('.blog-post-view', 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        // Fetch MD from Google Drive via our own Vercel API Proxy
        const driveId = post.driveId;
        const apiPath = `/api/fetch-drive?id=${driveId}`;

        fetch(apiPath)
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Server error');
                }
                return res.text();
            })
            .then(data => {
                if (!data) throw new Error('Статья пуста');
                setContent(data);
            })
            .catch(err => {
                console.error("Blog fetch error:", err);
                setError(`Ошибка загрузки: ${err.message}. Убедитесь, что файл на Google Диске доступен всем, у кого есть ссылка.`);
            });
    }, [post]);

    if (!post) return <div className="container" style={{ padding: '10rem 2rem' }}>Статья не найдена</div>;

    return (
        <div className="blog-post-view page-transition">
            <ScrollProgress />
            <TechnoBackground />
            <Navbar />

            <nav className="navbar project-navbar" style={{ position: 'relative', top: '0', background: 'transparent', border: 'none' }}>
                <div className="container">
                    <Link to="/blog" className="back-link">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Назад к списку статей
                    </Link>
                </div>
            </nav>

            <header className="project-header" style={{ height: '30vh' }}>
                <div className="container">
                    <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{post.date}</span>
                    <h1 className="gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '1rem' }}>{post.title}</h1>
                </div>
            </header>

            <section className="project-content section-padding">
                <div className="container">
                    <div className="md-content">
                        {error ? (
                            <div style={{ color: '#ff5555', padding: '2rem', border: '1px solid currentColor', borderRadius: '10px' }}>
                                {error}
                            </div>
                        ) : (
                            <ReactMarkdown>{content}</ReactMarkdown>
                        )}
                    </div>
                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <Link to="/blog" className="btn btn-secondary">
                            Назад к списку статей
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Kudinov Artem. Все права защищены.</p>
            </footer>
        </div>
    );
}
