import {
    COMPLETE_NEW_BOOKING_REQUEST,
    SET_CHOOSE_APPOINTMENT,
    SET_NEW_BOOKING,
    HANDLE_BOOKING_ERROR,
    CANCEL_BOOKING,
    RESCHEDULE_BOOKING,
    SCHEDULE_ANOTHER_BOOKING
} from '../constants/redux';

const initState = {
    result: null,
    error: null,
    data: {
        id: null, appointment: "", date: "", time: "",
        firstname: "", lastname: "", phone: "", email: ""
    }
};

const newBooking = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_CHOOSE_APPOINTMENT:
            const {firstname, lastname, phone, email} = state.data;
            return {
                result: null,
                error: null,
                data: {
                    id: null,
                    appointment: action.appointment.appointment,
                    date: action.appointment.date,
                    time: action.appointment.time,
                    firstname,
                    lastname,
                    phone,
                    email
                }
            };

        case COMPLETE_NEW_BOOKING_REQUEST:
            return state;

        case SET_NEW_BOOKING:
            return action.newBooking;

        case HANDLE_BOOKING_ERROR:
            return action.newBooking;

        case CANCEL_BOOKING:
            return {
                result: 'cancel',
                error: null,
                data: {
                    id: null, appointment: "", date: "", time: "",
                    firstname: "", lastname: "", phone: "", email: ""
                }
            };

        case RESCHEDULE_BOOKING:
            const preData = state.data;
            return {
                result: 'reschedule',
                error: null,
                data: {
                    id: null,
                    appointment: preData.appointment,
                    date: preData.date,
                    time: preData.time,
                    firstname: preData.firstname,
                    lastname: preData.lastname,
                    phone: preData.phone,
                    email: preData.email
                }
            };

        case SCHEDULE_ANOTHER_BOOKING:
            return {
                result: 'another',
                error: null,
                data: {
                    id: null, appointment: "", date: "", time: "",
                    firstname: "", lastname: "", phone: "", email: ""
                }
            };

        default:
            return state;
    }
}

export default newBooking;