import { Button, StyleSheet, Text, View } from 'react-native'
import { func, shape } from 'prop-types'
import React from 'react'

export default class CheckInSuccessScreen extends React.Component {
  static propTypes = {
    dismissMethod: func.isRequired,
    navigator: shape({
      dismissLightBox: func.isRequired
    }).isRequired
  }
  handleDismiss = () => {
    this.props.dismissMethod()
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>YOU GOT IT</Text>
        <Button onPress={this.handleDismiss} title="Dismiss" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: {}
})
