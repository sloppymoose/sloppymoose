import { object } from 'prop-types'
import ProtectedContent from '../components/ProtectedContent'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class SplashScreen extends React.Component {
  static propTypes = {
    navigator: object
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ProtectedContent navigator={this.props.navigator} />
          <Text>Splash Screen</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    flex: 1
  },
  content: {
    marginTop: 20
  }
})
