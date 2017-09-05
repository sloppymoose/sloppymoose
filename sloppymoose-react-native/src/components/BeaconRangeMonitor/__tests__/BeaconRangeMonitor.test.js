import Beacons from 'react-native-beacons-manager'
import BeaconRangeMonitor from '../BeaconRangeMonitor'
import EventEmitter from 'events'
import {
  FAR,
  IMMEDIATE_1D,
  IMMEDIATE_2D,
  NEAR,
  UNKNOWN
} from './__fixtures__/ranges'
import React from 'react'
import { REGION_A, REGION_B, REGION_C } from './__fixtures__/regions'
import renderer from 'react-test-renderer'

class MockDeviceEmitter extends EventEmitter {}

jest.mock('react-native-beacons-manager', () => ({
  startRangingBeaconsInRegion: jest.fn(),
  stopRangingBeaconsInRegion: jest.fn()
}))

describe('BeaconRangeMonitor', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('#componentWillMount', () => {
    it('starts ranging the specified beacons', done => {
      renderer.create(
        <BeaconRangeMonitor regions={[REGION_A]}>
          {() => {
            expect(
              Beacons.startRangingBeaconsInRegion.mock.calls
            ).toMatchSnapshot()
            done()
            return <i />
          }}
        </BeaconRangeMonitor>
      )
    })
  })

  describe('#componentWillReceiveProps', () => {
    describe('with a different set of regions to range', () => {
      it('stops ranging the deprecated regions', () => {
        const subject = renderer.create(
          <BeaconRangeMonitor regions={[REGION_A, REGION_B]}>
            {() => <i />}
          </BeaconRangeMonitor>
        )
        const instance = subject.getInstance()
        instance.componentWillReceiveProps({ regions: [REGION_B, REGION_C] })
        expect(Beacons.stopRangingBeaconsInRegion.mock.calls).toMatchSnapshot()
      })
      it('starts ranging the newly added regions', () => {
        const subject = renderer.create(
          <BeaconRangeMonitor regions={[REGION_A, REGION_B]}>
            {() => <i />}
          </BeaconRangeMonitor>
        )
        const instance = subject.getInstance()
        instance.componentWillReceiveProps({ regions: [REGION_B, REGION_C] })
        expect(
          Beacons.startRangingBeaconsInRegion.mock.calls.slice(2)
        ).toMatchSnapshot()
      })
      it('does not modify the ranging of legacy regions', () => {
        const subject = renderer.create(
          <BeaconRangeMonitor regions={[REGION_A, REGION_B]}>
            {() => <i />}
          </BeaconRangeMonitor>
        )
        const instance = subject.getInstance()
        instance.componentWillReceiveProps({ regions: [REGION_B, REGION_C] })
        expect(Beacons.startRangingBeaconsInRegion.mock.calls).toMatchSnapshot()
      })
    })

    describe('with no change in monitored regions', () => {
      it('does not stop or restart ranging of existing regions', () => {
        const subject = renderer.create(
          <BeaconRangeMonitor regions={[REGION_A, REGION_B]}>
            {() => <i />}
          </BeaconRangeMonitor>
        )
        const instance = subject.getInstance()
        instance.componentWillReceiveProps({ regions: [REGION_A, REGION_B] })
        expect(Beacons.startRangingBeaconsInRegion.mock.calls).toMatchSnapshot()
        expect(Beacons.stopRangingBeaconsInRegion.mock.calls).toMatchSnapshot()
      })
    })
  })

  describe('when a known beacon is in-range', () => {
    it('adds the region to the list of in-range regions', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 2) {
              expect(beaconsInRange).toEqual(NEAR.beacons)
              expect(regionsInRange).toEqual([REGION_A])
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', NEAR) // render count:2
    })
  })

  describe('when an unknown beacon is in range', () => {
    it('does not add the region to the list of in-range regions', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 3) {
              expect(beaconsInRange).toEqual([])
              expect(regionsInRange).toEqual([])
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', NEAR) // render count:2
      emitter.emit('beaconsDidRange', UNKNOWN) // render count:3
    })
  })

  describe('when an in-range beacon ranges again', () => {
    it('does not duplicate the in-range region in', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 3) {
              expect(beaconsInRange).toEqual(NEAR.beacons)
              expect(regionsInRange).toEqual([REGION_A])
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', NEAR) // render count:2
      emitter.emit('beaconsDidRange', NEAR) // render count:3
    })
  })

  describe('when an in-range beacon moves out of range', () => {
    it('removes the beacon from the list of in-range beacons', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 3) {
              expect(beaconsInRange).toEqual([])
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', NEAR) // render count:2
      emitter.emit('beaconsDidRange', UNKNOWN) // render count:3
    })
    it('removes the region from the list of in-range regions', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 3) {
              expect(regionsInRange).toEqual([])
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', NEAR) // render count:2
      emitter.emit('beaconsDidRange', UNKNOWN) // render count:3
    })
  })

  describe('when one of two in-range beacons moves out of range', () => {
    it('removes the out-of-range beacon from the list of in-range beacons', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 3) {
              expect(beaconsInRange).toMatchSnapshot()
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', IMMEDIATE_2D) // render count:2
      emitter.emit('beaconsDidRange', IMMEDIATE_1D) // render count:3
    })
    it('keeps the region in the list of in-range regions', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 3) {
              expect(regionsInRange).toMatchSnapshot()
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', IMMEDIATE_2D) // render count:2
      emitter.emit('beaconsDidRange', IMMEDIATE_1D) // render count:3
    })
  })

  describe('when an in-range beacon ranges changes proximity', () => {
    it('reflects the change in proximity for the in-range beacon', done => {
      const emitter = new MockDeviceEmitter()
      let renderCount = 0
      renderer.create(
        <BeaconRangeMonitor emitter={emitter} regions={[REGION_A]}>
          {({ beaconsInRange, regionsInRange }) => {
            renderCount = renderCount + 1
            if (renderCount === 3) {
              expect(beaconsInRange[0].proximity).toBe('far')
              done()
            }
            return <i />
          }}
        </BeaconRangeMonitor>
      ) // initial render count:1
      emitter.emit('beaconsDidRange', NEAR) // render count:2
      emitter.emit('beaconsDidRange', FAR) // render count:3
    })
  })

  describe('#componentWillUnmount', () => {
    it('stops ranging the specified beacons', () => {
      const subject = renderer.create(
        <BeaconRangeMonitor regions={[REGION_A]}>
          {() => <i />}
        </BeaconRangeMonitor>
      )
      subject.unmount()
      expect(Beacons.stopRangingBeaconsInRegion.mock.calls).toMatchSnapshot()
    })
  })
})
