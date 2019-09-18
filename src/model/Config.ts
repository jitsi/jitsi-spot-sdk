/**
 * Model class representing the configuration of the SDK.
 */
export default class Config {
    /**
     * The base URL to be used when connecting to the Spot instance (e.g. spot.jitsi.net).
     */
    baseURL: string | undefined;

    /**
     * The beacon UUID to be used for ranging.
     */
    beaconUUID: string | undefined;

    /**
     * Instantiates a new {@code Config} instance.
     *
     * @param {string} baseURL - The base URL to be used when connecting to the Spot instance (e.g. spot.jitsi.net).
     * @param {string} beaconUUID - The beacon UUID to be used for ranging.
     */
    constructor(
        baseURL: string | undefined,
        beaconUUID: string | undefined
    ) {
        this.baseURL = baseURL;
        this.beaconUUID = beaconUUID;
    }
}