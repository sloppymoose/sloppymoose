import { func, shape } from 'prop-types'
import { goToCheckInModal } from '../utils/navigationHelpers'
import React from 'react'

export default class CheckInScreen extends React.Component {
  static propTypes = {
    navigator: shape({
      showModal: func
    }).isRequired
  }
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }
  handleNavigatorEvent = e => {
    if (e.id === 'bottomTabSelected') {
      goToCheckInModal(this.props.navigator, 'showModal')
      this.props.navigator.switchToTab({
        tabIndex: 0 // TODO: Track tab state and switch to last active tab
      })
    }
  }
  render () {
    return null
  }
}
