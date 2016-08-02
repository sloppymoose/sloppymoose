import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export class BadgeListEmpty extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>No badges yet!</Text>
      </View>
    );
  }
}
