import React from 'react';
import {Route} from 'react-router-dom';
import loadable from "@loadable/component";

const App = loadable(() => import('./components/App'));

export default (
    <>
        <Route exact path="/" component={App}/>
    </>
)