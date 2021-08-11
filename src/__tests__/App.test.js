import {render, screen} from '@testing-library/react';  // testing-library
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../components/App';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";

/**
 * add it() or test() blocks with the name of the test and its code. You may optionally wrap them in describe() blocks for logical grouping;
 * Jest provides a built-in expect() global function for making assertions;
 *
 * All expect() matchers supported by Jest.
 * You can also use jest.fn() and expect(fn).toBeCalled() to create “spies” or mock functions
 *
 */


/** must wrap the app component as we use redux */
const AppWrapper = () => {
  const store = createStore(
      rootReducer,
      composeWithDevTools(
          applyMiddleware(thunk, logger)
      )
  );

  const routes = (
      <>
        <Route exact path="/" component={App}/>
      </>);

  // axios default baseURL
  // if (process.env.NODE_ENV === "production") {
  //     axios.defaults.baseURL = "https://interview-web-service.mountainpass.com.au/";
  // }
  //
  // if (localStorage.jwtToken) {
  //     setAxiosAuth(user);
  //     store.dispatch(setCurrentUser(user))    // keep login status after re-loading page
  // }

  return (
      <Provider store={store}>
        <Router>
          {routes}
        </Router>
      </Provider>
  )
}

// test 1   (using render from @testing-library)
it('App test 1: render app', () => {
    render(<AppWrapper/>);
    const AppEle = screen.getByTestId('App');   // attr in element: data-testid={`App`}
    expect(AppEle).toBeInTheDocument();
})

// test 2   (using render from @testing-library)
test('App test 2: hello', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello react/i);
  expect(linkElement).toBeInTheDocument();
});


/**
 * snapshot test (using react-test-renderer)
 */
test('App test: matches snapshot', () => {
  const tree = renderer.create(<AppWrapper/>).toJSON();
  expect(tree).toMatchSnapshot();   // failed，press ‘u’ to update. (jest -u)
})

