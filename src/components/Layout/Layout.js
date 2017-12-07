import React from 'react';
import Aus from '../../hoc/Aus';

const layout = ( props ) => (
    <Aus>
        <div>TODO: Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aus>
);

export default layout;
// in the main div above, we want to display the components that we
// we wrap with the layout container.

// we're not allowed to have adjacent elements.  Instead of wrapping
// with another div, we will create a higher-order-component to wrap.
