import React, { PureComponent } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import SpotNearbyDevice from './SpotNearbyDevice';
/**
 * Publicly usable component to render a list of nearby devices.
 */
class SpotNearbyDevicesList extends PureComponent {
    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);
        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }
    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        const { devicesNearby, style } = this.props;
        return (<View style={style}>
                <FlatList data={devicesNearby} keyExtractor={this.keyExtractor} renderItem={this.renderItem}/>
            </View>);
    }
    /**
     * Function to generater a unique dom key for a list item.
     *
     * @private
     * @param {Beacon} item - The item to generater a key for.
     * @returns {string}
     */
    keyExtractor(item) {
        return item.joinCode;
    }
    /**
     * Function to generate to be invoked on pressing an item in the list.
     *
     * @private
     * @param {Beacon} beacon - The selected beacon.
     * @returns {Function}
     */
    onPress(beacon) {
        const { onSelect } = this.props;
        return () => {
            onSelect && onSelect(beacon);
        };
    }
    /**
     * Function to render a single item in the list.
     *
     * @private
     * @param {Object} flatListItem - The item to render.
     * @returns {ReactElement}
     */
    renderItem({ item, index }) {
        return (<TouchableOpacity onPress={this.onPress(item)}>
                <SpotNearbyDevice beacon={item} defaultName={this.props.defaultDeviceName}/>
            </TouchableOpacity>);
    }
}
/**
 * Function to map part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function mapStateToProps(state) {
    return {
        devicesNearby: state.beacons.devicesNearby
    };
}
export default connect(mapStateToProps)(SpotNearbyDevicesList);
