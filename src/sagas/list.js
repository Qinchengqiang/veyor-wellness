import {takeEvery, call, put} from 'redux-saga/effects';
import {FETCH_DATA_REQUEST, FETCH_DATA, HANDLE_ERROR} from '../constants/actionType';
import axios from 'axios';

// function to wrap async-await axios
export const fetchList = async () => {
    try {
        const data = await axios.get('/users');
        return {res: true, data: data};
    } catch (error) {
        return {res: false, data: error};
    }
};

function* fetchUser() {
    try {
        // use yield call to wrap axios fetching
        const result = yield call(fetchList);

        // use put to dispatch an action
        if (result.res) yield put({type: FETCH_DATA, data: result.data})
        else yield put({type: HANDLE_ERROR, data: result.data})

    } catch (e) {
        yield put({type: HANDLE_ERROR, data: e});
    }
}


function* watchFetchUser() {
    yield takeEvery(FETCH_DATA_REQUEST, fetchUser);
}


/** export */
export const listSagas = [
    watchFetchUser()
]