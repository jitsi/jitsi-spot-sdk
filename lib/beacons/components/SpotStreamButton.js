import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CastIcon from '../../../assets/cast-24px.svg';
// The default color of the icon.
const DEFAULT_ICON_COLOR = 'white';
// The default size of the icon.
const DEFAULT_ICON_SIZE = 24;
/**
 * Publicly usable component to render a button that automatically appears when
 * nearby devices are detected.
 */
class SpotStreamButton extends PureComponent {
    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        const { devicesNearby, onPress, style } = this.props;
        if (!devicesNearby || !devicesNearby.length) {
            return null;
        }
        return (<TouchableOpacity onPress={onPress} style={style}>
                {this.props.children || this.renderIcon()}
            </TouchableOpacity>);
    }
    /**
     * Function to render the default icon if no children are provided to the component.
     *
     * @private
     * @returns {ReactElement}
     */
    renderIcon() {
        const { iconColor, iconSize } = this.props;
        return (<CastIcon fill={iconColor || DEFAULT_ICON_COLOR} height={iconSize || DEFAULT_ICON_SIZE} width={iconSize || DEFAULT_ICON_SIZE}/>);
    }
}
/**
 * Function to map part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function mapStateToProps(state, ownProps) {
    return {
        devicesNearby: state.beacons.devicesNearby
    };
}
export default connect(mapStateToProps)(SpotStreamButton);
