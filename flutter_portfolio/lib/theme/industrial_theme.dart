import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
      useMaterial3: true,
      scaffoldBackgroundColor: bgDark,
      primaryColor: accent,
      colorScheme: const ColorScheme.dark(
        primary: accent,
        secondary: accentSecondary,
        surface: bgCard,
      ),
      textTheme: GoogleFonts.outfitTextTheme(const TextTheme(
        headlineLarge: TextStyle(
          color: textMain,
          fontWeight: FontWeight.w800,
          letterSpacing: -1.0,
        ),
        bodyLarge: TextStyle(
          color: textMain,
        ),
        bodyMedium: TextStyle(
          color: textMuted,
        ),
      )).copyWith(
        titleLarge: GoogleFonts.outfit(
          color: textMain,
          fontWeight: FontWeight.bold,
          letterSpacing: 2.0,
        ),
        labelLarge: GoogleFonts.jetBrainsMono(
          color: accent,
          letterSpacing: 2.0,
        ),
      ),
      cardTheme: CardThemeData(
        color: bgCard.withOpacity(0.8),
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(color: Color(0x1A94A3B8)),
        ),
      ),
    );
  }
}
