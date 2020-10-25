import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/authReducer';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


const reducer = combineReducers({ auth: authReducer}); // Using combine Reducers here although only one reducer is present

const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // The first one is to make the chrome dev extension work
const store = createStore(reducer, composeEnhanced(applyMiddleware(thunk))); // I am using thunk, because it allows delaying the dispatch actions
// Thunk wraps the dispatch actions into custom functions which are avalable with the mapDispatchToProps


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
//serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
