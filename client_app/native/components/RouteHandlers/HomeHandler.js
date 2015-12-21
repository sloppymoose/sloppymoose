import { Actions } from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { Component, PropTypes, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux/native';
import emptyObj from 'empty/object';
import { SignOutButton } from '../Buttons';
import { signOutUser } from '../../../react/actions/UserActions';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

function getState(state) {
  return {
    user: state.user
  };
}

function getActions(dispatch) {
  return bindActionCreators({ signOutUser }, dispatch);
}

export class _HomeHandler extends Component {
  componentWillMount() {
    if(!this.props.user.signedIn) {
      Actions.signedOut();
    }
  }
  render() {
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

_HomeHandler.propTypes = {
  signedOut: PropTypes.bool,
  user: PropTypes.shape({
    accessToken: PropTypes.string,
    signedIn: PropTypes.bool
  })
};
_HomeHandler.defaultProps = {
  user: emptyObj
};

export const HomeHandler = connect(getState, getActions)(_HomeHandler);
