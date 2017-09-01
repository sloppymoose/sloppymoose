import { instanceOf } from 'prop-types'
import { PromiseState } from 'react-refetch'
import React from 'react'
import { signedConnect } from '../utils/apiConnector'
import { StyleSheet, Text, View } from 'react-native'

class ActivityScreen extends React.Component {
  static propTypes = {
    activitiesFetch: instanceOf(PromiseState)
  }
  render () {
    const { activitiesFetch } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.text}>ACTIVITIES</Text>
        <Text>
          Pending? {String(activitiesFetch.pending)}
        </Text>
        <Text>
          Fulfilled? {String(activitiesFetch.fulfilled)} -{' '}
          {JSON.stringify(activitiesFetch.value)}
        </Text>
        <Text>
          Rejected? {String(activitiesFetch.rejected)} -{' '}
          {String(activitiesFetch.reason)}
        </Text>
      </View>
    )
  }
}

export default signedConnect(props => ({
  activitiesFetch: `/api/check_ins`
}))(ActivityScreen)

const styles = StyleSheet.create({
  container: {},
  text: {}
})
