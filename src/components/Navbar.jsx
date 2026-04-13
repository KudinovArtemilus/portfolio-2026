import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    // Helper to handle navigation
    const handleNavClick = (e, id) => {
        setIsMobileMenuOpen(false);
        if (!isHome) {
            e.preventDefault();
            // Navigate to home with hash
            navigate('/' + id);
        }
    };

    const NavLink = ({ id, children, className }) => {
        return (
            <a 
                href={id} 
                className={className} 
                onClick={(e) => handleNavClick(e, id)}
            >
                {children}
            </a>
        );
    };

    return (
        <nav className="navbar">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="logo" style={{ fontSize: '1.2rem', letterSpacing: '1px', cursor: 'pointer' }}>Кудинов Артем Владимирович</div>
            </Link>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>
            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li>
                    <MagneticButton>
                        <NavLink id="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Обо мне</NavLink>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <NavLink id="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Проекты</NavLink>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <Link to="/blog" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Блог</Link>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <NavLink id="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Контакты</NavLink>
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
