import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import '../models/blog_post.dart';
import '../services/api_service.dart';
import '../theme/industrial_theme.dart';

class BlogPage extends StatefulWidget {
  final BlogPost post;

  const BlogPage({super.key, required this.post});

  @override
  State<BlogPage> createState() => _BlogPageState();
}

class _BlogPageState extends State<BlogPage> {
  final ApiService _apiService = ApiService();
  late Future<String> _contentFuture;

  @override
  void initState() {
    super.initState();
    _contentFuture = _apiService.fetchBlogPostContent(widget.post.driveId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.post.title, style: const TextStyle(fontFamily: 'Outfit')),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: IndustrialTheme.accent),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: FutureBuilder<String>(
        future: _contentFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(color: IndustrialTheme.accent),
            );
          }

          if (snapshot.hasError) {
            return Center(
              child: Text(
                'ERROR_FETCH_FAILED: ${snapshot.error}',
                style: const TextStyle(color: Colors.redAccent, fontFamily: 'monospace'),
              ),
            );
          }

          return Container(
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: IndustrialTheme.bgCard,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: Colors.white10),
            ),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                   Text(
                    'DOC_REF_ID: ${widget.post.id.toUpperCase()}',
                    style: const TextStyle(
                      color: IndustrialTheme.accent,
                      fontFamily: 'monospace',
                      fontSize: 10,
                    ),
                  ),
                  const SizedBox(height: 20),
                  MarkdownBody(
                    data: snapshot.data ?? '',
                    styleSheet: MarkdownStyleSheet(
                      p: const TextStyle(color: IndustrialTheme.textBody, height: 1.6),
                      h1: const TextStyle(color: IndustrialTheme.accent, fontFamily: 'Outfit'),
                      // Add more styling to match the technical look
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
