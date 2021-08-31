import '../assets/styles/App.scss';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {doLogin} from '../actions/loginAction';
import loadable from "@loadable/component";
import {useEffect, useState} from "react";
import {fetchUser} from '../actions/fetchList';
import * as _s from '../utils/snippets/stringSnippets';

const Form = loadable(() => import('./sampleForm'));
const Filter = loadable(() => import('./filter'));

function App() {
    const authRedux = useSelector(state => state.auth, shallowEqual)
    const dispatch = useDispatch();

    // user state in redux
    const {isFetching, result, data} = useSelector(state => state.fetchList, shallowEqual);
    const [listData, setListData] = useState('');

    useEffect(() => {
        if (result === false) setListData(data.message)
        else if (isFetching) setListData("Loading...")
        else setListData(result && data && data.data[0].name)
    }, [isFetching, result, data])

    const sample = (
        <>
            {authRedux.isAuthenticated ?
                <h4>{authRedux.user.username}</h4>
                :
                <p>
                    {/* with thunk */}
                    {/*<button onClick={() => dispatch(login())}>login</button>*/}
                    {/* with saga */}
                    <button onClick={() => dispatch(doLogin())}>login</button>
                </p>
            }

            <br/>
            {/* Filter */}
            <Filter/>

            <br/>
            {/* Form */}
            <Form/>

            <br/>
            {/* with thunk */}
            {/*<button onClick={()=>dispatch(fetchList())}>fetch users</button>    */}
            {/* with saga */}
            <button onClick={() => dispatch(fetchUser())}>fetch users</button>
            <p>{listData}</p>

            <br/>
            {_s.isIncludeCharacters('ab_08c', 'ac') ? <p>true</p> : <p>false</p>}
            {_s.isIncludeSubString('abc', 'ab') ? <p>true</p> : <p>false</p>}
            {_s.isOnlyDigital('123') ? <p>true</p> : <p>false</p>}

        </>
    );

    return (
        <div className="App container d-flex flex-column align-items-center" data-testid={`App`}>

            <h3>SPA</h3>

            {sample}
        </div>
    );
}

export default App;
