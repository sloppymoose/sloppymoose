import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import emptyObj from 'empty/object';
import {
  HomeHandler,
  SignedOutHandler,
  SignInHandler,
  SignUpHandler
} from '../RouteHandlers';
import { Router, Route } from 'react-native-redux-router';

function getState(state) {
  return {
    user: state.user
  };
}

class _NativeRouter extends Component {
  render() {
    return (
      <Router>
        <Route
          component={HomeHandler}
          initial={this.props.user.signedIn}
          name="home"
          title="Home"
          type="replace"
        />
        <Route
          component={SignedOutHandler}
          initial={!this.props.user.signedIn}
          name="signedOut"
          title="Signed out"
          type="replace"
        />
        <Route
          component={SignInHandler}
          name="signIn"
          title="Sign In"
          type="replace"
        />
        <Route
          component={SignUpHandler}
          name="signUp"
          title="Sign Up"
          type="replace"
        />
      </Router>
    );
  }
}

_NativeRouter.propTypes = {
  user: PropTypes.shape({
    signedIn: PropTypes.bool
  })
};

_NativeRouter.defaultProps = {
  user: emptyObj
};

export const NativeRouter = connect(getState)(_NativeRouter);
