import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../components/techno_background.dart';
import '../components/bento_card.dart';
import '../components/system_log_panel.dart';
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
          Row(
            children: [
              Expanded(
                child: CustomScrollView(
                  slivers: [
                    const _SliverNavbar(),
                    SliverPadding(
                      padding: const EdgeInsets.all(24),
                      sliver: SliverToBoxAdapter(
                        child: _BentoLayout(),
                      ),
                    ),
                    const SliverToBoxAdapter(child: _Footer()),
                  ],
                ),
              ),
              const SystemLogPanel(), // Modern Sidebar
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
      backgroundColor: Colors.transparent,
      elevation: 0,
      title: Text(
        'KUDINOV.OS',
        style: IndustrialTheme.darkTheme.textTheme.titleLarge,
      ),
      actions: [
        IconButton(
          onPressed: () {}, 
          icon: Icon(Icons.hub_outlined, color: IndustrialTheme.accent.withOpacity(0.5))
        ),
        IconButton(
          onPressed: () {}, 
          icon: Icon(Icons.settings_outlined, color: IndustrialTheme.accent.withOpacity(0.3))
        ),
        const SizedBox(width: 20),
      ],
    );
  }
}

class _BentoLayout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Hero Card (Large)
        SizedBox(
          height: 400,
          child: BentoCard(
            label: 'system_status: online',
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'SYSTEM OPERATIONAL',
                  textAlign: TextAlign.center,
                  style: IndustrialTheme.darkTheme.textTheme.headlineLarge?.copyWith(
                    color: IndustrialTheme.accent,
                    fontSize: 48,
                  ),
                ).animate().fadeIn().shimmer(duration: 2.seconds),
                const SizedBox(height: 16),
                Text(
                  'ARTEM KUDINOV // SENIOR AUTOMATION ENGINEER',
                  style: IndustrialTheme.darkTheme.textTheme.labelLarge,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 24),
        // Grid for Projects and Stats
        LayoutBuilder(builder: (context, constraints) {
          final isMobile = constraints.maxWidth < 800;
          return GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: isMobile ? 1 : 3,
            crossAxisSpacing: 24,
            mainAxisSpacing: 24,
            childAspectRatio: 1.2,
            children: [
              ...PortfolioData.projects.map((p) => BentoCard(
                title: p.title,
                label: 'project_ref: ${p.id}',
                child: Center(
                  child: Icon(Icons.developer_board, size: 48, color: IndustrialTheme.accent.withOpacity(0.3)),
                ),
              )),
              BentoCard(
                title: 'EXPERIENCE',
                label: 'uptime',
                child: Center(
                  child: Text('13+ YRS', style: IndustrialTheme.darkTheme.textTheme.headlineLarge),
                ),
              ),
            ],
          );
        }),
        const SizedBox(height: 24),
        // Blog Section (Wide Card)
        BentoCard(
          title: 'LATEST_LOGS',
          label: 'blog_feed',
          child: ListView(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            children: PortfolioData.blogPosts.take(3).map((post) => ListTile(
              title: Text(post.title),
              subtitle: Text(post.date),
              trailing: const Icon(Icons.arrow_forward, size: 16, color: IndustrialTheme.accent),
              onTap: () => context.go('/blog/${post.id}'),
            )).toList(),
          ),
        ),
      ],
    );
  }
}

class _Footer extends StatelessWidget {
  const _Footer();
  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(40),
      child: Center(child: Text('KERNEL_VERSION: 3.41.7 // 2026')),
    );
  }
}
