import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { bool, func, node } from 'prop-types'
import { connect } from 'react-redux'
import {
  clearAuthentication,
  restoreAuthentication
} from '../actions/UserActions'
import React from 'react'

function getState (store) {
  return {
    authenticated: store.user.authenticated
  }
}

function getActions (dispatch) {
  return bindActionCreators(
    { clearAuthentication, restoreAuthentication },
    dispatch
  )
}

class AuthenticationProvider extends React.Component {
  static propTypes = {
    authenticated: bool,
    children: node,
    clearAuthentication: func,
    restoreAuthentication: func
  }
  componentWillMount () {
    if (this.props.authenticated === null) {
      this.restoreAuthentication()
    }
  }
  handleAuthRestoration = auth => {
    // No-op
  }
  handleAuthError = err => {
    if (err instanceof Error) {
      return Alert.alert('Unexpected Error', err.message, [
        { text: 'OK', onPress: this.handleSignOut }
      ])
    }
    Alert.alert('Authentication Error', err.message, [
      { text: 'Sign In', onPress: this.handleSignOut }
    ])
  }
  handleSignOut = () => {
    this.props.clearAuthentication()
  }
  restoreAuthentication = () => {
    return this.props
      .restoreAuthentication()
      .then(this.handleAuthRestoration, this.handleAuthError)
  }
  render () {
    return React.Children.only(this.props.children)
  }
}

export default connect(getState, getActions)(AuthenticationProvider)
