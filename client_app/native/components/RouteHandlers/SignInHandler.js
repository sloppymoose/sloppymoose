import { Actions } from 'react-native-redux-router';
import { Component, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export class SignInHandler extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>Sign In</Text>
        <TouchableOpacity onPress={Actions.signedOut}>
          <View>
            <Text>
              Go Back?
            </Text>
          </View>
        </TouchableOpacity>
        <Text>Username</Text>
        <Text>Password</Text>
        <TouchableOpacity onPress={Actions.home}>
          <View>
            <Text>
              Sign In
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
