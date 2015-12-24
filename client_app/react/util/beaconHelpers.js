import { BTDeniedStates, BTEnabledStates } from '../constants/BeaconConstants';

export function isBeaconDenied(authorizationState) {
  return !!~BTDeniedStates.indexOf(authorizationState);
}

export function isBeaconEnabled(authorizationState) {
  return !!~BTEnabledStates.indexOf(authorizationState);
}
