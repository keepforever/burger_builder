import React from 'react';
import classes from './Order.css';

const order = ( props ) => {
    // we did this in the burger component.  Here is an alternative to
    // converting object into an array.
    const ingredients = [];
    // in a "for-in" loop, the variable element is going to be the
    // property name.
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>

        </div>
    );
}
export default order;
// Number.parseFloat(string) makes a string to a number.  .toFixed then takes
// that Numbe and rounds it off at 2 decimal places.
// Alternativley we could have coverted it to a number when passing it in
// and adding a "+" to the front of it.
// <Order
// key={order.id}
// ingredients={order.ingredients}
// price={+order.price}/>

// need to convert ingredients object to an array so we can loop through it.
