import { camelizeKeys } from '../util/objectHelpers';
import emptyObj from 'empty/object';
import update from 'react-addons-update';
import UserActions from '../actionTypes/UserActions';

function initialState() {
  return {
    accessToken: null,
    createdAt: null,
    error: emptyObj,
    email: null,
    expiresIn: null,
    refreshToken: null,
    signedIn: false,
    loading: false
  };
}

function beginSigningIn(state, ) {
  return update(state, {
    error: { $set: emptyObj },
    loading: { $set: true }
  });
}

function signedIn(state, payload) {
  /* eslint-disable camelcase */
  const { accessToken, createdAt, email, expiresIn, refreshToken } = camelizeKeys(payload);
  return update(state, {
    accessToken: { $set: accessToken },
    createdAt: { $set: createdAt },
    mail: { $set: email },
    expiresIn: { $set: expiresIn },
    refreshToken: { $set: refreshToken },
    signedIn: { $set: true }
  });
  /* eslint-enable camelcase */
}

function signedOut(state, payload) {
  return initialState();
}

function endSigningIn(state) {
  return update(state, {
    loading: { $set: false }
  });
}

function signInError(state, error) {
  return update(state, {
    error: { $set: error }
  });
}

export function user(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    case UserActions.USER_SIGN_IN_BEGIN:
      return beginSigningIn(state);
    case UserActions.USER_SIGNED_IN:
      return signedIn(state, payload);
    case UserActions.USER_SIGN_IN_END:
      return endSigningIn(state);
    case UserActions.USER_SIGN_IN_ERROR:
      return signInError(state, payload.error);
    case UserActions.USER_SIGNED_OUT:
      return signedOut(state, payload);
    default:
      return state;
  }
}
