import * as actionTypes from './actionTypes';
import      axios       from '../../axios-orders';

// note: the function names follow actionTypes, but instead, in camelCase
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionsTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

// asynchronous, dispatch function thanks to redux-thunk
export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            } )
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            } );
    };
};
