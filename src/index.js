import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// we need to wrap the App component with Provider.  But with BrowserRouter
// already wrapping the App, what to do?  We wrap everything with Provider
// including BrowserRouter.
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// create store then pass it to the store prop in Provider.

//  now we have different slices of state we're dealing with.
// we accomodate for this in the mapStateToProps function of the components
// that need each different slice of state.
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);


// enables the use of routing
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root') );
registerServiceWorker();
