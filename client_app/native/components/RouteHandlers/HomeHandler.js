import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { fetchCheckIns } from '../../../react/actions/CheckInActions';
import { HomeScreen } from '../Screens';
import { signOutUser } from '../../../react/actions/UserActions';

function getState(state) {
  return {
    checkIns: state.checkIns,
    user: state.user
  };
}

function getActions(dispatch) {
  return bindActionCreators({ fetchCheckIns, signOutUser }, dispatch);
}

export class HomeContainer extends Component {
  componentWillMount() {
    this.props.fetchCheckIns();
  }
  render() {
    return (
      <HomeScreen
        checkIns={this.props.checkIns}
        fetchCheckIns={this.props.fetchCheckIns}
        signOutUser={this.props.signOutUser}
        user={this.props.user}
      />
    );
  }
}

HomeContainer.propTypes = {
  checkIns: PropTypes.any,
  fetchCheckIns: PropTypes.func,
  signOutUser: PropTypes.func,
  user: PropTypes.any
};

export const HomeHandler = connect(getState, getActions)(HomeContainer);
