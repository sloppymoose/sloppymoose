import { API_ORIGIN } from 'react-native-dotenv'
import { Alert } from 'react-native'
import { dataStore } from '../reducers/StorageReducer'
import { tokenStorage } from 'fetch-oauth2'
import StorageKeys from '../constants/StorageKeys'
import urlJoin from 'url-join'

function fetchToken () {
  console.info('tokenStore#fetchToken')
  return dataStore
    .load({
      autoSync: true, // true,
      key: StorageKeys.USER_CREDENTIALS,
      syncInBackground: false // true
    })
    .then(validateToken, handleTokenStoreError)
}

function handleTokenStoreError (err) {
  console.info('tokenStore#handleTokenStoreError', { err })
  switch (err.name) {
    case 'NotFoundError':
      return Promise.resolve()
    case 'ExpiredError':
      return Promise.resolve()
    default:
      throw new Error(err)
  }
}

function generateToken (token) {
  console.info('tokenStore#generateToken')
  /* eslint-disable camelcase */
  const { access_token, refresh_token, token_type } = token
  const body = JSON.stringify({
    grant_type: 'refresh_token',
    refresh_token
  })
  const headers = {
    Authorization: `${token_type} ${access_token}`
  }
  /* eslint-enable camelcase */
  return fetch(urlJoin(API_ORIGIN, '/oauth/token'), {
    body,
    method: 'POST',
    headers
  })
    .then(newTokens => newTokens.json())
    .then(
      newTokens => {
        console.info('NEW TOKENS', { token, newTokens })
        const payload = Object.assign({}, token, newTokens)
        return payload
      },
      err => {
        if (err.message === 'Network request failed') {
          return handleNetworkError(err)
        }
        throw err
      }
    )
}

function handleNetworkError (err) {
  console.info('tokenStore#handleNetworkError')
  return new Promise((resolve, reject) => {
    Alert.alert('Sloppy Network Error', err.message, [
      {
        text: 'OK',
        onPress: reject
      }
    ])
  })
}

function validateToken (token) {
  console.info('tokenStore#validateToken', token)
  // Adjust timestamps to compensate for Rails' lack of millisecond precision
  const expiresAt = (token.created_at + token.expires_in) * 1000
  console.info(expiresAt, Date.now(), 'expired?', expiresAt < Date.now())
  if (!isNaN(expiresAt) && expiresAt > Date.now()) {
    console.info('token good!')
    return Promise.resolve(token)
  }
  return Promise.resolve(null)
}

export default tokenStorage({ fetchToken, generateToken })
