import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import emptyFn from 'empty/function';
import { signInUser } from '../../../react/actions/UserActions';
import { SignInScreen } from '../Screens';

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
      <SignInScreen
        onCreateAccount={Actions.signUp}
        onForgotPassword={Actions.forgotPassword}
        signInUser={this.props.signInUser}
        user={this.props.user}
      />
    );
  }
}
SignInContainer.propTypes = {
  signInUser: PropTypes.func,
  user: PropTypes.any
};
SignInContainer.defaultProps = {
  signInUser: emptyFn
};

export const SignInHandler = connect(getState, getActions)(SignInContainer);
