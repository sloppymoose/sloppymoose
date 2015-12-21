import emptyObj from 'empty/object';
import Storage from 'react-native-storage';
import StorageKeys from '../constants/StorageKeys';
import UserActions from '../actionTypes/UserActions';

const Store = new Storage({
  // Expire time, default 1 day(1000 * 3600 * 24 secs)
  // defaultExpires: 1000 * 3600 * 24,
  defaultExpires: 14 * 24 * 3600 * 1000 // 2 weeks
});

function initialState() {
  return emptyObj;
}

function signedIn(state, payload) {
  Store.save({
    expires: payload.expires_in,
    key: StorageKeys.USER_CREDENTIALS,
    rawData: payload
  });
  return state;
}

function signedOut(state, payload) {
  Store.remove({
    key: StorageKeys.USER_CREDENTIALS
  });
  return state;
}

export function storage(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case UserActions.USER_SIGNED_IN:
      return signedIn(state, payload);
    case UserActions.USER_SIGNED_OUT:
      return signedOut(state, payload);
    default:
      return state;
  }
}

export { Store as Store };
