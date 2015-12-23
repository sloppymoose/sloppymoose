import CheckInActions from '../actionTypes/CheckInActions';
import emptyObj from 'empty/object';
import { signedRequest } from '../util/networkHelpers';

function beginLoading() {
  return {
    type: CheckInActions.CHECK_INS_LOAD_BEGIN,
    payload: emptyObj
  };
}

function endLoading() {
  return {
    type: CheckInActions.CHECK_INS_LOAD_END,
    payload: emptyObj
  };
}

function receiveCheckInData(items) {
  return {
    type: CheckInActions.CHECK_INS_LOADED,
    payload: {
      items
    }
  };
}

function reportCheckInError(error) {
  return {
    type: CheckInActions.CHECK_INS_LOAD_ERROR,
    payload: {
      error
    }
  };
}

export function fetchCheckIns() {
  return function(dispatch, getState) {
    dispatch(beginLoading());
    return signedRequest('/api/check_ins')
      .then(checkIns => dispatch(receiveCheckInData(checkIns)))
      .then(() => dispatch(endLoading()))
      .catch(error => {
        dispatch(reportCheckInError(error));
        dispatch(endLoading());
        throw error;
      });
  };
}
