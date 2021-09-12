import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import "popper.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";

// font
import '@fontsource/roboto';

// dev tools
import logger from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";

// redux
import {createStore, applyMiddleware} from "redux";
import rootReducer from './reducers';
import {Provider} from "react-redux";

// redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSage from './sagas';

// router
import {BrowserRouter as Router} from "react-router-dom";
import routes from './routes';

/** createStore with saga */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, logger)
    )
);
sagaMiddleware.run(rootSage);


// axios default baseURL
if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = "http://localhost:3005";
    axios.defaults.timeout = 1000*5;
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              {routes}
          </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
