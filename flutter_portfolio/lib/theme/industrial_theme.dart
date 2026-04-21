import 'package:flutter/material.dart';

class IndustrialTheme {
  static const Color bgDark = Color(0xFF0A0B0E);
  static const Color bgCard = Color(0xFF0F1115);
  static const Color accent = Color(0xFF00F2FF);
  static const Color accentSecondary = Color(0xFF0EA5E9);
  static const Color textMain = Color(0xFFE2E8F0);
  static const Color textMuted = Color(0xFF94A3B8);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgDark,
      primaryColor: accent,
      colorScheme: const ColorScheme.dark(
        secondary: accent,
        surface: bgCard,
      ),
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontFamily: 'Outfit',
          color: textMain,
          fontWeight: FontWeight.w800,
          letterSpacing: -1.0,
        ),
        bodyLarge: TextStyle(
          fontFamily: 'Inter',
          color: textMain,
        ),
        bodyMedium: TextStyle(
          fontFamily: 'Inter',
          color: textMuted,
        ),
      ),
      cardTheme: CardTheme(
        color: bgCard.withOpacity(0.8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4), // Machined corners
          side: const BorderSide(color: Color(0x1A94A3B8)),
        ),
      ),
    );
  }
}
