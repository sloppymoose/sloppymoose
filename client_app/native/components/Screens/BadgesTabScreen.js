import { Component, PropTypes, StyleSheet, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export class BadgesTabScreen extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <NavigationBar
          tintColor="orange"
          title={{ title: 'Badges' }}
        />
        <Text>BADGES</Text>
      </View>
    );
  }
}

BadgesTabScreen.propTypes = {

};

BadgesTabScreen.defaultProps = {

};
