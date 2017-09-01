import emptyObj from 'empty/object'
import HttpError from 'standard-http-error'

// Helper function that processes fetch responses in an expected manner
export function handleFetchResponse (response) {
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
