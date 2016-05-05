import BadgeActions from '../actionTypes/BadgeActions';
import emptyAry from 'empty/array';
import emptyObj from 'empty/object';
import Immutable from 'immutable';

function initialState() {
  return Immutable.fromJS({
    loadError: emptyObj,
    items: emptyAry,
    loading: false
  });
}

function beginLoading(state) {
  return state.merge({
    loadError: emptyObj,
    loading: true
  });
}

function endLoading(state) {
  return state.set('loading', false);
}

function loadData(state, items) {
  return state.set('items', Immutable.fromJS(items));
}

function reportError(state, error) {
  return state.set('loadError', error);
}

export function badges(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case BadgeActions.BADGES_LOAD_BEGIN:
      return beginLoading(state, payload);
    case BadgeActions.BADGES_LOADED:
      return loadData(state, payload.data);
    case BadgeActions.BADGES_LOAD_END:
      return endLoading(state, payload);
    case BadgeActions.BADGES_LOAD_ERROR:
      return reportError(state, payload.error);
    default:
      return state;
  }
}
