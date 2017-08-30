import { API_ORIGIN } from 'react-native-dotenv'
import { connect } from 'react-refetch'
import emptyObj from 'empty/object'
import HttpError from 'standard-http-error'
import { signedFetch } from './networkHelpers'
import urlJoin from 'url-join'

const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

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

// Helper function that processes fetch responses in an expected manner
function handleResponse (response) {
  if (
    response.headers.get('content-length') === '0' ||
    response.status === 204
  ) {
    return Promise.resolve(emptyObj)
  }
  if (response.ok) {
    if (response.status === 204) {
      return Promise.resolve(emptyObj)
    } else if (response.headers.get('content-type').startsWith('text/html')) {
      return response.text()
    } else {
      return response.json()
    }
  } else {
    return response.json().then(json => {
      throw new HttpError(response.status, { json })
    }, function (err) {
      throw err
    })
  }
}

export const signedConnect = connect.defaults({
  buildRequest: buildRequest,
  handleResponse: handleResponse,
  fetch: signedFetch
})

export const unsignedConnect = connect.defaults({
  buildRequest: buildRequest,
  handleResponse: handleResponse
})
