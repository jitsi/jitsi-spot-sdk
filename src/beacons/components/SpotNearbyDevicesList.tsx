import React, { PureComponent, ReactElement } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { Beacon } from '../../model';

import SpotNearbyDevice from './SpotNearbyDevice';

type Props = {
    /**
     * The optional default name for an unknown device.
     */
    defaultDeviceName?: string,

    /**
     * The list of nearby devices retreived from Redux.
     */
    devicesNearby: Array<Beacon>,

    /**
     * The callback to be invoked on selecting a device from the list.
     */
    onSelect?: Function,

    /**
     * Optional external style to be applied.
     */
    style?: Object | Array<Object>
}

/**
 * Publicly usable component to render a list of nearby devices.
 */
class SpotNearbyDevicesList extends PureComponent<Props> {
    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render(): ReactElement {
        const { devicesNearby, style } = this.props;
        return (
            <View style = { style }>
                <FlatList
                    data = { devicesNearby }
                    keyExtractor = { this.keyExtractor }
                    renderItem = {  this.renderItem }/>
            </View>
        );
    }

    /**
     * Function to generater a unique dom key for a list item.
     *
     * @private
     * @param {Beacon} item - The item to generater a key for.
     * @returns {string}
     */
    private keyExtractor(item: Beacon): string {
        return item.joinCode;
    }

    /**
     * Function to generate to be invoked on pressing an item in the list.
     *
     * @private
     * @param {Beacon} beacon - The selected beacon.
     * @returns {Function}
     */
    private onPress(beacon: Beacon): Function {
        const { onSelect } = this.props;

        return () => {
            onSelect && onSelect(beacon);
        }
    }

    /**
     * Function to render a single item in the list.
     *
     * @private
     * @param {Object} flatListItem - The item to render.
     * @returns {ReactElement}
     */
    private renderItem({ item, index }): ReactElement {
        return (
            <TouchableOpacity onPress = { this.onPress(item) }>
                <SpotNearbyDevice
                    beacon = { item }
                    defaultName = { this.props.defaultDeviceName } />
            </TouchableOpacity>
        );
    }
}

/**
 * Function to map part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function mapStateToProps(state: any): Props {
    return {
        devicesNearby: state.beacons.devicesNearby
    };
}

export default connect(mapStateToProps)(SpotNearbyDevicesList);
