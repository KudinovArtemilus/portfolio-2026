import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo" style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Кудинов Артем Владимирович</div>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>
            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li>
                    <MagneticButton>
                        <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Обо мне</a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Проекты</a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <Link to="/blog" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Блог</Link>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Контакты</a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a href="/images/resume.pdf" className="nav-link btn-download" download="Kudinov_CV.pdf">Резюме</a>
                    </MagneticButton>
                </li>
            </ul>
        </nav>
    );
}
