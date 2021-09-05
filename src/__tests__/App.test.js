import {cleanup, render, screen} from '@testing-library/react';  // testing-library
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../components/App';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import logger from "redux-logger";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import rootSage from '../sagas';


const AppWrapper = () => {

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware, logger)
        )
    );
    sagaMiddleware.run(rootSage);

    return (
        <Provider store={store}>
            <App/>
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
        const AppEle = screen.getByTestId('App');
        expect(AppEle).toBeInTheDocument();
    })
})


/**
 * snapshot test (using react-test-renderer)
 */
test('App test: matches snapshot', () => {
    const tree = renderer.create(<AppWrapper/>).toJSON();
    expect(tree).toMatchSnapshot();                 // failed，press ‘u’ to update. (jest -u)
})

