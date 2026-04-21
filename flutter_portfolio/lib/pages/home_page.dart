import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/industrial_theme.dart';
import '../models/portfolio_data.dart';
import '../components/bento_card.dart';
import 'package:go_router/go_router.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _activeTab = 0;
  final List<String> _tabs = ['О себе', 'Опыт', 'Проекты', 'Навыки', 'Контакты'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Center(
          child: Container(
            constraints: const BoxConstraints(maxWidth: 800),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 60),
            child: Column(
              children: [
                const _ProfileHeader(),
                const SizedBox(height: 40),
                _TabSelector(
                  tabs: _tabs,
                  activeTab: _activeTab,
                  onTabChanged: (index) => setState(() => _activeTab = index),
                ),
                const SizedBox(height: 40),
                _TabContent(activeTab: _activeTab),
                const SizedBox(height: 60),
                const _Footer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ProfileHeader extends StatelessWidget {
  const _ProfileHeader();
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(4),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: IndustrialTheme.accent, width: 2),
            boxShadow: [
              BoxShadow(
                color: IndustrialTheme.accent.withOpacity(0.2),
                blurRadius: 20,
                spreadRadius: 5,
              ),
            ],
          ),
          child: const CircleAvatar(
            radius: 60,
            backgroundImage: AssetImage('assets/images/avatar.png'),
            backgroundColor: IndustrialTheme.bgCard,
          ),
        ).animate().scale(duration: 600.ms, curve: Curves.backOut),
        const SizedBox(height: 24),
        Text(
          'Артем Кудинов',
          style: IndustrialTheme.darkTheme.textTheme.displayLarge,
        ),
        const SizedBox(height: 8),
        Text(
          'Senior Automation Engineer // Backend Architect',
          textAlign: TextAlign.center,
          style: IndustrialTheme.darkTheme.textTheme.titleLarge?.copyWith(
            color: IndustrialTheme.accent,
            fontWeight: FontWeight.w400,
          ),
        ),
      ],
    );
  }
}

class _TabSelector extends StatelessWidget {
  final List<String> tabs;
  final int activeTab;
  final Function(int) onTabChanged;

  const _TabSelector({required this.tabs, required this.activeTab, required this.onTabChanged});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(tabs.length, (index) {
          final isActive = activeTab == index;
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: TextButton(
              onPressed: () => onTabChanged(index),
              style: TextButton.styleFrom(
                foregroundColor: isActive ? IndustrialTheme.accent : IndustrialTheme.textBody,
              ),
              child: Text(
                tabs[index],
                style: TextStyle(
                  fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                  fontSize: 16,
                ),
              ),
            ),
          );
        }),
      ),
    );
  }
}

class _TabContent extends StatelessWidget {
  final int activeTab;
  const _TabContent({required this.activeTab});

  @override
  Widget build(BuildContext context) {
    switch (activeTab) {
      case 0: return const _AboutSection();
      case 1: return const _ExperienceSection();
      case 2: return const _ProjectsSection();
      case 3: return const _SkillsSection();
      case 4: return const _ContactSection();
      default: return const SizedBox.shrink();
    }
  }
}

class _AboutSection extends StatelessWidget {
  const _AboutSection();
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionHeading(title: 'Обо мне'),
        Text(
          '13 лет опыта в разработке критически важного промышленного ПО. Я объединяю мир тяжелой автоматизации с современными высокопроизводительными бэкенд-системами. Специализируюсь на Java, Spring Boot и мониторинге систем PLC в реальном времени.',
          style: IndustrialTheme.darkTheme.textTheme.bodyLarge,
        ),
      ],
    ).animate().fadeIn();
  }
}

