import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/">BurgerBuilder
        </NavigationItem>
        <NavigationItem
            link="/orders">Orders
        </NavigationItem>
    </ul>
);

export default navigationItems;

// the "active" property being passed into NavigationItem tag
// looks different because it's a boolean value
