import { REGION_A, REGION_B } from './regions'

export const FAR = [
  {
    accuracy: 1,
    major: REGION_A.major,
    minor: 1,
    proximity: 'far',
    rssi: 0,
    uuid: REGION_A.uuid
  },
  {
    accuracy: 100,
    major: REGION_A.major,
    minor: 2,
    proximity: 'far',
    rssi: 0,
    uuid: REGION_A.uuid
  }
]

export const NEAR = [
  {
    accuracy: 1,
    major: REGION_B.major,
    minor: 1,
    proximity: 'near',
    rssi: 0,
    uuid: REGION_B.uuid
  },
  {
    accuracy: 100,
    major: REGION_B.major,
    minor: 2,
    proximity: 'near',
    rssi: 0,
    uuid: REGION_B.uuid
  }
]
