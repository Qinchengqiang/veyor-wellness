import { all } from 'redux-saga/effects';
import { appointmentsSagas } from './appointments';
import { allBookingsSagas } from './allBookings';

export default function* rootSage() {
    yield all([
        ...appointmentsSagas,
        ...allBookingsSagas
    ])
}