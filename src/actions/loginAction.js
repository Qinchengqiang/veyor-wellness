
import { SET_CURRENT_USER, SET_USER_REQUEST } from '../constants/redux';

/** saga */
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export const doLogin = () => {
    return {
        type: SET_USER_REQUEST
    }
}