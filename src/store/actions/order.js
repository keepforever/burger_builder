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
export const purchaseBurger = ( orderData, token ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                // console.log( response.data );
                dispatch( purchaseBurgerSuccess( response.data.name, orderData ) );
            } )
            .catch( error => {
                dispatch( purchaseBurgerFail( error ) );
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};
// here we run the asynchronous code to fetch the orders.
// to implement protected resources, add query param to
// the get request, passing along the token
// we could pass getState along with dispatch into our first return
// to access the token from our auth reducer return (dispatch, getState) => ...
// passing getState not reccomended by instructor.  We will get it when we
// dispatch the action in the Orders page
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        // to only fetch specific orders belonging to user
        // '&orderBy' is known by firebase to set a filter method
        // 'equalTo' refers to the key we're ordering by, 'userId'
        // must adjust database rules in firebase to make orders indexable/combable
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        // old: axios.get('/orders.json?auth=' + token ) .
        axios.get('/orders.json' + queryParams ) // new
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                // console.log('fetchedOrders', fetchedOrders);
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            });
    }
};
