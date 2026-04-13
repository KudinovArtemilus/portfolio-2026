import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from "@vercel/analytics/react";

// Lazy loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const ProjectPage = React.lazy(() => import('./pages/ProjectPage'));

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
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

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
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
                    </Routes>
                </Suspense>
            </div>
            <Analytics />
        </Router>
    );
}

export default App;
