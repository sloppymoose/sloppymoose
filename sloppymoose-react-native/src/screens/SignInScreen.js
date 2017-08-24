import { Button, StyleSheet, Text } from 'react-native'
import { FORGOT_PASS, SIGN_UP } from '../routes'
// import Navigator from 'native-navigation'
import React from 'react'
import Screen from '../components/Screen'

export default class SignInScreen extends React.Component {
  handleBadSignIn = () => {
    alert('NOPE, TRY AGAIN')
  }
  handleForgotPassword = () => {
    // Navigator.push(FORGOT_PASS)
  }
  handleGoodSignIn = () => {
    // TODO: Need to change state so that SignInScreen (or whatever) knows that
    // signing up was successful
    // Navigator.dismiss()
  }
  handleGoToSignUp = () => {
    // Navigator.push(SIGN_UP)
  }
  render () {
    return (
      <Screen theme="secondary" title="Sign In">
        <Text style={styles.text}>Sign In Screen</Text>
        <Button onPress={this.handleGoodSignIn} title="Sign In OK" />
        <Button onPress={this.handleBadSignIn} title="Sign In Bad" />
        <Button onPress={this.handleGoToSignUp} title="Sign Up" />
        <Button onPress={this.handleForgotPassword} title="Forgot Password" />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: WHITE
  }
})
