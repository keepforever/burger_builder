import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aus from '../../hoc/Aus';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
// Due to async nature of setState method, use prevState so you are sure
// that you are setting state to what the previous state actually was.
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <Aus>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aus>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
// in the "main" div above, we want to display the components that we
// we wrap with the layout container.
// we're not allowed to have adjacent elements.  Instead of wrapping
// with another div, we will create a higher-order-component to wrap.
// This layout Component has become STATEFUL to handle the opening/closing
// state of the side bar. props can now be accessed via this.props,
// which is the case for all class based components
