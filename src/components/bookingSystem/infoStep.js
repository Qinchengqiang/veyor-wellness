import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Input from "../widgets/input";
import '../../assets/styles/bookingSystem/infoStep.scss';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {fillPersonalInfo} from '../../actions/bookingAction';

const previousButton = (currentStep, setCurrentStep, _prev) => {
    if (currentStep !== 1) {
        return (
            <p className='changePrev text-decoration-underline'
               onClick={() => _prev(currentStep, setCurrentStep)}>
                <span>{'<<'}</span>{'Change'}
            </p>
        )
    }
    return null;
}


const completePersonalInfo = (currentStep, setCurrentStep, _next, firstname, lastname, phone, email, dispatch) => {
    if (!_.isEmpty(firstname) && !_.isEmpty(lastname) && !_.isEmpty(email)){
        const newInfo = {firstname: firstname, lastname: lastname, phone: phone, email: email};
        dispatch(fillPersonalInfo(newInfo));
        _next(currentStep, setCurrentStep);
    }
}


const nextButton = (currentStep, setCurrentStep, _next, firstname, lastname, phone, email, dispatch) => {
    let isVisible = !_.isEmpty(firstname) && !_.isEmpty(lastname) && !_.isEmpty(email);

    if (currentStep < 3 && isVisible) {
        return (
            <button className="step-btn btn btn-primary float-right" type="button"
                    onClick={() => completePersonalInfo(currentStep, setCurrentStep, _next, firstname, lastname,
                        phone, email, dispatch)}>
                Complete Appointment<span>>></span>
            </button>
        )
    }
    return (
        <button className="step-btn btn btn-primary float-right invisible" type="button" disabled={true}>
            Complete Appointment<span>>></span>
        </button>
    )
}

const InfoStep = props => {
    const newBookingRedux = useSelector(state => state.newBooking, shallowEqual);
    const dispatch =useDispatch();

    const [errors, setErrors] = useState({});
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    if (props.currentStep !== 2) return null;
    console.log(firstname, lastname, phone, email)

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

            {errors ? <p className="text-danger">{errors.title}</p> : null}
        </div>
    );

    return (
        <>
            <div className='w-100 text-start mt-4 mb-4'>
                <p className='chooseInfo'>{`${newBookingRedux.appointment} ${newBookingRedux.date} ${newBookingRedux.time}`}</p>
                {previousButton(props.currentStep, props.setCurrentStep, props.prev)}
            </div>

            {form}

            <div className='w-100 text-start mt-4 mb-4'>
                {nextButton(props.currentStep, props.setCurrentStep, props.next, firstname, lastname, phone, email, dispatch)}
            </div>
        </>

    );
};

InfoStep.propTypes = {
    currentStep: PropTypes.number.isRequired,
};

export default React.memo(InfoStep);