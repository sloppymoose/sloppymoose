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
    return (
      <View style={styles.container}>
        <Text style={styles.text}>ACTIVITIES</Text>
        <Text>
          Pending? {String(this.props.activitiesFetch.pending)}
        </Text>
        <Text>
          Fulfilled? {String(this.props.activitiesFetch.fulfilled)} -{' '}
          {JSON.stringify(this.props.activitiesFetch.value)}
        </Text>
        <Text>
          Rejected? {String(this.props.activitiesFetch.rejected)} -{' '}
          {String(this.props.activitiesFetch.reason)}
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
