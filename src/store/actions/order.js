import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// note: the function names follow actionTypes, but instead, in camelCase
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
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

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

// asynchronous, dispatch function thanks to redux-thunk
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

// TO HELP WITH REDIRECTION AFTER CONTACT DATA SUBMITTED
