import { arrayOf, func, number, oneOfType } from 'prop-types'
import React from 'react'
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StyleSheet,
  Text
} from 'react-native'

// From https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580

export default class KeyboardAvoidingView extends React.Component {
  static propTypes = {
    children: func,
    heightMax: number.isRequired,
    heightMin: number.isRequired,
    style: oneOfType([arrayOf(number), number])
  }
  state = {
    heightMax: 0,
    heightMin: 0
  }
  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    )
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    )
    const { heightMax, heightMin } = this.props
    this.HEIGHT = new Animated.Value(heightMax)
    this.setState({
      heightMax,
      heightMin
    })
  }
  componentWillUpdate (nextProps) {
    const { heightMax, heightMin } = nextProps
    this.setState({ heightMax, heightMin }, () => {
      if (
        // if max height changed...
        heightMax !== this.props.heightMax &&
        // add the current height is the same size as the old max height
        this.HEIGHT === heightMax
      ) {
        // then change the current image height to match the new max value
        this.HEIGHT = new Animated.Value(heightMax)
      } else if (
        // if min height changed...
        heightMin !== this.props.heightMin &&
        // add the current height is the same size as the old min height
        this.HEIGHT === heightMin
      ) {
        // then change the current image height to match the new min value
        this.HEIGHT = new Animated.Value(heightMin)
      }
    })
  }
  componentWillUnmount () {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }
  keyboardWillHide = event => {
    Animated.timing(this.HEIGHT, {
      duration: event.duration,
      toValue: this.state.heightMax
    }).start()
  }
  keyboardWillShow = event => {
    Animated.timing(this.HEIGHT, {
      duration: event.duration,
      toValue: this.state.heightMin
    }).start()
  }
  render () {
    return (
      <RNKeyboardAvoidingView
        style={[styles.container, this.props.style]}
        behavior="padding"
      >
        {this.props.children(this.HEIGHT)}
      </RNKeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
