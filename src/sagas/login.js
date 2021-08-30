import {takeEvery, call, put} from 'redux-saga/effects';
import {SET_USER_REQUEST, SET_CURRENT_USER} from '../constants/actionType';
import {token, user} from "../constants/users";
import setAxiosAuth from "../utils/setAxiosAuth";
import axios from "axios";

const axiosAuth = () => setAxiosAuth(user);
const setLocalStorage = () => localStorage.setItem('jwtToken', token);     // localStorage

function* userLogin() {
    yield call(setLocalStorage);
    yield call(axiosAuth);
    yield put({type: SET_CURRENT_USER, user: user});  // use put to dispatch an action
    console.log('login', axios.defaults.auth)
}

// watch functions
function* watchLogin() {
    yield takeEvery(SET_USER_REQUEST, userLogin);
}

/** export */
export const loginSaga = [
    watchLogin()
]