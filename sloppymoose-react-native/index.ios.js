import {
  ACTIVITY,
  BADGES,
  CHECK_IN,
  FORGOT_PASS,
  SIGN_IN,
  SIGN_UP,
  SPLASH
} from './src/routes'
import ActivityScreen from './src/screens/ActivityScreen'
import BadgesScreen from './src/screens/BadgesScreen'
import CheckInScreen from './src/screens/CheckInScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import SplashScreen from './src/screens/SplashScreen'
import store from './src/utils/reduxStore'

Navigation.registerComponent(ACTIVITY, () => ActivityScreen, store, Provider)
Navigation.registerComponent(BADGES, () => BadgesScreen, store, Provider)
Navigation.registerComponent(CHECK_IN, () => CheckInScreen, store, Provider)
Navigation.registerComponent(
  FORGOT_PASS,
  () => ForgotPasswordScreen,
  store,
  Provider
)
Navigation.registerComponent(SIGN_IN, () => SignInScreen, store, Provider)
Navigation.registerComponent(SIGN_UP, () => SignUpScreen, store, Provider)
Navigation.registerComponent(SPLASH, () => SplashScreen, store, Provider)

Navigation.startSingleScreenApp({
  screen: {
    navigatorStyle: {
      navBarHidden: true,
      statusBarTextColorScheme: 'light'
    },
    screen: SPLASH
  }
})
