import { Button, Text } from 'react-native'
// import Navigator from 'native-navigation'
import React from 'react'
import Screen from '../components/Screen'

import { Navigation } from 'react-native-navigation'

export default class SplashScreen extends React.Component {
  componentWillMount () {
    // this.props.fetchShirtSizes();
    //   // .catch(console.error); // TODO: ¯\_(ツ)_/¯
  }
  handleGoodSignUp = () => {
    console.info('SIGNED UP!', this.props.navigator)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    // this.props.navigator.pop()
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Activity',
          screen: 'SM/Activity',
          title: 'Activity Feed'
        },
        {
          label: 'Check In',
          screen: 'SM/CheckIn',
          title: 'CheckIn'
        },
        {
          label: 'Badges',
          screen: 'SM/Badges',
          title: 'Badges'
        }
      ]
    })
  }
  handleBadSignUp = () => {
    alert('Nope! Try Again.')
  }
  onNavigatorEvent (e) {
    console.info('NAV?', e)
  }
  render () {
    return (
      <Screen title="Sign Up">
        <Text>Sign Up Screen</Text>
        <Button onPress={this.handleGoodSignUp} title="Sign Up OK" />
        <Button onPress={this.handleBadSignUp} title="Sign Up Fail" />
      </Screen>
    )
  }
}
