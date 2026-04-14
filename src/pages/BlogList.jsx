import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { blogPosts } from '../data/blogPosts';
import TechnoBackground from '../components/TechnoBackground';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import { useTechnoSounds } from '../hooks/useTechnoSounds';

import BlogCard from '../components/BlogCard';

export default function BlogList() {
    return (
        <div className="blog-list-view page-transition">
            <ScrollProgress />
            <TechnoBackground />
            <Navbar />
            
            <nav className="navbar project-navbar" style={{ position: 'relative', top: '0', background: 'transparent', border: 'none' }}>
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
            
            <main className="container section-padding" style={{ paddingTop: '2rem' }}>
                <h1 className="section-title" style={{ marginTop: '4rem' }}>БЛОГ</h1>
                <div className="blog-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '3rem',
                    marginTop: '2rem'
                }}>
                    {blogPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </div>
    );
}
