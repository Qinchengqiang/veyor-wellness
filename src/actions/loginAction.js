import setAxiosAuth from '../utils/setAxiosAuth';
import {SET_CURRENT_USER } from '../constants/actionType';
import {user, token} from '../constants/users';
import axios from "axios";

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export const login = () => {
    return dispatch => {
        return Promise.resolve('OK')
            .then(
                () => {
                    localStorage.setItem('jwtToken', token)     // localStorage
                    setAxiosAuth(user);
                    dispatch(setCurrentUser(user));   // store user to reducer
                    console.log('login', axios.defaults.auth)
                }
            )
    }
}