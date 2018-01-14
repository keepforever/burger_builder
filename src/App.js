import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/auth" component={Auth} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
            {/* Wrapping the list of routes with Switch so we only
            load one of these routes, the first one that matches.  Which
            is why the root route is placed at the bottom of the route
            components.  Exact is redundant and for the same purpouse */}
        </Layout>
      </div>
    );
  }
}

export default App;

//
