import { API_ORIGIN } from 'react-native-dotenv'
import { dataStore } from '../../reducers/StorageReducer'
import { fetchToken, generateToken } from '../tokenStore'
import StorageKeys from '../../constants/StorageKeys'
import { tokenStorage } from 'fetch-oauth2'

jest.mock('react-native', () => {
  const HttpError = require('standard-http-error')
  const LocalStorage = require('node-localstorage').LocalStorage
  return {
    Alert: {
      alert: (title, message, buttons) => {
        if (buttons[0].error instanceof HttpError) {
          return buttons[0].onPress()
        }
        throw buttons[0].error
      }
    },
    AsyncStorage: new LocalStorage('./tmp/test-localStorage')
  }
})

const DefaultToken = Object.freeze({
  access_token: 'abc123',
  created_at: Math.floor(Date.now() / 1000),
  expires_in: 10,
  refresh_token: '456def',
  token_type: 'bearer'
})
const RefreshedToken = Object.freeze({
  ...DefaultToken,
  access_token: '987zyx',
  refresh_token: '654wvu',
  token_type: 'bearer'
})

describe('Token Store', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    this.tokenStore = tokenStorage({ fetchToken, generateToken })
  })
  afterEach(() => {
    fetch.resetMocks()
    return dataStore.remove({
      key: StorageKeys.USER_CREDENTIALS
    })
  })

  describe('#getToken', () => {
    describe('when no old token exists', () => {
      it('returns no token', () => {
        return this.tokenStore.getToken().then(token => {
          expect(token).toBeNull()
        })
      })
    })

    describe('when an old, non-expired token exists', () => {
      beforeEach(() => {
        return dataStore.save({
          expires: DefaultToken.expires,
          key: StorageKeys.USER_CREDENTIALS,
          data: { ...DefaultToken }
        })
      })
      it('returns the stored token', () => {
        return this.tokenStore.getToken().then(token => {
          expect(token).toEqual(DefaultToken)
        })
      })
    })

    describe('when an old token expires from the data store', () => {
      beforeEach(() => {
        this.request = fetch.mockResponseOnce(JSON.stringify(RefreshedToken), {
          headers: {
            'Content-Type': 'application/json'
          },
          status: 200
        })
        return dataStore.save({
          expires: 0,
          key: StorageKeys.USER_CREDENTIALS,
          data: { ...DefaultToken }
        })
      })
      it('makes a token refresh request', () => {
        return this.tokenStore.getToken().then(token => {
          expect(
            this.request
          ).toHaveBeenCalledWith(`${API_ORIGIN}/oauth/token`, {
            body: '{"grant_type":"refresh_token","refresh_token":"456def"}',
            headers: {
              Accept: 'application/json',
              Authorization: 'bearer abc123',
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })
        })
      })
      it('refreshes the token', () => {
        return this.tokenStore.getToken().then(token => {
          expect(token).toEqual(RefreshedToken)
        })
      })
    })

    describe('when an old token expires from its own properties', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(RefreshedToken), {
          headers: {
            'Content-Type': 'application/json'
          },
          status: 200
        })
        return dataStore.save({
          expires: 10000,
          key: StorageKeys.USER_CREDENTIALS,
          data: {
            ...DefaultToken,
            access_token: 'wtf',
            created_at: Math.floor(Date.now() / 1000) - 1000,
            expires_in: 0
          }
        })
      })
      it('refreshes the token', () => {
        return this.tokenStore.getToken().then(token => {
          expect(token).toEqual(RefreshedToken)
        })
      })
    })

    describe('when an expired token is unrefreshable', () => {
      beforeEach(() => {
        return dataStore.save({
          expires: 1000,
          key: StorageKeys.USER_CREDENTIALS,
          data: {
            ...DefaultToken,
            created_at: Math.floor(Date.now() / 1000) - 1000,
            expires_in: 0
          }
        })
      })
      describe('due to an unauthorized request', () => {
        beforeEach(() => {
          fetch.mockResponseOnce('{}', {
            status: 401
          })
        })
        it('returns no token', () => {
          return this.tokenStore.getToken().then(token => {
            expect(token).toBeNull()
          })
        })
      })
      describe('due to a server error', () => {
        beforeEach(() => {
          fetch.mockResponseOnce('{}', {
            status: 500
          })
        })
        it('returns no token', () => {
          return expect(this.tokenStore.getToken()).rejects.toBeUndefined()
        })
      })
    })

    describe('when an error occurs loading the token', () => {
      beforeEach(() => {
        dataStore.load = jest.fn(() => Promise.reject(new Error('TEST')))
      })
      it('re-throws the error', () => {
        return this.tokenStore.getToken().catch(err => {
          expect(err.message).toEqual('TEST')
        })
      })
    })
  })
})
