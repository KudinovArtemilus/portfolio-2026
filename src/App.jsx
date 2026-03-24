import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';

function App() {
    const appRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorHover, setCursorHover] = useState(false);

    useEffect(() => {
        // Set static dark theme
        document.body.className = 'dracula';

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.classList.contains('btn')) {
                setCursorHover(true);
            }
        };
        const handleMouseOut = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.classList.contains('btn')) {
                setCursorHover(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Register ScrollTrigger if window.gsap exists
        if (window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);

            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                window.gsap.fromTo(title,
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

            const revealItems = document.querySelectorAll('.reveal-item, .timeline-item, .skill-tag, .edu-card');
            revealItems.forEach((item, index) => {
                window.gsap.fromTo(item,
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
                        delay: item.classList.contains('skill-tag') ? (index % 5) * 0.1 : item.classList.contains('timeline-item') ? (index % 2) * 0.2 : 0
                    }
                );
            });
        }

        return () => {
            lenis.destroy();
            if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div id="app" ref={appRef}>
            {/* Custom Cursor */}
            <div
                className="custom-cursor"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    width: cursorHover ? '50px' : '30px',
                    height: cursorHover ? '50px' : '30px',
                    backgroundColor: cursorHover ? 'rgba(189, 147, 249, 0.2)' : 'transparent',
                    borderColor: cursorHover ? 'var(--accent)' : 'var(--accent)'
                }}
            />
            <div
                className="custom-cursor-dot"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
            />

            <nav className="navbar">
                <div className="logo" style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Кудинов Артем Владимирович</div>
                <ul className="nav-links">
                    <li><a href="#about" className="nav-link">Обо мне</a></li>
                    <li><a href="#projects" className="nav-link">Проекты</a></li>
                    <li><a href="#contact" className="nav-link">Контакты</a></li>
                    <li><a href="/images/resume.pdf" className="nav-link btn-download" download="Kudinov_CV.pdf">Резюме</a></li>
                </ul>
            </nav>

            <main>
                <section id="hero" className="hero">
                    <div className="hero-bg">
                        <img src="/images/hero_bg.png" alt="Фон" />
                    </div>
                    <div className="hero-content">
                        <h1 className="reveal-text">ДОБРО <span className="gradient-text">ПОЖАЛОВАТЬ</span></h1>
                        <p className="reveal-text-sub">Я Кудинов Артем Владимирович — Старший инженер-программист | Эксперт по Java и автоматизации</p>
                        <div className="cta-container">
                            <a href="#projects" className="btn btn-primary">Мои проекты</a>
                            <a href="/images/resume.pdf" className="btn btn-secondary" download="Kudinov_CV.pdf">Скачать CV</a>
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
                                    <div className="skill-tag">Spring Data</div>
                                    <div className="skill-tag">Spring Security</div>
                                    <div className="skill-tag">JDBC / Hibernate</div>
                                    <div className="skill-tag">SQL</div>
                                    <div className="skill-tag">Maven</div>
                                </div>
                            </div>
                            <div className="skills-category reveal-item">
                                <h3>Frontend & Desktop</h3>
                                <div className="skills-grid">
                                    <div className="skill-tag">React</div>
                                    <div className="skill-tag">React Native</div>
                                    <div className="skill-tag">JavaFX</div>
                                    <div className="skill-tag">Swing</div>
                                </div>
                            </div>
                            <div className="skills-category reveal-item">
                                <h3>Automation & DevOps</h3>
                                <div className="skills-grid">
                                    <div className="skill-tag">Siemens PLC</div>
                                    <div className="skill-tag">TIA Portal</div>
                                    <div className="skill-tag">Step 7</div>
                                    <div className="skill-tag">Linux</div>
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
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">Апрель 2016 — Июль 2017</div>
                                <div className="timeline-content">
                                    <h3>ТОО "Майкубен-Вест"</h3>
                                    <h4>Техник-программист</h4>
                                    <p>Контрольно-пропускная система (APACS 3000), выдача пропусков, настройка турникетов, сверка с 1С, выяснение отклонений от графиков и просмотр видеонаблюдения.</p>
                                </div>
                            </div>
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">Июнь 2014 — Август 2014</div>
                                <div className="timeline-content">
                                    <h3>ТОО "Элтекс" г. Новосибирск</h3>
                                    <h4>Техник-программист</h4>
                                    <p>Ремонт сетевого оборудования, решение проблем клиентов с сетевым оборудованием.</p>
                                </div>
                            </div>
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">Февраль 2013 — Сентябрь 2013</div>
                                <div className="timeline-content">
                                    <h3>СибГУТИ г. Новосибирск</h3>
                                    <h4>Техник (Кафедра МЭСиОС)</h4>
                                    <p>Обслуживание оборудования, системное администрирование, работа с персоналом.</p>
                                </div>
                            </div>
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">Апрель 2012 — Февраль 2013</div>
                                <div className="timeline-content">
                                    <h3>СибГУТИ г. Новосибирск</h3>
                                    <h4>Старший лаборант</h4>
                                    <p>Обслуживание оборудования, поддержание пожарной безопасности.</p>
                                </div>
                            </div>
                            <div className="timeline-item reveal-item">
                                <div className="timeline-date">Январь 2008 — Январь 2010</div>
                                <div className="timeline-content">
                                    <h3>Уникод компьютерный центр</h3>
                                    <h4>Техник</h4>
                                    <p>Обслуживание клиентов, ремонт ПК и организационной техники.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="education" className="education section-padding">
                    <div className="container">
                        <h2 className="section-title">ОБРАЗОВАНИЕ</h2>
                        <div className="education-grid">
                            <div className="edu-card reveal-item">
                                <h3>СибГУТИ, Новосибирск</h3>
                                <p className="edu-degree">Бакалавр, Многоканальная связь</p>
                                <p className="edu-year">Выпуск: 2018</p>
                            </div>
                            <div className="edu-card reveal-item">
                                <h3>Экибастузкий гуманитарно-технический колледж</h3>
                                <p className="edu-degree">Программное обеспечение</p>
                                <p className="edu-year">Выпуск: 2010</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="projects section-padding">
                    <div className="container">
                        <h2 className="section-title">КЛЮЧЕВЫЕ ПРОЕКТЫ</h2>
                        <div className="projects-grid">
                            <div className="project-card reveal-item">
                                <div className="project-image">
                                    <img src="/images/project_1.png" alt="Промышленный мониторинг" />
                                </div>
                                <div className="project-info">
                                    <h3>Промышленный мониторинг</h3>
                                    <p>Full-stack решение (Java Spring Boot / React) для сбора данных с контроллеров в реальном времени. Интеграция с ПЛК Siemens.</p>
                                </div>
                            </div>
                            <div className="project-card reveal-item">
                                <div className="project-image">
                                    <img src="/images/project_2.png" alt="Инженерные утилиты" />
                                </div>
                                <div className="project-info">
                                    <h3>Диагностические утилиты</h3>
                                    <p>Набор инструментов на Java для анализа логов и автоматизированной диагностики оборудования.</p>
                                </div>
                            </div>
                            <div className="project-card reveal-item">
                                <div className="project-image">
                                    <img src="/images/project_3.png" alt="Визуализация процессов" />
                                </div>
                                <div className="project-info">
                                    <h3>Цифровой отпечаток производства</h3>
                                    <p>SCADA-системы и высокопроизводительные десктопные приложения (JavaFX/Swing) для визуализации техпроцессов.</p>
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
                                <a href="mailto:kudinovartemilus@gmail.com" className="contact-btn">
                                    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                    Написать мне
                                </a>
                                <a href="https://t.me/kudinovartem" className="contact-btn">
                                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.08-.18-.09-.05-.24-.02-.34 0-.14.03-2.33 1.47-6.57 4.33-.62.43-1.18.64-1.68.63-.55-.01-1.61-.31-2.4-.57-.97-.31-1.74-.48-1.68-1.01.03-.27.4-.55 1.11-.84 4.35-1.89 7.25-3.14 8.7-3.74 4.14-1.72 5-2.02 5.57-2.03.13 0 .4.03.55.15.12.1.16.24.18.37.01.07.01.14 0 .2z" /></svg>
                                    Telegram
                                </a>
                                <a href="https://github.com/KudinovArtemilus" className="contact-btn">
                                    <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
