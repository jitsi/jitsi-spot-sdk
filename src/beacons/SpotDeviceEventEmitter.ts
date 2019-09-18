import EventEmitter from 'eventemitter3';
import { PermissionsAndroid, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { Store } from 'redux';


import { AUTH_ALWAYS, AUTH_GRANTED, AUTH_NOT_DETERMINED, AUTH_WHEN_IN_USE } from './constants';
import logger from '../logger';
import { Beacon, RawBeaconData, RawRegionData } from '../model';
import Utils from '../utils';

import { beaconsDetected } from './actions';

// WORKAROUND: Type defs are not up-to-date in the react-native-beacons-manager package
const BeaconsEventEmitter = Beacons['BeaconsEventEmitter'];

/**
 * Event names this emitter emits.
 */
export const DEVICE_DETECTED_EVENT: string = 'deviceDetected';
export const ROOM_ENTERED_EVENT: string = 'roomEntered';
export const ROOM_LEFT_EVENT: string = 'roomLeft';

/**
 * An event emitter instance to emit nearby devices related events.
 */
export default class SpotDeviceEventEmitter extends EventEmitter {
    region: {
        identifier: string,
        uuid:  string
    };
    store: Store;

    /**
     * Instantiates a new {@code SpotDeviceEventEmitter} instance.
     *
     * @inheritdoc
     */
    constructor(store: Store) {
        super();

        this.store = store;

        this.region = {
            identifier: '',
            uuid: this.store.getState().config.beaconUUID
        };

        this.authUpdate = this.authUpdate.bind(this);
        this.beaconsDidRange = this.beaconsDidRange.bind(this);
        this.regionDidEnter = this.regionDidEnter.bind(this);
        this.regionDidExit = this.regionDidExit.bind(this);
    }

    /**
     * Starts the scanning for nearby devices.
     *
     * @returns {void}
     */
    start(): void {
        // Setting up event listeners
        BeaconsEventEmitter.addListener('authorizationStatusDidChange', (auth: string) => this.authUpdate(auth));
        BeaconsEventEmitter.addListener('beaconsDidRange', (data: RawBeaconData) => this.beaconsDidRange(data));
        BeaconsEventEmitter.addListener('regionDidEnter', (data: RawRegionData) => this.regionDidEnter(data));
        BeaconsEventEmitter.addListener('regionDidExit', (data: RawRegionData) => this.regionDidExit(data));

        // Init permissions
        if (Platform.OS === 'ios') {
            Beacons.getAuthorizationStatus((auth: string) => this.authUpdate(auth));
        } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
                .then((auth: string) => this.authUpdate(auth));
        }
    }

    /**
     * Stops scanning for nearby devices.
     *
     * @returns {void}
     */
    stop(): void {
        logger.info('Shutting down beacon scanning.');

        // We only shut down ranging, as monitoring should continue in the background and when the app is killed.
        Beacons.stopRangingBeaconsInRegion(this.region);
    }

    /**
     * Callback to be invoked when we get an authorization update from the OS.
     *
     * @param {string} auth - The new auth status.
     * @returns {void}
     */
    private authUpdate(auth: string): void {
        logger.info('Beacon detection authorization', auth);

        switch (auth) {
            case AUTH_ALWAYS:
            case AUTH_GRANTED:
                // We can do both monitoring and ranging.
                logger.info('Starting region monitoring and ranging.', auth);
                Beacons.startMonitoringForRegion(this.region);
                Beacons.startRangingBeaconsInRegion(this.region);
                break;
            case AUTH_WHEN_IN_USE:
                // We can only do ranging.
                logger.info('Starting region ranging.', auth);
                Beacons.startRangingBeaconsInRegion(this.region);
                break;
            case AUTH_NOT_DETERMINED:
                logger.info('Beacon permission is not determined, asking for permission...');
                Beacons.requestAlwaysAuthorization();
                break;
        }
    }

    /**
     * Callback to handle the beaconsDidRange event.
     *
     * @param {Array<RawBeaconData> | undefined} data - The raw beacon data.
     * @returns {void}
     */
    private beaconsDidRange(data: RawBeaconData): void {
        const beacons = ((data && data.beacons) || []).map(beaconData => {
            return new Beacon(Utils.parseBeaconJoinCode(beaconData.major, beaconData.minor), undefined, beaconData.proximity);
        }).filter(beacon => beacon.proximity !== 'unknown');

        if (!Utils.isEqual(this.store.getState().beacons.devicesNearby, beacons)) {
            this.emit(DEVICE_DETECTED_EVENT, beacons);
            this.store.dispatch(beaconsDetected(beacons));
            logger.info('Beacon detected', beacons);
        }
    }

    /**
     * Callback to handle the regionDidEnter event.
     *
     * @param {RawRegionData} data - The raw region data.
     * @returns {void}
     */
    private regionDidEnter(data: RawRegionData): void {
        logger.info(`Beacon region entered: ${data.uuid}`);
        this.emit(ROOM_ENTERED_EVENT, data.uuid);
    }

    /**
     * Callback to handle the regionDidExit event.
     *
     * @param {RawRegionData} data - The raw region data.
     * @returns {void}
     */
    private regionDidExit(data: RawRegionData): void {
        logger.info(`Beacon region exited: ${data.uuid}`);
        this.emit(ROOM_LEFT_EVENT, data.uuid);
    }
}
