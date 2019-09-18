import _ from 'lodash';
import React, { PureComponent, ReactElement } from 'react';
import { Text, View } from 'react-native';

import TVIcon from '../../../assets/tv-24px.svg';

import { Beacon } from '../../model';

import styles, { COMPONENT_COLOR, DEVICE_ICON_SIZE } from './styles';

type Props = {
    /**
     * The beacon representing the device to render.
     */
    beacon: Beacon,

    /**
     * The optional default name for an unknown device.
     */
    defaultName?: string
}

/**
 * Internal component to render a single nearby device (beacon).
 */
export default class SpotNearbyDevice extends PureComponent<Props> {
    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render(): ReactElement {
        return (
            <View style = { styles.deviceLine }>
                <View style = { styles.iconContainer }>
                    <TVIcon
                        fill = { COMPONENT_COLOR }
                        height = { DEVICE_ICON_SIZE }
                        width = { DEVICE_ICON_SIZE } />
                </View>
                <View style = { styles.infoContainer }>
                    { this.renderDeviceInfo() }
                </View>
            </View>
        );
    }

    /**
     * Function to render the textual device info part of the component.
     *
     * @private
     * @returns {Array<ReactElement>}
     */
    private renderDeviceInfo(): Array<ReactElement> {
        const { beacon, defaultName } = this.props;

        const infoArray = [
            beacon.name || defaultName || 'Unknown Spot device',
            _.toUpper(beacon.joinCode)
        ];

        if (!beacon.name) {
            // If we don't have a provided name, we reverse the list, because
            // then the join code is the important part of the info, not the name.
            infoArray.reverse();
        }

        return [
            (
                <Text
                    key = { infoArray[0] }
                    style = { [ styles.deviceInfoLine, styles.deviceInfoLine1 ] }>
                    { infoArray[0] }
                </Text>
            ),
            (
                <View
                    key = 'deviceInfoSeparator'
                    style = { styles.deviceInfoSeparator } />
            ),
            (
                <Text
                    key = { infoArray[1] }
                    style = { [ styles.deviceInfoLine, styles.deviceInfoLine2 ] }>
                    { infoArray[1] }
                </Text>
            )
        ];
    }
}
