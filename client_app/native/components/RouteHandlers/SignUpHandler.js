import { Actions } from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { SignUpScreen } from '../Screens';
import { signUpUser } from '../../../react/actions/UserActions';

function getState(state) {
  return {
    user: state.user
  };
}

function getActions(dispatch) {
  return bindActionCreators({ signUpUser }, dispatch);
}

export class SignUpContainer extends Component {
  render() {
    return (
      <SignUpScreen
        onBackPress={Actions.signedOut}
        signUpUser={this.props.signUpUser}
        user={this.props.user}
      />
    );
  }
}
SignUpContainer.propTypes = {
  signUpUser: PropTypes.func,
  user: PropTypes.any
};

export const SignUpHandler = connect(getState, getActions)(SignUpContainer);
