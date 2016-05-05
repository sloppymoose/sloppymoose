import BadgeActions from '../actionTypes/BadgeActions';
import emptyObj from 'empty/object';
import { signedRequest } from '../util/networkHelpers';

function beginLoading() {
  return {
    type: BadgeActions.BADGES_LOAD_BEGIN,
    payload: emptyObj
  };
}

function endLoading() {
  return {
    type: BadgeActions.BADGES_LOAD_END,
    payload: emptyObj
  };
}

function receiveBadgesData(response) {
  const { data } = response;
  return {
    type: BadgeActions.BADGES_LOADED,
    payload: {
      data
    }
  };
}

function reportCheckInsError(error) {
  return {
    type: BadgeActions.BADGES_LOAD_ERROR,
    payload: {
      error
    }
  };
}

export function fetchBadges() {
  return function(dispatch, getState) {
    dispatch(beginLoading());
    return signedRequest('/api/badges')
      .then(response => dispatch(receiveBadgesData(response)))
      .then(() => dispatch(endLoading()))
      .catch(error => {
        dispatch(reportCheckInsError(error));
        dispatch(endLoading());
        throw error;
      });
  };
}
