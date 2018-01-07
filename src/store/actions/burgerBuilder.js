import * as actionTypes from './actionTypes';
import      axios       from '../../axios-orders';

// following pattern of naming action creators as camelcase versions of action
// identifiers
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

// Action creator to fetch ingredients asynchronously
// initIngredients function needs a 'sister' synchronous function which it
// will call, in this case, setIngredients, and we'll need a second sister
// function to handel the catch(error) case.
export const initIngredients = () => {
// want to return a function where we recieve the dispatch function (thanks to
// redux thunk) as an argument automatically.
    return dispatch => {
        axios.get('https://react-my-burger-963.firebaseio.com/ingredients.json')
            .then(response => {
// on an axios response the .data property holds the data which will be the
// javascript object we want to use.
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
// need to dispatch an action if we get an error to update the error property
// in the reducer.
                dispatch(fetchIngredientsFailed());
            });
    };
};

// sister func to initIngredients.  SET_INGREDIENTS is the action type that the
// reducer will listen for in it's switch statement.
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients

    };
};
// sister func to initIngredients
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
