import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { bool, func, node } from 'prop-types'
import { connect } from 'react-redux'
import { restoreAuthentication } from '../actions/UserActions'
import React from 'react'

function getState (store) {
  return {
    authenticated: store.user.authenticated
  }
}

function getActions (dispatch) {
  return bindActionCreators({ restoreAuthentication }, dispatch)
}

class AuthenticationProvider extends React.Component {
  static propTypes = {
    authenticated: bool,
    children: node,
    restoreAuthentication: func
  }
  componentWillMount () {
    this.restoreAuthentication()
  }
  handleAuthRestoration = auth => {
    console.info('AuthenticationProvider#handleAuthRestoration', auth)
  }
  handleAuthError = err => {
    Alert.alert('Authentication Error', err.message, [
      { text: 'Try Again', onPress: this.restoreAuthentication }
    ])
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
