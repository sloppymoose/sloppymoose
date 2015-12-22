import { Component, PropTypes, StyleSheet, Text, View } from 'react-native';
import emptyObj from 'empty/object';
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
    console.info('render home handler');
    if(!this.props.user.signedIn) {
      return null;
    }
    const expiresAt = ((this.props.user.createdAt * 1000) + this.props.user.expiresIn);
    const timeLeft = this.props.user.expiresIn * 1000 - (Date.now() - expiresAt);
    return (
      <View style={baseStyles.root}>
        <Text>Sloppy Moose</Text>
        <Text>Welcome User!</Text>
        <Text>Expires In: {this.props.user.expiresIn}</Text>
        <Text>Created At: {this.props.user.createdAt * 1000}</Text>
        <Text>Expires At: {expiresAt}</Text>
        <Text>------Now: {Date.now()}</Text>
        <Text>TTL: T-{timeLeft / 1000}s</Text>
        <SignOutButton signOutUser={this.props.signOutUser}/>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  signOutUser: PropTypes.bool,
  user: PropTypes.shape({
    accessToken: PropTypes.string,
    signedIn: PropTypes.bool
  })
};
HomeScreen.defaultProps = {
  user: emptyObj
};

