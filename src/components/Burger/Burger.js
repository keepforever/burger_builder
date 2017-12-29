import React from 'react';
// using an advanced method to get the router props to the children
// of a route rendered component. In this case, Burger is the child of
// BurgerBuilder. this will give the Burger component match, location and
// history properties accessed via props.match, etc.
// import { withRouter } from 'react-router-dom';
// withRouter(burger)

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = ( props ) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array(props.ingredients[igKey])].map( (_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0){
        transformedIngredients = (
            <p>Please start adding ingredients.</p>
        )
    }
    // console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;

// we recieve ingredients as a property, but it is an OBJECT of key/value
// pairs, not an array.  So we cannot use map right away.
// we must iterate over the object to convert it to an array.

// Object is vanillia javascript which exposes the keys() method
// which takes an object and gives you an array of the keys

// igKey is short for ingredient-key
// return [...Array(props.ingredients[igKey])] would return an array
// of length = (value of key/value pair in the ingredients object)

// return [...Array(props.ingredients[igKey])].map(_, i), we use the
// underscore to indicate we do not care about the first argument passed
// into this call of the map method, but only the index, because the index
// will tell us how many <BurberIngredient /> instances to render.
