import CheckInActions from '../actionTypes/CheckInActions';
import emptyAry from 'empty/array';
import emptyObj from 'empty/object';
import Immutable from 'immutable';

function initialState() {
  return Immutable.fromJS({
    checkInError: emptyObj,
    checkingIn: false,
    loadError: emptyObj,
    items: emptyAry,
    loading: false
  });
}

function beginEventCheckIn(state) {
  return state.merge({
    checkInError: emptyObj,
    checkingIn: true
  });
}

function beginLoading(state) {
  return state.merge({
    loadError: emptyObj,
    loading: true
  });
}

function endEventCheckIn(state) {
  return state.set('checkingIn', false);
}

function endLoading(state) {
  return state.set('loading', false);
}

function loadData(state, items) {
  return state.set('items', Immutable.fromJS(items));
}

function loadEventCheckIn(state, checkIn) {
  return state.update('items', (items) => items.push(Immutable.fromJS(checkIn)));
}

function reportCheckInError(state, error) {
  return state.set('checkInError', error);
}

function reportError(state, error) {
  return state.set('loadError', error);
}

export function checkIns(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case CheckInActions.CHECK_INS_LOAD_BEGIN:
      return beginLoading(state, payload);
    case CheckInActions.CHECK_INS_LOADED:
      return loadData(state, payload.data);
    case CheckInActions.CHECK_INS_LOAD_END:
      return endLoading(state, payload);
    case CheckInActions.CHECK_INS_LOAD_ERROR:
      return reportError(state, payload.error);

    case CheckInActions.EVENT_CHECK_IN_BEGIN:
      return beginEventCheckIn(state, payload);
    case CheckInActions.EVENT_CHECKED_IN:
      return loadEventCheckIn(state, payload.items);
    case CheckInActions.EVENT_CHECK_IN_END:
      return endEventCheckIn(state, payload);
    case CheckInActions.EVENT_CHECK_IN_ERROR:
      return reportCheckInError(state, payload.error);
    default:
      return state;
  }
}
