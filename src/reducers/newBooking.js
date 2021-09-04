import {SET_CHOOSE_APPOINTMENT, SET_PERSONAL_INFO} from '../constants/redux';

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
        case SET_PERSONAL_INFO:
            const {appointment, date, time} = state;
            return {
                firstname: action.firstname,
                lastname: action.lastname,
                phone: action.phone,
                email: action.email,
                appointment,
                date,
                time,
            };
        default:
            return state;
    }
}

export default newBooking;