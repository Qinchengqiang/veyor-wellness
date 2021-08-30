// import setAxiosAuth from '../utils/setAxiosAuth';
// import { SET_CURRENT_USER, SET_USER_REQUEST } from '../constants/actionType';
// import {user, token} from '../constants/users';
// import axios from "axios";
import { SET_CURRENT_USER, SET_USER_REQUEST } from '../constants/actionType';


/** with thunk **/
// export const setCurrentUser = (user) => {
//     return {
//         type: SET_CURRENT_USER,
//         user
//     }
// }
//
// export const login = () => {
//     return dispatch => {
//         return Promise.resolve('OK')
//             .then(
//                 () => {
//                     localStorage.setItem('jwtToken', token)     // localStorage
//                     setAxiosAuth(user);
//                     dispatch(setCurrentUser(user));   // store user to reducer
//                     console.log('login', axios.defaults.auth)
//                 }
//             )
//     }
// }


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