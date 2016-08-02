import { bindActionCreators } from 'redux';
import { LocationDenied } from './LocationDenied';
import emptyFn from 'empty/function';
import { EnableLocationPrompt } from './EnableLocationPrompt';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  startListeningForAuthorization,
  stopListeningForAuthorization,
  requestLocationAccess
} from '../../../../react/actions/BeaconsActions';

function getState(state) {
  return {
    beacons: state.beacons
  };
}

function getActions(dispatch) {
  return bindActionCreators({ requestLocationAccess, startListeningForAuthorization, stopListeningForAuthorization }, dispatch);
}

export class LocationGateContainer extends Component {
  componentDidMount() {
    if(this.props.monitorAuthorization) {
      this.props.startListeningForAuthorization();
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.monitorAuthorization && !prevProps.monitorAuthorization) {
      this.props.startListeningForAuthorization();
    } else if(!this.props.monitorAuthorization && prevProps.monitorAuthorization) {
      this.props.stopListeningForAuthorization();
    }
  }
  render() {
    if(this.props.beacons.get('enabled')) {
      return this.props.children;
    }
    if(this.props.beacons.get('denied')) {
      return (
        <LocationDenied
          onManualChange={this.props.onManualChange}
        />
      );
    }
    return (
      <EnableLocationPrompt
        beacons={this.props.beacons}
        requestLocationAccess={this.props.requestLocationAccess}
      />
    );
  }
}

LocationGateContainer.propTypes = {
  beacons: ImmutablePropTypes.contains({
    denied: PropTypes.bool,
    enabled: PropTypes.bool
  }),
  children: PropTypes.node,
  monitorAuthorization: PropTypes.bool,
  onManualChange: PropTypes.func,
  requestLocationAccess: PropTypes.func,
  startListeningForAuthorization: PropTypes.func,
  stopListeningForAuthorization: PropTypes.func
};
LocationGateContainer.defaultProps = {
  monitorAuthorization: false,
  requestLocationAccess: emptyFn,
  startListeningForAuthorization: emptyFn,
  stopListeningForAuthorization: emptyFn
};

export const LocationGate = connect(getState, getActions)(LocationGateContainer);
