import { Component, PropTypes, StyleSheet, Text, View } from 'react-native';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { SignOutButton } from '../Buttons';
import { signedRequest } from '../../../react/util/networkHelpers';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export class HomeScreen extends Component {
  componentWillMount() {
    console.info('HomeScreen#componentWillMount');
    // signedRequest('/api/check_ins')
    //   .then((data) => {
    //     console.info('CHECKINS', data);
    //   })
    //   .catch(err => {
    //     console.info('CHECKIN ERROR', err);
    //   });
  }
  render() {
    const user = this.props.user.toJS();
    if(!user.signedIn) {
      return null;
    }
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
        <SignOutButton signOutUser={this.props.signOutUser}/>
      </View>
    );
  }
}

HomeScreen.propTypes = {
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
