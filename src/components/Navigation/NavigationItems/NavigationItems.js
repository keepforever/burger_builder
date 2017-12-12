import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/"
            active>BurgerBuilder
        </NavigationItem>
        <NavigationItem
            link="/"
            active>Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;

// the "active" property being passed into NavigationItem tag
// looks different because it's a boolean value
