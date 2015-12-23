import CheckInActions from '../actionTypes/CheckInActions';
import emptyAry from 'empty/array';
import emptyObj from 'empty/object';
import Immutable from 'immutable';

function initialState() {
  return Immutable.fromJS({
    error: emptyObj,
    items: emptyAry,
    loading: false
  });
}

function beginLoading(state) {
  return state.merge({
    error: emptyObj,
    loading: true
  });
}

function endLoading(state) {
  return state.set('loading', false);
}

function loadData(state, items) {
  return state.set('items', items);
}

function reportError(state, error) {
  return state.set('error', error);
}

export function checkIns(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case CheckInActions.CHECK_INS_LOAD_BEGIN:
      return beginLoading(state, payload);
    case CheckInActions.CHECK_INS_LOADED:
      return loadData(state, payload.checkIns);
    case CheckInActions.CHECK_INS_LOAD_END:
      return endLoading(state, payload);
    case CheckInActions.CHECK_INS_LOAD_ERROR:
      return reportError(state, payload.error);
    default:
      return state;
  }
}
