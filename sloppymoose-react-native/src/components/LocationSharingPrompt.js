import Beacons from 'react-native-beacons-manager'
// eslint-disable-next-line import/default
import Button from 'apsl-react-native-button'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class LocationSharingPrompt extends React.Component {
  handleClickEnable = () => {
    Beacons.requestWhenInUseAuthorization()
  }
  render () {
    return (
      <View style={styles.root}>
        <View style={styles.content}>
          <Text style={styles.paragraph}>
            In order to check in to a Sloppy Moose event, you need to share your
            location with us!
          </Text>
          <Text style={styles.paragraph}>
            This lets us verify that you are, in fact, at one of our events.
          </Text>
        </View>
        <View style={styles.actions}>
          <Button
            onPress={this.handleClickEnable}
            style={[styles.button, styles.enableButton]}
            textStyle={styles.enableButtonLabel}
          >
            Grant Location Permission
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actions: {
    flex: 1
  },
  button: {
    borderWidth: 0
  },
  content: {
    flex: 4,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  enableButton: {
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10
  },
  enableButtonLabel: {
    color: 'white'
  },
  paragraph: {
    marginTop: 10,
    textAlign: 'center'
  },
  root: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
})
