import { assign } from 'lodash';
import emptyObj from 'empty/object';
import merge from 'lodash/object/merge';
import querystring from 'querystring';

import { Store } from '../reducers/StorageReducer';
import StorageKeys from '../constants/StorageKeys';
import { tokenStorage } from 'fetch-oauth2';
import { fetchWithMiddleware, middleware } from 'fetch-oauth2';
import { store as reduxStore } from './reduxStore';
import UserActions from '../actionTypes/UserActions';

import { NativeModules } from 'react-native';
const { EnvironmentManager } = NativeModules;

if(!EnvironmentManager.apiOrigin) {
  throw new Error(`ApiOriginNotFound: No apiOrigin value was found in EnvironmentManager. Ensure that EnvironmentManager.m has been generated (via fastlane) and that the value is defined in the appropriate .env file for the ${EnvironmentManager.environment} environment.`);
}

const DefaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
const storage = tokenStorage({ fetchToken, generateToken });
const unsignedFetch = fetchWithMiddleware(addHostToUrl);
const signedFetch = fetchWithMiddleware(
  addHostToUrl,
  middleware.authorisationChallengeHandler(storage),
  middleware.setOAuth2Authorization(storage)
);

class NetworkError {
  constructor(json, response) {
    const errorMessage = json.message || json.error_description;
    const statusCode = json.statusCode || response.status;
    this.origError = json.error;
    this.origMessage = errorMessage;
    this.origStatusCode = statusCode;
    this.name = 'NetworkError';
    this.message = `${json.error}: ${errorMessage} (${statusCode})`;
    this.stack = (new Error()).stack;
  }
}
NetworkError.prototype = Object.create(Error.prototype);
NetworkError.prototype.constructor = NetworkError;

function appendHost(uri) {
  return EnvironmentManager.apiOrigin + uri;
}

// fetch middleware that auto-appends the API host to all URLs
function addHostToUrl(next) {
  return (configPromise) => next(
    configPromise.then(config => config.updateUri(appendHost))
  );
}

function fetchToken() {
  return Store.load({
    autoSync: false,
    key: StorageKeys.USER_CREDENTIALS,
    syncInBackground: false
  })
  .then(validateTokens)
  .then(tokens => {
    reduxStore.dispatch(receiveSignInData(tokens.email, tokens));
    return tokens;
  });
}

// Helper function that generates fetch request payloads
function generatePayload(url, body, method, headers) {
  const payload = {
    headers: assign({}, DefaultHeaders, headers),
    method
  };
  if(body && method === 'GET') {
    let qs = querystring.parse(url.split('?')[1]);
    qs = merge(qs, body);
    url = `${url}?${qs}`;
  } else {
    payload.body = JSON.stringify(body);
  }
  return payload;
}

function generateToken(tokens) {
  /* eslint-disable camelcase */
  const { access_token, refresh_token, token_type } = tokens;
  const payload = {
    grant_type: 'refresh_token',
    refresh_token
  };
  const headers = {
    Authorization: `${token_type} ${access_token}`
  };
  /* eslint-enable camelcase */
  return unsignedRequest('/oauth/token', payload, 'POST', headers)
    .then(newTokens => {
      const payload = assign({}, tokens, newTokens);
      reduxStore.dispatch(receiveSignInData(newTokens.email, newTokens));
      return payload;
    });
}

// Helper function that processes fetch responses in an expected manner
function handleResponse(response) {
  if(response.ok) {
    if(response.status === 204) {
      return Promise.resolve(emptyObj);
    } else {
      return response.json();
    }
  } else {
    return response.json().then(json => {
      throw new NetworkError(json, response);
    }, function(err) {
      throw err;
    });
  }
}

function validateTokens(tokens) {
  return new Promise((resolve, reject) => {
    // Adjust timestamps to compensate for Rails' lack of millisecond precision
    const expiresAt = (tokens.created_at + tokens.expires_in) * 1000;
    return expiresAt < Date.now() ? reject(tokens) : resolve(tokens);
  });
}

// Technically a user action, but the token refreshing needs easy access to it
// and defining this in UserActions would create a dependency loop
export function receiveSignInData(email, oauthTokens) {
  return {
    type: UserActions.USER_SIGNED_IN,
    payload: assign({}, oauthTokens, {
      email
    })
  };
}

// For requests that require auth tokens
export function signedRequest(url, body, method = 'GET', headers = {}) {
  return signedFetch(url, generatePayload(url, body, method, headers))
    .then(handleResponse);
}

// For requests that do NOT require auth tokens
export function unsignedRequest(url, body, method = 'GET', headers = {}) {
  return unsignedFetch(url, generatePayload(url, body, method, headers))
    .then(handleResponse);
}

export { storage as storage };
