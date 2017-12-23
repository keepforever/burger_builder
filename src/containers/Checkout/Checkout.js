import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
// dummy data hardcoded to state temporarly
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }
    // need to parce the query params that were passed via history.push({pathname: xx, search: })
    // in purchaseContinueHandler in BurgerBuilder.
    componentDidMount() {
        // extract ingredients from URL then save in query constant
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        // extract key value pairs from query constant and distribute to state
        for (let param of query.entries()) {
            // entries will have the format ['salad', '1']
            // ingredients[param[0]] gets used as a property name being added to the ingredients OBJECT
            // ingredients[param[0]] = 'salad' +param[1] = 1.  + in front of param converts string to number
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }
    checkoutCancelledHandler = () => {
        // history property available due to Router component rendering
        // implementation of this component. goBack sends to previous route.
        this.props.history.goBack();

    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}></CheckoutSummary>
                    {/* this.props.match.path is whatever path currently at */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        )
    }
};

export default Checkout;
