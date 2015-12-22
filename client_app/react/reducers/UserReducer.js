import { camelizeKeys } from '../util/objectHelpers';
import emptyObj from 'empty/object';
import update from 'react-addons-update';
import UserActions from '../actionTypes/UserActions';

function initialState() {
  return {
    accessToken: null,
    createdAt: null,
    signInError: emptyObj,
    signUpError: emptyObj,
    email: null,
    expiresIn: null,
    refreshToken: null,
    signedIn: false,
    signingIn: false,
    signingUp: false
  };
}

function beginSigningIn(state, ) {
  return update(state, {
    signInError: { $set: emptyObj },
    signingIn: { $set: true }
  });
}

function beginSigningUp(state, ) {
  return update(state, {
    signUpError: { $set: emptyObj },
    signingUp: { $set: true }
  });
}

function signedIn(state, payload) {
  /* eslint-disable camelcase */
  const { accessToken, createdAt, email, expiresIn, refreshToken } = camelizeKeys(payload);
  return update(state, {
    accessToken: { $set: accessToken },
    createdAt: { $set: createdAt },
    email: { $set: email },
    expiresIn: { $set: expiresIn },
    refreshToken: { $set: refreshToken },
    signedIn: { $set: true }
  });
  /* eslint-enable camelcase */
}

function signedOut(state, payload) {
  return initialState();
}

function signedUp(state, payload) {
  return state;
}

function endSigningIn(state) {
  return update(state, {
    signingIn: { $set: false }
  });
}

function endSigningUp(state) {
  return update(state, {
    signingUp: { $set: false }
  });
}

function signInError(state, error) {
  return update(state, {
    signInError: { $set: error }
  });
}

function signUpError(state, error) {
  return update(state, {
    signUpError: { $set: error }
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

    case UserActions.USER_SIGN_UP_BEGIN:
      return beginSigningUp(state);
    case UserActions.USER_SIGNED_UP:
      return signedUp(state, payload);
    case UserActions.USER_SIGN_UP_END:
      return endSigningUp(state);
    case UserActions.USER_SIGN_UP_ERROR:
      return signUpError(state, payload.error);
    default:
      return state;
  }
}
