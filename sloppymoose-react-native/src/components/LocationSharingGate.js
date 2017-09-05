import Beacons from 'react-native-beacons-manager'
import { DeviceEventEmitter } from 'react-native'
import { node } from 'prop-types'
import LocationSharingPrompt from './LocationSharingPrompt'
import React from 'react'

const AUTHORIZED = 'authorizedWhenInUse'

let AUTHORIZATION_STATUS = null
Beacons.getAuthorizationStatus(authorizationStatus => {
  AUTHORIZATION_STATUS = authorizationStatus
})

export default class LocationSharingGate extends React.Component {
  static propTypes = {
    children: node
  }
  state = {
    authorizationStatus: AUTHORIZATION_STATUS
  }
  componentWillMount () {
    this._changeListener = DeviceEventEmitter.addListener(
      'authorizationStatusDidChange',
      this.handleAuthorizationChange
    )
    if (this.state.authorizationStatus === AUTHORIZED) {
      console.info('[componentWillMount] startUpdatingLocation')
      Beacons.startUpdatingLocation()
    }
  }
  componentWillUnmount () {
    this._changeListener.remove()
    console.info('[componentWillUnmount] stopUpdatingLocation')
    Beacons.stopUpdatingLocation()
  }
  componentWillUpdate (nextProps, nextState) {
    if (this.state.authorizationStatus !== nextState.authorizationStatus) {
      if (nextState.authorizationStatus) {
        console.info('[componentWillUpdate] startUpdatingLocation')
        Beacons.startUpdatingLocation()
      } else {
        console.info('[componentWillUpdate] stopUpdatingLocation')
        Beacons.stopUpdatingLocation()
      }
    }
  }
  handleAuthorizationChange = authorizationStatus => {
    this.setState({ authorizationStatus })
  }
  render () {
    if (this.state.authorizationStatus !== AUTHORIZED) {
      return <LocationSharingPrompt />
    }
    return this.props.children
  }
}
