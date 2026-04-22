import 'package:flutter/material.dart';
import 'dart:js' as js;
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
  final List<String> _tabs = ['О себе', 'Опыт', 'Проекты', 'Навыки', 'Блог', 'Контакты'];

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
            backgroundImage: AssetImage('assets/images/me.jpg'),
            backgroundColor: IndustrialTheme.bgCard,
          ),
        ).animate().scale(duration: 600.ms, curve: Curves.easeOutBack),
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
      case 4: return const _BlogSection();
      case 5: return const _ContactSection();
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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionHeading(title: 'Навыки'),
        ...PortfolioData.categorizedSkills.entries.map((category) => Padding(
          padding: const EdgeInsets.only(bottom: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                category.key.toUpperCase(),
                style: IndustrialTheme.darkTheme.textTheme.labelLarge?.copyWith(
                  color: IndustrialTheme.accent.withOpacity(0.6),
                  letterSpacing: 2.0,
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: category.value.map((skill) => Chip(
                  label: Text(skill, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                  backgroundColor: IndustrialTheme.bgCard,
                  side: BorderSide(color: IndustrialTheme.accent.withOpacity(0.2)),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                )).toList(),
              ),
            ],
          ),
        )),
      ],
    ).animate().fadeIn();
  }
}

class _BlogSection extends StatelessWidget {
  const _BlogSection();
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionHeading(title: 'Статьи и Блог'),
        ...PortfolioData.blogPosts.map((post) => Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: Container(
            decoration: BoxDecoration(
              color: IndustrialTheme.bgCard,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white.withOpacity(0.05)),
            ),
            child: ListTile(
              contentPadding: const EdgeInsets.all(16),
              title: Text(post.title, style: IndustrialTheme.darkTheme.textTheme.titleLarge?.copyWith(fontSize: 18)),
              subtitle: Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(post.date, style: const TextStyle(color: Colors.white24, fontSize: 12)),
                    const SizedBox(height: 8),
                    Text(post.excerpt, style: IndustrialTheme.darkTheme.textTheme.bodyMedium),
                  ],
                ),
              ),
              trailing: const Icon(Icons.arrow_forward_ios, color: IndustrialTheme.accent, size: 16),
              onTap: () => context.go('/blog/${post.id}'),
            ),
          ),
        )),
      ],
    ).animate().fadeIn();
  }
}

class _ContactSection extends StatelessWidget {
  const _ContactSection();

  Future<void> _launchURL(String url) async {
    final Uri uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      debugPrint('Could not launch $url');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const _SectionHeading(title: 'Связь со мной'),
        Wrap(
          alignment: WrapAlignment.center,
          spacing: 20,
          runSpacing: 20,
          children: [
            _ContactIcon(
              icon: Icons.email,
              label: 'Email',
              onTap: () => _launchURL(PortfolioData.contacts['email']!),
            ),
            _ContactIcon(
              icon: Icons.link,
              label: 'LinkedIn',
              onTap: () => _launchURL(PortfolioData.contacts['linkedin']!),
            ),
            _ContactIcon(
              icon: Icons.code,
              label: 'GitHub',
              onTap: () => _launchURL(PortfolioData.contacts['github']!),
            ),
            _ContactIcon(
              icon: Icons.send,
              label: 'Telegram',
              onTap: () => _launchURL(PortfolioData.contacts['telegram']!),
            ),
            _ContactIcon(
              icon: Icons.person_add_alt_1,
              label: 'VK',
              onTap: () => _launchURL(PortfolioData.contacts['vk']!),
            ),
          ],
        ),
        const SizedBox(height: 40),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () => _launchURL(PortfolioData.contacts['resume']!),
            style: ElevatedButton.styleFrom(
              backgroundColor: IndustrialTheme.accent,
              foregroundColor: IndustrialTheme.bgDark,
              padding: const EdgeInsets.symmetric(vertical: 18),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('СКАЧАТЬ РЕЗЮМЕ (PDF)',
                style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2)),
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
  final VoidCallback onTap;

  const _ContactIcon({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: 'Открыть $label',
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: IndustrialTheme.bgCard,
                  shape: BoxShape.circle,
                  border: Border.all(color: IndustrialTheme.accent.withOpacity(0.1)),
                  boxShadow: [
                    BoxShadow(
                      color: IndustrialTheme.accent.withOpacity(0.05),
                      blurRadius: 10,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: Icon(icon, color: IndustrialTheme.accent, size: 32),
              ),
              const SizedBox(height: 12),
              Text(
                label,
                style: IndustrialTheme.darkTheme.textTheme.labelLarge?.copyWith(
                  color: Colors.white70,
                  letterSpacing: 1.1,
                ),
              ),
            ],
          ),
        ),
      ),
    ).animate().scale(delay: 100.ms, duration: 400.ms, curve: Curves.easeOutBack);
  }
}

class _Footer extends StatelessWidget {
  const _Footer();
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Divider(color: Colors.white10),
        const SizedBox(height: 30),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.precision_manufacturing, color: IndustrialTheme.accent, size: 20),
            const SizedBox(width: 8),
            const Text('© 2026 АРТЕМ КУДИНОВ // BUILT WITH FLUTTER', style: TextStyle(color: Colors.white10, fontSize: 10, letterSpacing: 2.0)),
          ],
        ),
        const SizedBox(height: 12),
        TextButton.icon(
          onPressed: () => js.context.callMethod('installPWA'),
          icon: const Icon(Icons.install_mobile, size: 14, color: IndustrialTheme.accent),
          label: const Text('УСТАНОВИТЬ КАК ПРИЛОЖЕНИЕ', style: TextStyle(color: IndustrialTheme.accent, fontSize: 10, fontWeight: FontWeight.bold)),
          style: TextButton.styleFrom(
            backgroundColor: IndustrialTheme.accent.withOpacity(0.05),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          ),
        ),
      ],
    );
  }
}
