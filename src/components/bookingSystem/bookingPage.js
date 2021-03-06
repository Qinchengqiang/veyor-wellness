import React, {useEffect, useMemo, useState, useCallback} from 'react';
import '../../assets/styles/bookingSystem/bookingPage.scss';
import loadable from "@loadable/component";
import classname from "classnames";
import {getAppointments} from '../../actions/appointmentsAction';
import {getAllBookings} from '../../actions/bookingAction';
import {shallowEqual, useDispatch, useSelector} from "react-redux";


const ChooseStep = loadable(() => import('./chooseStep'));
const InfoStep = loadable(() => import('./infoStep'));
const ConfirmStep = loadable(() => import('./confirmStep'));


const BookingPage = () => {
    const newBookingRedux = useSelector(state => state.newBooking, shallowEqual);
    const [currentStep, setCurrentStep] = useState(1);
    const dispatch = useDispatch();

    // initialise appointments & allBookings at redux
    useEffect(() => {
        dispatch(getAppointments());
        dispatch(getAllBookings());
        // eslint-disable-next-line
    }, [])

    const newBookingReduxMemo = useMemo(() => newBookingRedux, [newBookingRedux]);

    useEffect(() => {
        if (newBookingRedux.result === 'another') {
            dispatch(getAppointments());
            dispatch(getAllBookings());
        }
        // eslint-disable-next-line
    }, [newBookingReduxMemo])

    const next = useCallback(() => {
        let nextStep = currentStep >= 2 ? 3 : currentStep + 1;
        setCurrentStep(nextStep);
    },[currentStep]);

    const prev = useCallback(() => {
        let preStep = currentStep <= 1 ? 1 : currentStep - 1
        setCurrentStep(preStep);
    },[currentStep]);

    const tabs = (
        <div className='tabs mt-4 d-flex flex-row align-items-stretch'>
            <div className={classname('tab h-100 p-2 border-left-radius3 d-flex flex-row align-items-center zIndex2',
                {' tab-active': currentStep === 1})}>
                <div className='tabLeft'>Choose Appointment</div>
                <div className='tabTriangle'/>
            </div>

            <div className={classname('tab h-100 p-2 d-flex flex-row align-items-center border-left-0 zIndex1',
                {' tab-active': currentStep === 2})}>
                <div className='tabLeft paddingLeft'>Your info</div>
                <div className='tabTriangle'/>
            </div>

            <div
                className={classname('tab h-100 p-2 d-flex flex-row align-items-center border-left-0 border-right-radius3',
                    {' tab-active': currentStep === 3})}>
                <div className='tabLeft paddingLeft'>Confirmation</div>
            </div>

        </div>
    )

    const booking = (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <ChooseStep currentStep={currentStep} next={next}/>
                <InfoStep currentStep={currentStep} next={next} prev={prev}/>
                <ConfirmStep currentStep={currentStep} setCurrentStep={setCurrentStep}/>
            </form>
        </>
    );

    return (
        <div className='booking h-100 d-flex flex-column align-items-center justify-content-center'>
            <h1 data-testid={`Booking`}>Book a wellness session.</h1>
            <p className='mt-4'>Visit one of our expert consultant to get yourself feeling 100% again.</p>

            {tabs}
            {booking}
        </div>
    );
};

export default BookingPage;