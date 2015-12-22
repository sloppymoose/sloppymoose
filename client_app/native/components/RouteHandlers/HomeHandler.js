import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { signOutUser } from '../../../react/actions/UserActions';

import { HomeScreen } from '../Screens';

function getState(state) {
  return {
    user: state.user
  };
}

function getActions(dispatch) {
  return bindActionCreators({ signOutUser }, dispatch);
}

export class HomeContainer extends Component {
  render() {
    return (
      <HomeScreen
        signedOut={this.props.signedOut}
        user={this.props.user}
      />
    );
  }
}

HomeContainer.propTypes = {
  signedOut: PropTypes.bool,
  user: PropTypes.shape({
    accessToken: PropTypes.string,
    signedIn: PropTypes.bool
  })
};

export const HomeHandler = connect(getState, getActions)(HomeContainer);
