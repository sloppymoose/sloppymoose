import { Actions } from 'react-native-redux-router';
import { Component, PropTypes, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { SignOutButton } from '../Buttons';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

function componentize(item, i) {
  return (
    <Text key={i}>CHECKIN</Text>
  );
}

export class HomeScreen extends Component {
  render() {
    const user = this.props.user.toJS();
    if(!user.signedIn) {
      return null;
    }
    const items = (this.props.checkIns.get('items') || Immutable.List()).map(componentize);
    const expiresAt = ((user.createdAt * 1000) + user.expiresIn);
    const timeLeft = user.expiresIn * 1000 - (Date.now() - expiresAt);
    return (
      <View style={baseStyles.root}>
        <Text>Sloppy Moose</Text>
        <Text>Welcome {user.email}!</Text>
        <Text>Expires In: {user.expiresIn}</Text>
        <Text>Created At: {user.createdAt * 1000}</Text>
        <Text>Expires At: {expiresAt}</Text>
        <Text>------Now: {Date.now()}</Text>
        <Text>TTL: T-{timeLeft / 1000}s</Text>
        <Text>--</Text>
        <Text>Check Ins ({items.size}):</Text>
        {items}
        <SignOutButton signOutUser={this.props.signOutUser}/>
        <TouchableOpacity onPress={Actions.eventCheckIn}>
          <View>
            <Text>
              Check In
            </Text>
          </View>
        </TouchableOpacity>
        <Text>...</Text>
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
