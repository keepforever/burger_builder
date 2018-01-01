import * as actionTypes from './actions';

// typically name constants you want to use
// as global constants in ALL CAPS
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4
};
// note: we always have a "type" property on any actions passed to reducer
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
// want to return an object that holds the new state.
// don't need 'break' statements because we return in each case anyways.
            return {
                ...state,
// ...state doesn't create 'deep clones' of objects, must distribute one level
// deeper to not lose previous ingredient counts.
                ingredients: {
                    ...state.ingredients,
// override given ingredient, which we get as apayload from the action
// In ES6, special syntax to dynamically override a property in a given
// javascript object with square brackets. Pass a variable that contains
// the name you actually want to use as a property (here, action.ingredientName),
// that we will recieve from the action payload.
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
// Update total price at same time as the ingredients change
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            };
        default:
            return state;
    }
}

export default reducer;
