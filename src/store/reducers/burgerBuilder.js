import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
// typically name constants you want to use
// as global constants in ALL CAPS
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
            const updatedIngs = updateObject(state.ingredients, updatedIng)
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        return updateObject(state, updatedSt)
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            } );
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true });
        default:
            return state;
    }
}
export default reducer;

// before utility refactoring
//
// const reducer = (state=initialState, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_INGREDIENT:
// // want to return an object that holds the new state.
// // don't need 'break' statements because we return in each case anyways.
//             updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
//             updatedIngredients = updateObject(state.ingredients, updatedIngredient)
//             updatedState = {
//
//             }
//             return {
//                 ...state,
// // ...state doesn't create 'deep clones' of objects, must distribute one level
// // deeper to not lose previous ingredient counts.
//                 ingredients: {
//                     ...state.ingredients,
// // override given ingredient, which we get as apayload from the action
// // In ES6, special syntax to dynamically override a property in a given
// // javascript object with square brackets. Pass a variable that contains
// // the name you actually want to use as a property (here, action.ingredientName),
// // that we will recieve from the action payload.
//                     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
//                 },
// // Update total price at same time as the ingredients change
//                 totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//             };
//         case actionTypes.REMOVE_INGREDIENT:
//             return {
//                 ...state,
//                 ingredients: {
//                     ...state.ingredients,
//                 [action.ingredientName]: state.ingredients[action.ingredientName] - 1
//                 },
//                 totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
//             };
//         case actionTypes.SET_INGREDIENTS:
//             return {
//                 ...state,
//                 ingredients: action.ingredients,
//                 totalPrice: 4,
//                 error: false
//             };
//         case actionTypes.FETCH_INGREDIENTS_FAILED:
//             return {
//                 ...state,
//                 error: true
//             }
//         default:
//             return state;
//     }
// }
