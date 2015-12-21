import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import * as reducers from '../reducers';
import { routerReducer } from 'react-native-redux-router';
import thunk from 'redux-thunk';

const mergedReducers = Object.assign({}, reducers, { routerReducer });
const reducer = combineReducers(mergedReducers);
const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducer);

export { store as store };
