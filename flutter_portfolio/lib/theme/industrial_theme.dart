import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class IndustrialTheme {
  static const Color bgDark = Color(0xFF111827); // Deep Slate
  static const Color bgCard = Color(0xFF1F2937); // Lighter Slate
  static const Color accent = Color(0xFF2DD4BF); // Mint / Teal
  static const Color textBody = Color(0xFF9CA3AF); // Grey
  static const Color textHeader = Color(0xFFF9FAFB); // White

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgDark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: accent,
        brightness: Brightness.dark,
        surface: bgCard,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.inter(
          fontSize: 32,
          fontWeight: FontWeight.w800,
          color: textHeader,
        ),
        headlineLarge: GoogleFonts.inter(
          fontSize: 24,
          fontWeight: FontWeight.w700,
          color: textHeader,
        ),
        titleLarge: GoogleFonts.inter(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: textHeader,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          height: 1.6,
          color: textHeader,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          height: 1.5,
          color: textBody,
        ),
        labelLarge: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          letterSpacing: 1.2,
          color: accent,
        ),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        color: bgCard,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: Colors.white.withOpacity(0.05)),
        ),
      ),
    );
  }
}
