import 'package:get/get.dart';
import 'package:mobile/modules/splash/controllers/splash_controller.dart';

class SplashBinding extends Bindings{
  @override
  void dependencies() {
    // TODO: implement dependencies
  // Use Get.put so the controller is created when the binding runs
  // This ensures lifecycle methods like onReady are called even if
  // the view doesn't directly access the controller during build.
  Get.put<SplashController>(SplashController());
  }
}