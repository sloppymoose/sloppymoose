import { Navigation } from 'react-native-navigation'
import {
  ACTIVITY,
  BADGES,
  CHECK_IN,
  FORGOT_PASS,
  SIGN_IN,
  SIGN_UP
} from '../routes'

export function goToForgotPassword (navigator, method, options = {}) {
  navigator[method]({
    screen: FORGOT_PASS,
    title: 'Forgot Password',
    ...options
  })
}

export function goToHome () {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Activity',
        screen: ACTIVITY,
        title: 'Activity Feed'
      },
      {
        label: 'Check In',
        screen: CHECK_IN,
        title: 'CheckIn'
      },
      {
        label: 'Badges',
        screen: BADGES,
        title: 'Badges'
      }
    ]
  })
}

export function goToSignIn (navigator, method, options = {}) {
  navigator[method]({
    screen: SIGN_IN,
    title: 'Sign In',
    ...options
  })
}

export function goToSignUp (navigator, method, options = {}) {
  navigator[method]({
    animated: false,
    screen: SIGN_UP,
    title: 'Sign Up',
    ...options
  })
}
