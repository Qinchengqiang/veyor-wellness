import '../assets/styles/App.scss';
import {useSelector, shallowEqual} from "react-redux";

function App() {
    const authRedux = useSelector(state => state.auth, shallowEqual)

    return (
        <div className="App" data-testid={`App`}>
            <h3>hello</h3>
            {authRedux.isAuthenticated ? <p>{authRedux.username}</p>
                : <p>{`login first ...`}</p> }
        </div>
    );
}

export default App;
