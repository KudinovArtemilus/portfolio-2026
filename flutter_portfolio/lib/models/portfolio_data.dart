import 'blog_post.dart';

class Project {
  final String id;
  final String title;
  final String description;
  final String image;
  final String? downloadUrl;

  Project({
    required this.id,
    required this.title,
    required this.description,
    required this.image,
    this.downloadUrl,
  });
}

class PortfolioData {
  static final List<Project> projects = [
    Project(
      id: 'monitoring',
      title: 'Промышленный мониторинг',
      description: '# Промышленный мониторинг\n\nСистема сбора данных в реальном времени с контроллеров Siemens S7.',
      image: 'assets/images/project_1.png',
    ),
    Project(
      id: 'recorder',
      title: 'Java Screen Recorder',
      description: '# Java Screen Recorder\n\nВысокопроизводительное приложение для фоновой записи экрана.',
      image: 'assets/images/project_recorder.png',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=1wNTMgpYXYgl18m_NzbOY3LzzlBWD7dhC',
    ),
    Project(
      id: 'diagnostic',
      title: 'Диагностические утилиты',
      description: '# Диагностические утилиты\n\nРазработка систем глубокой диагностики промышленного оборудования.',
      image: 'assets/images/project_2.png',
    ),
    Project(
      id: 'digital-twin',
      title: 'Цифровой отпечаток',
      description: '# Цифровой отпечаток\n\nСоздание цифровых двойников для оптимизации производственных процессов.',
      image: 'assets/images/project_3.png',
    ),
  ];

  static final List<BlogPost> blogPosts = [
    BlogPost(
      id: 'java-industrial-strategy',
      title: 'Java для промышленных систем: Стратегия цифровой трансформации',
      date: '2026-04-17',
      excerpt: 'Почему выбор Java для производственных систем — это не просто смена языка...',
      driveId: '15bDwl-YNQehQBPUHMgu8Gh4Wy_fsqWcf',
    ),
    BlogPost(
      id: 'spravochnik-oshibok',
      title: 'Справочник ошибок в кармане: как упростить жизнь дежурному инженеру',
      date: '2026-04-16',
      excerpt: 'Когда на производстве останавливается линия, инженер часто видит только код ошибки...',
      driveId: '1JcAE43mkCOkjgWtZecQEHz1mZ-1WihPN',
    ),
    BlogPost(
      id: 'java-automation',
      title: 'Автоматизация на Java: Мой опыт и честные выводы',
      date: '2026-04-13',
      excerpt: 'Практические наблюдения о внедрении Java в промышленность...',
      driveId: '1Pwnezz09Olh0alGxNWIL24mUwAXgogwY',
    ),
    BlogPost(
      id: 'react-performance',
      title: 'Оптимизация React приложений для портфолио',
      date: '2026-04-12',
      excerpt: 'Разбираем WebP, ленивую загрузку и GSAP анимации...',
      driveId: '1wNTMgpYXYgl18m_NzbOY3LzzlBWD7dhC',
    ),
    BlogPost(
      id: 'path-to-it-2026',
      title: 'Путь в IT в 2026: голая, безжалостная правда',
      date: '2026-04-14',
      excerpt: 'Честный взгляд на современную IT-индустрию, дисциплину и выбор технологий...',
      driveId: '19Rjh_n1j73Md-_xTBWSI7M-vCpiQt6aG',
    ),
  ];

  static final Map<String, List<String>> categorizedSkills = {
    'Языки & Backend': ['Java 21', 'Spring Boot', 'SQL (PostgreSQL)', 'RabbitMQ', 'Kafka', 'ActiveMQ', 'Hibernate'],
    'Промышленная автоматизация': ['Siemens S7 PLC', 'SCADA (WinCC)', 'Sinamics Starter', 'Micromaster', 'APACS 3000', 'Modbus TCP/RTU', 'TIA Portal'],
    'Индустриальное оборудование (Бренды)': ['Schuler', 'Andritz', 'Starman', 'MSA', 'NSG', 'SEW Eurodrive', 'Danfoss'],
    'Frontend & Mobile': ['Flutter', 'Dart', 'React (legacy)', 'HTML/CSS'],
    'Инструменты & DevOps': ['Maven', 'Gradle', 'Docker', 'Git', 'Vercel', 'Postman', '1C:Предприятие 8.3'],
  };

  static final Map<String, String> contacts = {
    'email': 'mailto:kudinovArtemilus@gmail.com',
    'linkedin': 'https://www.linkedin.com/in/%D0%B0%D1%80%D1%82%D0%B5%D0%BC-%D0%BA%D1%83%D0%B4%D0%B8%D0%BD%D0%BE%D0%B2-989461208/',
    'github': 'https://github.com/KudinovArtemilus',
    'telegram': 'https://t.me/kudinovartem',
    'vk': 'https://vk.com/a.kudinov2017',
    'resume': 'assets/resume.pdf',
  };
}
