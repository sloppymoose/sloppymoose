import Button from 'apsl-react-native-button';
import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { snakeCaseKeys } from '../../../react/util/objectHelpers';

const baseStyles = StyleSheet.create({
  actions: {

  },
  button: {
    borderRadius: 0,
    borderWidth: 0
  },
  createButton: {
    backgroundColor: 'orange',
  },
  createButtonLabel: {
    color: 'white'
  },
  error: {
    backgroundColor: 'red',
    padding: 10
  },
  errorText: {
    color: 'white'
  },
  form: {
    flex: 1
  },
  root: {
    flex: 1
  },
  field: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    margin: 10
  },
  input: {
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
        <View style={baseStyles.error}>
          <Text style={baseStyles.errorText}>
            Error: {errMsg}
          </Text>
        </View>
      );
    }
    return (
      <View style={baseStyles.root}>
        <View style={baseStyles.form}>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="words"
              onChangeText={this.handleFirstNameChangeText}
              placeholder="First Name"
              style={baseStyles.input}
              value={this.state.firstName}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="words"
              onChangeText={this.handleLastNameChangeText}
              placeholder="Last Name"
              style={baseStyles.input}
              value={this.state.lastName}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              onChangeText={this.handleUsernameChangeText}
              placeholder="Username"
              style={baseStyles.input}
              value={this.state.username}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={this.handleEmailChangeText}
              placeholder="Email"
              style={baseStyles.input}
              value={this.state.email}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              onChangeText={this.handlePasswordChangeText}
              placeholder="Password"
              secureTextEntry
              style={baseStyles.input}
              value={this.state.password}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              onChangeText={this.handlePasswordConfirmationChangeText}
              placeholder="Password Confirmation"
              secureTextEntry
              style={baseStyles.input}
              value={this.state.passwordConfirmation}
            />
          </View>
          {signUpError}
        </View>
        <View style={baseStyles.actions}>
          <Button
            isLoading={this.props.user.get('signingUp')}
            onPress={this.handleSignUp}
            style={[baseStyles.button, baseStyles.createButton]}
            textStyle={baseStyles.createButtonLabel}
          >
            Create
          </Button>
        </View>
      </View>
    );
  }
}

SignUpForm.propTypes = {
  signUpUser: PropTypes.func,
  user: ImmutablePropTypes.contains({
    signingUp: PropTypes.bool,
    signUpError: PropTypes.shape({
      message: PropTypes.string
    })
  })
};
SignUpForm.defaultProps = {
  signUpUser: emptyFn,
  user: Immutable.Map()
};
