import { App } from './client_app/native/components/App';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux/native';
import React from 'react-native';
import * as reducers from './client_app/react/reducers';
import { routerReducer } from 'react-native-redux-router';
import thunk from 'redux-thunk';

window.React = React;

const { AppRegistry, Component } = React;
const mergedReducers = Object.assign({}, reducers, { routerReducer });
const reducer = combineReducers(mergedReducers);
const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducer);

class SloppyMoose extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App/>}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('sloppymoose', () => SloppyMoose);
