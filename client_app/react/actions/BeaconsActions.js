import BeaconsActions from '../actionTypes/BeaconsActions';
import Beacons from 'react-native-ibeacon';
import { DeviceEventEmitter } from 'react-native';
import emptyObj from 'empty/object';
import { store } from '../util/reduxStore';

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

function authorizationDidChange(data) {
  // TODO: Determine why this does not fire
  store.dispatch({
    type: BeaconsActions.AUTHORIZATION_DID_CHANGE,
    payload: {
      data
    }
  });
}

Beacons.getAuthorizationStatus((authorization) => {
  store.dispatch({
    type: BeaconsActions.AUTHORIZATION_STATUS_RETRIEVED,
    payload: {
      authorization
    }
  });
});

export function requestBluetoothAccess() {
  Beacons.requestWhenInUseAuthorization();

  DeviceEventEmitter.addListener('beaconsDidRange', beaconDidRange);
  DeviceEventEmitter.addListener('regionDidEnter', regionDidEnter);
  DeviceEventEmitter.addListener('regionDidExit', regionDidExit);
  DeviceEventEmitter.addListener('authorizationDidChange', authorizationDidChange);

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
