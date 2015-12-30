import { Actions } from 'react-native-redux-router';
import Button from 'apsl-react-native-button';
import { Component, PropTypes, StyleSheet, Text, View } from 'react-native';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import NavigationBar from 'react-native-navbar';

const baseStyles = StyleSheet.create({
  appNav: {
    marginLeft: 10,
    marginRight: 10
  },
  content: {
    flex: 1
  },
  root: {
    flex: 1
  }
});
const NavTitle = {
  title: 'Sloppy Moose'
};

function componentize(item) {
  return (
    <Text key={item.get('id')}>
      {item.getIn(['attributes', 'event_name'])}
    </Text>
  );
}

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut() {
    this.props.signOutUser();
  }
  render() {
    const user = this.props.user.toJS();
    if(!user.signedIn) {
      return null;
    }
    const items = (this.props.checkIns.get('items') || Immutable.List()).map(componentize);
    const rightNavButton = {
      title: 'Sign Out',
      handler: this.handleSignOut
    };
    return (
      <View style={baseStyles.root}>
        <NavigationBar
          rightButton={rightNavButton}
          title={NavTitle}
        />
        <View style={baseStyles.content}>
          <Text>Welcome {user.email}!</Text>
          <Text>Recent Check Ins</Text>
          {items}
        </View>
        <View style={baseStyles.appNav}>
          <Button onPress={Actions.eventCheckIn}>
            Check In
          </Button>
        </View>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  checkIns: ImmutablePropTypes.contains({
    loading: PropTypes.bool,
    items: PropTypes.list
  }),
  signOutUser: PropTypes.func,
  user: ImmutablePropTypes.contains({
    accessToken: PropTypes.string,
    createdAt: PropTypes.number,
    email: PropTypes.string,
    expiresAt: PropTypes.number,
    expiresIn: PropTypes.number,
    signedIn: PropTypes.bool
  })
};
HomeScreen.defaultProps = {
  user: Immutable.Map()
};
