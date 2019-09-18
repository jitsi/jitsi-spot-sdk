import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from './store';
/**
 * Function to wrap the components into a simple functional component to provide a scope to the Redux-enabled
 * components without implementing a separate wrapper for each of them.
 *
 * @param {ConnectedComponentClass} WrappedComponent - The component to wrap.
 * @returns {Function}
 */
export default function (WrappedComponent) {
    return (props) => (<Provider store={getStore()}>
            <WrappedComponent {...props}/>
        </Provider>);
}
