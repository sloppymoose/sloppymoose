import { API_ORIGIN } from 'react-native-dotenv'
import { Alert } from 'react-native'
import { dataStore } from '../reducers/StorageReducer'
import { handleFetchResponse } from './networkHelpers'
import HttpError from 'standard-http-error'
import { tokenStorage } from 'fetch-oauth2'
import StorageKeys from '../constants/StorageKeys'
import urlJoin from 'url-join'

export const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export function fetchToken () {
  return dataStore
    .load({
      autoSync: false,
      key: StorageKeys.USER_CREDENTIALS,
      syncInBackground: false
    })
    .then(validateToken, handleTokenStoreError)
}

function handleNetworkError (err) {
  if (err.code === HttpError.UNAUTHORIZED) {
    // If token refresh is 401, then the refresh token has expired. Return NULL
    // so that the appropriate sign in/up workflow can execute
    return null
  } else {
    return new Promise((resolve, reject) => {
      Alert.alert('Sloppy Network Error', err.message, [
        {
          error: err,
          text: 'OK',
          onPress: reject
        }
      ])
    })
  }
}

function handleTokenStoreError (err) {
  switch (err.name) {
    case 'NotFoundError':
      return null
    case 'ExpiredError':
      // Rejecting here triggers fetch-oauth2 to call #generateToken which we
      // use to ask the server to refresh authorization using the user's
      // refresh token
      return Promise.reject(recoverExpiredToken(err))
    default:
      throw err
  }
}

export function generateToken (tokenOrErr) {
  if (!tokenOrErr) {
    /* istanbul ignore next */
    throw new Error('cannot refresh empty token')
  }
  if (tokenOrErr instanceof Error) {
    throw tokenOrErr
  }
  return requestTokenRefresh(tokenOrErr)
    .then(handleFetchResponse)
    .then(newTokens => ({
      ...tokenOrErr,
      ...newTokens
    }))
    .catch(handleNetworkError)
}

function recoverExpiredToken (err) {
  let [_, payload] = err.message.match(/Params: ({+.*}$)/)
  payload = JSON.parse(payload)
  if (typeof payload.ret === 'object') {
    // TODO: This happens during testing for some reason. I think using
    // `node-localstorage` as a polyfill for RN's AsyncStorage is storing the
    // data in a slightly different format. Its important to note this
    // difference by not skipping the code coverage of the non-test logic flow
    // to highlight that it is important but untested code.
    return payload.ret.rawData
  }
  const expiredData = JSON.parse(payload.ret)
  return expiredData.rawData
}

function requestTokenRefresh (oldToken) {
  /* eslint-disable camelcase */
  const { access_token, refresh_token, token_type } = oldToken
  const body = JSON.stringify({
    grant_type: 'refresh_token',
    refresh_token
  })
  const headers = {
    ...DefaultHeaders,
    Authorization: `${token_type} ${access_token}`
  }
  /* eslint-enable camelcase */
  return fetch(urlJoin(API_ORIGIN, '/oauth/token'), {
    body,
    method: 'POST',
    headers
  })
}

function validateToken (token) {
  // Adjust timestamps to compensate for Rails' lack of millisecond precision
  const expiresAt = (token.created_at + token.expires_in) * 1000
  const now = Date.now()
  if (!isNaN(expiresAt) && expiresAt > now) {
    return Promise.resolve(token)
  }
  return Promise.reject(token)
}

export default tokenStorage({ fetchToken, generateToken })
