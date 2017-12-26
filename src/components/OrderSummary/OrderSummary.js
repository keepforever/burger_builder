import React, { Component } from 'react';

import Aus from '../../hoc/Aus';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate(){
        //console.log('[ORDER_SUMMARY] WILL UPDATE');
    }

    render (){
        // introduce constant for dynamic rendering of <ul></ul> contents
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}> {igKey}</span>: {this.props.ingredients[igKey]}
                    </li>);
            });
        return (
            <Aus>
                <h3>Your Order</h3>
                <p>A Delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h4>Total Price: <strong>${this.props.totalSum.toFixed(2)}</strong></h4>
                <p>Continue to Checkout?</p>

                <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType={'Success'} clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aus>
        );
    }
};

export default OrderSummary;
