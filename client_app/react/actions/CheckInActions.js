import CheckInActions from '../actionTypes/CheckInActions';
import emptyObj from 'empty/object';
import { signedRequest } from '../util/networkHelpers';

function beginEventCheckIn() {
  return {
    type: CheckInActions.EVENT_CHECK_IN_BEGIN,
    payload: emptyObj
  };
}

function beginLoading() {
  return {
    type: CheckInActions.CHECK_INS_LOAD_BEGIN,
    payload: emptyObj
  };
}

function endEventCheckIn() {
  return {
    type: CheckInActions.EVENT_CHECK_IN_END,
    payload: emptyObj
  };
}

function endLoading() {
  return {
    type: CheckInActions.CHECK_INS_LOAD_END,
    payload: emptyObj
  };
}

function receiveEventCheckInData(response) {
  const checkIn = response.data;
  return {
    type: CheckInActions.EVENT_CHECKED_IN,
    payload: {
      checkIn
    }
  };
}

function receiveCheckInData(response) {
  const { data, included } = response;
  return {
    type: CheckInActions.CHECK_INS_LOADED,
    payload: {
      data,
      included
    }
  };
}

function reportCheckInsError(error) {
  return {
    type: CheckInActions.CHECK_INS_LOAD_ERROR,
    payload: {
      error
    }
  };
}

function reportEventCheckInError(error) {
  return {
    type: CheckInActions.EVENT_CHECK_IN_ERROR,
    payload: {
      error
    }
  };
}

export function fetchCheckIns() {
  return function(dispatch, getState) {
    dispatch(beginLoading());
    return signedRequest('/api/check_ins')
      .then(response => dispatch(receiveCheckInData(response)))
      .then(() => dispatch(endLoading()))
      .catch(error => {
        dispatch(reportCheckInsError(error));
        dispatch(endLoading());
        throw error;
      });
  };
}

export function checkInToEvent(checkIn) {
  const body = {
    /* eslint-disable camelcase */
    check_in: checkIn
    /* eslint-enable camelcase */
  };
  return function(dispatch, getState) {
    dispatch(beginEventCheckIn());
    return signedRequest('/api/check_ins', body, 'POST')
      .then(response => dispatch(receiveEventCheckInData(response)))
      .then(() => dispatch(endEventCheckIn()))
      .catch(error => {
        dispatch(reportEventCheckInError(error));
        dispatch(endEventCheckIn());
      });
  };
}

