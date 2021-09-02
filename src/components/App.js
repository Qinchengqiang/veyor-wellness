import '../assets/styles/App.scss';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {doLogin} from "../actions/loginAction";

// import loadable from "@loadable/component";

function App() {
    const authRedux = useSelector(state => state.auth, shallowEqual)
    const dispatch = useDispatch();

    const login = (
        <>
            {authRedux.isAuthenticated ?
                <h4>{authRedux.user.username}</h4>
                :
                <p>
                    <button onClick={() => dispatch(doLogin())}>login</button>
                </p>
            }
        </>);

    return (
        <div className="App container d-flex flex-column align-items-center" data-testid={`App`}>

            <h3>SPA</h3>

        </div>
    );
}

export default App;
