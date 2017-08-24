// import Navigator from 'native-navigation'
import React from 'react'
import Screen from '../components/Screen'
import { StyleSheet, Text } from 'react-native'
import { HOME, SIGN_IN, SPLASH } from '../routes'

// TODO: Replace with actual state
let LOGGED_IN = false

function goToSignIn () {
  // Navigator.present(SIGN_IN).then(result => {
  //   LOGGED_IN = result.code === Navigator.RESULT_OK
  //   Navigator.present(HOME).then(() => {
  //     throw new Error('Should not ever get here!')
  //   })
  // })
}

export default class SplashScreen extends React.Component {
  // componentWillMount () {
  //   console.info('INIT TOKENS AND FETCH SHIRT SIZES?')
  //   // this.props.initTokens()
  //   //   .catch(console.error);
  // }
  componentDidMount () {
    if (LOGGED_IN) {
      console.info('logged in')
    } else {
      this.props.navigator.resetTo({
        animated: false,
        screen: 'SM/SignUp',
        title: 'Sign Up'
      })
    }
  }
  render () {
    return (
      <Screen hidden theme="primary">
        <Text style={styles.text}>SplashScreen</Text>
        <Text style={styles.text}>Loading?</Text>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  }
})
