import { bindActionCreators } from 'redux';
import { BluetoothDenied } from './BluetoothDenied';
import emptyFn from 'empty/function';
import { EnableBluetoothPrompt } from './EnableBluetoothPrompt';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  startListeningForAuthorization,
  stopListeningForAuthorization,
  requestBluetoothAccess
} from '../../../../react/actions/BeaconsActions';

function getState(state) {
  return {
    beacons: state.beacons
  };
}

function getActions(dispatch) {
  return bindActionCreators({ requestBluetoothAccess, startListeningForAuthorization, stopListeningForAuthorization }, dispatch);
}

export class BluetoothGateContainer extends Component {
  componentWillMount() {
    this.props.startListeningForAuthorization();
  }
  componentWillUnmount() {
    this.props.stopListeningForAuthorization();
  }
  render() {
    if(this.props.beacons.get('enabled')) {
      return this.props.children;
    }
    if(this.props.beacons.get('denied')) {
      return (
        <BluetoothDenied
          onCancel={this.props.onCancel}
          onManualChange={this.props.onManualChange}
        />
      );
    }
    return (
      <EnableBluetoothPrompt
        beacons={this.props.beacons}
        onCancel={this.props.onCancel}
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
  onCancel: PropTypes.func,
  onManualChange: PropTypes.func,
  requestBluetoothAccess: PropTypes.func,
  startListeningForAuthorization: PropTypes.func,
  stopListeningForAuthorization: PropTypes.func
};
BluetoothGateContainer.defaultProps = {
  requestBluetoothAccess: emptyFn,
  startListeningForAuthorization: emptyFn,
  stopListeningForAuthorization: emptyFn
};

export const BluetoothGate = connect(getState, getActions)(BluetoothGateContainer);
