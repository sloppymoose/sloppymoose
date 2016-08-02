import { Component } from 'react';
import { View } from 'react-native';

const baseStyles = {
  root: {
    backgroundColor: '#262664',
    flex: 1
  }
};

export class SplashHandler extends Component {
  render() {
    return <View style={baseStyles.root}/>;
  }
}
