import 'dart:ui' as ui;
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
  ui.FragmentProgram? _program;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..repeat();
    _loadShader();
  }

  Future<void> _loadShader() async {
    try {
      final program = await ui.FragmentProgram.fromAsset(
        'assets/shaders/industrial_scan.frag',
      );
      if (mounted) {
        setState(() {
          _program = program;
        });
      }
    } catch (e) {
      debugPrint('Shader loading error: $e');
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Stack(
          children: [
            CustomPaint(
              painter: TechnoPainter(progress: _controller.value),
              child: Container(),
            ),
            if (_program != null)
              ShaderMask(
                shaderCallback: (rect) {
                  return _program!.fragmentShader()
                    ..setFloat(0, rect.width)
                    ..setFloat(1, rect.height)
                    ..setFloat(2, _controller.value * 10);
                },
                blendMode: BlendMode.plus,
                child: Container(),
              ),
          ],
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
      ..color = IndustrialTheme.accent.withOpacity(0.04)
      ..strokeWidth = 1.0;

    // Grid
    const spacing = 50.0;
    for (double i = 0; i < size.width; i += spacing) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), paint);
    }
    for (double i = 0; i < size.height; i += spacing) {
      canvas.drawLine(Offset(0, i), Offset(size.width, i), paint);
    }

    // Circuit lines (simplified for performance)
    final circuitPaint = Paint()
      ..color = IndustrialTheme.accent.withOpacity(0.08)
      ..style = PaintingStyle.stroke;

    final path = Path()
      ..moveTo(size.width * 0.1, 0)
      ..lineTo(size.width * 0.1, size.height * 0.1)
      ..lineTo(size.width * 0.2, size.height * 0.2);

    canvas.drawPath(path, circuitPaint);
  }

  @override
  bool shouldRepaint(TechnoPainter oldDelegate) => true;
}
