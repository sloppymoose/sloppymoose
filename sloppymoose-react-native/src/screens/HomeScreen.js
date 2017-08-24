import ActivityScreen from './ActivityScreen'
import { CHECK_IN, CHECK_IN_OK, HOME } from '../routes'
import BadgesScreen from './BadgesScreen'
// import Navigator from 'native-navigation'
import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'

const ROUTES = [
  { key: '1', title: 'Activity' },
  { key: '2', title: 'Check-In' },
  { key: '3', title: 'Badges' }
]

function handleCheckInSuccess (success) {
  console.info('handleCheckInSuccess', success)
  if (success) {
    // Navigator.present(CHECK_IN_OK)
  }
}

function showCheckIn () {
  // return Navigator.present(CHECK_IN).then(handleCheckInSuccess)
}

export default class HomeScreen extends PureComponent {
  state = {
    currentRoute: ROUTES[0],
    index: 0,
    routes: ROUTES
  }
  handleIndexChange = index => {
    if (index === 1) {
      return showCheckIn()
    }
    const currentRoute = this.state.routes[index]
    this.setState({ currentRoute, index })
  }
  renderFooter = props => <TabBar {...props} />
  renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <ActivityScreen />
      case '3':
        return <BadgesScreen />
      default:
        return null
    }
  }
  render () {
    return (
      // <Navigator.Config title={this.state.currentRoute.title}>
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderFooter={this.renderFooter}
        onIndexChange={this.handleIndexChange}
      />
      // </Navigator.Config>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
