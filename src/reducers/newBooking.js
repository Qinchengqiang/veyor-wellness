import {COMPLETE_NEW_BOOKING_REQUEST, SET_CHOOSE_APPOINTMENT, SET_NEW_BOOKING} from '../constants/redux';

const initState = {
    appointment: "",
    date: "",
    time: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: ""
};

const newBooking = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_CHOOSE_APPOINTMENT:
            const {firstname, lastname, phone, email} = state;
            return {
                appointment: action.appointment.appointment,
                date: action.appointment.date,
                time: action.appointment.time,
                firstname,
                lastname,
                phone,
                email
            };
        case COMPLETE_NEW_BOOKING_REQUEST:
            return state;
        case SET_NEW_BOOKING:
            return {
                appointment: action.newBooking.appointment,
                date: action.newBooking.date,
                time: action.newBooking.time,
                firstname: action.newBooking.firstname,
                lastname: action.newBooking.lastname,
                phone: action.newBooking.phone,
                email: action.newBooking.email,
            };
        default:
            return state;
    }
}

export default newBooking;