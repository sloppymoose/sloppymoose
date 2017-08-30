import { connect } from 'react-redux'
import { bool, func, node } from 'prop-types'
import emptyFn from 'empty/function'
import React from 'react'

function getState (store) {
  return {
    authenticated: store.user.authenticated
  }
}

class AuthenticationGate extends React.PureComponent {
  static defaultProps = {
    onAuthenticated: emptyFn,
    onUnauthenticated: emptyFn
  }
  static propTypes = {
    authenticated: bool,
    children: node,
    onAuthenticated: func,
    onUnauthenticated: func
  }
  componentWillUpdate (nextProps) {
    if (this.props.authenticated !== nextProps.authenticated) {
      if (nextProps.authenticated) {
        this.props.onAuthenticated()
      } else {
        this.props.onUnauthenticated()
      }
    }
  }
  render () {
    if (!this.props.authenticated) {
      return null
    }
    if (React.Children.count(this.props.children)) {
      return React.Children.only(this.props.children)
    }
    return null
  }
}

export default connect(getState)(AuthenticationGate)
