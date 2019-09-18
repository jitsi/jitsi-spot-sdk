/**
 * Model class representing a Beacon (a.k.a nearby device).
 */
export default class Beacon {
    /**
     * Instantiates a new {@code Beacon} instance.
     *
     * @param {string} joinCode - The 6 digit join code emitted by the beacon.
     * @param {string} name - The Spot device name retreived from backend, if applicable.
     * @param {string} proximity - The approximate proximity of the beacon.
     */
    constructor(joinCode, name, proximity) {
        this.joinCode = joinCode;
        this.name = name;
        this.proximity = proximity;
    }
}
