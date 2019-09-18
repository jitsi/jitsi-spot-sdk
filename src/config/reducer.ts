import { Config } from '../model';
import { ReducerRegistry } from '../store';

import { UPDATE_CONFIG } from './actiontypes';

const DEFAULT_CONFIG = new Config(
    'https://spot.jitsi.net/', //baseURL
    'bf23c311-24ae-414b-b153-cf097836947f' // beaconUUID
);

/**
 * Redfucer function for the {@code config} functionality.
 *
 * @param {Object} state - The current Redux state.
 * @param {any} action - The action currently being reduced.
 * @returns {Object}
 */
function reducer(state: Object = DEFAULT_CONFIG, action: any): Object {
    switch (action.type) {
        case UPDATE_CONFIG:
            return {
                ...state,
                ...action.config
            }
    }

    return state;
}

ReducerRegistry.register('config', reducer);
