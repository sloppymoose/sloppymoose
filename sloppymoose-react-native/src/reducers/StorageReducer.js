import { AsyncStorage } from 'react-native'
import emptyObj from 'empty/object'
import Storage from 'react-native-storage'
import StorageKeys from '../constants/StorageKeys'
import UserActions from '../types/UserActions'

const dataStore = new Storage({
  defaultExpires: 14 * 24 * 3600 * 1000, // 2 weeks
  storageBackend: AsyncStorage
})

function initialState () {
  return emptyObj
}

function signedIn (state, payload) {
  if (!payload.expires_in) {
    throw new Error('Invalid authentication token format')
  }
  dataStore.save({
    expires: payload.expires_in * 1000,
    key: StorageKeys.USER_CREDENTIALS,
    data: payload
  })
  return state
}

function signedOut (state) {
  dataStore.remove({
    key: StorageKeys.USER_CREDENTIALS
  })
  return state
}

export function storage (state = initialState(), action) {
  const payload = action.payload || emptyObj
  switch (action.type) {
    case UserActions.USER_SIGNED_IN:
      return signedIn(state, payload)
    case UserActions.USER_SIGNED_OUT:
      return signedOut(state)
    default:
      return state
  }
}
export { dataStore }
