import {
    SET_CHOOSE_APPOINTMENT,
    GET_ALL_BOOKINGS_REQUEST,
    COMPLETE_NEW_BOOKING_REQUEST,
    CANCEL_BOOKING_REQUEST,
    RESCHEDULE_BOOKING_REQUEST,
    SCHEDULE_ANOTHER_BOOKING
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


export const cancelBooking = (id) => {
    return {
        type: CANCEL_BOOKING_REQUEST,
        id
    }
}

export const rescheduleBooking =(id) => {
    return {
        type: RESCHEDULE_BOOKING_REQUEST,
        id
    }
}


export const scheduleAnotherBooking =() => {
    return {
        type: SCHEDULE_ANOTHER_BOOKING
    }
}

