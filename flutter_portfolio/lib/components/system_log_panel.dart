import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/industrial_theme.dart';

class SystemLogPanel extends StatefulWidget {
  const SystemLogPanel({super.key});

  @override
  State<SystemLogPanel> createState() => _SystemLogPanelState();
}

class _SystemLogPanelState extends State<SystemLogPanel> {
  final List<String> _logs = [];
  final ScrollController _scrollController = ScrollController();
  Timer? _timer;

  final List<String> _possibleLogs = [
    'SYSTEM_BOOT_SEQUENCE_INITIALIZED',
    'KERNEL_VERSION_3.41.7_STABLE',
    'CORE_STACK: JAVA_21, SPRING_BOOT, RABBITMQ',
    'INTERFACE_UP: ETHERNET_INDUSTRIAL_0',
    'MONITORING_MODULE: S7-1200_ONLINE',
    'DATA_STREAM_VERIFIED: 1.2GB/S',
    'PLC_CONNECTION_SECURE: AES-256',
    'UI_ENGINE: FLUTTER_CANVAS_LOADED',
    'DIAGNOSTIC_CHECK_PASSED',
    'UPTIME: 13_YRS_AND_COUNTING',
    'STATUS: SYSTEM_OPERATIONAL',
  ];

  @override
  void initState() {
    super.initState();
    _startLogging();
  }

  void _startLogging() {
    _timer = Timer.periodic(const Duration(seconds: 2), (timer) {
      if (mounted) {
        setState(() {
          _logs.add('>${_possibleLogs[math.Random().nextInt(_possibleLogs.length)]}');
          if (_logs.length > 50) _logs.removeAt(0);
        });
        _scrollToBottom();
      }
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 250,
      decoration: BoxDecoration(
        color: IndustrialTheme.bgDark.withOpacity(0.9),
        border: const Border(left: BorderSide(color: Colors.white10)),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.terminal, size: 14, color: IndustrialTheme.accent),
              const SizedBox(width: 8),
              Text(
                'SYSTEM_LOGS',
                style: IndustrialTheme.darkTheme.textTheme.labelLarge?.copyWith(fontSize: 10),
              ),
            ],
          ),
          const Divider(color: Colors.white10),
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              itemCount: _logs.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Text(
                    _logs[index],
                    style: TextStyle(
                      fontFamily: 'JetBrains Mono',
                      fontSize: 10,
                      color: IndustrialTheme.accent.withOpacity(0.7),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
