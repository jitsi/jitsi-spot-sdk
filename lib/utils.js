import _ from 'lodash';
export default class Utils {
    /**
     * Function to compare the results of two separate detection.
     *
     * @param {Array<Beacon>} previousDetection - The list of previously detected devices.
     * @param {Array<Beacon>} newDetection - The list of newly detected devices.
     * @returns {boolean}
     */
    static isEqual(previousDetection, newDetection) {
        return _.isEqual(_.sortBy(previousDetection, ['joinCode']), _.sortBy(newDetection, ['joinCode']));
    }
    /**
     * Parses the received raw major and minor version of the beacon and returns the
     * join code represented by them.
     *
     * @param major - The major version.
     * @param minor - The minor version.
     * @returns {string}
     */
    static parseBeaconJoinCode(major = 0, minor = 0) {
        const segment1 = _.padStart(major.toString(16), 4, '0');
        const segment2 = _.padStart(minor.toString(16), 4, '0');
        return _.padStart(parseInt(`${segment1}${segment2}`, 16).toString(36), 6, '0');
    }
}
