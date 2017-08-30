import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class BadgesScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>BADGES</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {}
})
