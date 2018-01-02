import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}></CheckoutSummary>
                    {/* this.props.match.path is whatever path currently at */}
                <Route  path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
//  Old
// <Route
//     path={this.props.match.path + '/contact-data'}
//     component={ContactData}/>
// New so that we can pass the ingredients form contact data to the
// orderHandler method here in the Checkout Component
// <Route
//     path={this.props.match.path + '/contact-data'}
//     render={() => (<ContactData ingredients={this.state.ingredients} />)}/>
