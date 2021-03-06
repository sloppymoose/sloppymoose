import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from 'apsl-react-native-button';
import { Component, PropTypes } from 'react';
import emptyFn from 'empty/function';
import { first, toPairs } from 'lodash';
import { FormCheckbox } from './FormCheckbox';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import HttpError from 'standard-http-error';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Inflector from 'inflected';
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
  form: {

  },
  root: {
    flex: 1
  }
});

function menuize(item) {
  return (
    <Text key={item.get('id')} value={item.get('id')}>
      {item.getIn(['attributes', 'name'])}
    </Text>
  );
}

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.goToNext = this.goToNext.bind(this);
    this.handleEmailChangeText = this.handleEmailChangeText.bind(this);
    this.handleFirstTimerValueChange = this.handleFirstTimerValueChange.bind(this);
    this.handleNameChangeText = this.handleNameChangeText.bind(this);
    this.handlePasswordChangeText = this.handlePasswordChangeText.bind(this);
    this.handlePasswordConfirmationChangeText = this.handlePasswordConfirmationChangeText.bind(this);
    this.handlePromptWaiver = this.handlePromptWaiver.bind(this);
    this.handlePromptWaiverAcceptance = this.handlePromptWaiverAcceptance.bind(this);
    this.handleHideWaiver = this.handleHideWaiver.bind(this);
    this.handleShowWaiver = this.handleShowWaiver.bind(this);
    this.handleShirtSizeChangeSelected = this.handleShirtSizeChangeSelected.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      email: '',
      firstTimer: true,
      name: '',
      password: '',
      passwordConfirmation: '',
      safetyWaiverAccepted: null,
      showWaiver: false,
      shirtSizeId: -1
    };
  }
  goToNext(ref) {
    return () => this.refs[ref].focus();
  }
  handleEmailChangeText(email) {
    this.setState({ email });
  }
  handleFirstTimerValueChange(firstTimer) {
    this.setState({ firstTimer });
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
  handleShirtSizeChangeSelected(item, selectedIndex) {
    this.setState({
      shirtSizeId: item.props.value
    });
  }
  handleShowWaiver() {
    this.setState({ showWaiver: true });
  }
  handleSignUp() {
    this.setState({ safetyWaiverAccepted: Accepted });
    this.handleHideWaiver();
    this.props.signUpUser(snakeCaseKeys(omit(this.state, 'showWaiver')))
      .catch(err => {
        let title = 'Unspecified Sign Up Error';
        let msg = 'Please try again later';
        switch(err.code) {
          case HttpError.UNPROCESSABLE_ENTITY:
            title = 'Oops!';
            const fieldErrs = first(toPairs(err.json.errors));
            msg = `${Inflector.titleize(fieldErrs[0])} ${fieldErrs[1][0]}`;
            break;
        }
        Alert.alert(title, msg);
      });
  }
  render() {
    const reactiveRootStyles = {
      flex: this.props.keyboardVisible ? null : 1
    };
    const shirtSizes = this.props.shirtSizes.get('items', Immutable.List());
    const shirtSizeMenuItems = shirtSizes.map(menuize);
    const selectedShirt =
      shirtSizes
        .find(size => size.get('id') == this.state.shirtSizeId) || Immutable.Map();
    const selectedShirtName = selectedShirt.getIn(['attributes', 'name']);
    return (
      <View style={[baseStyles.root, reactiveRootStyles]}>
        <View style={baseStyles.form}>
          <FormInput
            autoCapitalize="words"
            autoCorrect={false}
            label="Full Name"
            onChangeText={this.handleNameChangeText}
            onSubmitEditing={this.goToNext('email')}
            ref="name"
            returnKeyType="next"
            value={this.state.name}
          />
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            label="Email"
            onChangeText={this.handleEmailChangeText}
            onSubmitEditing={this.goToNext('password')}
            ref="email"
            returnKeyType="next"
            value={this.state.email}
          />
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            label="Password"
            onChangeText={this.handlePasswordChangeText}
            onSubmitEditing={this.goToNext('passwordConfirmation')}
            ref="password"
            returnKeyType="next"
            secureTextEntry
            value={this.state.password}
          />
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            label="Password Confirmation"
            onChangeText={this.handlePasswordConfirmationChangeText}
            onSubmitEditing={this.goToNext('shirtSizeId')}
            ref="passwordConfirmation"
            secureTextEntry
            value={this.state.passwordConfirmation}
          />
          <FormSelect
            label="Shirt Size"
            onChangeSelected={this.handleShirtSizeChangeSelected}
            value={selectedShirtName}
          >
            {shirtSizeMenuItems}
          </FormSelect>
          <FormCheckbox
            label="I am new to Sloppy Moose"
            onValueChange={this.handleFirstTimerValueChange}
            value={this.state.firstTimer}
          />
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
  shirtSizes: ImmutablePropTypes.contains({
    items: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      attributes: ImmutablePropTypes.contains({
        name: PropTypes.string.isRequired
      })
    }))
  }),
  signUpUser: PropTypes.func,
  user: ImmutablePropTypes.contains({
    signingUp: PropTypes.bool
  })
};
SignUpForm.defaultProps = {
  keyboardVisible: false,
  shirtSizes: Immutable.Map(),
  signUpUser: emptyFn,
  user: Immutable.Map()
};
