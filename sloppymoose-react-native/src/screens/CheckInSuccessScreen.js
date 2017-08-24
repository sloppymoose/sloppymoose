import { Button, StyleSheet, Text } from 'react-native'
// import Navigator from 'native-navigation'
import React from 'react'
import Screen from '../components/Screen'

export default class CheckInSuccessScreen extends React.Component {
  handleDismiss () {
    // Navigator.dismiss()
  }
  render () {
    return (
      <Screen hidden>
        <Text style={styles.text}>YOU GOT IT</Text>
        <Button onPress={this.handleDismiss} title="Dismiss" />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text: {}
})
