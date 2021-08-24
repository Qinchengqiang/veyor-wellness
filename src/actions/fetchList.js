
import { FETCH_DATA, HANDLE_ERROR} from '../constants/actionType';
import axios from "axios";

// fetch with async/await
export const fetchSuccess = (data) => {
    return {type: FETCH_DATA, data}
};

export const fetchFail = (data) => {
    return {type: HANDLE_ERROR, data}
};

export const fetchList = () => {
    return async dispatch => {
        const onSuccess = (successRes) => {
            dispatch(fetchSuccess(successRes));
            return successRes;
        }
        const onError = (errorRes) => {
            dispatch(fetchFail(errorRes));
            return errorRes;
        }

        try {
            const res = await axios.get('/api');
            const data = await res.json();
            return onSuccess(data);
        } catch (error) {
            return onError(error);
        }
    }
}