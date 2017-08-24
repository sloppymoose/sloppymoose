import React from 'react'
import Screen from '../components/Screen'
import { Button, StyleSheet, Text } from 'react-native'

export default class ForgotPasswordScreen extends React.Component {
  handleDismiss = () => {
    this.props.navigator.dismissModal()
  }
  render () {
    return (
      <Screen title="Forgot Password">
        <Text style={styles.text}>Coming Soon!</Text>
        <Button onPress={this.handleDismiss} title="Successful CheckIn" />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text: {}
})
