import React, {useEffect} from 'react';
import '../../assets/styles/bookingSystem/confirmStep.scss';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getDayName, getMonthName} from "../../utils/snippets/dateSnippets";
import qrcode from '../../assets/images/qrcode.png';
import {cancelBooking, rescheduleBooking, scheduleAnotherBooking} from '../../actions/bookingAction';

const handleCancelBooking = (dispatch, id) => dispatch(cancelBooking(id));
const handleRescheduleBooking = (dispatch, id) => dispatch(rescheduleBooking(id));
const handleScheduleAnotherBooking = (dispatch) => dispatch(scheduleAnotherBooking());

const cancelButton = (currentStep, dispatch, id) => {
    if (currentStep === 3) {
        return (
            <button className="btn step-btn text-light float-right" type="button"
                    onClick={() => handleCancelBooking(dispatch, id)}>
                Cancel
            </button>
        )
    }
    return null;
}


const rescheduleButton = (currentStep, dispatch, id) => {
    if (currentStep === 3) {
        return (
            <button className="btn step-btn text-light float-right" type="button"
                    onClick={() => handleRescheduleBooking(dispatch, id)}>
                Reschedule
            </button>
        )
    }
    return null;
}


const anotherScheduleButton = (currentStep, dispatch) => {
    if (currentStep === 3) {
        return (
            <button className="btn white-btn text-black float-right" type="button"
                    onClick={() => handleScheduleAnotherBooking(dispatch)}>
                Schedule Another Appointment<span>>></span>
            </button>
        )
    }
    return null;
}

const ConfirmStep = props => {
    const newBookingRedux = useSelector(state => state.newBooking, shallowEqual);
    const appointmentsRedux = useSelector(state => state.appointments, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        if (newBookingRedux.result === 'reschedule' || newBookingRedux.result === 'another') props.setCurrentStep(1);
    }, [newBookingRedux, props])

    if (props.currentStep !== 3) return null;

    const newBookingDay = getDayName(newBookingRedux.data.date);
    const newBookingMonth = getMonthName(newBookingRedux.data.date);
    const newBookingDayNum = parseInt(newBookingRedux.data.date.slice(0, 2));
    const newBookingDayYear = parseInt(newBookingRedux.data.date.slice(6));


    const confirmationSuccess = newBookingRedux.result && newBookingRedux.data.id ?
        <>
            <h3>{newBookingRedux.data.appointment}</h3>
            <h3 className='date-color'>{`${newBookingDay}, ${newBookingMonth} ${newBookingDayNum}, ${newBookingDayYear}`}</h3>
            <h3 className='date-color'>{newBookingRedux.data.time}</h3>
            <p className='mt-3 mb-3'>{`Veyor Wellness ${appointmentsRedux.data.find(item => item.name === newBookingRedux.data.appointment).price}`}</p>

            <div className='confirm-btn d-flex flex-row justify-content-start'>
                {cancelButton(props.currentStep, dispatch, newBookingRedux.data.id)}
                {rescheduleButton(props.currentStep, dispatch, newBookingRedux.data.id)}
            </div>
        </>
        : null;

    const confirmationFail = (<h3>{newBookingRedux.result === false ? 'Booking failed ...' : null} </h3>)
    const cancelResult = (<h3>{newBookingRedux.result === 'cancel' ? 'Appointment canceled.' : null} </h3>)


    return (
        <div className='confirmation w-100 mt-5 text-start d-flex flex-row flex-wrap justify-content-between'>

            <div className='confirmationInfo'>

                {confirmationSuccess}
                {confirmationFail}
                {cancelResult}

                <div className='confirm-btn'>
                    {anotherScheduleButton(props.currentStep, dispatch)}
                </div>

            </div>

            <div className='qr-code p-3'>
                <div>
                    <h5>Easily book and manage appointments with Veyor Wellness on your phone</h5>
                    <p>Get the mobile app by opening the camera on your phone, and scanning this the QR code:</p>
                </div>
                <div className='m-3 p-3 d-flex flex-row justify-content-center'>
                    <img className='w-100' src={qrcode} alt={'qr'}/>
                </div>

            </div>

        </div>
    );
};

ConfirmStep.propTypes = {
    currentStep: PropTypes.number.isRequired,
    setCurrentStep: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired
};

export default React.memo(ConfirmStep);