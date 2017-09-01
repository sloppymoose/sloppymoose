import { Navigation } from 'react-native-navigation'
import {
  ACTIVITY,
  BADGES,
  CHECK_IN,
  CHECK_IN_MODAL,
  CHECK_IN_OK,
  FORGOT_PASS,
  SIGN_IN,
  SIGN_UP
} from '../routes'

const DISMISSALS = {
  showLightBox: 'dismissLightBox',
  showModal: 'dismissModal'
}

export function goToCheckInModal (navigator, method, options = {}) {
  navigator[method]({
    passProps: {
      dismissMethod: navigator[DISMISSALS[method]]
    },
    screen: CHECK_IN_MODAL,
    title: 'Check In',
    ...options
  })
}

export function goToCheckInSuccess (navigator, method, options = {}) {
  navigator[method]({
    passProps: {
      dismissMethod: navigator[DISMISSALS[method]]
    },
    screen: CHECK_IN_OK,
    style: {
      backgroundBlur: 'dark',
      margin: 50
    },
    title: 'Got It!',
    ...options
  })
}

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
