import { createStore } from 'redux';
import {Reducer,initialState} from './reducer';

/**
 * This will create a store with some initail config.s
 */
export const ConfigureStore = () => {
    const store  = createStore(
        Reducer,
        initialState
    );
    return store;
}
