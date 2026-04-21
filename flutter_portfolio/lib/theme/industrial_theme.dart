import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class IndustrialTheme {
  static const Color bgDark = Color(0xFF0F172A); // Slate 900
  static const Color bgCard = Color(0xFF1E293B); // Slate 800
  static const Color accent = Color(0xFF38BDF8); // Sky Blue
  static const Color textBody = Color(0xFFCBD5E1); // Slate 300
  static const Color textHeader = Color(0xFFF8FAFC); // White

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
        displayLarge: GoogleFonts.montserrat(
          fontSize: 48,
          fontWeight: FontWeight.w800,
          letterSpacing: -1.5,
          color: textHeader,
        ),
        headlineLarge: GoogleFonts.montserrat(
          fontSize: 32,
          fontWeight: FontWeight.w700,
          color: textHeader,
        ),
        titleLarge: GoogleFonts.montserrat(
          fontSize: 22,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.5,
          color: textHeader,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 18,
          height: 1.6,
          color: textBody,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 16,
          height: 1.5,
          color: textBody,
        ),
        labelLarge: GoogleFonts.jetbrainsMono(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          letterSpacing: 1.0,
          color: accent,
        ),
      ),
      cardTheme: CardTheme(
        color: bgCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: Colors.white.withOpacity(0.05)),
        ),
      ),
    );
  }
}
