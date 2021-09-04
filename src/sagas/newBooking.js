import {takeEvery, call, put} from 'redux-saga/effects';
import {COMPLETE_NEW_BOOKING_REQUEST, HANDLE_BOOKING_ERROR, SET_NEW_BOOKING} from '../constants/redux';
import axios from "axios";
import CryptoJS from 'crypto-js';
import {key} from '../constants/key';

// function to wrap async-await axios
export const allBookingsAxios = async (body) => {
    try {
        const res = await axios.post('/booking', body);
        return {res: true, data: res.data};
    } catch (error) {
        return {res: false, data: error};
    }
};


function* addBooking(action) {
    try {
        yield put({type: SET_NEW_BOOKING, newBooking: action.newBooking})

        const idString = `${action.newBooking.appointment}_${action.newBooking.date}_${action.newBooking.time}`
        const id = CryptoJS.MD5(`${key}.${idString}`).toString();

        const payload = {id: id, ...action.newBooking};
        const result = yield call(allBookingsAxios, payload);

        console.log('==>  payload', payload)
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}


function* watchAddBooking() {
    yield takeEvery(COMPLETE_NEW_BOOKING_REQUEST, addBooking);
}


/** export */
export const bookingsSagas = [
    watchAddBooking()
]