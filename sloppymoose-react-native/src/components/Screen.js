// import Navigator from 'native-navigation'
import React from 'react'
import { string, node } from 'prop-types'
import { StyleSheet, View } from 'react-native'

const THEMES = {
  default: {
    // TODO
    // backgroundColor: undefined,
    // titleColor: undefined
  },
  primary: {
    // TODO
    // backgroundColor: PRIMARY_COLOR,
    // statusBarStyle: 'light',
    // titleColor: SECONDARY_COLOR
  },
  secondary: {
    // TODO
    // alpha: 1,
    // backgroundColor: SECONDARY_COLOR,
    // statusBarStyle: 'light',
    // titleColor: WHITE
  }
}

const Screen = ({ children, theme = 'default', ...props }) =>
  // <Navigator.Config {...THEMES[theme]} {...props}>
  <View style={styles.container}>
    {children}
  </View>
// </Navigator.Config>

Screen.propTypes = {
  children: node,
  theme: string
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})

export default Screen
