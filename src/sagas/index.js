import { all } from 'redux-saga/effects';
import { appointmentsSagas } from './appointments';
import { allBookingsSagas } from './allBookings';
import { bookingsSagas } from './newBooking';

export default function* rootSage() {
    yield all([
        ...appointmentsSagas,
        ...allBookingsSagas,
        ...bookingsSagas
    ])
}