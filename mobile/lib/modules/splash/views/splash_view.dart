import 'package:flutter/material.dart';
import 'package:get/state_manager.dart';
import 'package:mobile/modules/splash/controllers/splash_controller.dart';

class SplashView extends GetView<SplashController> {
  const SplashView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Top section with stack
            Expanded(
              flex: 8,
              child: Center(
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Image.asset(
                      'assets/images/logo/logo_Rectangle.png',
                      width: 70, // smaller size
                    ),
                    Image.asset(
                      'assets/images/logo/logo.png',
                      width: 50, // smaller logo on top
                      // color: const Color.fromARGB(255, 101, 255, 106),
                      color:  Colors.white,
                    ),
                  ],
                ),
              ),
            ),

            // Bottom text
            Expanded(
              flex: 2,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: const [
                  Text(
                    'from',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey,
                    ),
                  ),
                  Text(
                    'Facebook',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color:  Color(0xFF25D366),
                    ),
                  ),
                  SizedBox(height: 50),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
