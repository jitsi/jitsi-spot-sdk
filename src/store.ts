import { createMiddlewareRegistry, createReducerRegistry } from 'jitsi-meet-redux';
import { createStore, Store } from 'redux'
import logger from './logger';

let STORE: Store;
export const MiddlewareRegistry = createMiddlewareRegistry();
export const ReducerRegistry = createReducerRegistry();

/**
 * Function to create (if not yet exists) and return a singleton Redux store.
 *
 * @returns {Store}
 */
export function getStore(): Store {
    if (!STORE) {
        logger.info('Initiating redux store...');
        STORE = createStore(ReducerRegistry.combineReducers(), {}, MiddlewareRegistry.applyMiddleware());
    }

    return STORE;
}
