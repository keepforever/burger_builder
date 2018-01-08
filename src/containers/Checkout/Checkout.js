import React, { Component } from 'react';
// import Redirect to catch the case of a user visiting/checkout-data without
// having yet built a burger.
import { Route, Redirect } from 'react-router-dom';
// Import connect so we have access to the ingredients via the Redux store
// put simply, connect Checkout to Redux
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    // need to parce the query params that were passed via history.push({pathname: xx, search: })
    // in purchaseContinueHandler in BurgerBuilder.
    checkoutCancelledHandler = () => {
        // history property available due to Router component rendering
        // implementation of this component. goBack sends to previous route.
        this.props.history.goBack();

    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            console.log('THIS.PROPS.PURCHASED:', this.props.purchased)
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}></CheckoutSummary>
                    {/* this.props.match.path is whatever path currently at */}
                    <Route  path={this.props.match.path + '/contact-data'}
                            component={ContactData} />
                </div>
            );
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
