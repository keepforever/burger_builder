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
    console.log("[ORDER] ingredientOutput", ingredientOutput )
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>

        </div>
    );
}
export default order;
