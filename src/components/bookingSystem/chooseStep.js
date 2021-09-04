import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/bookingSystem/chooseStep.scss';
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import Down from 'bootstrap-icons/icons/chevron-compact-down.svg';
import DatePicker from 'react-datepicker';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {chooseAppointment} from '../../actions/bookingAction';


const completeChooseAppointment = (_next, currentStep, setCurrentStep, dispatch, chooseData) => {
    let newAppointment = {appointment: chooseData.appointment, date: chooseData.date.toLocaleDateString(), time: chooseData.time};
    console.log('==> completeChooseAppointment', newAppointment)

    if (!_.isEmpty(chooseData.time) && !_.isEmpty(chooseData.appointment)){
        dispatch(chooseAppointment(newAppointment));
        _next(currentStep, setCurrentStep);
    }
}

const nextButton = (currentStep, setCurrentStep, _next, isDisabled, dispatch, chooseData) => {
    if (currentStep < 3 && !isDisabled) {
        return (
            <button className="btn step-btn btn-primary float-right" type="button"
                    onClick={() => completeChooseAppointment(_next, currentStep, setCurrentStep, dispatch, chooseData)}>
                Continue<span>>></span>
            </button>
        )
    }
    return (
        <button className="btn step-btn btn-primary float-right invisible" type="button" disabled={true}>
            Continue<span>>></span>
        </button>
    )
};

const filterBookedDate = (allBookings) => {
    const curDate = new Date(new Date().toLocaleDateString());
    let futureBookings = new Map();
    allBookings.forEach(booking => {
        let dt = new Date(booking.date);
        if (dt >= curDate && !futureBookings.has('bird')) futureBookings.set(booking.date, 1);
    })
    return futureBookings
}

const ChooseStep = props => {
    const appointmentsRedux = useSelector(state => state.appointments, shallowEqual);
    const allBookingsRedux = useSelector(state => state.allBookings, shallowEqual);
    const dispatch = useDispatch();

    const [appointmentList, setAppointmentList] = useState('');
    const [appointment, setAppointment] = useState({"name": "", "price": ""});

    const [bookedDates, setBookedDate] = useState(null);
    const [timeAvailable, setTime] = useState(new Map());

    const [startDate, setStartDate] = useState(new Date());
    const [currSelectTime, setCurrSelectTime] = useState(null);


    useEffect(() => {
        setAppointmentList(appointmentsRedux.data)
    }, [appointmentsRedux]);


    useEffect(() => {
        if (!_.isEmpty(allBookingsRedux.data)) {
            const futureBookings = filterBookedDate(allBookingsRedux.data);
            setBookedDate(futureBookings);
        }
    }, [allBookingsRedux])


    useEffect(() => {
        const dt = startDate.toLocaleDateString();
        if (bookedDates && bookedDates.has(dt)) {
            let preTime = new Map();
            allBookingsRedux.data.forEach(book => {
                if (book.date === dt) preTime.set(book.time, 1)
            })
            setTime(preTime)
        } else {
            setTime(new Map())
        }
    }, [startDate, bookedDates, allBookingsRedux])


    if (props.currentStep !== 1) return null;

    const isFiltered = (date) => {
        let res = true;
        const day = date.getDay();
        const curDate = new Date();

        if (day === 0 || day === 1) return false
        else if (date < curDate && day !== curDate.getDay()) return false

        return res;
    };

    const choose = (
        <div className="form-group mt-4">
            {(appointmentList || []).map(item => (
                <div className='card w-100 text-start mb-2 p-2'
                     key={item.name}
                     onClick={() => setAppointment(item)}
                >
                    <p>{item.name}</p>
                    <p>30 minutes @ {item.price}</p>
                </div>))}
        </div>
    )


    const datePicking = (
        <>
            <p>{appointment.name}</p>

            <Dropdown className='choose-dropdown w-100'>
                <Dropdown.Toggle id="dropdown-basic"
                                 className='w-100 p-1 d-flex flex-row align-items-center justify-content-between'>
                    <div className='Toggle-card text-start p-2'>
                        <p>{appointment.name}</p>
                        <p>30 minutes @ {appointment.price}</p>
                    </div>
                    <div className='downIcon'>
                        <img src={Down} alt='down'/>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {(appointmentList || []).map(item => (
                        <Dropdown.Item key={item.name} onClick={() => setAppointment(item)}>
                            <div className='card w-100 text-start mb-2 p-2'>
                                <p>{item.name}</p>
                                <p>30 minutes @ {item.price}</p>
                            </div>
                        </Dropdown.Item>))}
                </Dropdown.Menu>
            </Dropdown>

            <div className='w-100 d-flex flex-row justify-content-center'>
                <div className='datePicker-box mt-5 w-100 d-flex flex-row justify-content-center'>
                    <DatePicker
                        selected={startDate}
                        onSelect={(date) => setStartDate(date)}
                        filterDate={isFiltered}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div className='time-checkbox w-100 text-start'>
                <p className={'timeCheck'}>please select a time:</p>

                {['10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm'].map(t => (
                    timeAvailable.has(t) ?
                        <div key={t}>
                            <input type="checkbox" name={`time`} value={t} disabled={true}/>
                            <label htmlFor={`time:${t}`} className='locked'>{t}</label><br/>
                        </div>
                        :
                        <div key={t}>
                            <input type="radio" name={`time`} value={t}
                                   checked={_.isEmpty(currSelectTime) ? false : currSelectTime === t }
                                   onChange={e => {if (e.target.checked) setCurrSelectTime(e.target.value);}}/>
                            <label htmlFor={`time:${t}`}>{t}</label><br/>
                        </div>
                ))}

            </div>
        </>
    )

    const chooseData = {appointment: appointment.name, date: startDate, time: currSelectTime};

    return (
        <>
            {_.isEmpty(appointment.name) ? choose : datePicking}

            <div className='w-100 text-start mt-4 mb-4'>
                {nextButton(props.currentStep, props.setCurrentStep, props.next,
                    _.isEmpty(currSelectTime), dispatch, chooseData)}
            </div>
        </>
    );
};

ChooseStep.propTypes = {
    currentStep: PropTypes.number.isRequired,
};

export default React.memo(ChooseStep);