import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';

function App() {
    const appRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorHover, setCursorHover] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const [selectedProject, setSelectedProject] = useState(null);

    const recorderDescription = `
# Java Screen Recorder Development

Высокопроизводительная и незаметная программа для записи экрана, написанная на Java. Создана для фонового мониторинга и удобного создания скринкастов. Программа автоматически прячется в системный трей при запуске и моментально начинает запись.

## 🚀 Основные возможности

- **Автоматический скрытый запуск:** При открытии программы главное окно не появляется — она сразу сворачивается в системный трей и автоматически начинает запись экрана.
- **Умное отображение нажатий клавиш:** Все нажимаемые пользователем клавиши (включая комбинации вроде Ctrl + Shift + R) крупно отображаются поверх записываемого видео для наглядности.
- **Высокая производительность кодирования:** Использует нативный движок FFmpeg (через библиотеку JavaCV) с ультра-быстрым профилем кодирования H.264, что обеспечивает минимальную нагрузку на систему без потери качества.
- **Глобальные горячие клавиши:** Управление записью доступно из любой точки операционной системы, даже во время работы в другом полноэкранном приложении.
- **Защита доступа паролем:** Ключевые действия (остановка записи, выход, смена пароля) защищены паролем для предотвращения случайного или несанкционированного вмешательства.
- **Изменяемый пароль:** Изначальный пароль 0646 можно легко изменить в настройках, при этом для смены потребуется подтверждение старого пароля.
- **Гибкие настройки хранилища:** Выбор папки для сохранения видеофайлов через графический интерфейс (поддерживаются как локальные, так и подключенные сетевые диски).
- **Надежность данных:** Запись автоматически разбивается на часовые отрезки, чтобы при сбое питания или системы видео не повредилось.

## ⚙️ Управление и использование

- **Начать / Остановить запись:** Глобальная комбинация клавиш Ctrl + Shift + R (срабатывает везде).
- **Пароль по умолчанию:** 0646
- **Доступ к настройкам:** В системном трее Windows кликните по иконке программы правой или левой кнопкой мыши и выберите "Развернуть окно". Здесь можно нажать "Настройки ⚙", чтобы изменить путь к сохранению или Сменить пароль.
- **Выход из программы:** Нажмите правой кнопкой мыши по иконке программы в системном трее и выберите "Выйти из программы".

## 🛠 Технологический стек

- Java 21, JavaCV (FFmpeg), JNativeHook, FlatLaf (Darcula), Java Preferences API.
`;

    return (
        <div id="app" ref={appRef}>
            {/* Project Modal */}
            {selectedProject && (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
                        <div className="modal-body">
                            <pre className="md-content">{selectedProject.description}</pre>
                            {selectedProject.downloadUrl && (
                                <div className="modal-footer">
                                    <a href={selectedProject.downloadUrl} className="btn btn-primary" download>
                                        Скачать проект
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

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
                <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li><a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Обо мне</a></li>
                    <li><a href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Проекты</a></li>
                    <li><a href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Контакты</a></li>
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
                                    <div className="project-actions">
                                        <button className="btn btn-secondary" onClick={() => setSelectedProject({ title: 'Цифровой отпечаток', description: 'Подробное описание в разработке...' })}>Подробнее</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="section-title" style={{ marginTop: '6rem' }}>ДРУГИЕ ПРОЕКТЫ</h2>
                        <div className="other-projects-list">
                            <div className="other-project-item reveal-item">
                                <div className="other-project-icon">☕</div>
                                <div className="other-project-info">
                                    <h3>Диагностические утилиты</h3>
                                    <p>Набор инструментов на Java для анализа логов и диагностики оборудования.</p>
                                </div>
                            </div>
                            <div className="other-project-item reveal-item">
                                <div className="other-project-icon">🛠</div>
                                <div className="other-project-info">
                                    <h3>Логистические системы</h3>
                                    <p>Участие в реализации enterprise-приложений для Оптика сервис.</p>
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
