import {takeEvery, call, put} from 'redux-saga/effects';
import {SET_APPOINTMENTS_REQUEST, SET_APPOINTMENTS_LIST, HANDLE_APPOINTMENTS_ERROR} from '../constants/redux';
import axios from "axios";

// function to wrap axios
const appointmentsAxios = () => axios.get('/appointments');


function* getAppointments() {
    try {
        const result = yield call(appointmentsAxios);
        if (result.status === 200) yield put({type: SET_APPOINTMENTS_LIST, data: result.data})
        else yield put({type: HANDLE_APPOINTMENTS_ERROR, data: result.data.message})
    } catch (e) {
        yield put({type: HANDLE_APPOINTMENTS_ERROR, data: e.data.message})
    }
}


function* watchGetAppointments() {
    yield takeEvery(SET_APPOINTMENTS_REQUEST, getAppointments);
}


/** export */
export const appointmentsSagas = [
    watchGetAppointments()
]