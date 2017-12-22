import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

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

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} ></CheckoutSummary>
            </div>
        )
    }
};

export default Checkout;
