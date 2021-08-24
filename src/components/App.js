import '../assets/styles/App.scss';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {login} from '../actions/loginAction';

function App() {
    const authRedux = useSelector(state => state.auth, shallowEqual)
    const dispatch = useDispatch();

    return (
        <div className="App" data-testid={`App`}>
            <h3>hello</h3>
            {authRedux.isAuthenticated ?
                <h4>{authRedux.user.username}</h4>
                :
                <p>
                    <button onClick={()=>dispatch(login())}>login</button>
                </p>}
        </div>
    );
}

export default App;
