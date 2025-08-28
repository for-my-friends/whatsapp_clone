import 'package:get/get.dart';
import 'package:mobile/modules/auth/bindings.dart';
import 'package:mobile/modules/auth/views/welcome_View.dart';
import '../modules/splash/views/splash_view.dart';
import '../modules/splash/bindings.dart';
import '../modules/auth/bindings.dart';
import 'app_routes.dart';

class AppPages {
  static final pages = [
    GetPage(
      name: Routes.SPLASH,
      page: () => const SplashView(),
      binding: SplashBinding(),
    ),
    GetPage(
      name: Routes.WELCOME,
      page: () => const WelcomeView(),
      binding: WelcomeBinding(),
    ),
  ];
}
