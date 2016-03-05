import ShirtSizeActions from '../actionTypes/ShirtSizeActions';
import emptyObj from 'empty/object';
import Immutable from 'immutable';

function initialState() {
  return Immutable.fromJS({
    items: [],
    loadError: null,
    loading: false
  });
}

function beginLoading(state) {
  return state.merge({
    loadError: emptyObj,
    loading: true
  });
}

function loadData(state, items) {
  return state.set('items', Immutable.fromJS(items));
}

function endLoading(state) {
  return state.set('loading', false);
}

function reportLoadError(state, error) {
  return state.set('loadError', error);
}

export function shirtSizes(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case ShirtSizeActions.SHIRT_SIZES_LOAD_BEGIN:
      return beginLoading(state, payload);
    case ShirtSizeActions.SHIRT_SIZES_LOADED:
      return loadData(state, payload.data);
    case ShirtSizeActions.SHIRT_SIZES_LOAD_END:
      return endLoading(state, payload);
    case ShirtSizeActions.SHIRT_SIZES_LOAD_ERROR:
      return reportLoadError(state, payload.error);
    default:
      return state;
  }
}
