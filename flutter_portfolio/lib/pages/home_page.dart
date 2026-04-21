import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/industrial_theme.dart';
import '../models/portfolio_data.dart';
import 'package:go_router/go_router.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Center(
          child: Container(
            constraints: const BoxConstraints(maxWidth: 900),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 80),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const _ResumeHeader(),
                const SizedBox(height: 80),
                const _SectionTitle(title: 'PROFESSIONAL EXPERIENCE'),
                ...PortfolioData.projects.map((p) => _ExperienceItem(
                  company: p.title,
                  role: 'Senior Automation Engineer',
                  period: '2020 - PRESENT',
                  description: 'Specializing in Java-based industrial monitoring systems, SCADA integration, and high-performance backend architecture.',
                  tags: ['Java 21', 'Spring Boot', 'PLC', 'SCADA'],
                )),
                const SizedBox(height: 60),
                const _SectionTitle(title: 'CORE EXPERTISE'),
                const _SkillsGrid(),
                const SizedBox(height: 60),
                const _SectionTitle(title: 'LATEST INSIGHTS'),
                ...PortfolioData.blogPosts.take(3).map((post) => _BlogItem(post: post)),
                const SizedBox(height: 100),
                const _Footer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ResumeHeader extends StatelessWidget {
  const _ResumeHeader();

  Future<void> _downloadResume() async {
    const url = 'assets/resume.pdf';
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'ARTEM KUDINOV',
          style: IndustrialTheme.darkTheme.textTheme.displayLarge,
        ).animate().fadeIn(duration: 600.ms).slideX(begin: -0.1),
        const SizedBox(height: 12),
        Text(
          'SENIOR AUTOMATION ENGINEER // BACKEND ARCHITECT',
          style: IndustrialTheme.darkTheme.textTheme.labelLarge,
        ),
        const SizedBox(height: 32),
        Text(
          '13 years of expertise in developing mission-critical industrial software. I bridge the gap between heavy automation and modern high-performance backend systems, specializing in Java, Spring Boot, and real-time PLC monitoring.',
          style: IndustrialTheme.darkTheme.textTheme.bodyLarge,
        ).animate().fadeIn(delay: 300.ms),
        const SizedBox(height: 48),
        ElevatedButton.icon(
          onPressed: _downloadResume,
          style: ElevatedButton.styleFrom(
            backgroundColor: IndustrialTheme.accent,
            foregroundColor: IndustrialTheme.bgDark,
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          ),
          icon: const Icon(Icons.download_rounded),
          label: const Text('DOWNLOAD PDF RESUME', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.0)),
        ),
      ],
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;
  const _SectionTitle({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: IndustrialTheme.darkTheme.textTheme.labelLarge?.copyWith(
              color: IndustrialTheme.accent.withOpacity(0.5),
              letterSpacing: 4.0,
            ),
          ),
          const Divider(color: Colors.white10),
        ],
      ),
    );
  }
}

class _ExperienceItem extends StatelessWidget {
  final String company, role, period, description;
  final List<String> tags;

  const _ExperienceItem({
    required this.company,
    required this.role,
    required this.period,
    required this.description,
    required this.tags,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 48),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Expanded(child: Text(company.toUpperCase(), style: IndustrialTheme.darkTheme.textTheme.titleLarge)),
              Text(period, style: IndustrialTheme.darkTheme.textTheme.labelLarge?.copyWith(color: Colors.white38)),
            ],
          ),
          const SizedBox(height: 8),
          Text(role, style: IndustrialTheme.darkTheme.textTheme.bodyMedium?.copyWith(color: IndustrialTheme.accent)),
          const SizedBox(height: 16),
          Text(description, style: IndustrialTheme.darkTheme.textTheme.bodyLarge?.copyWith(fontSize: 16)),
          const SizedBox(height: 20),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: tags.map((t) => Chip(
              label: Text(t, style: const TextStyle(fontSize: 12)),
              backgroundColor: Colors.white.withOpacity(0.05),
              side: BorderSide.none,
            )).toList(),
          ),
        ],
      ),
    );
  }
}

class _SkillsGrid extends StatelessWidget {
  const _SkillsGrid();
  @override
  Widget build(BuildContext context) {
    final skills = ['Java 21', 'Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Flutter', 'SCADA', 'PLC (S7)', 'REST API'];
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: skills.map((s) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: IndustrialTheme.bgCard,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.white.withOpacity(0.05)),
        ),
        child: Text(s, style: const TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.0)),
      )).toList(),
    );
  }
}

class _BlogItem extends StatelessWidget {
  final dynamic post;
  const _BlogItem({required this.post});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(vertical: 12),
      title: Text(post.title, style: IndustrialTheme.darkTheme.textTheme.titleLarge?.copyWith(fontSize: 18, letterSpacing: 0)),
      subtitle: Padding(
        padding: const EdgeInsets.only(top: 8),
        child: Text(post.date, style: const TextStyle(color: Colors.white38)),
      ),
      trailing: const Icon(Icons.arrow_forward, color: IndustrialTheme.accent),
      onTap: () => context.go('/blog/${post.id}'),
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
        SizedBox(height: 60),
        Center(child: Text('© 2026 ARTEM KUDINOV // BUILT WITH FLUTTER', style: TextStyle(color: Colors.white24, fontSize: 12, letterSpacing: 2.0))),
        SizedBox(height: 40),
      ],
    );
  }
}
