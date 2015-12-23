import { camelizeKeys } from '../util/objectHelpers';
import emptyObj from 'empty/object';
import Immutable from 'immutable';
import UserActions from '../actionTypes/UserActions';

function initialState() {
  return Immutable.fromJS({
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
  });
}

function beginSigningIn(state) {
  return state.merge({
    signInError: emptyObj,
    signingIn: false
  });
}

function beginSigningUp(state, ) {
  return state.merge({
    signUpError: emptyObj,
    signingUp: true
  });
}

function signedIn(state, payload) {
  const { accessToken, createdAt, email, expiresIn, refreshToken } = camelizeKeys(payload);
  return state.merge({
    accessToken,
    createdAt,
    email,
    expiresIn,
    refreshToken,
    signedIn: true
  });
}

function signedOut(state, payload) {
  return initialState();
}

function signedUp(state, payload) {
  return state;
}

function endSigningIn(state) {
  return state.merge({
    signingIn: false
  });
}

function endSigningUp(state) {
  return state.merge({
    signingUp: false
  });
}

function signInError(state, error) {
  return state.set('signInError', error);
}

function signUpError(state, error) {
  return state.set('signUpError', error);
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
