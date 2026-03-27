import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import ReactMarkdown from 'react-markdown';

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const recorderDescription = `
![Java Screen Recorder](/images/project_recorder.png)

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

const monitoringDescription = `
# Платформа промышленного мониторинга: Полный обзор системы

Этот документ предназначен для презентации функциональных возможностей системы, её архитектурных решений, областей применения и анализа текущих векторов развития.

---

## 1. Основное назначение системы

Система представляет собой SCADA-подобную платформу реального времени, предназначенную для централизованного сбора данных с промышленных логических контроллеров (ПЛК), мониторинга технологических процессов, ведения истории параметров и формирования аналитической отчетности.

---

## 2. Ключевой функционал

### ![📡](https://fonts.gstatic.com/s/e/notoemoji/17.0/1f4e1/32.png) Сбор данных и управление ПЛК

- Драйвер PLC4X (S7): Поддержка протокола Siemens S7 (300, 1200, 1500) с возможностью расширения на Modbus и OPC UA.
- Частота опроса 300мс: Сверхбыстрый цикл опроса в асинхронном режиме (Scheduling) без блокировки основного приложения.
- Дистанционная настройка: Добавление новых контроллеров и отдельных тегов (Sensor) "на лету" через веб-интерфейс без остановки сервера.
- Мониторинг внутреннего времени: Контроль системных часов ПЛК для прецизионной синхронизации данных.

### ![📊](https://fonts.gstatic.com/s/e/notoemoji/17.0/1f4ca/32.png) Визуализация и Dashboards

- Real-time трансляция: Использование связки RabbitMQ + STOMP для мгновенной доставки телеметрии в браузер по принципу Push-уведомлений.
- Динамические графики (Trends): Отображение "живых" трендов с оптимизацией отрисовки (автоматическая обрезка старых точек в памяти браузера).
- Персонализация: Каждый пользователь настраивает свой Dashboard (выбор нужных ПЛК и датчиков), конфигурация сохраняется в БД.
- Интерактивная карта сети: Визуальное представление топологии цеха с индикацией статуса связи (Online/Offline) в реальном времени.

### ![💾](https://fonts.gstatic.com/s/e/notoemoji/17.0/1f4be/32.png) Аналитика и База Данных

- TimescaleDB (Hypertable): Промышленное хранилище, превращающее PostgreSQl в мощную Time-Series базу данных. Она оптимизирована под миллионы записей в сутки и мгновенный поиск.
- Сменные отчеты: Автоматическая генерация статистики за смену (Мин/Макс, среднее, количество срабатываний, частота ошибок).
- Групповые операции (Bulk Query): Использование агрегирующих SQL-запросов (GROUP BY) позволяет собирать отчеты по сотням датчиков за секунды, что в 10-20 раз быстрее стандартных методов.
- Автоматическая очистка (Retention Policy): Встроенный планировщик, который удаляет устаревшие данные по достижении заданного срока (например, 30 или 90 дней), предотвращая переполнение диска.

### ![⚠️](https://fonts.gstatic.com/s/e/notoemoji/17.0/26a0_fe0f/32.png) Аварийная сигнализация (Alarming)

- Stuck Detector: Интеллектуальное обнаружение "зависших" сигналов — если датчик шлет одно и то же значение слишком долго, система подает сигнал тревоги.
- Контроль пределов: Мгновенная фиксация выхода параметра за технологическую границу (Alarm Limits).
- Умный журнал аварй: Запись события только в момент изменения состояния, что исключает "замусоривание" журнала тысячами одинаковых записей.

### ![📂](https://fonts.gstatic.com/s/e/notoemoji/17.0/1f4c2/32.png) Мониторинг конфигурационных файлов (Recipes)

- Network Folder Tracking: Постоянный контроль изменений в файлах рецептур, настроек или логов оборудования на сетевых дисках (SMB/CIFS).
- Визуальный Diff: Посимвольное выделение измененных значений в конфигурациях для быстрого аудита действий персонала.

---

## 3. Области применения (Use Cases)

- Мониторинг производства: Единый пульт контроля для начальника цеха или главного инженера.
- Техническое обслуживание (PdM): Выявление аномалий в работе оборудования до его выхода из строя.
- Контроль качества: Доказательная база по соблюдению температурных или скоростных режимов при производстве партии.
- Аудит изменений: Отслеживание несанкционированных правок в рецептурах станков.

---

## 4. Сильные стороны (Strengths)

