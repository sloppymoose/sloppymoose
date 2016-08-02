import { Actions } from 'react-native-router-flux';
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

function beginSignUpUser(user) {
  return {
    type: UserActions.USER_SIGN_UP_BEGIN,
    payload: {
      user
    }
  };
}

function userSignedOut() {
  return {
    type: UserActions.USER_SIGNED_OUT,
    payload: emptyObj
  };
}

function receiveSignUpData(user, newUser) {
  return {
    type: UserActions.USER_SIGNED_UP,
    payload: {
      newUser,
      user
    }
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

function endSignUpUser(user) {
  return {
    type: UserActions.USER_SIGN_UP_END,
    payload: {
      user
    }
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

function reportSignUpError(user, error) {
  return {
    type: UserActions.USER_SIGN_UP_ERROR,
    payload: {
      error,
      user
    }
  };
}

export function initTokens() {
  return function(dispatch) {
    return storage.getToken()
      .then(() => Actions.home())
      .catch(() => Actions.signIn());
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
      .then(() => Actions.home())
      .catch(error => {
        dispatch(reportSignInError(email, error));
        dispatch(endSignInUser(email));
        throw error;
      });
  };
}

export function signUpUser(user) {
  const body = { user };
  return (dispatch, getState) => {
    dispatch(beginSignUpUser(user));
    return unsignedRequest('/api/users', body, 'POST')
      .then(newUser => dispatch(receiveSignUpData(user, newUser)))
      .then(() => dispatch(endSignUpUser(user)))
      .then(() => Actions.splash()) // TODO: Show some intermediary screen (spinner?) while user is signed in
      .then(() => signInUser(user.email, user.password)(dispatch, getState))
      .catch(error => {
        dispatch(reportSignUpError(user, error));
        dispatch(endSignUpUser(user));
        throw error;
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
        Actions.signIn();
      })
      .catch(error => {
        dispatch(reportSignOutError(error));
        dispatch(endSignOutUser());
      });
  };
}
