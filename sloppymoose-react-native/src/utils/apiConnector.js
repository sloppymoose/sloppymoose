import { API_ORIGIN } from 'react-native-dotenv'
import { connect } from 'react-refetch'
import { fetchWithMiddleware, middleware } from 'fetch-oauth2'
import { handleFetchResponse } from './networkHelpers'
import tokenStore, { DefaultHeaders } from './tokenStore'
import urlJoin from 'url-join'

function buildRequest (mapping) {
  mapping = {
    ...mapping,
    ...{
      credentials: 'omit',
      headers: { ...DefaultHeaders, ...mapping.headers },
      body: JSON.stringify(mapping.body)
    }
  }
  return new Request(urlJoin(API_ORIGIN, mapping.url), mapping)
}

// For requests that require auth tokens
const signedFetch = fetchWithMiddleware(
  middleware.authorisationChallengeHandler(tokenStore),
  middleware.setOAuth2Authorization(tokenStore)
)

export const signedConnect = connect.defaults({
  buildRequest: buildRequest,
  handleResponse: handleFetchResponse,
  fetch: signedFetch
})

export const unsignedConnect = connect.defaults({
  buildRequest: buildRequest,
  handleResponse: handleFetchResponse
})
