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
import emptyObj from 'empty/object';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

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

export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChangeText = this.handleEmailChangeText.bind(this);
    this.handlePasswordChangeText = this.handlePasswordChangeText.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.state = {
      email: '',
      password: ''
    };
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
    let signInError = null;
    const errMsg = this.props.user.get('signInError').message;
    if(errMsg) {
      signInError = (
        <Text>
          Error: {errMsg}
        </Text>
      );
    }
    return (
      <View style={baseStyles.root}>
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
        {signInError}
        <TouchableOpacity onPress={this.handleSignIn}>
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

SignInForm.propTypes = {
  signInUser: PropTypes.func,
  user: ImmutablePropTypes.contains({
    signInError: PropTypes.shape({
      message: PropTypes.string
    })
  })
};
SignInForm.defaultProps = {
  signInUser: emptyFn,
  user: Immutable.fromJS({
    signInError: emptyObj
  })
};
