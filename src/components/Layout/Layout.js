import React, { Component } from 'react';
import Aus from '../../hoc/Aus';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true

    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    render () {
        return (
            <Aus>
                <Toolbar />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aus>
        )
    }
}

export default Layout;
// in the main div above, we want to display the components that we
// we wrap with the layout container.
// we're not allowed to have adjacent elements.  Instead of wrapping
// with another div, we will create a higher-order-component to wrap.
// This layout Component has become STATEFUL to handle the opening/closing
// state of the side bar. props can now be accessed via this.props,
// which is the case for all class based components
