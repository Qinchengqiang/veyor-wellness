import {SET_APPOINTMENTS_REQUEST,SET_APPOINTMENTS_LIST, HANDLE_APPOINTMENTS_ERROR} from '../constants/redux';

const initState = {
    isFetching: false,
    result: null,
    error: null,
    data: null
};

const appointments = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_APPOINTMENTS_REQUEST:
            return {
                isFetching: true,
                result: null,
                error: null,
                data: null
            };
        case SET_APPOINTMENTS_LIST:
            return {
                isFetching: false,
                result: true,
                error: null,
                data: action.data
            };
        case HANDLE_APPOINTMENTS_ERROR:
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

export default appointments;