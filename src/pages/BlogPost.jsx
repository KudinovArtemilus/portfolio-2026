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

        // Fetch MD from Google Drive
        // Using a more stable CORS proxy
        const driveId = post.driveId;
        const driveUrl = `https://docs.google.com/uc?id=${driveId}&export=download`;
        
        // List of proxies to try
        const proxies = [
            (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
            (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}` // Fallback
        ];

        let currentProxyIndex = 0;

        const loadContent = (index) => {
            if (index >= proxies.length) {
                setError('Все прокси-серверы временно недоступны. Пожалуйста, попробуйте позже.');
                return;
            }

            const fetchUrl = proxies[index](driveUrl);
            
            fetch(fetchUrl)
                .then(res => {
                    if (!res.ok) throw new Error('Proxy error');
                    // For allorigins, it's JSON. For corsproxy.io, it's the raw content.
                    return index === 1 ? res.json() : res.text();
                })
                .then(data => {
                    let rawContent = (index === 1) ? data.contents : data;

                    if (!rawContent) throw new Error('Empty response');

                    // Check if we got HTML instead of Markdown
                    if (rawContent.toLowerCase().includes('<!doctype html>') || rawContent.toLowerCase().includes('<html')) {
                        throw new Error('Google Drive вернул страницу-предупреждение вместо файла. Проверьте права доступа.');
                    }

                    setContent(rawContent);
                })
                .catch(err => {
                    console.warn(`Proxy ${index} failed:`, err);
                    loadContent(index + 1); // Try next proxy
                });
        };

        loadContent(0);
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
