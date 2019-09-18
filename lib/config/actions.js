import { UPDATE_CONFIG } from "./actiontypes";
/**
 * Action to be dispatched to update the config of the SDK.
 *
 * @param {Config} beacons - The (partial) object to update config walies with..
 * @returns {{
    *     beacons: Config,
    *     type: 'UPDATE_CONFIG'
    * }}
    */
export function updateConfig(partialConfig) {
    return {
        config: partialConfig,
        type: UPDATE_CONFIG
    };
}
