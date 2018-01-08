import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};
// note: we always have a "type" property on any actions passed to reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.PURCHASE_BURGER_SUCCESS:
// need to merge the info passed in with the payload (id and orderData).
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder), // using concat for immutability
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
// we reuse this loaing property for both pages async loading cases
// because they will not occur at same time
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
// from fetchOrdersSuccess payload we have an orders property we access on action
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;
