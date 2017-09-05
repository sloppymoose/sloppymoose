import { bool, string } from 'prop-types'
import React from 'react'
// tweenState = require('react-tween-state')

import {
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'

// var styles = require('./styles')
// var images = require('./images')

var SPIN_DURATION = 1000

export default class ProgressHUD extends React.Component {
  static defaultProps = {
    color: '#000',
    isDismissible: false,
    isVisible: true,
    overlayColor: 'rgba(0, 0, 0, 0)'
  }
  static propTypes = {
    color: string,
    isDismissible: bool,
    isVisible: bool.isRequired,
    overlayColor: string
  }
  state = {
    rotate_deg: 0
  }
  componentDidMount () {
    // Kick off rotation animation
    this._rotateSpinner()

    // Set rotation interval
    this.interval = setInterval(() => {
      this._rotateSpinner()
    }, SPIN_DURATION)
  }

  componentWillUnmount () {
    // clearInterval(this.interval)
  }

  _rotateSpinner () {
    // this.tweenState('rotate_deg', {
    //   easing: tweenState.easingTypes.linear,
    //   duration: SPIN_DURATION,
    //   endValue: this.state.rotate_deg === 0 ? 360 : this.state.rotate_deg + 360
    // })
  }

  _clickHandler () {
    // if (this.props.isDismissible) {
    //   this.context.dismissProgressHUD()
    // }
  }

  render () {
    // Return early if not visible
    if (!this.props.isVisible) {
      return <View />
    }

    // Set rotation property value
    // var deg = Math.floor(this.getTweeningValue('rotate_deg')).toString() + 'deg'

    return (
      <TouchableHighlight
        key="ProgressHUD"
        style={[
          styles.overlay,
          {
            backgroundColor: this.props.overlayColor
          }
        ]}
        onPress={this._clickHandler}
        underlayColor={this.props.overlayColor}
        activeOpacity={1}
      >
        <View
          style={[
            styles.container,
            {
              // left: this.getTweeningValue('left')
            }
          ]}
        >
          <Image
            style={[
              styles.spinner,
              {
                backgroundColor: this.props.color
                // transform: [{ rotate: deg }]
              }
            ]}
            source={{
              uri: 'data:image/png;base64,' + images['1x'],
              isStatic: true
            }}
          >
            <View style={styles.inner_spinner} />
          </Image>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#fff'
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  },
  inner_spinner: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    backgroundColor: '#fff'
  }
})

const images = {
  '1x':
    'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABjlJREFUaAWVltuS3EQQRHcAY+AVm3f//+c4+At4gwjAl6VOj44iVdM9kiuip25Z1Zmr0di319fXDy8vL69PztfWy5zYPP2Ib7fb59r/vjC/18GvbLUHXu6VY89H/Ydt821xA6DsZW5M3xiPWbtnzz+dAWWM91g3n/rvCiVRvIdhzLx7e3r6Pd5Kl9yMHIOz+rTGE5EEAGM9y7RZH5x1Y/FXfRJjJvPLcQpxCYRmQqxJXN8FOC+evStLomAy/6Y4hUiIBXzleKnSJDbz1DzMp4nP2izuxH2p9fQzPuAVwmWdQBcjofTMkPdTpUt2IFMTz/KlCOYUsro1xRjrJd//AOxS7Gov9Wekz3oPohACsRkZLsMkTixBRaz8wNa/IeLJZ5aEIZeHnoS7z7kRnz0RL1eMHoLEGssURe1MAJgkI9FZzZ4+MXvchUBgb1bMsNZF0JM8PebMmTkT4z1JkLjn4GY154dXSAqAhCZBFmE+BXJJr/wYWHwcSBRmRpY7FKCfze1CJOudKYoFmBhyxYzG9sEyMV1Y4owlzr5nR1x64n5efCJckALIMcm5iLyLoScuRTC/MnYkmZUY7xXb59g/egiRBAUsBbnAnl4x5MxjYuk9E5S4lQDrYImdWfnlE+liWKbgCoexNM1LwIFnx8wkedW7d+W5Y/yDKEGAKQCAObGLrEMkzT77OMx6EpcCvlQjT/bYR+7emWcv9f2JSJhixmCsuZQ+8czAKkQxiZNokjemR+w9enYSY8SezIcQLqSpgANg62WfpWD7yTkwMyHsoSf57ulxxOHzVLrnxsP7q6UI/GjUBwuwXEScWMhCxrkKB16yXQzYz3X0xuSKUEi/t/OpkWGj7q8WlQRKzGX2zfGQ5FKw+pyj1oVAnPNpOwjwgOfkHcZVPvB7yBXCQJIAiFHH0rscrxhJJ3H6PnF2QPi/OIpSwLeIYJ+cRuxFiuiAzB1MT8yRzPcVI4aD/VuHGAwiyP+pwxNBiHNdRLV2onkfdc36yH0iNvUHUBVXOfU8EGInf31E6SH913YQ5NcpZ42rvbyPngZ+t5UQAAfgPnEMOkYy+J/r/FSHJ/JHHYTxRPKvX+nhnr6P/soOWL9agvMrZm3lO5bcml+vN1X7rc7HOu/qkNsTq6/WsJ5bT/+A6U/kAbBNZ904PTFHkuz9sc4vdX6t82cd+uSI8V7wzuKx7rM2ANuHuJG6cAVIsDE+Y8ng+fpwIPu2DsS5g5f77zoYAmdi3JO7wfecGmZ9JFeFMOSgsR4CHvZxFAJperwXiOEdwfh+U0O0s3h3pq/y4W5yDIx241KH9uIWCEwvFu/FEoFUCkEMNbCQ9h9C983E5F5iT4U7cefT7//7PQO6ML0C9CkEQeQKYT9i+NlFkCQQw3EHnjzvybhaew8cNnb1J+IFq2HqXKaXgKTTiwPLpQpxhrpGP4/78XnAmxszN75aXmhD78DMS0afAoitM4tJEjEKcm/2xTE/CJYnTuwsXn61BM+8iyWbxDMWB1FMkopR0L17/ATrfMagkpNiH172BBFjLrSngPRdQM7ct9yFpAhid4rBS5w4+8Y7+a0/ct4RLsUEZmwtiaWAHoNPrPPsxLjUsxLCjOa+xNpPQePnMi8znnkJdvK9nrMSkjw58YwYc9TZh8eoYbkzY3pDUP5qJWAWJ+Hsp7CsSwCvKSi9oiQPVjF695JrQ0Al9MYTsSl45sFQT09sPpuhlpbkjWcinGG3fWLM3Pvu1XoqsydCM0k7JGm99RmW2soU8cz7dFKAcd/LnsOvVhLrseTTE3s6nsusEWtcip2JYC8YBBFj/Wm4H3942bORMYsyP4vZC6ZbiqA3EyPxFGGt7zvks5/fJJoijPWJ6zGXzMR4+ZmILvpUTL4jXg6BK2STvARzR9aMFWCOt8Y+Y4WkgIxzfuxIIRKjYXzFdzx5Gju6JeGMwZk7oyjymRj6l1/2lSCWn/XArEzSenAZm+f8TMyll70TZal/ZXt5kbEYc7wk9WIyN3aOvNtDbfbVktxVzyWJ7Zeac7nEs2YdL0E9eGNnZrXDExGIT2LGWTfWg9EytgaZXs+acXpmydPYMa35RAAD8pBj5vpZjZ71LXwgbV0vYXLj9NTZm6R7Dka7/Q+G5FcOipn+rwAAAABJRU5ErkJggg=='
}
