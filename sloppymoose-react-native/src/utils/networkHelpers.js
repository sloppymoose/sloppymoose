import { fetchWithMiddleware, middleware } from 'fetch-oauth2'
import tokenStore from './tokenStore'

// For requests that require auth tokens
export const signedFetch = fetchWithMiddleware(
  middleware.authorisationChallengeHandler(tokenStore),
  middleware.setOAuth2Authorization(tokenStore)
)
