import {takeEvery, call, put} from 'redux-saga/effects';
import {
    COMPLETE_NEW_BOOKING_REQUEST, HANDLE_BOOKING_ERROR, SET_NEW_BOOKING,
    CANCEL_BOOKING_REQUEST, CANCEL_BOOKING,
    RESCHEDULE_BOOKING_REQUEST, RESCHEDULE_BOOKING
} from '../constants/redux';
import axios from "axios";
import CryptoJS from 'crypto-js';
import {key} from '../constants/key';


// function to wrap axios
const postNewBookingAxios = (body) => axios.post('/booking', body);
const cancelBookingAxios = (id) => axios.delete('/booking/' + id);


function* addBooking(action) {
    try {
        const idString = `${action.newBooking.appointment}_${action.newBooking.date}_${action.newBooking.time}`
        const id = CryptoJS.MD5(`${key}.${idString}`).toString();

        const payload = {id: id, ...action.newBooking};
        const result = yield call(postNewBookingAxios, payload);

        if (result.status === 201) {
            const newBooking = {result: 'success', error: null, data: payload}
            yield put({type: SET_NEW_BOOKING, newBooking: newBooking})
        } else {
            const newBooking = {
                result: 'false',
                error: {message: result.data.message},
                data: {id: null, ...action.newBooking}
            }
            yield put({type: HANDLE_BOOKING_ERROR, newBooking: newBooking})
        }
    } catch (e) {
        console.log(e)
    }
}

function* cancelBooking(action) {
    try {
        const bookingId = action.id;
        const result = yield call(cancelBookingAxios, bookingId);
        if (result.status === 200) yield put({type: CANCEL_BOOKING})
    } catch (e) {
        console.log(e)
    }
}

function* RescheduleBooking(action) {
    try {
        const bookingId = action.id;
        const result = yield call(cancelBookingAxios, bookingId);
        if (result.status === 200) yield put({type: RESCHEDULE_BOOKING})
    } catch (e) {
        console.log(e)
    }
}


function* watchAddBooking() {
    yield takeEvery(COMPLETE_NEW_BOOKING_REQUEST, addBooking);
}

function* watchCancelBooking() {
    yield takeEvery(CANCEL_BOOKING_REQUEST, cancelBooking);
}

function* watchRescheduleBooking() {
    yield takeEvery(RESCHEDULE_BOOKING_REQUEST, RescheduleBooking);
}


/** export */
export const bookingsSagas = [
    watchAddBooking(),
    watchCancelBooking(),
    watchRescheduleBooking()
]