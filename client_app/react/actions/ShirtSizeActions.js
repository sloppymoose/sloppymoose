import ShirtSizeActions from '../actionTypes/ShirtSizeActions';
import {
  unsignedRequest
} from '../util/networkHelpers';

function beginShirtSizesLoading() {
  return {
    type: ShirtSizeActions.SHIRT_SIZES_LOAD_BEGIN,
    payload: {}
  };
}

function receiveShirtSizes(response) {
  const { data } = response;
  return {
    type: ShirtSizeActions.SHIRT_SIZES_LOADED,
    payload: { data }
  };
}

function endShirtSizesLoading() {
  return {
    type: ShirtSizeActions.SHIRT_SIZES_LOAD_END,
    payload: {}
  };
}

function reportShirtSizesError(error) {
  return {
    type: ShirtSizeActions.SHIRT_SIZES_LOAD_ERROR,
    payload: { error }
  };
}

export function fetchShirtSizes() {
  return (dispatch, getState) => {
    dispatch(beginShirtSizesLoading());
    return unsignedRequest('/api/shirt_sizes')
      .then(shirtSizes => dispatch(receiveShirtSizes(shirtSizes)))
      .then(() => dispatch(endShirtSizesLoading()))
      .catch(error => {
        dispatch(reportShirtSizesError(error));
        dispatch(endShirtSizesLoading());
        throw error;
      });
  };
}
