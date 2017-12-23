import React, { Component } from 'react';

import Aus from              '../../hoc/Aus';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from           '../../components/Burger/Burger';
import BuildControls from    '../../components/Burger/BuildControls/BuildControls';
import Modal from            '../../components/UI/Modal/Modal';
import Spinner from          '../../components/UI/Spinner/Spinner';
import OrderSummary from     '../../components/OrderSummary/OrderSummary';
import axios from            '../../axios-orders';

// typically name constants you want to use as global constants in ALL CAPS
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    // we will use componentDidMount to fetch the master list of ingredients
    // from firebase backend, then distribute it to ingredinets when state
    // is initialized.
    componentDidMount = () => {
        // must remember to append the .json even tho firebase link does not
        // give it to you to copy that way.
        axios.get('https://react-my-burger-963.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            })

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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        /* No longer want to send to firebase immidiatly
        want to navigate to checkout component instead.
        Since BurgerBuilder is part of the routable area of our project
        we have access to the match, location, and history props.

        // Here we toggle the loading state to true so the
        // spinner is displayed
        this.setState( { loading: true } );
        // alert('You Continue!');
        // the .json appendage to the post route is required for
        // Firebase to function correctly.
        const order = {
            ingredients: this.state.ingredients,
            // in a real app, you would calculate price on the server
            // to avoid user manipulating data before hitting server.
            price: this.state.totalPrice,
            customer: {
                name: 'Brian Cilenti',
                address: {
                    street: '2443 44th',
                    zipCode: '94116',
                    country: 'USA'
                },
                email: 'heckler246@yahoo.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                // console.log response

                this.setState({loading: false, purchasing: false});
            } )
            .catch(error => {
                // also want to set loading to false if we have an error.
                this.setState({loading: false, purchasing: false});
            } )
        */
        // push allows us to push a new page onto stack of pages
        // we push a javsript object to pass along burger ingredinets as
        // query parameters. encodeURIComponent is a helper method to
        // make each individual query parameter suitble for use in the URL
        // i.e. salad=1
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        console.log('purchaseContinueHandler', this.props);
    }

    render() {
        // need some logic to disable the "less" button if there is nothing to remove
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        // Adding logic to conditionally show the spinner.
        // First we set up alternative to spinner, the order OrderSummary
        let orderSummary = null;

        // here we will show a spinner while the master ingredients list is
        // retrieved from the firebase ingredients master list.
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aus>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                      ingredientAdded={this.addIngredientHandler}
                      ingredientRemoved={this.removeIngredientHandler}
                      disabled={disabledInfo}
                      purchasable={this.state.purchasable}
                      price={this.state.totalPrice}
                      ordered={this.purchaseHandler}/>
                </Aus>);
            orderSummary = <OrderSummary
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              totalSum={this.state.totalPrice}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
          <Aus>
              <Modal show={this.state.purchasing}
                     modalClosed={this.purchaseCancelHandler}>
                     {orderSummary}
              </Modal>
              {burger}
          </Aus>
        );
        }
}

export default withErrorHandler(BurgerBuilder, axios);

// in this component we will control the dynamic rendering of ingredients
// using state.
// since we want to put ingredients on our burger (aka, tell the burger which
// ingredients to render), we will pass in the ingredients object from the state
// as a property.
