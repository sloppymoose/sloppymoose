import { App } from './client_app/native/components/App';
import { Provider } from 'react-redux/native';
import React from 'react-native';
import { store } from './client_app/react/util/reduxStore';

window.React = React;

const { AppRegistry, Component } = React;

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
