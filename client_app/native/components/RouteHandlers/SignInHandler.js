import { Actions } from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux/native';
import emptyFn from 'empty/function';
import { SignInForm } from '../Forms/SignInForm';
import { signInUser } from '../../../react/actions/UserActions';

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

function getState(state) {
  return {
    user: state.user
  };
}

function getActions(dispatch) {
  return bindActionCreators({ signInUser }, dispatch);
}

class SignInContainer extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text># Sign In</Text>
        <TouchableOpacity onPress={Actions.signedOut}>
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
SignInContainer.propTypes = {
  signInUser: PropTypes.func,
  user: PropTypes.object
};
SignInContainer.defaultProps = {
  signInUser: emptyFn
};

export const SignInHandler = connect(getState, getActions)(SignInContainer);
