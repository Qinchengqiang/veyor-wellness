import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_ALL_BOOKINGS_REQUEST, SET_ALL_BOOKINGS, HANDLE_ALL_BOOKINGS_ERROR } from '../constants/redux';
import axios from "axios";

// function to wrap axios
const allBookingsAxios = () => axios.get('/booking');


function* getAllBookings() {
    try {
        const result = yield call(allBookingsAxios);
        if (result.status === 200) yield put({type: SET_ALL_BOOKINGS, data: result.data})
        else yield put({type: HANDLE_ALL_BOOKINGS_ERROR, data: result.data.message})
    } catch (e) {
        yield put({type: HANDLE_ALL_BOOKINGS_ERROR, data: e.data.message})
    }
}


function* watchGetAllBookings() {
    yield takeEvery(GET_ALL_BOOKINGS_REQUEST, getAllBookings);
}


/** export */
export const allBookingsSagas = [
    watchGetAllBookings()
]