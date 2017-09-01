// eslint-disable-next-line import/default
import Button from 'apsl-react-native-button'
import { func, shape } from 'prop-types'
import { goToCheckInSuccess } from '../utils/navigationHelpers'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default class CheckInModalScreen extends React.Component {
  static propTypes = {
    dismissMethod: func.isRequired,
    navigator: shape({
      showLightBox: func.isRequired
    }).isRequired
  }
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'cancelCheckIn',
        testID: 'checkInAction',
        title: 'Cancel'
      }
    ]
  }
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }
  handleCheckInSuccess = () => {
    this.props.dismissMethod()
    goToCheckInSuccess(this.props.navigator, 'showLightBox')
  }
  handleNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancelCheckIn') {
        this.props.navigator.dismissModal()
      }
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleCheckInSuccess}
          style={styles.checkIn}
          textStyle={styles.checkInLabel}
        >
          Check In (OK)
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  },
  text: {},
  checkIn: {
    backgroundColor: 'orange',
    borderWidth: 0
  },
  checkInLabel: {
    color: 'white'
  }
})
