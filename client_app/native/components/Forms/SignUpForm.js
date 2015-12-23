import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { snakeCaseKeys } from '../../../react/util/objectHelpers';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderColor: 'red',
    borderWidth: 1,
    width: 300
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40
  }
});

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChangeText = this.handleEmailChangeText.bind(this);
    this.handleFirstNameChangeText = this.handleFirstNameChangeText.bind(this);
    this.handleLastNameChangeText = this.handleLastNameChangeText.bind(this);
    this.handlePasswordChangeText = this.handlePasswordChangeText.bind(this);
    this.handlePasswordConfirmationChangeText = this.handlePasswordConfirmationChangeText.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleUsernameChangeText = this.handleUsernameChangeText.bind(this);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      username: ''
    };
  }
  handleEmailChangeText(email) {
    this.setState({ email });
  }
  handleFirstNameChangeText(firstName) {
    this.setState({ firstName });
  }
  handleLastNameChangeText(lastName) {
    this.setState({ lastName });
  }
  handlePasswordChangeText(password) {
    this.setState({ password });
  }
  handlePasswordConfirmationChangeText(passwordConfirmation) {
    this.setState({ passwordConfirmation });
  }
  handleUsernameChangeText(username) {
    this.setState({ username });
  }
  handleSignUp() {
    this.props.signUpUser(snakeCaseKeys(this.state))
      .catch(err => {
        console.info('TODO: RENDER ERROR?', err);
      });
  }
  render() {
    let signUpError = null;
    const errMsg = this.props.user.get('signUpError').message;
    if(errMsg) {
      signUpError = (
        <Text>
          Error: {errMsg}
        </Text>
      );
    }
    return (
      <View style={baseStyles.root}>
        <TextInput
          autoCapitalize="words"
          onChangeText={this.handleFirstNameChangeText}
          placeholder="First Name"
          style={baseStyles.input}
          value={this.state.firstName}
        />
        <TextInput
          autoCapitalize="words"
          onChangeText={this.handleLastNameChangeText}
          placeholder="Last Name"
          style={baseStyles.input}
          value={this.state.lastName}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={this.handleUsernameChangeText}
          placeholder="Username"
          style={baseStyles.input}
          value={this.state.username}
        />
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={this.handleEmailChangeText}
          placeholder="Email"
          style={baseStyles.input}
          value={this.state.email}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={this.handlePasswordChangeText}
          placeholder="Password"
          secureTextEntry
          style={baseStyles.input}
          value={this.state.password}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={this.handlePasswordConfirmationChangeText}
          placeholder="Password Confirmation"
          secureTextEntry
          style={baseStyles.input}
          value={this.state.passwordConfirmation}
        />
        {signUpError}
        <TouchableOpacity onPress={this.handleSignUp}>
          <View>
            <Text>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

SignUpForm.propTypes = {
  signUpUser: PropTypes.func,
  user: ImmutablePropTypes.contains({
    signUpError: PropTypes.shape({
      message: PropTypes.string
    })
  })
};
SignUpForm.defaultProps = {
  signUpUser: emptyFn,
  user: Immutable.Map()
};
