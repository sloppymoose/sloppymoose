import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';
import {
  ActivityTabHandler,
  BadgesTabHandler,
  EventCheckInTabHandler
} from '../TabHandlers';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import emptyFn from 'empty/function';
import { fetchShirtSizes } from '../../../react/actions/ShirtSizeActions';
import {
  ForgotPasswordHandler,
  SignInHandler,
  SignUpHandler,
  SplashHandler
} from '../RouteHandlers';
import { initTokens } from '../../../react/actions/UserActions';
import TabIcon from './TabIcon';

const BackArrowIcon = require('image!BackImageChevronWhite');
const baseStyles = {
  navBar: {
    backgroundColor: 'orange',
    borderBottomWidth: 0
  },
  transparentNavBar: {
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white'
  },
  scene: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  }
};
const RouterWithRedux = connect()(Router);
const DefaultTabProps = {
  backButtonImage: BackArrowIcon,
  navigationBarStyle: baseStyles.navBar,
  titleStyle: baseStyles.title
};

function getActions(dispatch) {
  return bindActionCreators({ fetchShirtSizes, initTokens }, dispatch);
}

class NativeRouterContainer extends Component {
  componentWillMount() {
    this.props.initTokens()
      .catch(console.error);
    this.props.fetchShirtSizes();
      // .catch(console.error); // TODO: ¯\_(ツ)_/¯
  }
  render() {
    return (
      <RouterWithRedux sceneStyle={baseStyles.scene}>
        <Scene
          component={SplashHandler}
          hideNavBar
          initial
          key="splash"
        />
        <Scene
          key="home"
          tabBarIconContainerStyle={baseStyles.tabBar}
          tabs
          type={ActionConst.RESET}
        >
          <Scene
            {...DefaultTabProps}
            component={ActivityTabHandler}
            icon={TabIcon}
            key={ActivityTabHandler.routeName}
            title="Activity"
          />
          <Scene
            {...DefaultTabProps}
            component={EventCheckInTabHandler}
            icon={TabIcon}
            key={EventCheckInTabHandler.routeName}
            navigationBarStyle={[ DefaultTabProps.navigationBarStyle, baseStyles.transparentNavBar ]}
            title="Check In"
          />
          <Scene
            {...DefaultTabProps}
            component={BadgesTabHandler}
            icon={TabIcon}
            key={BadgesTabHandler.routeName}
            title="Badges"
          />
        </Scene>
        <Scene
          component={SignInHandler}
          hideNavBar
          key="signIn"
          title="Sign In"
          type={ActionConst.RESET}
        />
        <Scene
          {...DefaultTabProps}
          component={SignUpHandler}
          hideNavBar={false}
          key="signUp"
          onBack={Actions.BACK}
          title="Sign Up"
        />
        <Scene
          {...DefaultTabProps}
          component={ForgotPasswordHandler}
          hideNavBar={false}
          key="forgotPassword"
          onBack={Actions.BACK}
          title="Forgot Password"
        />
      </RouterWithRedux>
    );
  }
}

NativeRouterContainer.propTypes = {
  fetchShirtSizes: PropTypes.func,
  initTokens: PropTypes.func
};

NativeRouterContainer.defaultProps = {
  fetchShirtSizes: emptyFn,
  initTokens: emptyFn
};

export const NativeRouter = connect(null, getActions)(NativeRouterContainer);
