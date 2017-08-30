import { Button, StyleSheet, Text, View } from 'react-native'
import { object } from 'prop-types'
import { goToSignIn } from '../utils/navigationHelpers'
import ProtectedContent from '../components/ProtectedContent'
import React from 'react'

export default class SignUpScreen extends React.Component {
  static propTypes = {
    navigator: object.isRequired
  }
  handleExistingUser = () => {
    goToSignIn(this.props.navigator, 'push')
  }
  render () {
    return (
      <View style={styles.container}>
        <ProtectedContent navigator={this.props.navigator} />
        <View style={styles.content}>
          <Text>Sign Up Screen</Text>
        </View>
        <View>
          <Text>Already have an account?</Text>
          <Button onPress={this.handleExistingUser} title="Sign In" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  }
})
