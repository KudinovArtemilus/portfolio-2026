import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../components/techno_background.dart';
import '../theme/industrial_theme.dart';
import '../models/portfolio_data.dart';
import 'package:go_router/go_router.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const TechnoBackground(),
          CustomScrollView(
            slivers: [
              const _SliverNavbar(),
              SliverToBoxAdapter(
                child: _HeroSection(),
              ),
              const SliverPadding(
                padding: EdgeInsets.symmetric(vertical: 40),
                sliver: _ProjectsSection(),
              ),
              const SliverToBoxAdapter(
                child: _BlogSection(),
              ),
              SliverToBoxAdapter(
                child: _Footer(),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SliverNavbar extends StatelessWidget {
  const _SliverNavbar();

  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
      floating: true,
      backgroundColor: IndustrialTheme.bgDark.withOpacity(0.8),
      surfaceTintColor: Colors.transparent,
      title: Text(
        'KUDINOV.SYS',
        style: IndustrialTheme.darkTheme.textTheme.titleLarge,
      ),
      actions: [
        TextButton(onPressed: () {}, child: const Text('PROJECTS')),
        TextButton(onPressed: () {}, child: const Text('BLOG')),
        const SizedBox(width: 20),
      ],
    );
  }
}

class _HeroSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.8,
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'SYSTEM OPERATIONAL',
            style: IndustrialTheme.darkTheme.textTheme.headlineLarge?.copyWith(
              color: IndustrialTheme.accent,
            ),
          ).animate().fadeIn(duration: 800.ms).slideY(begin: 0.2),
          const SizedBox(height: 20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40),
            child: Text(
              'Kudinov Artem | Senior Engineer | Industrial Automation',
              textAlign: TextAlign.center,
              style: IndustrialTheme.darkTheme.textTheme.bodyLarge,
            ),
          ).animate().fadeIn(delay: 400.ms).shimmer(duration: 1200.ms),
        ],
      ),
    );
  }
}

class _ProjectsSection extends StatelessWidget {
  const _ProjectsSection();

  @override
  Widget build(BuildContext context) {
    return SliverGrid(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        mainAxisSpacing: 20,
        crossAxisSpacing: 20,
        childAspectRatio: 0.8,
      ),
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final project = PortfolioData.projects[index];
          return Card(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Container(
                    color: Colors.white10,
                    child: const Center(child: Icon(Icons.code, color: IndustrialTheme.accent)),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(project.title, style: const TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      Text(project.id.toUpperCase(), style: IndustrialTheme.darkTheme.textTheme.labelLarge),
                    ],
                  ),
                ),
              ],
            ),
          ).animate().scale(delay: (index * 100).ms, curve: Curves.easeOutBack);
        },
        childCount: PortfolioData.projects.length,
      ),
    );
  }
}

class _BlogSection extends StatelessWidget {
  const _BlogSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: PortfolioData.blogPosts.map((post) {
        return ListTile(
          title: Text(post.title),
          subtitle: Text(post.date),
          trailing: const Icon(Icons.chevron_right, color: IndustrialTheme.accent),
          onTap: () => context.go('/blog/${post.id}'),
        ).animate().fadeIn().slideX(begin: 0.1);
      }).toList(),
    );
  }
}

class _Footer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(vertical: 40),
      child: Center(child: Text('© 2026 KUDINOV ARTEM | ALL RIGHTS RESERVED')),
    );
  }
}
