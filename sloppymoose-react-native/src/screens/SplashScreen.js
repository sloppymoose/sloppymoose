import { object } from 'prop-types'
import ProtectedContent from '../components/ProtectedContent'
import React from 'react'
import { Text, View } from 'react-native'

export default class SplashScreen extends React.Component {
  static propTypes = {
    navigator: object
  }
  render () {
    return (
      <View>
        <ProtectedContent navigator={this.props.navigator} />
        <Text>Splash Screen</Text>
      </View>
    )
  }
}
