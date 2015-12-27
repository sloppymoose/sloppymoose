import BeaconsActions from '../actionTypes/BeaconsActions';
import emptyAry from 'empty/array';
import emptyObj from 'empty/object';
import EventActions from '../actionTypes/EventActions';
import { find } from 'lodash';
import Immutable from 'immutable';
import { map } from 'lodash';

const ProximityOrder = {
  immediate: 0,
  near: 1,
  far: 2,
  unknown: 99
};

function initialState() {
  return Immutable.fromJS({
    error: emptyObj,
    loading: true,
    items: emptyAry,
    inRange: emptyAry
  });
}

function beginLoading(state) {
  return state.set('loading', true);
}

function endLoading(state) {
  return state.set('loading', false);
}

function loadData(state, items) {
  return state.set('items', Immutable.fromJS(items));
}

function loadingError(state, error) {
  return state.set('error', error);
}

function toBeaconKey(beacon) {
  if(beacon instanceof Immutable.Map) {
    beacon = beacon.toJS();
  }
  return `${beacon.uuid}/${beacon.major}/${beacon.minor}`;
}

function filterRangedEvents(state, data) {
  const rangedBeaconsIds = Immutable.Set(map(data.beacons, toBeaconKey));
  const inRange = state.get('items').filter((item) => {
    const activeBeaconsIds = item.getIn(['relationships', 'beacons', 'data']).map(toBeaconKey).toSet();
    const matchingBeaconIds = rangedBeaconsIds.intersect(activeBeaconsIds).toList();
    return matchingBeaconIds.size > 0;
  }).map((item) => {
    return item.updateIn(['relationships', 'beacons', 'data'], (beacons) => {
      // Merge in proximity data
      return beacons.map((beacon) => {
        const rangedBeacon = find(data.beacons, { uuid: beacon.get('uuid') });
        return beacon.merge(rangedBeacon);
      })
      // Sort by proximity
      .sortBy((beacon) => ProximityOrder[beacon.get('proximity')]);
    });
  });
  return state.set('inRange', inRange);
}

export function activeEvents(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case EventActions.ACTIVE_EVENTS_LOAD_BEGIN:
      return beginLoading(state);
    case EventActions.ACTIVE_EVENTS_LOADED:
      return loadData(state, payload.items);
    case EventActions.ACTIVE_EVENTS_LOAD_END:
      return endLoading(state);
    case EventActions.ACTIVE_EVENTS_LOAD_ERROR:
      return loadingError(state, payload.error);
    case BeaconsActions.REGION_DID_RANGE:
      return filterRangedEvents(state, payload.data);
    default:
      return state;
  }
}