class _ExperienceSection extends StatelessWidget {
  const _ExperienceSection();
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionHeading(title: 'Опыт работы'),
        const _ExpItem(
          company: 'Промышленный холдинг',
          role: 'Senior Automation Engineer',
          period: '2020 - Настоящее время',
          desc: 'Разработка архитектуры систем мониторинга для заводов. Интеграция SCADA и Java-бэкендов.',
        ),
        const _ExpItem(
          company: 'Техно-Групп',
          role: 'Backend Developer',
          period: '2016 - 2020',
          desc: 'Оптимизация высоконагруженных систем управления производственными линиями.',
        ),
      ],
    ).animate().fadeIn();
  }
}

class _ProjectsSection extends StatelessWidget {
  const _ProjectsSection();
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionHeading(title: 'Проекты'),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 20,
            mainAxisSpacing: 20,
            childAspectRatio: 0.85,
          ),
          itemCount: PortfolioData.projects.length,
          itemBuilder: (context, index) {
            final p = PortfolioData.projects[index];
            return BentoCard(
              title: p.title,
              imageUrl: p.image,
              onTap: () => context.go('/blog/${p.id}'),
            );
          },
        ),
      ],
    ).animate().fadeIn();
  }
}

class _SkillsSection extends StatelessWidget {
  const _SkillsSection();
  @override
  Widget build(BuildContext context) {
    final skills = ['Java 21', 'Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Flutter', 'SCADA', 'PLC (S7)', 'Docker'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionHeading(title: 'Навыки'),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: skills.map((s) => Chip(
            label: Text(s, style: const TextStyle(fontWeight: FontWeight.bold)),
            backgroundColor: IndustrialTheme.bgCard,
            side: BorderSide(color: IndustrialTheme.accent.withOpacity(0.3)),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          )).toList(),
        ),
      ],
    ).animate().fadeIn();
  }
}

class _ContactSection extends StatelessWidget {
  const _ContactSection();
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const _SectionHeading(title: 'Связь со мной'),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _ContactIcon(icon: Icons.email, label: 'Email'),
            _ContactIcon(icon: Icons.link, label: 'LinkedIn'),
            _ContactIcon(icon: Icons.code, label: 'GitHub'),
          ],
        ),
        const SizedBox(height: 40),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: IndustrialTheme.accent,
              foregroundColor: IndustrialTheme.bgDark,
              padding: const EdgeInsets.symmetric(vertical: 18),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('СКАЧАТЬ РЕЗЮМЕ (PDF)', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2)),
          ),
        ),
      ],
    ).animate().fadeIn();
  }
}

class _SectionHeading extends StatelessWidget {
  final String title;
  const _SectionHeading({required this.title});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Text(
        title,
        style: IndustrialTheme.darkTheme.textTheme.headlineLarge,
      ),
    );
  }
}

class _ExpItem extends StatelessWidget {
  final String company, role, period, desc;
  const _ExpItem({required this.company, required this.role, required this.period, required this.desc});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(company, style: IndustrialTheme.darkTheme.textTheme.titleLarge),
              Text(period, style: const TextStyle(color: Colors.white24, fontSize: 12)),
            ],
          ),
          const SizedBox(height: 4),
          Text(role, style: TextStyle(color: IndustrialTheme.accent.withOpacity(0.8))),
          const SizedBox(height: 12),
          Text(desc, style: IndustrialTheme.darkTheme.textTheme.bodyMedium),
        ],
      ),
    );
  }
}

class _ContactIcon extends StatelessWidget {
  final IconData icon;
  final String label;
  const _ContactIcon({required this.icon, required this.label});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Icon(icon, color: IndustrialTheme.accent, size: 28),
          const SizedBox(height: 8),
          Text(label, style: const TextStyle(fontSize: 12, color: Colors.white38)),
        ],
      ),
    );
  }
}

class _Footer extends StatelessWidget {
  const _Footer();
  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Divider(color: Colors.white10),
        SizedBox(height: 30),
        Text('© 2026 АРТЕМ КУДИНОВ // FLUTTER WEB', style: TextStyle(color: Colors.white10, fontSize: 10, letterSpacing: 2.0)),
      ],
    );
  }
}
