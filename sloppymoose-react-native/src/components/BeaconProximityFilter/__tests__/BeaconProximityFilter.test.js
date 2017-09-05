import BeaconProximityFilter from '../BeaconProximityFilter'
import React from 'react'
import { FAR, NEAR } from './__fixtures__/beacons'
import { REGION_A, REGION_B } from './__fixtures__/regions'
import renderer from 'react-test-renderer'

describe('BeaconProximityFilter', () => {
  describe('#componentWillMount', () => {
    it('sorts regions by proximity', done => {
      renderer.create(
        <BeaconProximityFilter
          rangedBeacons={[...FAR, ...NEAR]}
          rangedRegions={[REGION_A, REGION_B]}
        >
          {({ nearestBeacons, nearestRegions }) => {
            expect(nearestBeacons).toMatchSnapshot()
            expect(nearestRegions).toMatchSnapshot()
            done()
            return <i />
          }}
        </BeaconProximityFilter>
      )
    })
  })

  describe('#componentWillReceiveProps', () => {
    describe('with new ranged beacon regions', () => {
      it('re-sorts the ranged beacon and regions', () => {
        const subject = renderer.create(
          <BeaconProximityFilter
            rangedBeacons={NEAR}
            rangedRegions={[REGION_A]}
          >
            {() => <i />}
          </BeaconProximityFilter>
        )
        const instance = subject.getInstance()
        instance.componentWillReceiveProps({
          rangedBeacons: [...FAR, ...NEAR],
          rangedRegions: [REGION_A, REGION_B]
        })
        expect(instance.state).toMatchSnapshot()
      })
    })
  })
})
