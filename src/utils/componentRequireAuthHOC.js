import React, {useEffect, useMemo, useState} from 'react';
import {shallowEqual, useSelector} from "react-redux";

const ComponentRequireAuth = (ComposedComponent) => {
    const AuthenticateHOC = props => {
        const authRedux = useSelector(state => state.auth, shallowEqual);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        const authReduxMemo = useMemo(() => authRedux, [authRedux]);

        useEffect(() => {
            if (authReduxMemo.isAuthenticated) setIsAuthenticated(true)
            else setIsAuthenticated(false)
        },[authReduxMemo]);

        return isAuthenticated ? <ComposedComponent {...props} /> : <p>login first...</p>
    }

    return AuthenticateHOC;
};

export default ComponentRequireAuth;