- ![🚀](https://fonts.gstatic.com/s/e/notoemoji/17.0/1f680/32.png) Масштабируемость: Благодаря RabbitMQ система выдержит сотни одновременно подключенных операторов.
- ![⚡](https://fonts.gstatic.com/s/e/notoemoji/17.0/26a1/32.png) Производительность: Использование TimescaleDB гарантирует, что графики будут летать даже через год эксплуатации.
- ![🛡️](https://fonts.gstatic.com/s/e/notoemoji/17.0/1f6e1_fe0f/32.png) Безопасность: Ролевая модель (RBAC) на базе Spring Security с шифрованием паролей BCrypt.
- ![🇷🇺](https://fonts.gstatic.com/s/e/notoemoji/17.0/1f1f7_1f1fa/32.png) Локализация: Полная поддержка кириллицы и специфических кодировок (Windows-1251) для совместимости со старым оборудованием.
`;

const projectsData = {
    'monitoring': {
        id: 'monitoring',
        title: 'Промышленный мониторинг',
        description: monitoringDescription,
        image: '/images/project_1.png'
    },
    'recorder': {
        id: 'recorder',
        title: 'Java Screen Recorder',
        description: recorderDescription,
        image: '/images/project_recorder.png',
        downloadUrl: '/downloads/setup.exe'
    },
    'diagnostic': {
        id: 'diagnostic',
        title: 'Диагностические утилиты',
        description: '# Диагностические утилиты\n\nПодробное описание в разработке...',
        image: '/images/project_2.png'
    },
    'digital-twin': {
        id: 'digital-twin',
        title: 'Цифровой отпечаток',
        description: '# Цифровой отпечаток\n\nПодробное описание в разработке...',
        image: '/images/project_3.png'
    }
};

function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Initialize ScrollTrigger animations
        if (window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger);
            
            // Clear existing triggers to avoid duplication
            window.ScrollTrigger.getAll().forEach(t => t.kill());

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
    }, []);

    return (
        <>
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
                        </div>
                    </div>
                </section>

                <section id="projects" className="projects section-padding">
                    <div className="container">
                        <h2 className="section-title">КЛЮЧЕВЫЕ ПРОЕКТЫ</h2>
                        <div className="projects-grid">
                            <div className="project-card reveal-item">
                                <div className="project-image">
                                    <img src="/images/project_2.png" alt="Диагностические утилиты" />
                                </div>
                                <div className="project-info">
                                    <h3>Диагностические утилиты</h3>
                                    <p>Набор инструментов на Java для анализа логов и автоматизированной диагностики оборудования.</p>
                                    <div className="project-actions">
                                        <Link to="/project/diagnostic" className="btn btn-secondary">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="project-card reveal-item">
                                <div className="project-image">
                                    <img src="/images/project_1.png" alt="Промышленный мониторинг" />
                                </div>
                                <div className="project-info">
                                    <h3>Промышленный мониторинг</h3>
                                    <p>Full-stack решение для сбора данных с ПЛК Siemens в реальном времени.</p>
                                    <div className="project-actions">
                                        <Link to="/project/monitoring" className="btn btn-secondary">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="project-card reveal-item">
                                <div className="project-image">
                                    <img src="/images/project_3.png" alt="Визуализация процессов" />
                                </div>
                                <div className="project-info">
                                    <h3>Цифровой отпечаток</h3>
                                    <p>SCADA-системы и высокопроизводительные десктопные приложения для визуализации техпроцессов.</p>
                                    <div className="project-actions">
                                        <Link to="/project/digital-twin" className="btn btn-secondary">Подробнее</Link>
                                    </div>
                                </div>
                            </div>
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
                                        <a href="/downloads/setup.exe" className="btn btn-download" download>Скачать</a>
                                    </div>
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
                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} Kudinov Artem. Все права защищены.</p>
                </footer>
            </main>
        </>
    );
}

function ProjectPage() {
    const { id } = useParams();
    const project = projectsData[id];

    if (!project) return <div className="container" style={{ padding: '10rem 2rem' }}>Проект не найден</div>;

    return (
        <div className="project-detail-view">
             <nav className="navbar project-navbar">
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

            <header className="project-header">
                 <div className="hero-bg">
                    <img src={project.image} alt={project.title} />
                </div>
                <div className="container">
                    <h1 className="gradient-text">{project.title}</h1>
                </div>
            </header>

            <section className="project-content section-padding">
                <div className="container">
                    <div className="md-content">
                        <ReactMarkdown>{project.description}</ReactMarkdown>
                    </div>
                    {project.downloadUrl && (
                        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                            <a href={project.downloadUrl} className="btn btn-primary" download>
                                Скачать проект
                            </a>
                        </div>
                    )}
                </div>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Kudinov Artem. Все права защищены.</p>
            </footer>
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

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <div id="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:id" element={<ProjectPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
