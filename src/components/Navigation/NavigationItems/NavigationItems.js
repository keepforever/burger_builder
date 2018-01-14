import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">BurgerBuilder</NavigationItem>
            {props.isAuthenticated
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null
            }
            {!props.isAuthenticated
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    )
};

export default navigationItems;

// the "active" property being passed into NavigationItem tag
// looks different because it's a boolean value
