import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import emptyFn from 'empty/function';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export class SignedOutScreen extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>Welcome to Sloppy Moose!</Text>
        <TouchableOpacity onPress={this.props.onSignUpPress}>
          <View>
            <Text>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onSignInPress}>
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

SignedOutScreen.propTypes = {
  onSignInPress: PropTypes.func,
  onSignUpPress: PropTypes.func
};
SignedOutScreen.defaultProps = {
  onSignInPress: emptyFn,
  onSignUpPress: emptyFn
};
