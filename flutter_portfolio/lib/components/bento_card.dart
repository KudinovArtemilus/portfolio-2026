import 'package:flutter/material.dart';
import '../theme/industrial_theme.dart';

class BentoCard extends StatefulWidget {
  final Widget child;
  final String? title;
  final String? label;
  final bool hasPerspective;

  const BentoCard({
    super.key,
    required this.child,
    this.title,
    this.label,
    this.hasPerspective = true,
  });

  @override
  State<BentoCard> createState() => _BentoCardState();
}

class _BentoCardState extends State<BentoCard> {
  double _rotateX = 0;
  double _rotateY = 0;

  void _handleHover(PointerEvent event, BoxConstraints constraints) {
    if (!widget.hasPerspective) return;
    
    final x = event.localPosition.dx;
    final y = event.localPosition.dy;
    
    final centerX = constraints.maxWidth / 2;
    final centerY = constraints.maxHeight / 2;
    
    setState(() {
      _rotateX = (centerY - y) / 500; // Subtle rotation
      _rotateY = (x - centerX) / 500;
    });
  }

  void _handleExit(PointerEvent event) {
    setState(() {
      _rotateX = 0;
      _rotateY = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return MouseRegion(
          onHover: (event) => _handleHover(event, constraints),
          onExit: _handleExit,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001) // Perspective
              ..rotateX(_rotateX)
              ..rotateY(_rotateY),
            transformAlignment: Alignment.center,
            child: Card(
              clipBehavior: Clip.antiAlias,
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      IndustrialTheme.bgCard,
                      IndustrialTheme.bgCard.withOpacity(0.5),
                    ],
                  ),
                ),
                child: Stack(
                  children: [
                    if (widget.label != null)
                      Positioned(
                        right: 12,
                        top: 12,
                        child: Text(
                          widget.label!.toUpperCase(),
                          style: IndustrialTheme.darkTheme.textTheme.labelLarge?.copyWith(
                            fontSize: 10,
                            color: IndustrialTheme.accent.withOpacity(0.4),
                          ),
                        ),
                      ),
                    Padding(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (widget.title != null)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 16),
                              child: Text(
                                widget.title!,
                                style: IndustrialTheme.darkTheme.textTheme.titleLarge?.copyWith(
                                  fontSize: 20,
                                  letterSpacing: 1.5,
                                ),
                              ),
                            ),
                          Expanded(child: widget.child),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
