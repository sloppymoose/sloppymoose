import EventActions from '../actionTypes/EventActions';
import emptyAry from 'empty/array';
import emptyObj from 'empty/object';
import { get } from 'lodash';
import { signedRequest } from '../util/networkHelpers';

function beginLoading() {
  return {
    type: EventActions.ACTIVE_EVENTS_LOAD_BEGIN,
    payload: emptyObj
  };
}

function receiveActiveEvents(response) {
  const items = get(response, 'data', emptyAry);
  return {
    type: EventActions.ACTIVE_EVENTS_LOADED,
    payload: {
      items
    }
  };
}

function endLoading() {
  return {
    type: EventActions.ACTIVE_EVENTS_LOAD_END,
    payload: emptyObj
  };
}

function reportActiveEventsLoadError(error) {
  return {
    type: EventActions.ACTIVE_EVENTS_LOAD_END,
    payload: {
      error
    }
  };
}

export function fetchActiveEvents() {
  return function(dispatch) {
    dispatch(beginLoading());
    return signedRequest('/api/active_events')
      .then(response => dispatch(receiveActiveEvents(response)))
      .then(() => dispatch(endLoading()))
      .catch((err) => {
        dispatch(reportActiveEventsLoadError(err));
        dispatch(endLoading());
      });
  };
}
