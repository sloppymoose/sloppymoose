import React from 'react'
import Screen from '../components/Screen'
import { StyleSheet, Text } from 'react-native'

export default class ActivityScreen extends React.Component {
  componentWillMount () {
    console.info('ActivityScreen#componentWillMount')
  }
  componentWillUnmount () {
    console.info('ActivityScreen#componentWillUnmount')
  }
  render () {
    return (
      <Screen>
        <Text style={styles.text}>ACTIVITIES</Text>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text: {}
})
