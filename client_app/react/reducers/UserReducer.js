import emptyObj from 'empty/object';

function initialState() {
  return {
    signedIn: false,
    data: emptyObj
  };
}

export function user(state = initialState(), action) {
  const payload = action.payload || emptyObj;
  switch(action.type) {
    default:
      return state;
  }
}
