import { REGION_A, REGION_B } from './regions'

export const FAR = [
  {
    accuracy: 2.0,
    major: REGION_A.major,
    minor: 1,
    proximity: 'far',
    rssi: -54,
    uuid: REGION_A.uuid
  },
  {
    accuracy: 1.0,
    major: REGION_A.major,
    minor: 2,
    proximity: 'far',
    rssi: -54,
    uuid: REGION_A.uuid
  }
]

export const NEAR = [
  {
    accuracy: 0.5,
    major: REGION_B.major,
    minor: 1,
    proximity: 'near',
    rssi: -54,
    uuid: REGION_B.uuid
  },
  {
    accuracy: 0.01,
    major: REGION_B.major,
    minor: 2,
    proximity: 'near',
    rssi: -54,
    uuid: REGION_B.uuid
  }
]
