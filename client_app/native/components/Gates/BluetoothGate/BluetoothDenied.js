import {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export class BluetoothDenied extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>BT is denied!</Text>
        <Text>Please enable via Settings</Text>
      </View>
    );
  }
}
