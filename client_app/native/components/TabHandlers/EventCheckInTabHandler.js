import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { BluetoothGate } from '../Gates';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { EventCheckInTabScreen } from '../Screens';
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

export class EventCheckInTabContainer extends Component {
  handleCancel() {
    Actions.home();
  }
  handleManualAuthChange() {
    Actions.home({ activeTabIndex: 1 });
  }
  render() {
    return (
      <BluetoothGate onCancel={this.handleCancel} onManualChange={this.handleManualAuthChange}>
        <EventCheckInTabScreen
          activeEvents={this.props.activeEvents}
          beacons={this.props.beacons}
          fetchActiveEvents={this.props.fetchActiveEvents}
          startMonitoring={this.props.startMonitoring}
          stopMonitoring={this.props.stopMonitoring}
          tabVisible={this.props.tabVisible}
        />
      </BluetoothGate>
    );
  }
}

EventCheckInTabContainer.propTypes = {
  activeEvents: PropTypes.any,
  beacons: PropTypes.any,
  fetchActiveEvents: PropTypes.func,
  startMonitoring: PropTypes.func,
  stopMonitoring: PropTypes.func,
  tabVisible: PropTypes.bool
};
EventCheckInTabContainer.defaultProps = {
  tabVisible: false
};

export const EventCheckInTabHandler = connect(getState, getActions)(EventCheckInTabContainer);
