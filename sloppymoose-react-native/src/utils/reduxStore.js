import { applyMiddleware, combineReducers, createStore } from 'redux'
import * as reducers from '../reducers'
import thunk from 'redux-thunk'

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(thunk))

export default store
