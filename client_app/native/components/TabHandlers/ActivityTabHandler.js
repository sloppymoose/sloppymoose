import { ActivityTabScreen } from '../Screens';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCheckIns } from '../../../react/actions/CheckInActions';
import { isTabVisible } from '../../../react/util/navigationHelpers';

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
    const tabVisible = isTabVisible(this);
    return (
      <ActivityTabScreen
        checkIns={this.props.checkIns}
        fetchCheckIns={this.props.fetchCheckIns}
        tabVisible={tabVisible}
        user={this.props.user}
      />
    );
  }
}

ActivityTabContainer.propTypes = {
  checkIns: PropTypes.any,
  fetchCheckIns: PropTypes.func,
  signOutUser: PropTypes.func,
  user: PropTypes.any
};
ActivityTabContainer.routeName = 'activity';

export const ActivityTabHandler = connect(getState, getActions)(ActivityTabContainer);
