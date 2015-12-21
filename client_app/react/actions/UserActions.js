import { Actions } from 'react-native-redux-router';
import emptyObj from 'empty/object';
import UserActions from '../actionTypes/UserActions';
import {
  receiveSignInData,
  signedRequest,
  storage,
  unsignedRequest
} from '../util/networkHelpers';

function beginSignInUser(email) {
  return {
    type: UserActions.USER_SIGN_IN_BEGIN,
    payload: {
      email
    }
  };
}

function beginSignOutUser() {
  return {
    type: UserActions.USER_SIGN_OUT_BEGIN,
    payload: emptyObj
  };
}

function userSignedOut() {
  return {
    type: UserActions.USER_SIGNED_OUT,
    payload: emptyObj
  };
}

function endSignInUser(email) {
  return {
    type: UserActions.USER_SIGN_IN_END,
    payload: {
      email
    }
  };
}

function endSignOutUser() {
  return {
    type: UserActions.USER_SIGN_OUT_END,
    payload: emptyObj
  };
}

function reportSignInError(email, error) {
  return {
    type: UserActions.USER_SIGN_IN_ERROR,
    payload: {
      email,
      error
    }
  };
}

function reportSignOutError(error) {
  return {
    type: UserActions.USER_SIGN_OUT_ERROR,
    payload: {
      error
    }
  };
}

export function initTokens() {
  return function(dispatch) {
    return storage.getToken()
      .then(() => Actions.home())
      .catch(() => Actions.signedOut());
  };
}

export function signInUser(email, password) {
  const body = {
    /* eslint-disable camelcase */
    grant_type: 'password',
    user: {
      email,
      password
    }
    /* eslint-enable camelcase */
  };
  return (dispatch, getState) => {
    dispatch(beginSignInUser(email));
    return unsignedRequest('/oauth/token', body, 'POST')
      .then(oauthTokens => dispatch(receiveSignInData(email, oauthTokens)))
      .then(() => dispatch(endSignInUser(email)))
      .catch(error => {
        dispatch(reportSignInError(email, error));
        dispatch(endSignInUser(email));
      });
  };
}

export function signOutUser() {
  return (dispatch, getState) => {
    dispatch(beginSignOutUser());
    return signedRequest('/oauth/revoke', null, 'POST')
      .then(() => {
        dispatch(userSignedOut());
        dispatch(endSignOutUser());
        Actions.signedOut();
      })
      .catch(error => {
        dispatch(reportSignOutError(error));
        dispatch(endSignOutUser());
      });
  };
}
