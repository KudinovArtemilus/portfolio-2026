import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { blogPosts } from '../data/blogPosts';
import TechnoBackground from '../components/TechnoBackground';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import { useTechnoSounds } from '../hooks/useTechnoSounds';

export default function BlogList() {
    const { playClick } = useTechnoSounds();

    useEffect(() => {
        gsap.fromTo('.blog-item', 
            { opacity: 0, y: 30 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: "power3.out" 
            }
        );
    }, []);

    return (
        <div className="blog-list-view page-transition">
            <ScrollProgress />
            <TechnoBackground />
            <Navbar />
            
            <main className="container section-padding">
                <h1 className="section-title" style={{ marginTop: '4rem' }}>БЛОГ</h1>
                <div className="blog-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem'
                }}>
                    {blogPosts.map(post => (
                        <div key={post.id} className="blog-item" style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '20px',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            backdropFilter: 'blur(20px)',
                            transition: 'transform 0.3s ease, border-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.transform = 'translateY(-10px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}>
                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '600' }}>{post.date}</span>
                            <h3 style={{ margin: '1rem 0', fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', flex: 1 }}>{post.excerpt}</p>
                            <Link 
                                to={`/blog/${post.id}`} 
                                className="btn btn-secondary" 
                                style={{ alignSelf: 'flex-start' }}
                                onClick={() => playClick()}
                            >
                                Читать далее
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
