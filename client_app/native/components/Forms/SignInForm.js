import { Actions } from 'react-native-redux-router';
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
    this.setState({ email });
  }
  handlePasswordChangeText(password) {
    this.setState({ password });
  }
  handleSignIn() {
    this.props.signInUser(this.state.email, this.state.password)
      .then(Actions.home)
      .catch(emptyFn);
  }
  render() {
    let error = null;
    if(this.props.user.error.message) {
      error = (
        <Text>
          Error: {this.props.user.error.message}
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
        {error}
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
  user: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string
    })
  })
};
SignInForm.defaultProps = {
  signInUser: emptyFn,
  user: {
    error: emptyObj
  }
};
