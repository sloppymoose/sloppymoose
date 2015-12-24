import { BluetoothGate } from '../Gates';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { EventCheckInScreen } from '../Screens';

function getState(state) {
  return {
    beacons: state.beacons
  };
}

export class EventCheckInContainer extends Component {
  render() {
    return (
      <BluetoothGate>
        <EventCheckInScreen
          beacons={this.props.beacons}
        />
      </BluetoothGate>
    );
  }
}

EventCheckInContainer.propTypes = {
  beacons: PropTypes.any
};

export const EventCheckInHandler = connect(getState)(EventCheckInContainer);
