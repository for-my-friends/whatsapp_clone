import 'package:get/get.dart';
import 'package:mobile/routes/app_routes.dart';

class SplashController extends GetxController{
  @override
  void onReady() {
    // TODO: implement onReady
    super.onReady();
    _initApp();
  }

  void _initApp() async{ 
    await Future.delayed(Duration(seconds: 3));
    Get.offAllNamed(Routes.WELCOME);
  }
}