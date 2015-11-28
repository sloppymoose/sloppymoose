import { Component, StyleSheet, Text, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export class HomeHandler extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>Sloppy Moose</Text>
      </View>
    );
  }
}
