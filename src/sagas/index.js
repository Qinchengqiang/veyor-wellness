import { all } from 'redux-saga/effects';
import { loginSaga } from './login';

/** all() to implement concurrence for all WATCH-func */
export default function* rootSage() {
    yield all([
        ...loginSaga
    ])
}