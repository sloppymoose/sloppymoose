import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import emptyFn from 'empty/function';
import emptyObj from 'empty/object';
import {
  HomeHandler,
  SignedOutHandler,
  SignInHandler,
  SignUpHandler,
  SplashHandler
} from '../RouteHandlers';
import { initTokens } from '../../../react/actions/UserActions';
import { Router, Route } from 'react-native-redux-router';

function getState(state) {
  return emptyObj;
}

function getActions(dispatch) {
  return bindActionCreators({ initTokens }, dispatch);
}

class NativeRouterContainer extends Component {
  componentWillMount() {
    this.props.initTokens();
  }
  render() {
    return (
      <Router>
        <Route
          component={SplashHandler}
          initial
          name="splash"
          title=""
        />
        <Route
          component={HomeHandler}
          name="home"
          title="Home"
          type="replace"
        />
        <Route
          component={SignInHandler}
          name="signIn"
          title="Sign In"
          type="replace"
        />
        <Route
          component={SignedOutHandler}
          name="signedOut"
          title="Signed out"
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

NativeRouterContainer.propTypes = {
  initTokens: PropTypes.func
};

NativeRouterContainer.defaultProps = {
  initTokens: emptyFn
};

export const NativeRouter = connect(getState, getActions)(NativeRouterContainer);
