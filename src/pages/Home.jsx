import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projects';
import TechnoBackground from '../components/TechnoBackground';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import TypewriterText from '../components/TypewriterText';
import MagneticButton from '../components/MagneticButton';
import ScrollProgress from '../components/ScrollProgress';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

    useEffect(() => {
        // Clear existing triggers to avoid duplication in React StrictMode
        ScrollTrigger.getAll().forEach(t => t.kill());

        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            gsap.fromTo(title,
                { opacity: 0, x: -20 },
                {
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power2.out"
                }
            );
        });

        const revealItems = document.querySelectorAll('.reveal-item, .timeline-item, .edu-card');
        revealItems.forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 40 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: item.classList.contains('timeline-item') ? (index % 2) * 0.2 : 0
                }
            );
        });

        // Levitation animation for skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            gsap.fromTo(tag, 
                { opacity: 0, scale: 0.8 },
                {
                    scrollTrigger: {
                        trigger: tag.closest('.skills-category'),
                        start: "top 85%",
                    },
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    delay: (index % 10) * 0.05
                }
            );

            gsap.to(tag, {
                y: -5 - Math.random() * 5,
                duration: 2 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });
        });

        // Parallax for techno background
        gsap.to(".techno-bg", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            },
            y: 80,
            ease: "none"
        });

        gsap.to(".circuit-lines", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5
            },
            rotate: 3,
            scale: 1.05,
            ease: "none"
        });
    }, []);

    return (
        <div className="page-transition">
            <ScrollProgress />
            <TechnoBackground />
            <Navbar />

            <main>
                <section id="hero" className="hero">
                    <div className="hero-bg">
                        <img src="/images/hero_bg.png" alt="Фон" />
                    </div>
                    <div className="hero-content">
                        <h1 className="reveal-text">ДОБРО <span className="gradient-text">ПОЖАЛОВАТЬ</span></h1>
                        <TypewriterText 
                            text="Я Кудинов Артем Владимирович — Старший инженер-программист | Эксперт по Java и автоматизации" 
                            className="reveal-text-sub" 
                        />
                        <div className="cta-container">
                            <MagneticButton>
                                <a href="#projects" className="btn btn-primary">Мои проекты</a>
                            </MagneticButton>
                            <MagneticButton>
                                <a href="/images/resume.pdf" className="btn btn-secondary" download="Kudinov_CV.pdf">Скачать CV</a>
                            </MagneticButton>
                        </div>
                    </div>
                </section>

                <section id="about" className="about section-padding">
                    <div className="container">
                        <h2 className="section-title">ПРОФИЛЬ</h2>
                        <div className="about-grid">
                            <div className="about-text">
                                <p className="reveal-item">Разработчик ПО с 13-летним опытом в сфере промышленной автоматизации и ИТ. Специализируюсь на создании систем мониторинга, сбора данных в реальном времени и надежных full-stack приложений на Java и Spring Boot.</p>
                                <p className="reveal-item" style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>Эксперт в интеграции Java-приложений с промышленным оборудованием (Siemens PLC) и оптимизации высокопроизводительных алгоритмов.</p>
                            </div>
                            <div className="stats-grid">
                                <div className="stat-card reveal-item">
                                    <span className="stat-number">13+</span>
                                    <span className="stat-label">Лет опыта</span>
                                </div>
                                <div className="stat-card reveal-item">
                                    <span className="stat-number">Java</span>
                                    <span className="stat-label">Основной стек</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="skills" className="skills section-padding">
                    <div className="container">
                        <h2 className="section-title">НАВЫКИ</h2>
                        <div className="skills-container">
                            <div className="skills-category reveal-item">
                                <h3>Backend</h3>
                                <div className="skills-grid">
                                    <div className="skill-tag">Java Core</div>
                                    <div className="skill-tag">Spring Boot</div>
                                    <div className="skill-tag">Spring Data / Security</div>
                                    <div className="skill-tag">Hibernate / JPA</div>
                                    <div className="skill-tag">PostgreSQL / TimescaleDB</div>
                                    <div className="skill-tag">RabbitMQ / STOMP</div>
                                    <div className="skill-tag">FFmpeg / JavaCV</div>
                                    <div className="skill-tag">Maven</div>
                                </div>
                            </div>
                            <div className="skills-category reveal-item">
                                <h3>Frontend & Desktop</h3>
                                <div className="skills-grid">
                                    <div className="skill-tag">React</div>
                                    <div className="skill-tag">React Native</div>
                                    <div className="skill-tag">JavaFX</div>
                                    <div className="skill-tag">Swing / FlatLaf</div>
                                    <div className="skill-tag">JNativeHook</div>
                                </div>
                            </div>
                            <div className="skills-category reveal-item">
                                <h3>Automation & DevOps</h3>
                                <div className="skills-grid">
                                    <div className="skill-tag">Siemens PLC</div>
                                    <div className="skill-tag">PLC4X</div>
                                    <div className="skill-tag">Modbus / OPC UA</div>
                                    <div className="skill-tag">TIA Portal</div>
                                    <div className="skill-tag">Step 7</div>
                                    <div className="skill-tag">Linux</div>
                                    <div className="skill-tag">Docker</div>
                                    <div className="skill-tag">Git</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="experience" className="experience section-padding">
                    <div className="container">
                        <h2 className="section-title">ОПЫТ РАБОТЫ</h2>
                        <div className="timeline">
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">2023 — Наст. время</div>
                                <div className="timeline-content">
                                    <h3>Промашкомплект</h3>
                                    <h4>Инженер-электроник АСУП 1 категории (Java Developer)</h4>
                                    <p>Разработка full-stack систем мониторинга, проектирование GUI на JavaFX и оптимизация производственной аналитики.</p>
                                </div>
                            </div>
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">2021 — 2023</div>
                                <div className="timeline-content">
                                    <h3>Оптика сервис</h3>
                                    <h4>Java-разработчик</h4>
                                    <p>Участие в реализации enterprise-приложений для логистики и поставок.</p>
                                </div>
                            </div>
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">2018 — 2021</div>
                                <div className="timeline-content">
                                    <h3>Промашкомплект</h3>
                                    <h4>Java-разработчик / Пуско-наладка</h4>
                                    <p>Настройка систем прослеживаемости готовой продукции и промышленного ПО.</p>
                                </div>
                            </div>
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">Июль 2017 — Август 2018</div>
                                <div className="timeline-content">
                                    <h3>ТОО "Майкубен-Вест"</h3>
                                    <h4>Начальник GPS и мониторинга и Контрольно-пропускной системы</h4>
                                    <p>Выполнение организационных мероприятий работы GPS отдела и КПП, мониторинг техники, анализ данных автодиспетчеров и интеграция GPS-оборудования. Администрирование систем APACS 3000, видеонаблюдения и интеграция с 1С.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="projects section-padding">
                    <div className="container">
                        <h2 className="section-title">КЛЮЧЕВЫЕ ПРОЕКТЫ</h2>
                        <div className="projects-grid">
                            <ProjectCard project={projectsData['diagnostic']} />
                            <ProjectCard project={projectsData['monitoring']} />
                            <ProjectCard project={projectsData['digital-twin']} />
                        </div>

                        <h2 className="section-title" style={{ marginTop: '6rem' }}>ДРУГИЕ ПРОЕКТЫ</h2>
                        <div className="other-projects-list">
                            <div className="other-project-item reveal-item">
                                <div className="other-project-icon">📹</div>
                                <div className="other-project-info">
                                    <h3>Java Screen Recorder</h3>
                                    <div className="project-tag" style={{ marginBottom: '5px' }}>Новое</div>
                                    <p>Высокопроизводительное приложение для фоновой записи экрана с отображением клавиатуры.</p>
                                    <div className="project-actions" style={{ marginTop: '10px' }}>
                                        <Link to="/project/recorder" className="btn btn-secondary">Описание</Link>
                                        <a href={projectsData['recorder'].downloadUrl} className="btn btn-download" download>Скачать</a>
                                    </div>
                                    <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '8px' }}>
                                        * Google Диск выдает предупреждение из-за размера (750 МБ)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact section-padding">
                    <div className="container">
                        <div className="contact-card">
                            <h2 className="section-title">ГОТОВЫ К СОТРУДНИЧЕСТВУ?</h2>
                            <p>Давайте создадим надежное и производительное решение вместе.</p>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <MagneticButton>
                                    <a href="mailto:kudinovartemilus@gmail.com" className="contact-btn">
                                        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                        Написать мне
                                    </a>
                                </MagneticButton>
                                <MagneticButton>
                                    <a href="https://t.me/kudinovartem" className="contact-btn">
                                        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.08-.18-.09-.05-.24-.02-.34 0-.14.03-2.33 1.47-6.57 4.33-.62.43-1.18.64-1.68.63-.55-.01-1.61-.31-2.4-.57-.97-.31-1.74-.48-1.68-1.01.03-.27.4-.55 1.11-.84 4.35-1.89 7.25-3.14 8.7-3.74 4.14-1.72 5-2.02 5.57-2.03.13 0 .4.03.55.15.12.1.16.24.18.37.01.07.01.14 0 .2z" /></svg>
                                        Telegram
                                    </a>
                                </MagneticButton>
                                <MagneticButton>
                                    <a href="https://github.com/KudinovArtemilus" className="contact-btn">
                                        <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                        GitHub
                                    </a>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} Kudinov Artem. Все права защищены.</p>
                </footer>
            </main>
        </div>
    );
}
