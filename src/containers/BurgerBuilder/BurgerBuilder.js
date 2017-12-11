import React, { Component } from 'react';

import Aus from '../../hoc/Aus';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

// typically name constants you want to use as global constants in ALL CAPS
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchaseState = ( ingredients ) => {
        // this method will check to see if any ingredients have been added
        // then toggle the purchasable state between true/false, dependant on
        // the state of the ingredients.
        // second argument in the reduce() method is the starting value
        // copying the ingredients from state doesn't give the correct info to analize
        // so we instead pass the updatedIngredients into the updatePurchaseState() method
        // at the end of add and remove ingredient handlers. Then perform the sum analysis
        // on this newly passed ingredients argument.
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients) // creates array of string entries (salad, bacon, etc...)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({purchasable: sum > 0})


    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // state should be updated in an immutable way, like so:
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        // state should be updated in an immutable way, like so:
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);

    }

    render() {
        // need some logic to disable the "less" button if there is nothing to remove
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        return (
          <Aus>
              <Modal />
              <Burger ingredients={this.state.ingredients} />
              <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}/>
          </Aus>
        );
        }
}

export default BurgerBuilder;

// in this component we will control the dynamic rendering of ingredients
// using state.
// since we want to put ingredients on our burger (aka, tell the burger which
// ingredients to render), we will pass in the ingredients object from the state
// as a property.
