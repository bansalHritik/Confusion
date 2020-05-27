import { createStore,combineReducers, applyMiddleware } from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import { InitialFeedback } from './forms';
/**
 * This will create a store with some initail config.s
 */
export const ConfigureStore = () => {
    const store  = createStore(
       combineReducers({
           dishes: Dishes,
           comments:Comments,
           promotions:Promotions,
           leaders:Leaders,
           ...createForms({
               feedback:InitialFeedback
           })
       }),
       applyMiddleware(thunk,logger)
       
    );
    return store;
}
