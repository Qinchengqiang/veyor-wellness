import '../assets/styles/App.scss';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {login} from '../actions/loginAction';
import loadable from "@loadable/component";

const Form = loadable(() => import('./sampleForm'));
const Filter = loadable(() => import('./filter'));

function App() {
    const authRedux = useSelector(state => state.auth, shallowEqual)
    const dispatch = useDispatch();


    return (
        <div className="App container d-flex flex-column align-items-center" data-testid={`App`}>
            <h3>hello</h3>

            {authRedux.isAuthenticated ?
                <h4>{authRedux.user.username}</h4>
                :
                <p>
                    <button onClick={() => dispatch(login())}>login</button>
                </p>
            }

            <br/>
            <Filter/>

            <br/>
            <Form/>

        </div>
    );
}

export default App;
