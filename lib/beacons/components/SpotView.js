import React, { PureComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import styles from './styles';
/**
 * Publicly usable component to render a view that displays a spot controller.
 */
class SpotView extends PureComponent {
    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);
        this.renderLoading = this.renderLoading.bind(this);
    }
    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        const { baseURL, device, renderLoading, style } = this.props;
        const uri = `${baseURL}${device ? device.joinCode : ''}`;
        return (
        // @ts-ignore (TS thinks there is no style prop for the WebView for some reason)
        <WebView renderLoading={renderLoading || this.renderLoading} source={{ uri }} startInLoadingState={true} style={style}/>);
    }
    /**
     * Function to render the default loading spinner if no external one is supplied.
     *
     * @private
     * @returns {ReactElement}
     */
    renderLoading() {
        return (<View style={styles.loadIndicatorWrapper}>
                <ActivityIndicator />
            </View>);
    }
}
/**
 * Function to map part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function mapStateToProps(state) {
    const { baseURL } = state.config;
    return {
        baseURL
    };
}
export default connect(mapStateToProps)(SpotView);
