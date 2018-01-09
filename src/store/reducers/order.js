import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};
// note: we always have a "type" property on any actions passed to reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false})
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
// need to merge the info passed in with the payload (id and orderData).
            const newOrder = updateObject(action.orderData, {id: action.orderId})
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder), // using concat for immutability
                purchased: true
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false });
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            })
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false })
        default:
            return state;
    }
}

export default reducer;
