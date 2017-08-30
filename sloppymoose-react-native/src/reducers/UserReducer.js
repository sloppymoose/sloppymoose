import UserActions from '../types/UserActions'

function initialState () {
  return {
    authenticated: null
  }
}
export function user (state = initialState(), action) {
  switch (action.type) {
    case UserActions.USER_SIGNED_IN:
      return { ...state, authenticated: true }
    case UserActions.USER_SIGNED_OUT:
      return { ...state, authenticated: false }
    default:
      return state
  }
}
