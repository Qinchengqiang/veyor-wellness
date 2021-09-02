import {cleanup, render, screen} from '@testing-library/react';  // testing-library
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../components/App';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import logger from "redux-logger";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import createSagaMiddleware from 'redux-saga';
import rootSage from '../sagas';


/** must wrap the app component since the redux */
const AppWrapper = () => {

    /** saga */
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware, logger)
        )
    );
    sagaMiddleware.run(rootSage);

    const routes = (
        <>
            <Route exact path="/" component={App}/>
        </>);


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

afterEach(() => {
    cleanup();
});

describe('App group:', () => {
    // test 1
    it('App test 1: render app', () => {
        render(<AppWrapper/>);
        const AppEle = screen.getByTestId('App');   // attr in element: data-testid={`App`}
        expect(AppEle).toBeInTheDocument();
    })

    // test 2
    test('App test 2: SPA', () => {
        render(<AppWrapper/>);
        const linkElement = screen.getByText(/SPA/i);
        expect(linkElement).toBeInTheDocument();
    });
})


/**
 * snapshot test (using react-test-renderer)
 */
test('App test: matches snapshot', () => {
    const tree = renderer.create(<AppWrapper/>).toJSON();
    expect(tree).toMatchSnapshot();                 // failed，press ‘u’ to update. (jest -u)
})

