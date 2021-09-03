import { SET_APPOINTMENTS_REQUEST } from '../constants/redux';

export const getAppointments = () => {
    return {
        type: SET_APPOINTMENTS_REQUEST
    }
}
