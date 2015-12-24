import { Actions } from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { BluetoothGate } from '../Gates';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { EventCheckInScreen } from '../Screens';
import { startMonitoring, stopMonitoring } from '../../../react/actions/BeaconsActions';

function getState(state) {
  return {
    beacons: state.beacons
  };
}

function getActions(dispatch) {
  return bindActionCreators({ startMonitoring, stopMonitoring }, dispatch);
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
          beacons={this.props.beacons}
          startMonitoring={this.props.startMonitoring}
          stopMonitoring={this.props.stopMonitoring}
        />
      </BluetoothGate>
    );
  }
}

EventCheckInContainer.propTypes = {
  beacons: PropTypes.any,
  startMonitoring: PropTypes.func,
  stopMonitoring: PropTypes.func
};

export const EventCheckInHandler = connect(getState, getActions)(EventCheckInContainer);
