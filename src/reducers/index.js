import { combineReducers } from 'redux';

import auth from './auth';
import appointments from "./appointments";
import newBooking from './newBooking';
import allBookings from './allBookings';

export default combineReducers({
    auth,
    appointments,
    allBookings,
    newBooking
});