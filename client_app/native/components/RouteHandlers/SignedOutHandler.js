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

export class SignedOutHandler extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>Welcome to Sloppy Moose!</Text>
        <TouchableOpacity onPress={Actions.signUp}>
          <View>
            <Text>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.signIn}>
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
