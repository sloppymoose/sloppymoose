import AuthenticationGate from '../components/AuthenticationGate'
import AuthenticationProvider from '../components/AuthenticationProvider'
import { func, node, shape } from 'prop-types'
import { goToHome, goToSignUp } from '../utils/navigationHelpers'
import React from 'react'

export default class ProtectedContent extends React.Component {
  static propTypes = {
    children: node,
    navigator: shape({
      resetTo: func
    }).isRequired
  }
  handleAuthenticatedUser () {
    goToHome()
  }
  handleUnauthenticatedUser = () => {
    goToSignUp(this.props.navigator, 'resetTo')
  }
  render () {
    return (
      <AuthenticationProvider>
        <AuthenticationGate
          onAuthenticated={this.handleAuthenticatedUser}
          onUnauthenticated={this.handleUnauthenticatedUser}
        >
          {this.props.children}
        </AuthenticationGate>
      </AuthenticationProvider>
    )
  }
}
