import 'package:flutter/material.dart';
import '../theme/industrial_theme.dart';

class BentoCard extends StatelessWidget {
  final Widget? child;
  final String? title;
  final String? subtitle;
  final String? imageUrl;
  final VoidCallback? onTap;

  const BentoCard({
    super.key,
    this.child,
    this.title,
    this.subtitle,
    this.imageUrl,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: IndustrialTheme.bgCard,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (imageUrl != null)
                Expanded(
                  flex: 3,
                  child: Image.asset(
                    imageUrl!,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                )
              else if (child != null)
                Expanded(flex: 3, child: child!),
              
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (title != null)
                      Text(
                        title!,
                        style: IndustrialTheme.darkTheme.textTheme.titleLarge,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    if (subtitle != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 4),
                        child: Text(
                          subtitle!,
                          style: IndustrialTheme.darkTheme.textTheme.bodyMedium,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    const SizedBox(height: 12),
                    if (onTap != null)
                      SizedBox(
                        width: double.infinity,
                        child: TextButton(
                          onPressed: onTap,
                          style: TextButton.styleFrom(
                            backgroundColor: IndustrialTheme.accent.withOpacity(0.1),
                            foregroundColor: IndustrialTheme.accent,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                          child: const Text('Смотреть проект', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
