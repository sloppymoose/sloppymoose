import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import { SignInForm } from '../Forms';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

    borderColor: 'green',
    borderWidth: 5,
  }
});

export class SignInScreen extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text># Sign In</Text>
        <TouchableOpacity onPress={this.props.onBackPress}>
          <View>
            <Text>
              Go Back?
            </Text>
          </View>
        </TouchableOpacity>
        <SignInForm
          signInUser={this.props.signInUser}
          user={this.props.user}
        />
      </View>
    );
  }
}

SignInScreen.propTypes = {
  onBackPress: PropTypes.func,
  signInUser: PropTypes.func,
  user: PropTypes.any
};
SignInScreen.defaultProps = {
  onBackPress: emptyFn,
  signInUser: emptyFn
};
