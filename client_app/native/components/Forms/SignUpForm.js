import {
  Alert,
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Button from 'apsl-react-native-button';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { omit } from 'lodash';
import { SafetyWaiverModal } from '../Modals';
import { snakeCaseKeys } from '../../../react/util/objectHelpers';

const Accepted = '1';
const baseStyles = StyleSheet.create({
  actions: {

  },
  button: {
    borderRadius: 0,
    borderWidth: 0
  },
  createButton: {
    backgroundColor: 'orange',
  },
  createButtonLabel: {
    color: 'white'
  },
  error: {
    flex: 1,
    padding: 10
  },
  errorText: {
    color: 'red'
  },
  form: {

  },
  root: {
    flex: 1
  },
  field: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    margin: 10
  },
  input: {
    height: 40
  }
});

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.goToNext = this.goToNext.bind(this);
    this.handleEmailChangeText = this.handleEmailChangeText.bind(this);
    this.handleNameChangeText = this.handleNameChangeText.bind(this);
    this.handlePasswordChangeText = this.handlePasswordChangeText.bind(this);
    this.handlePasswordConfirmationChangeText = this.handlePasswordConfirmationChangeText.bind(this);
    this.handlePromptWaiver = this.handlePromptWaiver.bind(this);
    this.handlePromptWaiverAcceptance = this.handlePromptWaiverAcceptance.bind(this);
    this.handleHideWaiver = this.handleHideWaiver.bind(this);
    this.handleShowWaiver = this.handleShowWaiver.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
      safetyWaiverAccepted: null,
      showWaiver: false
    };
  }
  goToNext(ref) {
    return () => this.refs[ref].focus();
  }
  handleEmailChangeText(email) {
    this.setState({ email });
  }
  handleNameChangeText(name) {
    this.setState({ name });
  }
  handlePasswordChangeText(password) {
    this.setState({ password });
  }
  handlePasswordConfirmationChangeText(passwordConfirmation) {
    this.setState({ passwordConfirmation });
  }
  handleHideWaiver() {
    this.setState({ showWaiver: false });
  }
  handlePromptWaiver() {
    if(this.state.safetyWaiverAccepted === Accepted) {
      return this.handleSignUp();
    }
    Alert.alert(
      'Safety Waiver',
      'Before you may proceed, you must read & accept our Safety Waiver',
      [
        {
          text: 'Cancel',
          onPress: this.handleHideWaiver
        },
        {
          text: 'OK',
          onPress: this.handleShowWaiver
        }
      ]
    );
  }
  handlePromptWaiverAcceptance() {
    Alert.alert(
      'Safety Waiver',
      'I agree to the Safety Waiver',
      [
        {
          text: 'Cancel',
          onPress: this.handleHideWaiver
        },
        {
          text: 'OK',
          onPress: this.handleSignUp
        }
      ]
    );
  }
  handleShowWaiver() {
    this.setState({ showWaiver: true });
  }
  handleSignUp() {
    this.setState({ safetyWaiverAccepted: Accepted });
    this.handleHideWaiver();
    this.props.signUpUser(snakeCaseKeys(omit(this.state, 'showWaiver')))
      .catch(err => {
        console.info('TODO: RENDER ERROR?', err);
      });
  }
  render() {
    const errMsg = this.props.user.get('signUpError').message;
    const reactiveRootStyles = {
      flex: this.props.keyboardVisible ? null : 1
    };
    const reactiveSpacerStyles = {
      flex: this.props.keyboardVisible ? null : 1
    };
    return (
      <View style={[baseStyles.root, reactiveRootStyles]}>
        <View style={baseStyles.form}>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={this.handleNameChangeText}
              onSubmitEditing={this.goToNext('email')}
              placeholder="Name"
              ref="name"
              returnKeyType="next"
              style={baseStyles.input}
              value={this.state.name}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={this.handleEmailChangeText}
              onSubmitEditing={this.goToNext('password')}
              placeholder="Email"
              ref="email"
              returnKeyType="next"
              style={baseStyles.input}
              value={this.state.email}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handlePasswordChangeText}
              onSubmitEditing={this.goToNext('passwordConfirmation')}
              placeholder="Password"
              ref="password"
              returnKeyType="next"
              secureTextEntry
              style={baseStyles.input}
              value={this.state.password}
            />
          </View>
          <View style={baseStyles.field}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handlePasswordConfirmationChangeText}
              onSubmitEditing={this.handleSignUp}
              placeholder="Password Confirmation"
              ref="passwordConfirmation"
              returnKeyType="go"
              secureTextEntry
              style={baseStyles.input}
              value={this.state.passwordConfirmation}
            />
          </View>
        </View>
        <View style={[baseStyles.error, reactiveSpacerStyles]}>
          <Text style={baseStyles.errorText}>
            {errMsg}
          </Text>
        </View>
        <View style={baseStyles.actions}>
          <Button
            isLoading={this.props.user.get('signingUp')}
            onPress={this.handlePromptWaiver}
            style={[baseStyles.button, baseStyles.createButton]}
            textStyle={baseStyles.createButtonLabel}
          >
            Create
          </Button>
        </View>
        <SafetyWaiverModal
          onDone={this.handlePromptWaiverAcceptance}
          visible={this.state.showWaiver}
        />
      </View>
    );
  }
}

SignUpForm.propTypes = {
  keyboardVisible: PropTypes.bool,
  signUpUser: PropTypes.func,
  user: ImmutablePropTypes.contains({
    signingUp: PropTypes.bool,
    signUpError: PropTypes.shape({
      message: PropTypes.string
    })
  })
};
SignUpForm.defaultProps = {
  keyboardVisible: false,
  signUpUser: emptyFn,
  user: Immutable.Map()
};
