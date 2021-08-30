import { all } from 'redux-saga/effects';
import { listSagas } from './list';
import { loginSaga } from './login';

/** all() to implement concurrence for all WATCH-func */
export default function* rootSage() {
    yield all([
        ...listSagas,
        ...loginSaga
    ])
}