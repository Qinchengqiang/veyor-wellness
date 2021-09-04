import {
    SET_CHOOSE_APPOINTMENT,
    GET_ALL_BOOKINGS_REQUEST,
    COMPLETE_NEW_BOOKING_REQUEST
} from '../constants/redux';

export const getAllBookings = () => {
    return {
        type: GET_ALL_BOOKINGS_REQUEST
    }
}


export const chooseAppointment = (appointment) => {
    return {
        type: SET_CHOOSE_APPOINTMENT,
        appointment
    }
}


export const addBooking = (newBooking) => {
    return {
        type: COMPLETE_NEW_BOOKING_REQUEST,
        newBooking
    }
}

