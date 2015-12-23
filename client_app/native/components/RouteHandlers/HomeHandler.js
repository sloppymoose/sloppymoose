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
        signOutUser={this.props.signOutUser}
        user={this.props.user}
      />
    );
  }
}

HomeContainer.propTypes = {
  signOutUser: PropTypes.func,
  user: PropTypes.any
};

export const HomeHandler = connect(getState, getActions)(HomeContainer);
