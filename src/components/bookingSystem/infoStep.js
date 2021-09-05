import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Input from "../widgets/input";
import '../../assets/styles/bookingSystem/infoStep.scss';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {addBooking} from '../../actions/bookingAction';
import {validateEmail} from '../../utils/snippets/stringSnippets';

const previousButton = (currentStep, setCurrentStep, _prev) => {
    if (currentStep !== 1) {
        return (
            <div className='d-flex'>
                <p className='changePrev text-decoration-underline'
                   onClick={() => _prev(currentStep, setCurrentStep)}>
                    <span>{'<<'}</span>{'Change'}
                </p>
            </div>
        )
    }
    return null;
}


const completePersonalInfo = (currentStep, setCurrentStep, _next, newBooking, dispatch) => {
    if (!_.isEmpty(newBooking.firstname) && !_.isEmpty(newBooking.lastname) && !_.isEmpty(newBooking.email)) {
        dispatch(addBooking(newBooking));
        _next(currentStep, setCurrentStep);
    }
}


const nextButton = (currentStep, setCurrentStep, _next, newBooking, dispatch, errors) => {
    let isAvailable = !_.isEmpty(newBooking.firstname) && !_.isEmpty(newBooking.lastname) && !_.isEmpty(newBooking.email) && _.isEmpty(errors);

    if (currentStep < 3 && isAvailable) {
        return (
            <button className="step-btn btn btn-primary float-right" type="button"
                    onClick={() => completePersonalInfo(currentStep, setCurrentStep, _next, newBooking, dispatch)}>
                Complete Appointment<span>>></span>
            </button>
        )
    }
    return (
        <button className="step-btn btn btn-primary float-right" type="button" disabled={true}>
            Complete Appointment<span>>></span>
        </button>
    )
}

const InfoStep = props => {
    const newBookingRedux = useSelector(state => state.newBooking, shallowEqual);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        if (!_.isEmpty(email)) {
            if (!validateEmail(email)) setErrors({type: 'email', title: 'Your email address is invalid'})
            else setErrors({});
        }
    }, [email])

    useEffect(() => {
        if (newBookingRedux.result === 'another') {
            setFirstname('');
            setLastname('');
            setPhone('');
            setEmail('');
        }
    },[newBookingRedux])

    if (props.currentStep !== 2) return null;
    // console.log(firstname, lastname, phone, email)

    const newBooking = {
        appointment: newBookingRedux.data.appointment,
        date: newBookingRedux.data.date,
        time: newBookingRedux.data.time,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email
    };

    const form = (
        <div className="form-group text-start">
            <label htmlFor="name"><p>Name<span>*</span></p></label>
            <div className='mb-3 d-flex flex-row flex-wrap justify-content-between'>
                <div className='firstname'>
                    <Input input={firstname}
                           name='name'
                           setInput={setFirstname}
                           errors={errors}
                           setErrors={setErrors}/>
                </div>
                <div className='lastname'>
                    <Input input={lastname}
                           name='lastname'
                           setInput={setLastname}
                           errors={errors}
                           setErrors={setErrors}/>
                </div>
            </div>
            <div className='mt-3'>
                <label htmlFor="phone"><p>Phone</p></label>
                <Input input={phone}
                       name='phone'
                       setInput={setPhone}
                       errors={errors}
                       setErrors={setErrors}/>
            </div>
            <div className='mt-3'>
                <label htmlFor="email"><p>Email<span>*</span></p></label>
                <Input input={email}
                       name='email'
                       setInput={setEmail}
                       errors={errors}
                       setErrors={setErrors}/>
            </div>

        </div>
    );

    return (
        <>
            <div className='w-100 text-start mt-4 mb-4'>
                <p className='chooseInfo'>{`${newBookingRedux.data.appointment} ${newBookingRedux.data.date} ${newBookingRedux.data.time}`}</p>
                {previousButton(props.currentStep, props.setCurrentStep, props.prev)}
            </div>

            {form}

            <div className='w-100 text-start mt-4 mb-4'>
                {nextButton(props.currentStep, props.setCurrentStep, props.next, newBooking, dispatch, errors)}
            </div>
        </>

    );
};

InfoStep.propTypes = {
    currentStep: PropTypes.number.isRequired,
    setCurrentStep: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired
};

export default React.memo(InfoStep);