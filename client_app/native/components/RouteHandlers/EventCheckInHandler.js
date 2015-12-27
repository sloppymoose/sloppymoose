import { Actions } from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { BluetoothGate } from '../Gates';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { EventCheckInScreen } from '../Screens';
import { startMonitoring, stopMonitoring } from '../../../react/actions/BeaconsActions';
import { fetchActiveEvents } from '../../../react/actions/EventActions';

function getState(state) {
  return {
    activeEvents: state.activeEvents,
    beacons: state.beacons
  };
}

function getActions(dispatch) {
  return bindActionCreators({ fetchActiveEvents, startMonitoring, stopMonitoring }, dispatch);
}

export class EventCheckInContainer extends Component {
  handleCancel() {
    Actions.home();
  }
  handleManualAuthChange() {
    Actions.eventCheckIn();
  }
  render() {
    return (
      <BluetoothGate onCancel={this.handleCancel} onManualChange={this.handleManualAuthChange}>
        <EventCheckInScreen
          activeEvents={this.props.activeEvents}
          beacons={this.props.beacons}
          fetchActiveEvents={this.props.fetchActiveEvents}
          startMonitoring={this.props.startMonitoring}
          stopMonitoring={this.props.stopMonitoring}
        />
      </BluetoothGate>
    );
  }
}

EventCheckInContainer.propTypes = {
  activeEvents: PropTypes.any,
  beacons: PropTypes.any,
  fetchActiveEvents: PropTypes.func,
  startMonitoring: PropTypes.func,
  stopMonitoring: PropTypes.func
};

export const EventCheckInHandler = connect(getState, getActions)(EventCheckInContainer);
