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
import emptyObj from 'empty/object';
import { get } from 'lodash';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

const baseStyles = StyleSheet.create({
  actions: {

  },
  button: {
    borderRadius: 0,
    borderWidth: 0
  },
  divider: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  error: {
    padding: 10
  },
  errorText: {
    color: 'hotpink',
    textAlign: 'center'
  },
  field: {

  },
  form: {
    backgroundColor: 'white'
  },
  input: {
    height: 40,
    margin: 10
  },
  root: {
    marginLeft: 20,
    marginRight: 20
  },
  signInButton: {
    backgroundColor: 'orange',
    borderWidth: 0,
    marginBottom: 0
  },
  signInButtonLabel: {
    color: 'white'
  },
});

export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.goToNext = this.goToNext.bind(this);
    this.handleEmailChangeText = this.handleEmailChangeText.bind(this);
    this.handlePasswordChangeText = this.handlePasswordChangeText.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }
  goToNext(ref) {
    return () => this.refs[ref].focus();
  }
  handleEmailChangeText(email) {
    email = (email || '').trim();
    this.setState({ email });
  }
  handlePasswordChangeText(password) {
    this.setState({ password });
  }
  handleSignIn() {
    this.props.signInUser(this.state.email, this.state.password)
      .catch(emptyFn);
  }
  render() {
    const errMsg = get(this.props.user.get('signInError'), 'message', ' ');
    const reactiveSpacerStyles = {
      height: this.props.spacerHeight
    };
    return (
      <View style={baseStyles.root}>
        <View style={baseStyles.form}>
          <View style={[baseStyles.field, baseStyles.divider]}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={this.handleEmailChangeText}
              onSubmitEditing={this.goToNext('password')}
              placeholder="Email"
              ref="email"
              returnKeyType="next"
              style={baseStyles.input}
              value={this.state.email}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              onChangeText={this.handlePasswordChangeText}
              onSubmitEditing={this.handleSignIn}
              placeholder="Password"
              ref="password"
              returnKeyType="go"
              secureTextEntry
              style={baseStyles.input}
              value={this.state.password}
            />
          </View>
        </View>
        <View style={baseStyles.actions}>
          <Button
            isLoading={this.props.user.get('signingIn')}
            onPress={this.handleSignIn}
            style={[baseStyles.button, baseStyles.signInButton]}
            textStyle={baseStyles.signInButtonLabel}
          >
            Sign In
          </Button>
        </View>
        <View style={reactiveSpacerStyles}>
          <View style={baseStyles.error}>
            <Text style={baseStyles.errorText}>
              {errMsg}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

SignInForm.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  signInUser: PropTypes.func,
  spacerHeight: PropTypes.number,
  user: ImmutablePropTypes.contains({
    signInError: PropTypes.shape({
      message: PropTypes.string
    }),
    signingIn: PropTypes.bool
  })
};
SignInForm.defaultProps = {
  onBlur: emptyFn,
  onFocus: emptyFn,
  signInUser: emptyFn,
  spacerHeight: 0,
  user: Immutable.fromJS({
    signInError: emptyObj
  })
};
