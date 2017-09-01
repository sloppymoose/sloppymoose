import tokenStore from '../utils/tokenStore'
import UserActions from '../types/UserActions'

export function restoreAuthentication () {
  return dispatch => {
    return tokenStore.getToken().then(authentication => {
      if (authentication) {
        dispatch(persistAuthentication(authentication))
      } else {
        dispatch(clearAuthentication(authentication))
      }
      return authentication
    })
  }
}

export function persistAuthentication (authentication) {
  return {
    type: UserActions.USER_SIGNED_IN,
    payload: authentication
  }
}

export function clearAuthentication (authentication) {
  return {
    type: UserActions.USER_SIGNED_OUT,
    payload: authentication
  }
}
