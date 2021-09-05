import {takeEvery, call, put} from 'redux-saga/effects';
import {
    COMPLETE_NEW_BOOKING_REQUEST, HANDLE_BOOKING_ERROR, SET_NEW_BOOKING,
    CANCEL_BOOKING_REQUEST, CANCEL_BOOKING,
    RESCHEDULE_BOOKING_REQUEST, RESCHEDULE_BOOKING
} from '../constants/redux';
import axios from "axios";
import CryptoJS from 'crypto-js';
import {key} from '../constants/key';

// function to wrap async-await axios
const postNewBookingAxios = async (body) => {
    try {
        const res = await axios.post('/booking', body);
        return {res: true, data: res.data};
    } catch (error) {
        return {res: false, data: error};
    }
};


const cancelBookingAxios = async (id) => {
    try {
        const res = await axios.delete('/booking/' + id);
        return {res: true, data: res.data};
    } catch (error) {
        return {res: false, data: error};
    }
}


function* addBooking(action) {
    try {
        const idString = `${action.newBooking.appointment}_${action.newBooking.date}_${action.newBooking.time}`
        const id = CryptoJS.MD5(`${key}.${idString}`).toString();

        const payload = {id: id, ...action.newBooking};
        const result = yield call(postNewBookingAxios, payload);

        if (result.res) {
            const newBooking = {result: true, error: null, data: payload}
            yield put({type: SET_NEW_BOOKING, newBooking: newBooking})
        } else {
            const newBooking = {
                result: false,
                error: {message: result.data.message},
                data: {id: null, ...action.newBooking}
            }
            yield put({type: HANDLE_BOOKING_ERROR, newBooking: newBooking})
        }

        console.log('result ==== ', result)

    } catch (e) {
        console.log(e)
    }
}

function* cancelBooking(action) {
    try {
        const bookingId = action.id;
        const result = yield call(cancelBookingAxios, bookingId);
        if (result.res) yield put({type: CANCEL_BOOKING})

        console.log('cancel result ==== ', result.res)

    } catch (e) {
        console.log(e)
    }
}

function* RescheduleBooking(action) {
    try {
        const bookingId = action.id;
        const result = yield call(cancelBookingAxios, bookingId);
        if (result.res) yield put({type: RESCHEDULE_BOOKING})

        console.log('reschedule result ==== ', result.res)

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