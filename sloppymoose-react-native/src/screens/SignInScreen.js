import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func, shape } from 'prop-types'
import { goToForgotPassword } from '../utils/navigationHelpers'
import KeyboardAvoidingView from '../components/KeyboardAvoidingView'
import { persistAuthentication } from '../actions/UserActions'
import React from 'react'
import SignInForm from '../components/Forms/SignInForm'

const FORM_HEIGHT = 216
const STATUS_BAR_HEIGHT = 64 // TODO: Determine if its possible to get this value programmatically, especially for bad-sight users

function getActions (dispatch) {
  return bindActionCreators({ persistAuthentication }, dispatch)
}

class SignInScreen extends React.Component {
  static propTypes = {
    navigator: shape({
      resetTo: func
    }),
    persistAuthentication: func
  }
  handleForgotPassword = () => {
    goToForgotPassword(this.props.navigator, 'push')
  }
  handleSignIn = authentication => {
    this.props.persistAuthentication(authentication)
  }
  render () {
    let { height: winHeight } = Dimensions.get('window')
    const maxHeight = winHeight - STATUS_BAR_HEIGHT
    const minHeight = maxHeight - FORM_HEIGHT
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView heightMax={maxHeight} heightMin={minHeight}>
          {height => (
            <Animated.View style={[styles.wrapper, { height }]}>
              <Animated.Image
                resizeMode="contain"
                source={require('../images/SplashLogo.png')}
                style={styles.image}
              />
              <SignInForm
                onForgotPassword={this.handleForgotPassword}
                onSuccess={this.handleSignIn}
              />
            </Animated.View>
          )}
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default connect(null, getActions)(SignInScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    width: '100%'
  },
  wrapper: {
    marginLeft: 20,
    marginRight: 20
  }
})
