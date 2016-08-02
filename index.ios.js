import { App } from './client_app/native/components/App';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './client_app/react/util/reduxStore';

window.React = React; // TODO: Why is this needed?

class SloppyMoose extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('sloppymoose', () => SloppyMoose);
