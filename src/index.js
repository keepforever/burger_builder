import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
// we need to wrap the App component with Provider.  But with BrowserRouter
// already wrapping the App, what to do?  We wrap everything with Provider
// including BrowserRouter.
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

// create store then pass it to the store prop in Provider.
const store = createStore(
    burgerBuilderReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
