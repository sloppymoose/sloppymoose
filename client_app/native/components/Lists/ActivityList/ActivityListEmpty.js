import { Component, StyleSheet, Text, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export class ActivityListEmpty extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>No recent activity</Text>
      </View>
    );
  }
}
