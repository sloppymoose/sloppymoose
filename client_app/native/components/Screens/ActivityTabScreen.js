import { ActivityList } from '../Lists';
import { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, View } from 'react-native';

const baseStyles = StyleSheet.create({
  content: {
    flex: 1
  },
  root: {
    flex: 1,
    marginTop: 20 + Navigator.NavigationBar.Styles.General.NavBarHeight
  }
});

export class ActivityTabScreen extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <ActivityList
          checkIns={this.props.checkIns}
          fetchCheckIns={this.props.fetchCheckIns}
          style={baseStyles.content}
        />
      </View>
    );
  }
}

ActivityTabScreen.propTypes = {
  checkIns: PropTypes.any,
  fetchCheckIns: PropTypes.func
};
