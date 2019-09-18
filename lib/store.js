import { createMiddlewareRegistry, createReducerRegistry } from 'jitsi-meet-redux';
import { createStore } from 'redux';
import logger from './logger';
let STORE;
export const MiddlewareRegistry = createMiddlewareRegistry();
export const ReducerRegistry = createReducerRegistry();
/**
 * Function to create (if not yet exists) and return a singleton Redux store.
 *
 * @returns {Store}
 */
export function getStore() {
    if (!STORE) {
        logger.info('Initiating redux store...');
        STORE = createStore(ReducerRegistry.combineReducers(), {}, MiddlewareRegistry.applyMiddleware());
    }
    return STORE;
}
