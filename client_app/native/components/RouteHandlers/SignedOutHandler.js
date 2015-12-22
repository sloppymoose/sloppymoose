import { Actions } from 'react-native-redux-router';
import { Component } from 'react-native';
import { SignedOutScreen } from '../Screens';

export class SignedOutHandler extends Component {
  render() {
    return (
      <SignedOutScreen
        onSignInPress={Actions.signIn}
        onSignUpPress={Actions.signUp}
      />
    );
  }
}
