import {GET_ALL_BOOKINGS_REQUEST, SET_ALL_BOOKINGS, HANDLE_ALL_BOOKINGS_ERROR} from '../constants/redux';

const initState = {
    isFetching: false,
    result: null,
    error: null,
    data: null
};

const allBookings = (state = initState, action = {}) => {
    switch (action.type) {
        case GET_ALL_BOOKINGS_REQUEST:
            return {
                isFetching: true,
                result: null,
                error: null,
                data: null
            };
        case SET_ALL_BOOKINGS:
            return {
                isFetching: false,
                result: true,
                error: null,
                data: action.data
            };
        case HANDLE_ALL_BOOKINGS_ERROR:
            return {
                isFetching: false,
                result: false,
                error: {'message': action.data},
                data: null
            };
        default:
            return state;
    }
}

export default allBookings;