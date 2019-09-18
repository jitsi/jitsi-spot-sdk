// We import it using a more specific path, as we don't want to expose this internal class from
// the SDK.
import SpotDeviceEventEmitter, { DEVICE_DETECTED_EVENT, ROOM_ENTERED_EVENT, ROOM_LEFT_EVENT } from './beacons/SpotDeviceEventEmitter';
import { updateConfig } from './config';
import { getStore } from './store';
/**
 * Class to serve as the entry point for SDK-based operations.
 */
export class SDK {
    /**
     * Instantiates a new {@code SDK} instance.
     *
     * @param {Config} config - Optional config object to override defaults.
     */
    constructor(config) {
        this.store = getStore();
        this.store.dispatch(updateConfig(config));
        this.deviceEventEmitter = new SpotDeviceEventEmitter(this.store);
    }
    /**
     * Function to init and start the detection of nearby devices.
     *
     * @param {DeviceEventHandler} eventHandler - A {@code DeviceEventHandler} containing the event handlers to be used.
     * @returns {void}
     */
    initDeviceDetector(eventHandler) {
        if (eventHandler) {
            eventHandler.onDeviceDetected && this.deviceEventEmitter.on(DEVICE_DETECTED_EVENT, eventHandler.onDeviceDetected);
            eventHandler.onRoomEntered && this.deviceEventEmitter.on(ROOM_ENTERED_EVENT, eventHandler.onRoomEntered);
            eventHandler.onRoomLeft && this.deviceEventEmitter.on(ROOM_LEFT_EVENT, eventHandler.onRoomLeft);
            this.deviceEventEmitter.start();
        }
    }
    /**
     * Function to stop and shutdown the detection of nearby devices.
     *
     * @returns {void}
     */
    shutdownDeviceDetector() {
        this.deviceEventEmitter.removeAllListeners();
        this.deviceEventEmitter.stop();
    }
}
