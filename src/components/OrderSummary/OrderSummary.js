import React from 'react';

import Aus from '../../hoc/Aus';
import Button from '../UI/Button/Button';

const orderSummary = ( props ) => {
    // introduce constant for dynamic rendering of <ul></ul> contents
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}> {igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });

    return (
        <Aus>
            <h3>Your Order</h3>
            <p>A Delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aus>
    );


};

export default orderSummary;
