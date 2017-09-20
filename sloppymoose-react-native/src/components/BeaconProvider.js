import BeaconProximityFilter from './BeaconProximityFilter/BeaconProximityFilter'
import BeaconRangeMonitor from './BeaconRangeMonitor/BeaconRangeMonitor'
import emptyFn from 'empty/function'
import { array, func } from 'prop-types'
import React from 'react'

export default class BeaconProvider extends React.Component {
  static defaultProps = {
    children: emptyFn
  }
  static propTypes = {
    children: func.isRequired,
    regions: array
  }
  render () {
    return (
      <BeaconRangeMonitor regions={this.props.regions}>
        {({ beaconsInRange, regionsInRange }) => (
          <BeaconProximityFilter
            rangedBeacons={beaconsInRange}
            rangedRegions={regionsInRange}
          >
            {({ nearestBeacons, nearestRegions }) =>
              this.props.children({
                beaconsInRange,
                regionsInRange,
                nearestBeacons,
                nearestRegions
              })}
          </BeaconProximityFilter>
        )}
      </BeaconRangeMonitor>
    )
  }
}
