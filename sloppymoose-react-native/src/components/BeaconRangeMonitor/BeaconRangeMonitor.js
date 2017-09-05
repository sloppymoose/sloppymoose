import { arrayOf, func, number, shape, string } from 'prop-types'
import Beacons from 'react-native-beacons-manager'
import { DeviceEventEmitter } from 'react-native'
import emptyAry from 'empty/array'
import emptyFn from 'empty/function'
import { filter, intersectionBy, uniqBy, without, xorBy } from 'lodash'
import React from 'react'

export default class BeaconRangeMonitor extends React.Component {
  static defaultProps = {
    children: emptyFn,
    emitter: DeviceEventEmitter,
    regions: emptyAry
  }
  static propTypes = {
    children: func,
    emitter: shape({
      addListener: func
    }),
    regions: arrayOf(
      shape({
        identifier: string.isRequired,
        major: number,
        minor: number,
        uuid: string.isRequired
      }).isRequired
    )
  }
  state = {
    beaconsInRange: emptyAry,
    regionsInRange: emptyAry
  }
  componentWillMount () {
    this.startRanging(this.props.regions)
    this._listener = this.props.emitter.addListener(
      'beaconsDidRange',
      this.handleInRange
    )
  }
  componentWillReceiveProps (nextProps) {
    const { regions } = this.props
    const { regions: nextRegions } = nextProps
    const changedRegions = xorBy(regions, nextRegions, 'uuid')
    if (changedRegions.length) {
      this.stopRanging(intersectionBy(changedRegions, regions, 'uuid'))
      this.startRanging(intersectionBy(changedRegions, nextRegions, 'uuid'))
    }
  }
  componentWillUnmount () {
    this.stopRanging(this.props.regions)
    this._listener.remove()
  }
  handleInRange = ({ region, beacons }) => {
    beacons = without(beacons, ...filter(beacons, { proximity: 'unknown' }))
    if (beacons.length) {
      this.addInRange(beacons, region)
    } else {
      this.removeOutOfRange(region)
    }
  }
  addInRange = (newInRangeBeacons, newInRangeRegion) => {
    let { beaconsInRange, regionsInRange } = this.state
    const oldRegionBeacons = filter(beaconsInRange, {
      uuid: newInRangeRegion.uuid
    })
    beaconsInRange = without(beaconsInRange, ...oldRegionBeacons)
    beaconsInRange = [...newInRangeBeacons, ...beaconsInRange]
    regionsInRange = uniqBy([...regionsInRange, newInRangeRegion], 'uuid')
    this.setState({ beaconsInRange, regionsInRange })
  }
  removeOutOfRange = region => {
    let { beaconsInRange, regionsInRange } = this.state
    const outOfRangeBeacons = filter(beaconsInRange, { uuid: region.uuid })
    beaconsInRange = without(beaconsInRange, ...outOfRangeBeacons)
    regionsInRange = without(regionsInRange, region)
    this.setState({ beaconsInRange, regionsInRange })
  }
  startRanging = regions => {
    regions.map(region => Beacons.startRangingBeaconsInRegion(region))
  }
  stopRanging = regions => {
    regions.map(region => Beacons.stopRangingBeaconsInRegion(region))
  }
  render () {
    return this.props.children(this.state)
  }
}
