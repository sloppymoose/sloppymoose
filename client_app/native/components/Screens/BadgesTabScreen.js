import { BadgeList } from '../Lists';
import { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20 + Navigator.NavigationBar.Styles.General.NavBarHeight
  }
});

export class BadgesTabScreen extends Component {
  render() {
    return (
      <View style={baseStyles.root}>
        <BadgeList
          badges={this.props.badges}
          fetchBadges={this.props.fetchBadges}
          style={baseStyles.content}
        />
      </View>
    );
  }
}

BadgesTabScreen.propTypes = {
  badges: PropTypes.any,
  fetchBadges: PropTypes.func
};
