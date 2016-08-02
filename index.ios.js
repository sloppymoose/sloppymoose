import { App } from './client_app/native/components/App';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './client_app/react/util/reduxStore';

// Babel transpiles JSX classes to `React.createElement`. That means that React
// needs to exist within the scope of that declaration. We _could_ explicitly
// import it in each component, but I'm lazy and I'd rather expose it globally
// in order to avoid all that nonsense.
window.React = React;

// PENDING: [react-native 0.16]
// See also: https://github.com/facebook/react-native/issues/9093#issuecomment-236454261
console.ignoredYellowBox = [
  // https://github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];

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
