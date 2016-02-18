import { Actions } from 'react-native-router-flux';
import Immutable from 'immutable';

function initialState() {
  return Immutable.fromJS({
    currentRoute: null
  });
}

export function router(state = initialState(), action) {
  switch(action.type) {
    case Actions.AFTER_ROUTE:
    case Actions.AFTER_POP:
      return state.set('currentRoute', action.name);
    default:
      return state;
  }
}
