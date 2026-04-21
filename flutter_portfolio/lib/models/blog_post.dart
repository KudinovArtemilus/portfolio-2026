class BlogPost {
  final String id;
  final String title;
  final String date;
  final String excerpt;
  final String driveId;

  BlogPost({
    required this.id,
    required this.title,
    required this.date,
    required this.excerpt,
    required this.driveId,
  });

  factory BlogPost.fromJson(Map<String, dynamic> json) {
    return BlogPost(
      id: json['id'],
      title: json['title'],
      date: json['date'],
      excerpt: json['excerpt'],
      driveId: json['driveId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'date': date,
      'excerpt': excerpt,
      'driveId': driveId,
    };
  }
}
