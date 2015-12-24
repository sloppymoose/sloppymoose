import { bindActionCreators } from 'redux';
import { BluetoothDenied } from './BluetoothDenied';
import emptyFn from 'empty/function';
import { EnableBluetoothPrompt } from './EnableBluetoothPrompt';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  requestBluetoothAccess,
  startMonitoring,
  stopMonitoring
} from '../../../../react/actions/BeaconsActions';

function getState(state) {
  return {
    beacons: state.beacons
  };
}

function getActions(dispatch) {
  return bindActionCreators({ requestBluetoothAccess, startMonitoring, stopMonitoring }, dispatch);
}

export class BluetoothGateContainer extends Component {
  componentDidMount() {
    if(this.props.beacons.get('enabled')) {
      this.props.requestBluetoothAccess();
      this.props.startMonitoring();
    }
  }
  componentWillUnmount() {
    this.props.stopMonitoring();
  }
  render() {
    if(this.props.beacons.get('enabled')) {
      return this.props.children;
    }
    if(this.props.beacons.get('denied')) {
      return <BluetoothDenied/>;
    }
    return (
      <EnableBluetoothPrompt
        beacons={this.props.beacons}
        requestBluetoothAccess={this.props.requestBluetoothAccess}
      />
    );
  }
}

BluetoothGateContainer.propTypes = {
  beacons: ImmutablePropTypes.contains({
    denied: PropTypes.bool,
    enabled: PropTypes.bool
  }),
  children: PropTypes.node,
  requestBluetoothAccess: PropTypes.func,
  startMonitoring: PropTypes.func,
  stopMonitoring: PropTypes.func
};
BluetoothGateContainer.defaultProps = {
  requestBluetoothAccess: emptyFn,
  startMonitoring: emptyFn,
  stopMonitoring: emptyFn
};

export const BluetoothGate = connect(getState, getActions)(BluetoothGateContainer);
