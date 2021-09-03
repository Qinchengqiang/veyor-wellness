import { combineReducers } from 'redux';

import appointments from "./appointments";
import newBooking from './newBooking';
import allBookings from './allBookings';

export default combineReducers({
    appointments,
    allBookings,
    newBooking
});