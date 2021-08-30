import {FETCH_DATA_REQUEST,FETCH_DATA, HANDLE_ERROR} from '../constants/actionType';

const initState = {
    isFetching: false,
    result: null,
    data: null
};

const fetchList = (state = initState, action = {}) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                isFetching: true,
                result: null,
                data: null
            };
        case FETCH_DATA:
            return {
                isFetching: false,
                result: true,
                data: action.data
            };
        case HANDLE_ERROR:
            return {
                isFetching: false,
                result: false,
                data: action.data
            };
        default:
            return state;
    }
}

export default fetchList;