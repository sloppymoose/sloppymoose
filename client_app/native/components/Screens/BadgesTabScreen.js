import {
  Component,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
        <Text>Coming Soon!</Text>
      </View>
    );
  }
}

BadgesTabScreen.propTypes = {

};

BadgesTabScreen.defaultProps = {

};
