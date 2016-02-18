import BeaconsActions from '../actionTypes/BeaconsActions';
import Beacons from 'react-native-ibeacon';
import { DeviceEventEmitter } from 'react-native';
import emptyObj from 'empty/object';
import { store } from '../util/reduxStore';

let AuthorizationChangePoller = null;
const LocationAuthorizationPollInterval = 500;

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
    AuthorizationChangePoller = setInterval(() => {
      Beacons.getAuthorizationStatus((authorization) => {
        const { beacons } = getState();
        const currentState = beacons.get('authorizationState');
        if(authorization !== currentState) {
          authorizationDidChange(authorization);
        }
      });
    }, LocationAuthorizationPollInterval);
  };
}

export function stopListeningForAuthorization() {
  return function(dispatch) {
    clearInterval(AuthorizationChangePoller);
    AuthorizationChangePoller = null;
  };
}

export function requestLocationAccess() {
  Beacons.requestWhenInUseAuthorization();
  return {
    type: BeaconsActions.LOCATION_REQUEST_ACCESS,
    payload: emptyObj
  };
}

export function startMonitoring(regions) {
  if(regions && regions.size > 0) {
    regions.map((region) => {
      region = region.toJS();
      Beacons.startMonitoringForRegion(region);
      Beacons.startRangingBeaconsInRegion(region);
    });
    Beacons.startUpdatingLocation();
  }
  return {
    type: BeaconsActions.BEACON_START_MONITORING,
    payload: emptyObj
  };
}

export function stopMonitoring(regions) {
  if(regions && regions.map) {
    regions.map((region) => {
      region = region.toJS();
      Beacons.stopMonitoringForRegion(region);
      Beacons.stopRangingBeaconsInRegion(region);
    });
  }
  Beacons.stopUpdatingLocation();
  return {
    type: BeaconsActions.BEACON_STOP_MONITORING,
    payload: emptyObj
  };
}
