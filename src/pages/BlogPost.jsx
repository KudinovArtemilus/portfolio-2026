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
        // Using a CORS proxy to bypass Drive's restrictions
        const driveUrl = `https://drive.google.com/uc?export=download&id=${post.driveId}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(driveUrl)}`;

        fetch(proxyUrl)
            .then(res => {
                if (!res.ok) throw new Error('Ошибка загрузки');
                return res.json();
            })
            .then(data => {
                setContent(data.contents);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить статью. Проверьте права доступа к файлу на Google Диске (должен быть доступ у кого есть ссылка).');
            });
    }, [post]);

    if (!post) return <div className="container" style={{ padding: '10rem 2rem' }}>Статья не найдена</div>;

    return (
        <div className="blog-post-view page-transition">
            <ScrollProgress />
            <TechnoBackground />
            <Navbar />

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
