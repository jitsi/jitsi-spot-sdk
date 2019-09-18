import React, { PureComponent, ReactElement } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

import { Beacon } from '../../model';

import styles from './styles';

type Props = {
    /**
     * The base URL of the Spot deployment.
     */
    baseURL: string,

    /**
     * The device we want to control, if any. Otherwise a spot controller
     * is opened with the code entry screen to control a non beacon-enabled instance.
     */
    device?: Beacon,

    /**
     * Optional function to override the way the loader is rendered.
     */
    renderLoading?: () => ReactElement<any>,

    /**
     * Optional external style to be applied.
     */
    style?: Object | Array<Object>
}

/**
 * Publicly usable component to render a view that displays a spot controller.
 */
class SpotView extends PureComponent<Props> {
    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.renderLoading = this.renderLoading.bind(this);
    }

    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render(): ReactElement {
        const { baseURL, device, renderLoading, style } = this.props;
        const uri = `${baseURL}${device ? device.joinCode : ''}`
        return (
            // @ts-ignore (TS thinks there is no style prop for the WebView for some reason)
            <WebView
                renderLoading = { renderLoading || this.renderLoading }
                source = {{ uri }}
                startInLoadingState = { true }
                style = { style } />
        );

    }

    /**
     * Function to render the default loading spinner if no external one is supplied.
     *
     * @private
     * @returns {ReactElement}
     */
    private renderLoading(): ReactElement {
        return (
            <View style = { styles.loadIndicatorWrapper }>
                <ActivityIndicator />
            </View>
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
    const { baseURL } = state.config;

    return {
        baseURL
    };
}

export default connect(mapStateToProps)(SpotView);