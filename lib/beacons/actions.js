import { BEACONS_DETECTED } from './actiontypes';
/**
 * Action to be dispatched to update the list of most recently detected devices.
 *
 * @param {Array<Beacon>} beacons - The list of detected beacons (empty array if none).
 * @returns {{
 *     beacons: Array<Beacon>,
 *     type: 'BEACONS_DETECTED'
 * }}
 */
export function beaconsDetected(beacons = []) {
    return {
        beacons,
        type: BEACONS_DETECTED
    };
}
