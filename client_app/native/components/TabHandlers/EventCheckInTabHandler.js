import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { LocationGate } from '../Gates';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { EventCheckInTabScreen } from '../Screens';
import { fetchActiveEvents } from '../../../react/actions/EventActions';
import { isTabVisible } from '../../../react/util/navigationHelpers';
import { startMonitoring, stopMonitoring } from '../../../react/actions/BeaconsActions';

function getState(state) {
  return {
    activeEvents: state.activeEvents,
    currentRoute: state.router.get('currentRoute'),
    beacons: state.beacons
  };
}

function getActions(dispatch) {
  return bindActionCreators({ fetchActiveEvents, startMonitoring, stopMonitoring }, dispatch);
}

export class EventCheckInTabContainer extends Component {
  handleManualAuthChange() {
    Actions.checkIn();
  }
  render() {
    const tabVisible = isTabVisible(this);
    return (
      <LocationGate
        monitorAuthorization={tabVisible}
        onManualChange={this.handleManualAuthChange}
      >
        <EventCheckInTabScreen
          activeEvents={this.props.activeEvents}
          beacons={this.props.beacons}
          fetchActiveEvents={this.props.fetchActiveEvents}
          startMonitoring={this.props.startMonitoring}
          stopMonitoring={this.props.stopMonitoring}
          tabVisible={tabVisible}
        />
      </LocationGate>
    );
  }
}

EventCheckInTabContainer.propTypes = {
  activeEvents: PropTypes.any,
  beacons: PropTypes.any,
  currentRoute: PropTypes.string,
  fetchActiveEvents: PropTypes.func,
  startMonitoring: PropTypes.func,
  stopMonitoring: PropTypes.func
};
EventCheckInTabContainer.routeName = 'checkIn';

export const EventCheckInTabHandler = connect(getState, getActions)(EventCheckInTabContainer);
