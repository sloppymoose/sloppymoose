import React from 'react'
import Screen from '../components/Screen'
import { StyleSheet, Text } from 'react-native'

export default class BadgesScreen extends React.Component {
  render () {
    return (
      <Screen>
        <Text style={styles.text}>BADGES</Text>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text: {}
})
