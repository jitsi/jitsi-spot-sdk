import Beacon from "./Beacon";

/**
 * Model class representing the collection of event handlers to be passed to the SDK
 * on initialization.
 */
export default interface DeviceEventHandler {
    /**
     * Event handler to be invoked when a new list of nearby devices is available.
     *
     * @param {Array<Beacon>} devices - The array of devices detected.
     * @returns {void}
     */
    onDeviceDetected?(devices: Array<Beacon>): void;

    /**
     * Event handler to be invoked when the proximity of a meeting room is detected.
     *
     * @param {string} regionId - The UUID of the region we entered (must match the default UUID, otherwise it may be a false alarm).
     * @returns {void}
     */
    onRoomEntered?(regionId: string): void;

    /**
     * Event handler to be invoked when the proximity of a meeting room is not detected anymore.
     *
     * @param {string} regionId - The UUID of the region we left (must match the default UUID, otherwise it may be a false alarm).
     * @returns {void}
     */
    onRoomLeft?(regionId: string): void;
}