import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import {user} from "./constants/users";
import {setCurrentUser} from "./actions/loginAction";
import setAxiosAuth from "./utils/setAxiosAuth";
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import "popper.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';
// font
import '@fontsource/roboto';
// dev tools
import logger from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
// redux
import {createStore, applyMiddleware} from "redux";
import rootReducer from './reducers';
import {Provider} from "react-redux";
// router
import {BrowserRouter as Router} from "react-router-dom";
import routes from './routes';

// createStore
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

// axios default baseURL
if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = "";
}

// jwt token setting with initial user info from /constants/users.js
if (localStorage.jwtToken) {
    setAxiosAuth(user);
    store.dispatch(setCurrentUser(user));
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              {routes}
          </Router>
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
