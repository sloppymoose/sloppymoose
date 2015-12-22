import { Component, PropTypes, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import emptyFn from 'empty/function';
import { SignUpForm } from '../Forms';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export class SignUpScreen extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>Sign Up</Text>
        <TouchableOpacity onPress={this.props.onBackPress}>
          <View>
            <Text>
              Go Back?
            </Text>
          </View>
        </TouchableOpacity>
        <SignUpForm
          signUpUser={this.props.signUpUser}
          user={this.props.user}
        />
      </View>
    );
  }
}

SignUpScreen.propTypes = {
  onBackPress: PropTypes.func,
  signUpUser: PropTypes.func,
  user: PropTypes.object
};
SignUpScreen.defaultProps = {
  onBackPress: emptyFn
};
