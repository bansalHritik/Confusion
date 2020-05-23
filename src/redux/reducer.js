import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { DISHES } from "../shared/dishes";


//this is initial state 
export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
}


/**
 * This will return initial statr as reducer.
 */
export const Reducer = (state = initialState, action) => {
    return state;
}