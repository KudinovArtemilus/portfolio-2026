import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from "@vercel/analytics/react";

// Lazy loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const ProjectPage = React.lazy(() => import('./pages/ProjectPage'));
const BlogList = React.lazy(() => import('./pages/BlogList'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

gsap.registerPlugin(ScrollTrigger);

// Scroll to top or to hash on route change
function ScrollToTop() {
    const { pathname, hash } = useLocation();
    
    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            // Function to handle scrolling to hash
            const scrollToHash = () => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    // Use Lenis scroll if available, otherwise fall back to native
                    if (window.lenis) {
                        window.lenis.scrollTo(element, { offset: -100, duration: 1.5 });
                    } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                    return true;
                }
                return false;
            };

            // Try immediately
            if (!scrollToHash()) {
                // If not found (e.g. page still loading), poll for a few times
                let attempts = 0;
                const interval = setInterval(() => {
                    attempts++;
                    if (scrollToHash() || attempts > 20) {
                        clearInterval(interval);
                    }
                }, 100);
                return () => clearInterval(interval);
            }
        }
    }, [pathname, hash]);
    return null;
}

function Loader() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-dark)', color: 'var(--accent)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '4px' }}>ЗАГРУЗКА...</div>
        </div>
    );
}

function App() {
    useEffect(() => {
        // Set static dark theme
        document.body.className = 'dracula';

        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            normalizeWheel: true,
            infinite: false,
        });

        // Store lenis in window for global access (like in ScrollToTop)
        window.lenis = lenis;

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
            window.lenis = null;
        };
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div id="app">
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:id" element={<ProjectPage />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                    </Routes>
                </Suspense>
            </div>
            <Analytics />
        </Router>
    );
}

export default App;
