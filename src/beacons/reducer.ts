import { ReducerRegistry } from '../store';

import { BEACONS_DETECTED } from './actiontypes';

/**
 * Redfucer function for the {@code beacons} functionality.
 *
 * @param {Object} state - The current Redux state.
 * @param {any} action - The action currently being reduced.
 * @returns {Object}
 */
function reducer(state: Object = {
    devicesNearby: []
}, action: any): Object {
    switch (action.type) {
        case BEACONS_DETECTED:
            return {
                ...state,
                devicesNearby: action.beacons
            }
    }

    return state;
}

ReducerRegistry.register('beacons', reducer);
