import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import NavigationBar from 'react-native-navbar';
import { SignUpForm } from '../Forms';

const baseStyles = StyleSheet.create({
  content: {
    flex: 1,
    marginBottom: 10
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10
  },
  link: {
    fontWeight: 'bold'
  },
  root: {
    flex: 1
  }
});

const NavTitle = {
  title: 'Sign Up'
};

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  handleBack() {
    this.props.onBackPress();
  }
  handleSignIn() {
    this.props.onSignInPress();
  }
  render() {
    const leftNavButton = {
      title: 'Back',
      handler: this.handleBack
    };
    return (
      <View style={baseStyles.root}>
        <NavigationBar
          leftButton={leftNavButton}
          title={NavTitle}
        />
        <View style={baseStyles.content}>
          <SignUpForm
            signUpUser={this.props.signUpUser}
            user={this.props.user}
          />
        </View>
        <View style={baseStyles.footer}>
          <Text>
            Already have an
            account? <Text onPress={this.handleSignIn} style={baseStyles.link}>
              Sign In.
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

SignUpScreen.propTypes = {
  onBackPress: PropTypes.func,
  onSignInPress: PropTypes.func,
  signUpUser: PropTypes.func,
  user: PropTypes.any
};
SignUpScreen.defaultProps = {
  onBackPress: emptyFn,
  onSignInPress: emptyFn
};
