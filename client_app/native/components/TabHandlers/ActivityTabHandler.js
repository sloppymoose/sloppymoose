import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { fetchCheckIns } from '../../../react/actions/CheckInActions';
import { ActivityTabScreen } from '../Screens';

function getState(state) {
  return {
    checkIns: state.checkIns,
    user: state.user
  };
}

function getActions(dispatch) {
  return bindActionCreators({ fetchCheckIns }, dispatch);
}

class ActivityTabContainer extends Component {
  componentWillMount() {
    this.props.fetchCheckIns();
  }
  render() {
    return (
      <ActivityTabScreen
        checkIns={this.props.checkIns}
        fetchCheckIns={this.props.fetchCheckIns}
        user={this.props.user}
      />
    );
  }
}

ActivityTabContainer.propTypes = {
  checkIns: PropTypes.any,
  fetchCheckIns: PropTypes.func,
  signOutUser: PropTypes.func,
  tabVisible: PropTypes.bool,
  user: PropTypes.any
};
ActivityTabContainer.defaultProps = {
  tabVisible: false
};

export const ActivityTabHandler = connect(getState, getActions)(ActivityTabContainer);
