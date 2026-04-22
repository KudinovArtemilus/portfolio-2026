import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'theme/industrial_theme.dart';
import 'pages/home_page.dart';
import 'pages/blog_page.dart';
import 'models/portfolio_data.dart'; // We'll create this or merge into existing

void main() {
  runApp(const PortfolioApp());
}

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    final GoRouter router = GoRouter(
      initialLocation: '/',
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const HomePage(),
        ),
        GoRoute(
          path: '/blog/:id',
          builder: (context, state) {
            final id = state.pathParameters['id'];
            final post = PortfolioData.blogPosts.firstWhere(
              (p) => p.id == id,
              orElse: () => PortfolioData.blogPosts.first,
            );
            return BlogPage(post: post);
          },
        ),
      ],
    );

    return MaterialApp.router(
      title: 'Артем Кудинов | Портфолио',
      theme: IndustrialTheme.darkTheme,
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
