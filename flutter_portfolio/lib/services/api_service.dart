import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/blog_post.dart';

class ApiService {
  // Use the same Vercel proxy as the React app
  static const String baseUrl = '/api/fetch-drive';

  Future<String> fetchBlogPostContent(String driveId) async {
    final response = await http.get(Uri.parse('$baseUrl?id=$driveId'));

    if (response.statusCode == 200) {
      return response.body;
    } else {
      throw Exception('Failed to load blog content: ${response.statusCode}');
    }
  }

  // Example of how to structure your static data in Flutter
  static List<BlogPost> getBlogPosts() {
    return [
      BlogPost(
        id: 'java-industrial-strategy',
        title: 'Java для промышленных систем: Стратегия цифровой трансформации',
        date: '2026-04-17',
        excerpt: 'Почему выбор Java для производственных систем...',
        driveId: '15bDwl-YNQehQBPUHMgu8Gh4Wy_fsqWcf',
      ),
      // Add more posts here matching src/data/blogPosts.js
    ];
  }
}
