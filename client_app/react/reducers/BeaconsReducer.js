import BeaconsActions from '../actionTypes/BeaconsActions';
import emptyAry from 'empty/array';
import emptyObj from 'empty/object';
import Immutable from 'immutable';
import { isBeaconEnabled, isBeaconDenied } from '../util/beaconHelpers';
import { first, sortBy } from 'lodash';

function initialState() {
  return Immutable.fromJS({
    activeRegion: emptyObj,
    authorizationState: 'notDetermined',
    denied: false,
    enabled: false,
    error: null,
    items: emptyAry,
    loading: false,
    nearest: emptyObj
  });
}

function didRange(state, payload) {
  const nearest = first(sortBy(payload.beacons, 'accuracy')) || emptyObj;
  return state.merge({
    activeRegion: payload.region,
    items: payload.beacons,
    nearest
  });
}

function setAuthorizationStatus(state, authorizationState) {
  return state.merge({
    authorizationState,
    denied: isBeaconDenied(authorizationState),
    enabled: isBeaconEnabled(authorizationState)
  });
}

export function beacons(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case BeaconsActions.AUTHORIZATION_STATUS_RETRIEVED:
      return setAuthorizationStatus(state, payload.authorization);
    case BeaconsActions.REGION_DID_RANGE:
      return didRange(state, payload.data);
    default:
      return state;
  }
}
