import 'package:flutter/material.dart';
import '../theme/industrial_theme.dart';

class BentoCard extends StatelessWidget {
  final Widget child;
  final String? title;

  const BentoCard({
    super.key,
    required this.child,
    this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Container(
        decoration: BoxDecoration(
          color: IndustrialTheme.bgCard,
          border: Border.all(color: Colors.white.withOpacity(0.05)),
        ),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (title != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Text(
                    title!.toUpperCase(),
                    style: IndustrialTheme.darkTheme.textTheme.titleLarge?.copyWith(
                      color: IndustrialTheme.accent,
                      fontSize: 18,
                      letterSpacing: 2.0,
                    ),
                  ),
                ),
              Expanded(child: child),
            ],
          ),
        ),
      ),
    );
  }
}
