import {
  ActivityTabHandler,
  BadgesTabHandler,
  EventCheckInTabHandler
} from '../TabHandlers';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import emptyFn from 'empty/function';
import emptyObj from 'empty/object';
import {
  ForgotPasswordHandler,
  SignInHandler,
  SignUpHandler,
  SplashHandler
} from '../RouteHandlers';
import { initTokens } from '../../../react/actions/UserActions';
import { Router, Route, Schema, TabBar } from 'react-native-router-flux';
import TabIcon from './TabIcon';

const baseStyles = {
  homeNavigationBar: {
    backgroundColor: 'orange',
    borderBottomWidth: 0
  },
  homeTabBar: {
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  homeTitle: {
    color: 'white'
  }
};

function getState(state) {
  return emptyObj;
}

function getActions(dispatch) {
  return bindActionCreators({ initTokens }, dispatch);
}

class NativeRouterContainer extends Component {
  componentWillMount() {
    this.props.initTokens()
      .catch(console.error);
  }
  render() {
    return (
      <Router>
        <Schema icon={TabIcon} name="tab" type="switch"/>
        <Route
          component={SplashHandler}
          initial
          name="splash"
          title=""
        />
        <Route hideNavBar name="home">
          <Router
            footer={TabBar}
            navigationBarStyle={baseStyles.homeNavigationBar}
            tabBarStyle={baseStyles.homeTabBar}
            titleStyle={baseStyles.homeTitle}
          >
            <Route
              component={ActivityTabHandler}
              name="activity"
              schema="tab"
              title="Activity"
            />
            <Route
              component={EventCheckInTabHandler}
              name="checkIn"
              schema="tab"
              title="Check In"
            />
            <Route
              component={BadgesTabHandler}
              name="badges"
              schema="tab"
              title="Badges"
            />
          </Router>
        </Route>
        <Route
          component={SignInHandler}
          hideNavBar
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
        <Route
          component={ForgotPasswordHandler}
          name="forgotPassword"
          title="Forgot Password"
          type="push"
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
