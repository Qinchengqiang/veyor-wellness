import {SET_CHOOSE_APPOINTMENT, SET_PERSONAL_INFO, GET_ALL_BOOKINGS_REQUEST} from '../constants/redux';

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

export const fillPersonalInfo = (info) => {
    return {
        type: SET_PERSONAL_INFO,
        info
    }
}