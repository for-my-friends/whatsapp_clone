import 'package:get/get.dart';
import '../../../../../../routes/app_routes.dart';

class WelcomeController extends GetxController {
  void agreeAndContinue() {
    // Normally you’d check token or auth status here
    Get.offAllNamed(Routes.SPLASH); // next screen (e.g., login/phone input)
  }
}
