import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// for lazy loading
import asyncComponent from './hoc/asyncComponent/asyncComponent';
const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {

    componentDidMount(){
        this.props.onTryAutoSignup();
    }

    render() {
        // to guard routes from users not yet authenticated/signed in
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            )
        }
        return (
          <div>
            <Layout>
                {routes}
                {/* Wrapping the list of routes with Switch so we only
                load one of these routes, the first one that matches.  Which
                is why the root route is placed at the bottom of the route
                components.  Exact is redundant and for the same purpouse */}
            </Layout>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//
