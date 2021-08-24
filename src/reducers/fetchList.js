import {FETCH_DATA, HANDLE_ERROR} from '../constants/actionType';

const initState = {
    result: false,
    list: []
};

const fetchList = (state = initState, action = {}) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                result: true,
                list: action.data
            };
        case HANDLE_ERROR:
            return {
                result: false,
                list: action.data
            };
        default:
            return state;
    }
}

export default fetchList;