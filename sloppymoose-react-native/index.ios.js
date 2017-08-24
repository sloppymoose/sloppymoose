import {
  ACTIVITY,
  BADGES,
  CHECK_IN,
  // CHECK_IN_OK,
  FORGOT_PASS,
  HOME,
  // SIGN_IN,
  SIGN_UP,
  SPLASH
} from './src/routes'
import { Navigation } from 'react-native-navigation'

import ActivityScreen from './src/screens/ActivityScreen'
import BadgesScreen from './src/screens/BadgesScreen'
import CheckInScreen from './src/screens/CheckInScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import HomeScreen from './src/screens/HomeScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import SplashScreen from './src/screens/SplashScreen'

Navigation.registerComponent(ACTIVITY, () => ActivityScreen)
Navigation.registerComponent(BADGES, () => BadgesScreen)
Navigation.registerComponent(CHECK_IN, () => CheckInScreen)
Navigation.registerComponent(FORGOT_PASS, () => ForgotPasswordScreen)
Navigation.registerComponent(HOME, () => HomeScreen)
Navigation.registerComponent(SIGN_UP, () => SignUpScreen)
Navigation.registerComponent(SPLASH, () => SplashScreen)

Navigation.startSingleScreenApp({
  screen: {
    navigatorStyle: {
      navBarHidden: true,
      statusBarTextColorScheme: 'light'
    },
    screen: SPLASH
  }
})
