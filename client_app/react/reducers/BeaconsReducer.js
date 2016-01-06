import BeaconsActions from '../actionTypes/BeaconsActions';
import emptyAry from 'empty/array';
import emptyObj from 'empty/object';
import EventActions from '../actionTypes/EventActions';
import { flatten, map, uniq } from 'lodash';
import Immutable from 'immutable';
import { isBeaconEnabled, isBeaconDenied } from '../util/beaconHelpers';
import { first, sortBy } from 'lodash';

function initialState() {
  return Immutable.fromJS({
    activeEventBeacons: emptyAry,
    activeRegion: emptyObj,
    authorizationState: 'notDetermined',
    denied: false,
    enabled: false,
    error: null,
    loading: false,
    nearest: emptyObj,
    rangedBeacons: emptyAry
  });
}

function loadActiveEventBeacons(state, items) {
  let beacons = map(items, (item) => item.relationships.beacons.data);
  beacons = uniq(flatten(beacons));
  return state.set('activeEventBeacons', Immutable.fromJS(beacons));
}

function didRange(state, payload) {
  const nearest = first(sortBy(payload.beacons, 'accuracy')) || emptyObj;
  return state.merge({
    activeRegion: payload.region,
    rangedBeacons: payload.beacons,
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
    case BeaconsActions.AUTHORIZATION_DID_CHANGE:
      return setAuthorizationStatus(state, payload.authorization);
    case BeaconsActions.REGION_DID_RANGE:
      return didRange(state, payload.data);
    case EventActions.ACTIVE_EVENTS_LOADED:
      return loadActiveEventBeacons(state, payload.items);
    default:
      return state;
  }
}
