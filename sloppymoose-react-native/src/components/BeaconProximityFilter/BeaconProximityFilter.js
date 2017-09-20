import { arrayOf, number, oneOf, shape, string, func } from 'prop-types'
import emptyAry from 'empty/array'
import { find, uniq } from 'lodash'
import React from 'react'

const PROXIMITY = {
  far: 2,
  immediate: 0,
  near: 1,
  unknown: 99
}

function byProximity (beaconA, beaconB) {
  if (PROXIMITY[beaconA.proximity] < PROXIMITY[beaconB.proximity]) {
    return -1
  }
  if (PROXIMITY[beaconA.proximity] > PROXIMITY[beaconB.proximity]) {
    return 1
  }
  if (beaconA.accuracy < beaconB.accuracy) {
    return -1
  }
  if (beaconA.accuracy > beaconB.accuracy) {
    return 1
  }
  return 0
}

export default class BeaconProximityFilter extends React.Component {
  static propTypes = {
    children: func.isRequired,
    rangedBeacons: arrayOf(
      shape({
        accuracy: number,
        proximity: oneOf(['far', 'immediate', 'near']),
        rssi: number,
        uuid: string.isRequired
      }).isRequired
    ),
    rangedRegions: arrayOf(
      shape({
        identifier: string.isRequired,
        major: number,
        minor: number,
        uuid: string.isRequired
      }).isRequired
    )
  }
  state = {
    nearestBeacons: emptyAry,
    nearestRegions: emptyAry
  }
  componentWillMount () {
    this.sortByProximity(this.props)
  }
  componentWillReceiveProps (nextProps) {
    // Only need to checked for changed beacons because regions will not change
    // without a change in beacons
    if (this.props.rangedBeacons !== nextProps.rangedBeacons) {
      this.sortByProximity(nextProps)
    }
  }
  sortByProximity = ({ rangedBeacons, rangedRegions }) => {
    const nearestBeacons = rangedBeacons.sort(byProximity)
    const nearestRegions = uniq(nearestBeacons.map(b => b.uuid)).map(uuid =>
      find(rangedRegions, { uuid })
    )
    this.setState({ nearestBeacons, nearestRegions })
  }
  render () {
    return this.props.children(this.state)
  }
}
