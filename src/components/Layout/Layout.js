import React from 'react';
import Aus from '../../hoc/Aus';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ( props ) => (
    <Aus>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            { props.children }
        </main>
    </Aus>
);

export default layout;
// in the main div above, we want to display the components that we
// we wrap with the layout container.
// we're not allowed to have adjacent elements.  Instead of wrapping
// with another div, we will create a higher-order-component to wrap.
