import React, { Component } from 'react';
import      axios    from    '../../axios-orders';
import * as actions from '../../store/actions/index';

import Aus           from    '../../hoc/Aus';
import Burger        from    '../../components/Burger/Burger';
import BuildControls from    '../../components/Burger/BuildControls/BuildControls';
import Modal         from    '../../components/UI/Modal/Modal';
import Spinner       from    '../../components/UI/Spinner/Spinner';
import OrderSummary  from    '../../components/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// to hook up BurgerBuilder component to the Redux store we need 'connect'
import { connect }   from 'react-redux';

class BurgerBuilder extends Component {
// purchasing, loading, and error are local UI state and
// thus not a good candidate for managing with redux (i.e. overkill).

    state = {
        purchasing: false
    }
    // we will use componentDidMount to fetch the master list of ingredients
    // from firebase backend, then distribute it to ingredinets when state
    // is initialized.
    componentDidMount = () => {
        // call initIngredients to kick off the chain reaction
        this.props.onInitIngredients();
        // must remember to append the .json even tho firebase link does not
        // give it to you to copy that way.
        console.log('BURGERBUILDER all props', this.props)
        // Commented out as we migrate ingredients mgmt to Redux.
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
        // const ingredients = {  .
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients) // creates array of string entries (salad, bacon, etc...).
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0


    }
// we only want to set purchasing to "true" if authenticated. Otherwise,
// we want to redirect to Authentication/SignUp page.
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            // from react router
            this.props.history.push('/auth')
        }

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
        console.log('purchaseContinueHandler', this.props);
    }

    render() {
        // need some logic to disable the "less" button if there is nothing to remove
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        // Adding logic to conditionally show the spinner.
        // First we set up alternative to spinner, the order OrderSummary
        let orderSummary = null;

        // here we will show a spinner while the master ingredients list is
        // retrieved from the firebase ingredients master list.
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aus>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                      isAuth={this.props.isAuthenticated}
                      ingredientAdded={this.props.onIngredientAdded}
                      ingredientRemoved={this.props.onIngredientRemoved}
                      disabled={disabledInfo}
                      purchasable={this.updatePurchaseState(this.props.ings)}
                      price={this.props.price}
                      ordered={this.purchaseHandler}/>
                </Aus>);
            orderSummary = <OrderSummary
              ingredients={this.props.ings}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              totalSum={this.props.price}/>
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
// we remove ingredients from the local state and replace with an 'ings'
// call that we set up in mapStateToProps.
// this will give us access to the ingredients property in our state via
// "this.props.ings".  call the .burgerBuilder property on state because
// we have two reducers that are combinded and when we configured them in
// the main index.js, that's the property we attributed to
// the burgerBuilderReducer.
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(
            actions.setAuthRedirectPath(path)
        ),
        onIngredientAdded: (ingName) => dispatch(
            actions.addIngredient(ingName)
        ),
        onIngredientRemoved: (ingName) => dispatch(
            actions.removeIngredient(ingName)
        ),
        onInitIngredients: () => dispatch(
            actions.initIngredients()
        ),
        onInitPurchase: () => dispatch(
            actions.purchaseInit()
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
