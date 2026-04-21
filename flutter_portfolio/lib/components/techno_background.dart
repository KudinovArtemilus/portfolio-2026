import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/industrial_theme.dart';

class TechnoBackground extends StatefulWidget {
  const TechnoBackground({super.key});

  @override
  State<TechnoBackground> createState() => _TechnoBackgroundState();
}

class _TechnoBackgroundState extends State<TechnoBackground>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return CustomPaint(
          painter: TechnoPainter(progress: _controller.value),
          child: Container(),
        );
      },
    );
  }
}

class TechnoPainter extends CustomPainter {
  final double progress;

  TechnoPainter({required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = IndustrialTheme.accent.withOpacity(0.05)
      ..strokeWidth = 1.0;

    // Draw Grid
    const spacing = 60.0;
    for (double i = 0; i < size.width; i += spacing) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), paint);
    }
    for (double i = 0; i < size.height; i += spacing) {
      canvas.drawLine(Offset(0, i), Offset(size.width, i), paint);
    }

    // Draw Circuit Lines
    final circuitPaint = Paint()
      ..color = IndustrialTheme.accent.withOpacity(0.1)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 0.5;

    final path = Path()
      ..moveTo(0, size.height * 0.2)
      ..lineTo(size.width * 0.4, size.height * 0.2)
      ..lineTo(size.width * 0.4, size.height * 0.4)
      ..lineTo(size.width * 0.6, size.height * 0.4)
      ..lineTo(size.width * 0.6, 0);

    canvas.drawPath(path, circuitPaint);

    // Draw "Pulse" on Circuit
    final pulsePaint = Paint()
      ..color = IndustrialTheme.accent.withOpacity(0.4)
      ..strokeWidth = 2.0;

    final metrics = path.computeMetrics();
    for (final metric in metrics) {
      final length = metric.length;
      final offset = (progress * length) % length;
      final pos = metric.getTangentForOffset(offset)?.position;
      if (pos != null) {
        canvas.drawCircle(pos, 2, pulsePaint);
      }
    }
  }

  @override
  bool shouldRepaint(TechnoPainter oldDelegate) => true;
}
