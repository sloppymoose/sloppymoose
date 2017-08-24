import { Button, StyleSheet, Text } from 'react-native'
// import Navigator from 'native-navigation'
import React from 'react'
import Screen from '../components/Screen'

const CANCEL = {
  systemItem: 'cancel',
  title: 'Cancel'
}

export default class CheckInScreen extends React.Component {
  componentWillMount () {
    this.props.navigator.setOnNavigatorEvent(e => {
      if (e.id === 'bottomTabSelected') {
        this.props.navigator.showModal({
          screen: 'SM/ForgotPassword',
          title: 'Modal'
        })
        this.props.navigator.switchToTab({
          tabIndex: 0
        })
      }
    })
  }
  // handleCancel () {
  //   // Navigator.dismiss()
  // }
  // handleBadCheckIn () {
  //   alert('NOPE. Try again')
  // }
  // handleGoodCheckIn () {
  //   // Navigator.dismiss()
  // }
  render () {
    return null
  }
  // render () {
  //   return (
  //     <Screen
  //       leftButtons={[CANCEL]}
  //       onLeftPress={this.handleCancel}
  //       title="Check In"
  //     >
  //       <Text style={styles.text}>CHECK IN</Text>
  //       <Button onPress={this.handleGoodCheckIn} title="Successful CheckIn" />
  //       <Button onPress={this.handleBadCheckIn} title="Bad CheckIn" />
  //       <Button onPress={this.handleCancel} title="Cancel" />
  //     </Screen>
  //   )
  // }
}

const styles = StyleSheet.create({
  text: {}
})
