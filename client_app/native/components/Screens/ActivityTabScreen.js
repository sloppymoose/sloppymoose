import { Component, PropTypes, StyleSheet, View } from 'react-native';
import { ActivityList } from '../Lists';
import NavigationBar from 'react-native-navbar';

const baseStyles = StyleSheet.create({
  content: {
    flex: 1
  },
  root: {
    flex: 1
  }
});

export class ActivityTabScreen extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <NavigationBar
          tintColor="orange"
          title={{ title: 'Activity' }}
        />
        <ActivityList checkIns={this.props.checkIns} style={baseStyles.content}/>
      </View>
    );
  }
}

ActivityTabScreen.propTypes = {
  checkIns: PropTypes.any
};
