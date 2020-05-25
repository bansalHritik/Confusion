import { createStore,combineReducers } from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
/**
 * This will create a store with some initail config.s
 */
export const ConfigureStore = () => {
    const store  = createStore(
       combineReducers({
           dishes: Dishes,
           comments:Comments,
           promotions:Promotions,
           leaders:Leaders
       })
    );
    return store;
}
