import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
// dummy data hardcoded to state temporarly
    state = {
        ingredients: null,
        totalPrice: null
    }
    // need to parce the query params that were passed via history.push({pathname: xx, search: })
    // in purchaseContinueHandler in BurgerBuilder.
    componentWillMount() {
        // extract ingredients from URL then save in query constant
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        // extract key value pairs from query constant and distribute to state
        for (let param of query.entries()) {
            // entries will have the format ['salad', '1']
            // ingredients[param[0]] gets used as a property name being added to the ingredients OBJECT
            // ingredients[param[0]] = 'salad' +param[1] = 1.  + in front of param converts string to number
            // more hacking for passing total price
            if(param[0] === 'price') {
                // param[0] is "price", param[1] is the actual price value/number
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }


        }
        this.setState({ingredients: ingredients, totalPrice: price});
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
                    render={(props) => (<ContactData 
                                            ingredients={this.state.ingredients}
                                            price={this.state.totalPrice}
                                            {...props}/>)}/>
            </div>
        )
    }
};

export default Checkout;
//  Old
// <Route
//     path={this.props.match.path + '/contact-data'}
//     component={ContactData}/>
// New so that we can pass the ingredients form contact data to the
// orderHandler method here in the Checkout Component
// <Route
//     path={this.props.match.path + '/contact-data'}
//     render={() => (<ContactData ingredients={this.state.ingredients} />)}/>
