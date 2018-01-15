import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aus from '../../../hoc/Aus';

const sideDrawer = ( props ) => {
    // to conditionally control side drawer classes
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    // we use onClick in the div that contains our Nav items to close the
    // drawer whenever user clicks a link
    return (
        <Aus>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aus>
    );
};

export default sideDrawer;

//... want to conditionally assign classes hence it's a normal function body
// before we return JSX
