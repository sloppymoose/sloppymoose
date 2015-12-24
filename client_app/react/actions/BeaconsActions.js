import BeaconsActions from '../actionTypes/BeaconsActions';
import Beacons from 'react-native-ibeacon';
import { DeviceEventEmitter } from 'react-native';
import emptyObj from 'empty/object';
import { store } from '../util/reduxStore';

let AuthorizationChangePoller = null;
const BluetoothAuthorizationPollInterval = 500;
const Region = {
  identifier: '',
  uuid: null,
  major: 1,
  minor: 1
};

function beaconDidRange(data) {
  store.dispatch({
    type: BeaconsActions.REGION_DID_RANGE,
    payload: {
      data
    }
  });
}

function regionDidEnter(data) {
  store.dispatch({
    type: BeaconsActions.REGION_DID_ENTER,
    payload: {
      data
    }
  });
}

function regionDidExit(data) {
  store.dispatch({
    type: BeaconsActions.REGION_DID_EXIT,
    payload: {
      data
    }
  });
}

function authorizationDidChange(authorization) {
  // TODO: Determine why this does not fire
  store.dispatch({
    type: BeaconsActions.AUTHORIZATION_DID_CHANGE,
    payload: {
      authorization
    }
  });
}

DeviceEventEmitter.addListener('beaconsDidRange', beaconDidRange);
DeviceEventEmitter.addListener('regionDidEnter', regionDidEnter);
DeviceEventEmitter.addListener('regionDidExit', regionDidExit);
DeviceEventEmitter.addListener('authorizationDidChange', authorizationDidChange);

Beacons.getAuthorizationStatus((authorization) => {
  store.dispatch({
    type: BeaconsActions.AUTHORIZATION_STATUS_RETRIEVED,
    payload: {
      authorization
    }
  });
});

// TODO: Remove polyfill for authorizationDidChange
// See also: https://github.com/frostney/react-native-ibeacon/issues/22
export function startListeningForAuthorization() {
  return function(dispatch, getState) {
    if(AuthorizationChangePoller) {
      return;
    }
    const { beacons } = getState();
    const currentState = beacons.get('authorizationState');
    AuthorizationChangePoller = setInterval(() => {
      Beacons.getAuthorizationStatus((authorization) => {
        if(authorization !== currentState) {
          authorizationDidChange(authorization);
        }
      });
    }, BluetoothAuthorizationPollInterval);
  };
}

export function stopListeningForAuthorization() {
  return function(dispatch) {
    clearInterval(AuthorizationChangePoller);
    AuthorizationChangePoller = null;
  };
}

export function requestBluetoothAccess() {
  Beacons.requestWhenInUseAuthorization();
  return {
    type: BeaconsActions.BLUETOOTH_REQUEST_ACCESS,
    payload: emptyObj
  };
}

export function startMonitoring() {
  Beacons.startMonitoringForRegion(Region);
  Beacons.startRangingBeaconsInRegion(Region);
  Beacons.startUpdatingLocation();
  return {
    type: BeaconsActions.BEACON_START_MONITORING,
    payload: emptyObj
  };
}

export function stopMonitoring() {
  Beacons.stopMonitoringForRegion(Region);
  Beacons.stopRangingBeaconsInRegion(Region);
  Beacons.stopUpdatingLocation();
  return {
    type: BeaconsActions.BEACON_STOP_MONITORING,
    payload: emptyObj
  };
}
