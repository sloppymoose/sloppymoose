import { Alert, StyleSheet, Text, View } from 'react-native'
// eslint-disable-next-line import/default
import Button from 'apsl-react-native-button'
import HttpError from 'standard-http-error'
import { func, instanceOf } from 'prop-types'
import { merge } from 'lodash'
import { PromiseState } from 'react-refetch'
import React from 'react'
// eslint-disable-next-line import/default
import tcomb from 'tcomb-form-native'
import { unsignedConnect } from '../../utils/apiConnector'

const Form = tcomb.form.Form
const SignIn = tcomb.struct({
  email: tcomb.String,
  password: tcomb.String
})

function handleSignInError (err) {
  if (err instanceof HttpError) {
    switch (err.code) {
      case HttpError.UNAUTHORIZED:
        return Alert.alert(
          'Oops!',
          'Incorrect login informtion. Please try again.'
        )
    }
  }
  Alert.alert(
    'Unspecified Sign In Error',
    err.message || 'Please try again later'
  )
}

@unsignedConnect(props => ({
  signInUser: (email, password) => ({
    signInUserResponse: {
      then: props.onSuccess,
      catch: handleSignInError,
      url: '/oauth/token',
      method: 'POST',
      body: {
        grant_type: 'password',
        user: {
          email,
          password
        }
      }
    }
  })
}))
export default class SignInForm extends React.Component {
  static propTypes = {
    onForgotPassword: func.isRequired,
    onSuccess: func.isRequired,
    signInUser: func.isRequired,
    signInUserResponse: instanceOf(PromiseState)
  }
  state = {
    value: {
      email: '',
      password: ''
    }
  }
  constructor (props) {
    super(props)
    this.options = {
      auto: 'placeholders',
      fields: {
        email: {
          autoCapitalize: 'none',
          autoCorrect: false,
          keyboardType: 'email-address',
          onSubmitEditing: this.focus('password')
        },
        password: {
          autoCapitalize: 'none',
          onSubmitEditing: this.handleSubmit,
          returnKeyType: 'go',
          secureTextEntry: true
        }
      }
    }
  }
  handleChange = value => {
    this.setState({ value })
  }
  handleForgotPassword = () => {
    this.props.onForgotPassword()
  }
  handleSubmit = () => {
    // const { email, password } = this.state.value
    // TODO: DO NOT COMMIT
    let email = 'derek.lindahl@gmail.com'
    let password = 'password1234'
    this.props.signInUser(email.trim(), password.trim())
  }
  focus = field => {
    return () => this.form.getComponent(field).refs.input.focus()
  }
  render () {
    const { signInUserResponse } = this.props
    const isLoading = Boolean(signInUserResponse && signInUserResponse.pending)
    const formOpts = merge({}, this.options, {
      fields: {
        email: {
          editable: !isLoading
        },
        password: {
          editable: !isLoading
        }
      }
    })
    return (
      <View>
        <Form
          onChange={this.handleChange}
          options={formOpts}
          ref={form => (this.form = form)}
          style={styles.fo}
          type={SignIn}
          value={this.state.value}
        />
        <Button
          activityIndicatorColor="white"
          isLoading={signInUserResponse && signInUserResponse.pending}
          onPress={this.handleSubmit}
          style={styles.signIn}
          textStyle={styles.signInLabel}
        >
          Sign In
        </Button>
        <Text onPress={this.handleForgotPassword} style={styles.forgotPass}>
          Forgot Password?
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  forgotPass: {
    marginBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  input: {
    height: 40
  },
  signIn: {
    backgroundColor: 'orange',
    borderWidth: 0
  },
  signInLabel: {
    color: 'white'
  }
})
