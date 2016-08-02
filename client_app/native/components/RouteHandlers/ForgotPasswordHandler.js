import { Actions } from 'react-native-router-flux';
import { Component } from 'react';
import { connect } from 'react-redux';
import emptyObj from 'empty/object';
import { ForgotPasswordScreen } from '../Screens';

function getState(state) {
  return emptyObj;
}

class ForgotPasswordContainer extends Component {
  render() {
    return (
      <ForgotPasswordScreen
        onBackPress={Actions.signIn}
      />
    );
  }
}
ForgotPasswordContainer.propTypes = {

};
ForgotPasswordContainer.defaultProps = {

};

export const ForgotPasswordHandler = connect(getState)(ForgotPasswordContainer);
