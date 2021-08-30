
// import { FETCH_DATA, HANDLE_ERROR, FETCH_DATA_REQUEST } from '../constants/actionType';
// import axios from "axios";
import { FETCH_DATA_REQUEST } from '../constants/actionType';

/** fetch  with thunk **/
// export const fetchSuccess = (data) => {
//     return {type: FETCH_DATA, data}
// };
//
// export const fetchFail = (data) => {
//     return {type: HANDLE_ERROR, data}
// };
//
// export const fetchList = () => {
//     return async dispatch => {
//         const onSuccess = (successRes) => {
//             dispatch(fetchSuccess(successRes));
//             return successRes;
//         }
//         const onError = (errorRes) => {
//             dispatch(fetchFail(errorRes));
//             return errorRes;
//         }
//
//         try {
//             const res = await axios.get('/userss');
//             // const data = await res.json();
//             return onSuccess(res);
//         } catch (error) {
//             return onError(error);
//         }
//     }
// }

/** fetch  with saga **/
export const fetchUser = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}