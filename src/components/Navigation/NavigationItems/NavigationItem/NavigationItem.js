import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink
            exact
            activeClassName={classes.active}
            to={props.link}>{props.children}</NavLink>
    </li>

);

export default navigationItem;

// we import and use NavLink (instead of Link) from react-router-dom
// because we want to style the active link.
// we add activeClassName property to the NavLink as a hack because css moduels
// actually appends a slightly different class name than we typed in to preserve
// uniqueness.  We add "exact" boolean
