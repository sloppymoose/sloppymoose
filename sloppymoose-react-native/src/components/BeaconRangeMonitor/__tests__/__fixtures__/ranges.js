import { REGION_A } from './regions'

export const FAR = {
  region: REGION_A,
  beacons: [
    {
      accuracy: 2.0,
      major: REGION_A.major,
      minor: REGION_A.minor,
      proximity: 'far',
      rssi: -54,
      uuid: REGION_A.uuid
    }
  ]
}

export const IMMEDIATE_1D = {
  region: REGION_A,
  beacons: [
    {
      accuracy: 0.001,
      major: REGION_A.major,
      minor: REGION_A.minor,
      proximity: 'immediate',
      rssi: -54,
      uuid: REGION_A.uuid
    }
  ]
}

export const IMMEDIATE_2D = {
  region: REGION_A,
  beacons: [
    {
      accuracy: 0.001,
      major: REGION_A.major,
      minor: 1,
      proximity: 'immediate',
      rssi: -54,
      uuid: REGION_A.uuid
    },
    {
      accuracy: 0.001,
      major: REGION_A.major,
      minor: 2,
      proximity: 'immediate',
      rssi: -54,
      uuid: REGION_A.uuid
    }
  ]
}

export const NEAR = {
  region: REGION_A,
  beacons: [
    {
      accuracy: 0.1,
      major: REGION_A.major,
      minor: REGION_A.minor,
      proximity: 'near',
      rssi: -54,
      uuid: REGION_A.uuid
    }
  ]
}

export const UNKNOWN = {
  region: REGION_A,
  beacons: [
    {
      accuracy: 0.1,
      major: REGION_A.major,
      minor: REGION_A.minor,
      proximity: 'unknown',
      rssi: -54,
      uuid: REGION_A.uuid
    }
  ]
}
